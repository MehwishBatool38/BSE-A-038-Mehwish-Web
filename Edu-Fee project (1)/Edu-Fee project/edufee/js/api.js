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
    },

    async resetPassword(email) {
        const { data, error } = await _sb.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.href
        });
        if (error) throw error;
        return data;
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

        // Check if this user is the Master Admin
        const isMasterAdmin = session.user.email === (typeof MASTER_ADMIN_EMAIL !== 'undefined' ? MASTER_ADMIN_EMAIL : null);

        if (!data && !error) {
            console.log('Creating profile for user:', session.user.id);
            const meta = session.user.user_metadata || {};
            const role = isMasterAdmin ? 'admin' : (meta.role || 'student');

            const { data: newProfile, error: createError } = await _sb
                .from('profiles')
                .insert({
                    id: session.user.id,
                    fname: meta.fname || 'User',
                    lname: meta.lname || '',
                    role: role,
                    phone: meta.phone || '',
                    course: meta.course || '',
                    batch: meta.batch || '',
                    reg_no: (role === 'admin' ? 'ADMIN-' + session.user.id.slice(0, 5).toUpperCase() : 'STU-' + Date.now().toString().slice(-6)),
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
                    role: role,
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

        // Auto-promote Master Admin if they somehow lost their role
        if (data && isMasterAdmin && data.role !== 'admin') {
            console.log('Auto-promoting Master Admin:', session.user.email);
            const { data: updatedProfile, error: updateError } = await _sb
                .from('profiles')
                .update({ role: 'admin' })
                .eq('id', session.user.id)
                .select()
                .single();

            if (!updateError) return updatedProfile;
        }

        if (error) console.error('Error fetching profile:', error);
        return data;
    },

    async getAll() {
        const { data, error } = await _sb
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) {
            console.error('Error fetching profiles:', error);
            // Return empty instead of throwing to avoid breaking the dashboard if empty
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

    async adminCreateAccountant({ email, password, fname, lname }) {
        // Create auth user
        const { data, error } = await _sb.auth.admin ?
            await _sb.auth.admin.createUser({
                email,
                password,
                email_confirm: true,
                user_metadata: { role: 'accountant', fname, lname }
            }) :
            await _sb.auth.signUp({
                email,
                password,
                options: { data: { role: 'accountant', fname, lname } }
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
    },

    async setScholarship(studentId, percentage) {
        const { data, error } = await _sb
            .from('profiles')
            .update({ scholarship_percentage: percentage })
            .eq('id', studentId)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    async setWaiver(studentId, waiver) {
        const { data, error } = await _sb
            .from('profiles')
            .update({ waiver: waiver })
            .eq('id', studentId)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    async getFinancialStatus(studentId) {
        const { data, error } = await _sb
            .from('profiles')
            .select('id, scholarship_percentage, waiver, total_fines')
            .eq('id', studentId)
            .single();
        if (error) throw error;
        return data;
    }
};

// ── FEE PLANS ─────────────────────────────────────────────

const FeePlans = {
    async getAll() {
        try {
            const { data: plans, error: plansError } = await _sb
                .from('fee_plans')
                .select('*')
                .order('created_at', { ascending: false });

            if (plansError) throw plansError;
            if (!plans || plans.length === 0) return [];

            const planIds = plans.map(p => p.id);
            const { data: installments, error: instError } = await _sb
                .from('installments')
                .select('*')
                .in('plan_id', planIds)
                .order('plan_id', { ascending: true });

            if (instError) throw instError;

            // Merge installments with plans
            return plans.map(p => ({
                ...p,
                installments: (installments || []).filter(i => i.plan_id === p.id).sort((a, b) => a.no - b.no)
            }));
        } catch (e) {
            console.error('Error fetching fee plans:', e);
            return [];
        }
    },

    async getById(id) {
        try {
            const { data: plan, error: planError } = await _sb
                .from('fee_plans')
                .select('*')
                .eq('id', id)
                .single();

            if (planError) throw planError;
            if (!plan) return null;

            const { data: installments, error: instError } = await _sb
                .from('installments')
                .select('*')
                .eq('plan_id', id)
                .order('no', { ascending: true });

            if (instError) throw instError;

            return {
                ...plan,
                installments: installments || []
            };
        } catch (e) {
            console.error('Error fetching fee plan:', e);
            return null;
        }
    },

    async create({ name, total, installmentCount, installments }) {
        const session = await Auth.getSession();
        const userId = session?.user?.id || (typeof APP !== 'undefined' && APP.profile?.id) || null;
        // Insert plan
        const { data: plan, error: planErr } = await _sb
            .from('fee_plans')
            .insert({ name, total, installment_count: installmentCount, created_by: userId })
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
        try {
            // Fetch assignments first
            const { data: assignments, error: asgnError } = await _sb
                .from('fee_assignments')
                .select('*')
                .order('assigned_at', { ascending: false });

            if (asgnError) throw asgnError;
            if (!assignments || assignments.length === 0) return [];

            // Get unique IDs
            const studentIds = [...new Set(assignments.map(a => a.student_id))];
            const planIds = [...new Set(assignments.map(a => a.plan_id))];

            // Fetch related data in parallel
            const [{ data: profilesData }, { data: plansData }, { data: installmentsData }] = await Promise.all([
                _sb.from('profiles').select('*').in('id', studentIds),
                _sb.from('fee_plans').select('*').in('id', planIds),
                _sb.from('installments').select('*').in('plan_id', planIds)
            ]);

            // Manually merge data
            const result = assignments.map(a => ({
                ...a,
                profiles: (profilesData || []).find(p => p.id === a.student_id) || null,
                fee_plans: {
                    ...(plansData || []).find(p => p.id === a.plan_id),
                    installments: (installmentsData || []).filter(i => i.plan_id === a.plan_id).sort((x, y) => x.no - y.no)
                }
            }));

            return result;
        } catch (e) {
            console.error('Error fetching assignments:', e);
            return [];
        }
    },

    async getForStudent(studentId) {
        try {
            const { data: assignments, error: asgnError } = await _sb
                .from('fee_assignments')
                .select('*')
                .eq('student_id', studentId)
                .order('assigned_at', { ascending: false });

            if (asgnError) throw asgnError;
            if (!assignments || assignments.length === 0) return [];

            // Get unique plan IDs
            const planIds = [...new Set(assignments.map(a => a.plan_id))];

            const [{ data: plansData }, { data: installmentsData }] = await Promise.all([
                _sb.from('fee_plans').select('*').in('id', planIds),
                _sb.from('installments').select('*').in('plan_id', planIds)
            ]);

            return assignments.map(a => ({
                ...a,
                fee_plans: {
                    ...(plansData || []).find(p => p.id === a.plan_id),
                    installments: (installmentsData || []).filter(i => i.plan_id === a.plan_id).sort((x, y) => x.no - y.no)
                }
            }));
        } catch (e) {
            console.error('Error fetching assignments for student:', e);
            return [];
        }
    },

    async create(studentId, planId, semester) {
        const session = await Auth.getSession();
        const userId = session?.user?.id || (typeof APP !== 'undefined' && APP.profile?.id) || null;

        const { data, error } = await _sb
            .from('fee_assignments')
            .insert({ student_id: studentId, plan_id: planId, semester: semester || null, assigned_by: userId })
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
        try {
            const { data: payments, error: payError } = await _sb
                .from('payments')
                .select('*')
                .order('created_at', { ascending: false });

            if (payError) throw payError;
            if (!payments || payments.length === 0) return [];

            // Get unique profile and plan IDs
            const profileIds = [...new Set(payments.map(p => p.student_id))];
            const planIds = [...new Set(payments.map(p => p.plan_id))];

            const [{ data: profilesData }, { data: plansData }] = await Promise.all([
                _sb.from('profiles').select('id, fname, lname, reg_no, course').in('id', profileIds),
                _sb.from('fee_plans').select('id, name').in('id', planIds)
            ]);

            // Merge data
            return payments.map(p => ({
                ...p,
                profiles: (profilesData || []).find(pr => pr.id === p.student_id) || null,
                fee_plans: (plansData || []).find(pl => pl.id === p.plan_id) || null
            }));
        } catch (e) {
            console.error('Error fetching payments:', e);
            return [];
        }
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

    async create({ studentId, assignmentId, planId, installmentNo, amount, paymentDate, method, notes }) {
        const session = await Auth.getSession();
        const userId = session?.user?.id || (typeof APP !== 'undefined' && APP.profile?.id) || null;
        const receipt_no = 'RCP-' + String(Math.floor(Math.random() * 100000)).padStart(5, '0');

        const { data, error } = await _sb
            .from('payments')
            .insert({
                student_id: studentId,
                assignment_id: assignmentId,
                plan_id: planId,
                installment_no: installmentNo,
                amount: parseFloat(amount),
                payment_date: paymentDate || new Date().toISOString().split('T')[0],
                method: method || 'Cash',
                notes: notes || '',
                receipt_no,
                recorded_by: userId
            })
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    sumForAssignment(payments, assignmentId) {
        return (payments || [])
            .filter(p => p.assignment_id === assignmentId)
            .reduce((s, p) => s + parseFloat(p.amount || 0), 0);
    },

    sumForInstallment(payments, assignmentId, installmentNo) {
        return (payments || [])
            .filter(p => p.assignment_id === assignmentId && p.installment_no === installmentNo)
            .reduce((s, p) => s + parseFloat(p.amount || 0), 0);
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
    }
};

// ── FINES ──────────────────────────────────────────────

const Fines = {
    async getAll() {
        const { data, error } = await _sb
            .from('fines')
            .select('*')
            .order('applied_at', { ascending: false });
        if (error) throw error;
        return data;
    },

    async getForStudent(studentId) {
        const { data, error } = await _sb
            .from('fines')
            .select('*')
            .eq('student_id', studentId)
            .order('applied_at', { ascending: false });
        if (error) throw error;
        return data;
    },

    async create({ studentId, assignmentId, installmentNo, amount, reason }) {
        const { data, error } = await _sb
            .from('fines')
            .insert({
                student_id: studentId,
                assignment_id: assignmentId,
                installment_no: installmentNo,
                amount: amount,
                reason: reason || 'Late payment'
            })
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    async calculateAndApplyFines() {
        // Get all assignments
        const assignments = await FeeAssignments.getAll();
        const payments = await Payments.getAll();
        const plans = await FeePlans.getAll();

        const today = new Date();
        const finesToApply = [];

        for (const assignment of assignments) {
            const plan = plans.find(p => p.id === assignment.plan_id);
            if (!plan) continue;

            for (const installment of plan.installments) {
                const dueDate = new Date(installment.due_date);
                if (dueDate >= today) continue; // Not due yet

                // Check if payment made
                const payment = payments.find(p => p.assignment_id === assignment.id && p.installment_no === installment.no);
                if (payment) continue; // Already paid

                // Check if fine already applied
                const existingFine = await _sb
                    .from('fines')
                    .select('*')
                    .eq('student_id', assignment.student_id)
                    .eq('assignment_id', assignment.id)
                    .eq('installment_no', installment.no)
                    .maybeSingle();

                if (existingFine.data) continue;

                // Apply fine
                finesToApply.push({
                    student_id: assignment.student_id,
                    assignment_id: assignment.id,
                    installment_no: installment.no,
                    amount: 500, // Rs. 500
                    reason: 'Late payment'
                });
            }
        }

        if (finesToApply.length > 0) {
            const { data, error } = await _sb
                .from('fines')
                .insert(finesToApply)
                .select();
            if (error) throw error;

            // Update total_fines in profiles
            for (const fine of data) {
                await _sb
                    .from('profiles')
                    .update({ total_fines: _sb.raw('total_fines + ?', [fine.amount]) })
                    .eq('id', fine.student_id);
            }

            return data;
        }
        return [];
    }
};

// ── NOTIFICATIONS ─────────────────────────────────────────

const Notifications = {
    async getForStudent(studentId) {
        const { data, error } = await _sb
            .from('notifications')
            .select('*')
            .eq('student_id', studentId)
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    },

    async markAsRead(id) {
        const { error } = await _sb
            .from('notifications')
            .update({ is_read: true })
            .eq('id', id);
        if (error) throw error;
    },

    async create({ studentId, type, message }) {
        const { data, error } = await _sb
            .from('notifications')
            .insert({ student_id: studentId, type, message })
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    async getForUser(userId, role) {
        let query = _sb
            .from('notifications')
            .select('*')
            .order('created_at', { ascending: false });
        if (role === 'student') {
            query = query.eq('student_id', userId);
        }
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
        return this.markAsRead(id);
    },

    async markAllRead(userId, role) {
        let query = _sb.from('notifications').update({ is_read: true });
        if (role === 'student') query = query.eq('student_id', userId);
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