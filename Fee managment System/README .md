# 🎓 EduFee — Fee Management System

> A comprehensive, browser-based student fee management solution for educational institutions. Manage fee plans, track payments, generate receipts, and monitor dues — all in a single HTML file with zero dependencies.

---

## 📌 Project Status

> ⚠️ **This project is currently under active development (50% complete).**
> Core features are functional. See the [Roadmap](#-roadmap) for planned additions.

---

## ✨ Features

### ✅ Implemented

**Authentication & Access Control**
- Student self-registration with course and batch details
- Admin and student role-based login
- Session persistence via `localStorage`
- Auto-login on page revisit

**Admin Panel**
- Dashboard with key statistics (total students, revenue, pending dues, overdue accounts)
- Student management — view, manage, and track enrolled students
- Fee plan creation with configurable installment schedules
- Assign fee plans to individual students
- Manual payment recording with receipt generation
- Fee tracking view with installment-level status (Paid / Partial / Pending)
- All receipts listing with print support
- In-app notification system

**Student Portal**
- Personal fee plan overview with progress bar
- Installment schedule with due dates and status badges
- Pending dues tracker with overdue warnings
- Payment history log
- Printable receipts
- Profile management (edit name, phone, password)

**UI & UX**
- Responsive layout (desktop + mobile)
- Sticky sidebar navigation with role-aware menus
- Animated stat cards and modal dialogs
- Toast notifications (success, error, warning, info)
- Print-optimized payment receipts with stamp
- Color-coded progress bars (green / orange / red)
- PKR currency formatting

---

### 🚧 Planned / Incomplete

- [ ] Automated email notifications for due reminders
- [ ] PDF export for receipts (currently print-only)
- [ ] Admin analytics charts (revenue trends, collection rate)
- [ ] Bulk fee assignment to student batches/courses
- [ ] Search and filter across students and payments
- [ ] Overdue penalty / fine calculation
- [ ] Password reset / forgot password flow
- [ ] Backend/server integration (currently localStorage only)
- [ ] Data export (CSV/Excel) for reports
- [ ] Multi-institution / branch support

---

## 🖥️ Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (custom properties, Flexbox, Grid) |
| Logic | Vanilla JavaScript (ES6+) |
| Storage | Browser `localStorage` |
| Fonts | Google Fonts — Playfair Display, Plus Jakarta Sans |
| Dependencies | **None** — fully self-contained single file |

---

## 🚀 Getting Started

No installation or build step required.

```bash
# Option 1 — Open directly in a browser
open fee-management-system.html

# Option 2 — Serve locally (optional)
npx serve .
# or
python -m http.server 8000
```

Then navigate to `http://localhost:8000/fee-management-system.html`.

---

## 🔑 Demo Credentials

| Role | Email | Password |
|---|---|---|
| Admin | `admin@edufee.com` | `admin123` |
| Student | Register a new account via the Sign Up tab | — |

> **Note:** All data is stored in the browser's `localStorage`. Clearing browser data will reset the application.

---

## 📁 Project Structure

Since this is a single-file application, all code lives in `fee-management-system.html`:

```
fee-management-system.html
├── <head>
│   ├── Google Fonts import
│   └── <style> — All CSS (auth, layout, components, utilities)
├── <body>
│   ├── #auth-page       — Login & registration UI
│   ├── #app-page
│   │   ├── .sidebar     — Navigation (admin + student variants)
│   │   ├── .topbar      — Page title, notifications, avatar
│   │   └── .main-content
│   │       ├── Admin views (dashboard, students, fee plans, assignments, payments, tracking, receipts, notifications, profile)
│   │       └── Student views (dashboard, my fees, dues, payments, receipts, profile)
│   └── Modals (fee plan, assign fee, record payment, receipt, edit profile)
└── <script>
    ├── localStorage helpers (getUsers, setUsers, getPlans, etc.)
    ├── Auth logic (doLogin, doRegister, logout)
    ├── Admin render functions
    ├── Student render functions
    ├── Modal & toast utilities
    └── Auto-login initializer
```

---

## 🗂️ Data Model

All data is stored as JSON in `localStorage` under these keys:

| Key | Description |
|---|---|
| `edufee_users` | All user accounts (admin + students) |
| `edufee_plans` | Fee plan definitions with installment schedules |
| `edufee_assignments` | Fee plan assignments linking a student to a plan |
| `edufee_payments` | Individual payment records |
| `edufee_current_user` | Active session user object |

---

## 🗺️ Roadmap

### Phase 1 — Core (✅ Done)
- Auth system with role-based views
- Fee plan creation and assignment
- Payment recording and receipt printing
- Student self-service portal

### Phase 2 — In Progress 🚧
- [ ] Search/filter on all list views
- [ ] Dashboard charts and analytics
- [ ] PDF receipt download
- [ ] Overdue fee reminders UI

### Phase 3 — Planned 📅
- [ ] Email notification integration (EmailJS or backend API)
- [ ] CSV/Excel data export
- [ ] Bulk operations (batch fee assignment, bulk payment import)
- [ ] Backend migration (Node.js + MongoDB or Supabase)

---

## 🤝 Contributing

Contributions are welcome! Since the project is in early development:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Make your changes in `fee-management-system.html`
4. Commit with a clear message (`git commit -m "feat: add PDF export"`)
5. Open a Pull Request with a description of what was added or fixed

Please keep all code within the single-file structure until a build system is introduced.

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute it.

---

## 👤 Author

Built for educational institutions to streamline fee collection and student payment tracking.

> 💡 *Have a feature request or found a bug? Open an issue or reach out directly.*
