# EduFee — Smart Fee Management System

EduFee is a comprehensive, browser-based fee management system designed for educational institutions. It streamlines the process of managing student fees, tracking payments, and generating receipts. The system supports both administrative and student roles, offering a clean, responsive interface with core features like installment-based fee plans, automated notifications, and PDF-ready receipts.

## ✨ Features

- **Dual Role System**: Separate dashboards for **Admins** and **Students**.
- **Student Management**: Add, edit, delete, and search student profiles.
- **Fee Plan Builder**: Create flexible fee structures with custom installment amounts and due dates.
- **Fee Assignment**: Assign fee plans to individual students.
- **Payment Processing**: Record payments against specific installments, preventing overpayment.
- **Automated Notifications**: Students receive alerts for plan assignments and payment confirmations.
- **Real-Time Tracking**: Monitor fee collection, paid amounts, and pending dues with visual progress bars.
- **Receipt Generation**: View and print detailed, professionally formatted PDF receipts.
- **Payment History**: Maintain a complete, searchable log of all transactions.
- **Data Persistence**: All data is saved in the browser's local storage, making it a fully functional client-side application with no backend setup required.

## 🚀 Tech Stack

- **HTML5**: Structure and content.
- **CSS3**: Styling, responsive design, and modern UI components.
- **JavaScript (ES6)**: Core logic, state management, and DOM manipulation.
- **LocalStorage**: Client-side database for persistent data storage.

## 🛠️ Getting Started

### Prerequisites

You only need a modern web browser (e.g., Chrome, Firefox, Edge).

### Installation

1.  **Download the file**: Save the provided HTML code as a `.html` file, for example, `fee-management-system.html`.
2.  **Open the application**: Double-click the file to open it in your web browser. No web server is required.

## 💻 Usage

### First Time Access

- Upon launching, you will see the **Authentication Page**.
- **Admin Access**: Use the provided demo credentials to log in.
    - Email: `admin@edufee.com`
    - Password: `admin123`
- **Student Access**: Students must **register** for a new account using the registration form.

### Admin Dashboard

The admin has full control over the system:

- **Dashboard**: Get an overview of total students, collected fees, pending dues, and recent payments.
- **Student Management**: Add new students, edit their details, or delete accounts. Each student is assigned a unique registration number.
- **Fee Plans**: Create fee structures (e.g., "Annual Fee 2024") with a custom number of installments. You can set the amount and due date for each installment.
- **Assign Fees**: Select a student and assign a pre-defined fee plan to them.
- **Record Payment**: Process a payment by selecting a student, the specific installment they are paying for, the amount, and the payment method. A receipt is generated instantly.
- **Fee Tracking**: View a comprehensive table of all students' fee statuses (fully paid, partial, pending) and filter by status.
- **All Receipts & Payment History**: Browse and search through all past transactions and receipts.

### Student Dashboard

After logging in, a student can:

- **My Dashboard**: View a summary of their total fee, amount paid, remaining balance, and a progress tracker.
- **My Profile**: View and edit their personal information (name, phone, address) and change their password.
- **My Fees**: See their assigned fee plan, the complete installment schedule, and the status of each installment.
- **Pending Dues**: A focused view showing only unpaid or partially paid installments, highlighting overdue payments.
- **Payment History**: See a log of all their past payments.
- **My Receipts**: View and print a receipt for any of their past payments.

## 🧑‍💻 Demo Credentials

Use the following accounts to explore the system:

| Role      | Email                 | Password   |
|-----------|-----------------------|------------|
| Admin     | `admin@edufee.com`    | `admin123` |
| Student   | (Create your own)     | (as set)   |

## 💡 Key Features in Code

- **State Management**: Global JavaScript objects manage all data (users, fee plans, assignments, payments) and persist it using `localStorage`.
- **Modular Rendering**: Functions like `renderView()` dynamically load and populate the correct UI based on the current user's role and selected view.
- **Dynamic Forms**: Forms for creating fee plans generate input fields dynamically based on the number of installments selected.
- **Interactive Notifications**: A real-time notification system alerts students about key account changes.
- **Receipt Engine**: A dedicated function builds a printable HTML/CSS receipt, which can be opened in a new window for printing.

## 📁 Data Structure

The system relies on several key data objects stored in `localStorage`:

- `ef_users`: Stores all user accounts (admin and students).
- `ef_plans`: Stores all fee plan templates.
- `ef_assignments`: Maps a student to a specific fee plan.
- `ef_payments`: Records every payment transaction.
- `ef_notifications`: Stores system notifications for users.
- `ef_counter`: Keeps track of auto-incrementing IDs for new records.

## 🔒 Security Notes

- This is a **client-side application**. All data is stored locally in the user's browser and is not transmitted to any server.
- Authentication and data integrity are managed entirely within the application. It is suitable for demo, educational, or small-scale, single-user administrative purposes.

## 📄 License

This project is open-source and available for educational and personal use.
## link
file:///C:/Users/Home-PC/Documents/GitHub/BSE-A-038-Mehwish-Web/Fee%20managment%20System/fee-management-system.html
