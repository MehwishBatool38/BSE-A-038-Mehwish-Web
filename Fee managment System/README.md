EduFee — Fee Management System
EduFee is a modern, single-page web application to manage student fees, track payments, and automate fee processes for educational institutions. This application is built as a fully client-side, zero-backend HTML file. All data is stored locally in the browser using localStorage.

✨ Features
Installment-Based Fee Plans: Flexible fee schedules with any number of installments.
Student & Admin Roles: Separated dashboards, navigation, and permissions for students and administrators.
Automated Email-Style Notifications: Students receive notifications for fee assignment, payments, and reminders.
PDF/Printable Fee Receipts: Every payment generates a detailed printable receipt.
Full Payment Tracking: Monitor collections, pending dues, full/partial payments, and overdue installments.
Self-Registration: Students can create their own account.
Role-Based Navigation: Admins manage plans, assignments, payments, and reports; students see only their own fees.
Search, Modals, and Instant UI: Smooth user experience with fast filtering, modals, and responsive design.
Fully Offline: No backend! All data is private, secure, and stored in the user’s browser.
🚀 Getting Started
Open the File

Simply open fee-management-system.html in any modern web browser.
Default Admin Login

Email: admin@edufee.com
Password: admin123
Student Accounts

Students can self-register from the Sign Up tab.
Or, admin can add students from the Student Management section.
🛠️ How It Works
Admin Panel

Dashboard: Key stats: students, fees collected, dues, plans.
Student Management: Add, edit, delete student info.
Fee Plans: Create structures with installments and due dates.
Assignments: Assign fee plans to students.
Record Payments: Register installment payments; partial payments are supported.
Receipts, History & Tracking: Full searchable payment log and receipt download.
Notifications: View and mark all notifications as read.
Student Portal

Dashboard: Overview of fees paid, due, installment status.
My Fees: See assigned plans and progress bars.
Pending Dues: See what needs to be paid (with overdue highlighting).
Payment History: All transaction records.
Receipts: Download or print receipts.
My Profile: View and edit their info and password.
📦 Data Storage
All data (students, plans, assignments, payments, notifications) is saved in localStorage using the ef_* key prefix. No information is sent to a server; this runs entirely on your computer.

To reset all data: Clear your browser’s site storage.

💻 File Structure Overview
This application is a single file. Everything (HTML, CSS, JavaScript) is contained in fee-management-system.html. It is not split into components or external scripts.

Key UI Sections:

Auth Page: Sign In/Sign Up
Main Layout: Sidebar, Topbar, Content body
Admin Views: Dashboard, Students, Fee Plans, Assignments, Payments, Notifications
Student Views: Dashboard, My Fees, Dues, Receipts, Profile
📖 Main HTML/JS Sections
<!DOCTYPE html> ... </html>: The single application file.
<style> ... </style>: Modern, custom CSS (responsive, dark sidebar, cards, modals, tables).
Main markup divided into pages and views (using classes like .page and .view for show/hide).
All interactive logic is pure JavaScript in a <script> block at the end. Key parts include:
Data API (localStorage CRUD)
Auth/Login/Register
Role switching & navigation
Modal system, toasts/alerts
Renderers for each view
Helpers for formatting, date, etc.
✅ Requirements
A modern browser (Chrome, Firefox, Edge, Safari).
No frameworks or build tools are required.
No internet is required after first load (except for Google Fonts).
🔒 Security & Limitations
All data is local to your browser. This is not a cloud service.
There is no password reset function. You must remember the admin password, or clear all local storage to reset.
Not for production — for demo, learning, or small, personal use only.
📝 Customization / Development
All logic is in a single HTML file; to customize, open in a text/code editor.
You can edit styles, branding, add features, or enhance validation as needed.
💬 Feedback & Issues
This is an open, zero-backend demonstration project. For issues or improvement ideas, feel free to open the HTML file, review the code, and enhance it to your needs!
