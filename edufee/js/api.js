// ============================================================
// EduFee — Supabase Backend API Layer
// All database operations go through this module
// ============================================================

const { createClient } = supabase;
const _sb = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);

// ── AUTH ──────────────────────────────────────────────────

const Auth = {
    async signUp({ email, password, fname, lname, phone, course, batch }) {
        const { data, error } = await _sb.auth.signUp({
            email,
            password,
            options: {
                data: { role: 'student', fname, lname, phone, course, batch }
            }
        });
        if (error) throw error;
        return data;
    },

    async signIn(email, password) {
        const { data, error } = await _sb.auth.signInWithPassword({ email, password });
        if (error) throw error;
        return data;
    },

    async signOut() {
        const { error } = await _sb.auth.signOut();
        if (error) throw error;
    },

    async getSession() {
        const { data } = await _sb.auth.getSession();
        return data.session;
    },

    onAuthStateChange(callback) {
        return _sb.auth.onAuthStateChange(callback);
    }
};

// ── PROFILES ──────────────────────────────────────────────

const Profiles = {
    async getMe() {
        const session = await Auth.getSession();
        if (!session) return null;

        const { data, error } = await _sb
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .maybeSingle();

        if (!data && !error) {
            console.log('Creating profile for user:', session.user.id);
            const meta = session.user.user_metadata || {};

            const { data: newProfile, error: createError } = await _sb
                .from('profiles')
                .insert({
                    id: session.user.id,
                    fname: meta.fname || 'User',
                    lname: meta.lname || '',
                    role: meta.role || 'student',
                    phone: meta.phone || '',
                    course: meta.course || '',
                    batch: meta.batch || '',
                    reg_no: (meta.role === 'admin' ? 'ADMIN-001' : 'STU-' + Date.now()),
                    address: ''
                })
                .select()
                .single();

            if (createError) {
                console.error('Error creating profile:', createError);
                return {
                    id: session.user.id,
                    fname: meta.fname || 'User',
                    lname: meta.lname || '',
                    role: meta.role || 'student',
                    email: session.user.email,
                    phone: meta.phone || '',
                    course: meta.course || '',
                    batch: meta.batch || '',
                    reg_no: 'PENDING',
                    address: ''
                };
            }
            return newProfile;
        }

        if (error) console.error('Error fetching profile:', error);
        return data;
    },

    async getAll() {
        const { data, error } = await _sb
            .from('profiles')
            .select('*')
            .eq('role', 'student')
            .order('created_at', { ascending: false });
        if (error) {
            console.error('Error fetching profiles:', error);
            return [];
        }
        return data || [];
    },

    async getById(id) {
        const { data, error } = await _sb
            .from('profiles')
            .select('*')
            .eq('id', id)
            .maybeSingle();
        if (error) {
            console.error('Error fetching profile:', error);
            return null;
        }
        return data;
    },

    async update(id, updates) {
        const { data, error } = await _sb
            .from('profiles')
            .update(updates)
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    // Admin creates student account
    async adminCreateStudent({ email, password, fname, lname, phone, course, batch }) {
        // Create auth user
        const { data, error } = await _sb.auth.admin ?
            await _sb.auth.admin.createUser({
                email,
                password,
                email_confirm: true,
                user_metadata: { role: 'student', fname, lname, phone, course, batch }
            }) :
            await _sb.auth.signUp({
                email,
                password,
                options: { data: { role: 'student', fname, lname, phone, course, batch } }
            });
        if (error) throw error;
        return data;
    },

    async delete(id) {
        const { error } = await _sb
            .from('profiles')
            .delete()
            .eq('id', id);
        if (error) throw error;
    }
};

// ── FEE PLANS ─────────────────────────────────────────────

const FeePlans = {
    async getAll() {
        const { data, error } = await _sb
            .from('fee_plans')
            .select(`*, installments(*)`)
            .order('created_at', { ascending: false });
        if (error) throw error;
        if (data) data.forEach(p => {
            if (p.installments) p.installments.sort((a, b) => a.no - b.no);
        });
        return data;
    },

    async getById(id) {
        const { data, error } = await _sb
            .from('fee_plans')
            .select(`*, installments(*)`)
            .eq('id', id)
            .single();
        if (error) throw error;
        if (data && data.installments) data.installments.sort((a, b) => a.no - b.no);
        return data;
    },

    async create({ name, total, installmentCount, installments }) {
        const session = await Auth.getSession();
        // Insert plan
        const { data: plan, error: planErr } = await _sb
            .from('fee_plans')
            .insert({ name, total, installment_count: installmentCount, created_by: session.user.id })
            .select()
            .single();
        if (planErr) throw planErr;

        // Insert installments
        const instRows = installments.map((i, idx) => ({
            plan_id: plan.id,
            no: idx + 1,
            amount: i.amount,
            due_date: i.dueDate
        }));
        const { error: instErr } = await _sb.from('installments').insert(instRows);
        if (instErr) throw instErr;
        return plan;
    },

    async delete(id) {
        const { error } = await _sb.from('fee_plans').delete().eq('id', id);
        if (error) throw error;
    }
};

// ── FEE ASSIGNMENTS ───────────────────────────────────────

const FeeAssignments = {
    async getAll() {
        const { data, error } = await _sb
            .from('fee_assignments')
            .select(`
        *,
        profiles!fee_assignments_student_id_fkey(id, fname, lname, reg_no, course, batch, email),
        fee_plans(id, name, total, installment_count, installments(*))
      `)
            .order('assigned_at', { ascending: false });
        if (error) throw error;
        if (data) {
            data.forEach(a => {
                if (a.fee_plans && a.fee_plans.installments) {
                    a.fee_plans.installments.sort((x, y) => x.no - y.no);
                }
            });
        }
        return data;
    },

    async getForStudent(studentId) {
        const { data, error } = await _sb
            .from('fee_assignments')
            .select(`
        *,
        fee_plans(id, name, total, installment_count, installments(*))
      `)
            .eq('student_id', studentId)
            .maybeSingle();
        if (error) throw error;
        if (data && data.fee_plans && data.fee_plans.installments) {
            data.fee_plans.installments.sort((a, b) => a.no - b.no);
        }
        return data;
    },

    async create(studentId, planId) {
        const session = await Auth.getSession();
        const { data, error } = await _sb
            .from('fee_assignments')
            .insert({ student_id: studentId, plan_id: planId, assigned_by: session.user.id })
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    async delete(id) {
        const { error } = await _sb.from('fee_assignments').delete().eq('id', id);
        if (error) throw error;
    }
};

// ── PAYMENTS ──────────────────────────────────────────────

const Payments = {
    async getAll() {
        const { data, error } = await _sb
            .from('payments')
            .select(`
        *,
        profiles!payments_student_id_fkey(id, fname, lname, reg_no, course),
        fee_plans(name)
      `)
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    },

    async getForStudent(studentId) {
        const { data, error } = await _sb
            .from('payments')
            .select('*')
            .eq('student_id', studentId)
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    },

    async getForAssignment(assignmentId) {
        const { data, error } = await _sb
            .from('payments')
            .select('*')
            .eq('assignment_id', assignmentId);
        if (error) throw error;
        return data;
    },

    async getById(id) {
        const { data, error } = await _sb
            .from('payments')
            .select(`
        *,
        profiles!payments_student_id_fkey(id, fname, lname, reg_no, course, batch),
        fee_plans(id, name, total, installment_count, installments(*)),
        fee_assignments(id)
      `)
            .eq('id', id)
            .single();
        if (error) throw error;
        return data;
    },

    async create({ studentId, assignmentId, planId, installmentNo, amount, paymentDate, method, notes }) {
        const session = await Auth.getSession();
        // Generate receipt number client-side (server-side via DB function is preferred)
        const receiptNo = 'RCP-' + String(Date.now()).slice(-5);
        const { data, error } = await _sb
            .from('payments')
            .insert({
                receipt_no: receiptNo,
                student_id: studentId,
                assignment_id: assignmentId,
                plan_id: planId,
                installment_no: installmentNo,
                amount,
                payment_date: paymentDate,
                method,
                notes,
                recorded_by: session.user.id
            })
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    // Computed: total paid for an assignment
    sumForAssignment(payments, assignmentId) {
        return payments
            .filter(p => p.assignment_id === assignmentId)
            .reduce((s, p) => s + parseFloat(p.amount), 0);
    },

    // Computed: total paid for an installment within an assignment
    sumForInstallment(payments, assignmentId, installmentNo) {
        return payments
            .filter(p => p.assignment_id === assignmentId && p.installment_no === installmentNo)
            .reduce((s, p) => s + parseFloat(p.amount), 0);
    }
};

// ── NOTIFICATIONS ─────────────────────────────────────────

const Notifications = {
    async getForUser(userId, role) {
        let query = _sb
            .from('notifications')
            .select('*')
            .order('created_at', { ascending: false });
        if (role !== 'admin') query = query.eq('student_id', userId);
        const { data, error } = await query;
        if (error) throw error;
        return data;
    },

    async add(studentId, type, message) {
        const { error } = await _sb
            .from('notifications')
            .insert({ student_id: studentId, type, message });
        if (error) console.warn('Notification insert failed:', error.message);
    },

    async markRead(id) {
        const { error } = await _sb
            .from('notifications')
            .update({ is_read: true })
            .eq('id', id);
        if (error) throw error;
    },

    async markAllRead(userId, role) {
        let query = _sb.from('notifications').update({ is_read: true });
        if (role !== 'admin') query = query.eq('student_id', userId);
        const { error } = await query;
        if (error) throw error;
    }
};

// ── REALTIME ──────────────────────────────────────────────

const Realtime = {
    subscribeToNotifications(userId, callback) {
        return _sb
            .channel('notifications')
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'notifications',
                filter: `student_id=eq.${userId}`
            }, callback)
            .subscribe();
    }
};