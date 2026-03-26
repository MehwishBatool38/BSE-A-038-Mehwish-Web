EduFee — Fee Management System
📋 Overview
EduFee is a comprehensive fee management system designed for educational institutions to streamline the process of managing student fees, tracking payments, and generating receipts. The system provides separate interfaces for administrators and students, enabling efficient fee collection management with installment-based payment plans.

🚀 Features
👨‍💼 Administrator Features
Module	Description
Student Management	Add, edit, delete student accounts with registration numbers
Fee Plans	Create customizable fee structures with installment schedules
Fee Assignment	Assign fee plans to individual students
Payment Recording	Process installment payments with receipt generation
Fee Tracking	Monitor collection status with real-time progress indicators
Reports	View all receipts and complete payment history
Notifications	System-wide alerts and reminders
👨‍🎓 Student Features
Module	Description
Dashboard	Overview of fee status and payment progress
Profile Management	Update personal information and change password
Fee Overview	View assigned fee plan and installment schedule
Pending Dues	Track outstanding installments with due dates
Payment History	View all past transactions
Receipts	Download and print payment receipts
🛠️ Technology Stack
Component	Technology
Frontend	HTML5, CSS3, JavaScript
Storage	LocalStorage (Client-side)
Fonts	Google Fonts (Playfair Display, Plus Jakarta Sans)
Icons	Unicode Emojis
🔐 Authentication
Default Admin Credentials
Field	Value
Email	admin@edufee.com
Password	admin123
Student Registration
Students can self-register through the sign-up form with:

Personal details (First/Last Name)

Contact information (Email, Phone)

Academic information (Course, Batch)

Password (minimum 6 characters)

💰 Fee Management Workflow
1. Create Fee Plan
text
Fee Plan Structure:
├── Plan Name (e.g., "Annual Fee 2024")
├── Total Amount (PKR)
├── Number of Installments (1-12)
└── Installment Details
    ├── Amount per installment
    └── Due date (auto-generated monthly)
2. Assign Plan to Student
Select student from list

Choose existing fee plan

System creates assignment record

3. Record Payment
Select student and installment

Enter payment amount

Choose payment method (Cash/Bank Transfer/Online/Cheque)

System generates receipt automatically

4. Receipt Generation
Unique receipt number (RCP-XXXXX)

Complete payment details

Fee summary with remaining balance

Printable format

📊 Data Models
User Object
javascript
{
  id: number,
  role: "admin" | "student",
  fname: string,
  lname: string,
  email: string,
  password: string,
  phone: string,
  course: string,
  batch: string,
  regNo: string,      // e.g., "STU-0001"
  address: string
}
Fee Plan Object
javascript
{
  id: number,
  name: string,
  total: number,
  installmentCount: number,
  installments: [{
    no: number,
    amount: number,
    dueDate: string      // YYYY-MM-DD
  }],
  createdAt: string
}
Assignment Object
javascript
{
  id: number,
  studentId: number,
  planId: number,
  assignedAt: string
}
Payment Object
javascript
{
  id: number,
  receiptNo: string,
  studentId: number,
  assignmentId: number,
  planId: number,
  installmentNo: number,
  amount: number,
  paymentDate: string,
  method: string,
  notes: string,
  recordedAt: string
}
🎨 UI Components
Color Palette
Variable	Color Code	Usage
--navy	#0f2b4a	Sidebar, headers
--accent	#2563eb	Primary buttons, links
--accent2	#f59e0b	Brand accent
--green	#10b981	Success, paid status
--red	#ef4444	Errors, pending dues
--surface	#ffffff	Cards, forms
Status Badges
Status	Badge
Fully Paid	✅ Badge-green
Partial Payment	🟠 Badge-amber
Pending	⚠️ Badge-red
No Plan	⚪ Badge-gray
🚦 Installation & Setup
Prerequisites
Modern web browser (Chrome, Firefox, Edge, Safari)

LocalStorage enabled

Steps
Open Application

Navigate to: file:///C:/Users/Home-PC/Documents/GitHub/BSE-A-038-Mehwish-Web/Fee%20managment%20System/fee-management-system.html

Or open the HTML file in any modern browser

No server setup required

Initial Login

Use admin credentials: admin@edufee.com / admin123

Or register as a new student

📱 Responsive Design
Breakpoint	Layout
> 768px	Full sidebar visible
≤ 768px	Collapsible sidebar with overlay
≤ 480px	Single-column card layout
🔔 Notification System
Triggers
Welcome Message — Account creation

Fee Plan Assignment — When admin assigns a plan

Payment Confirmation — After successful payment

Full Payment — When all installments are paid

Features
Unread notifications badge

Mark all as read functionality

Type-specific icons and colors

📄 Receipt Format
text
╔══════════════════════════════════════════════╗
║               EduFee                         ║
║         Fee Management System                ║
╠══════════════════════════════════════════════╣
║ Receipt No: RCP-00001                        ║
║ Student Name: John Doe                       ║
║ Registration No: STU-0001                    ║
║ Fee Plan: Annual Fee 2024                    ║
║ Installment: 1 of 3                          ║
║ Payment Date: 2024-01-15                     ║
║ Amount Paid: PKR 16,667                      ║
╠══════════════════════════════════════════════╣
║ Total Fee: PKR 50,000                        ║
║ Total Paid: PKR 16,667                       ║
║ Remaining: PKR 33,333                        ║
║                                              ║
║              [PAID STAMP]                    ║
╚══════════════════════════════════════════════╝
🧪 Testing
Admin Flow Testing
Login as admin

Create a fee plan with installments

Add a student

Assign fee plan to student

Record a payment

Verify receipt generation

Check tracking dashboard updates

Student Flow Testing
Register as new student

Login with credentials

View dashboard (should show no plan)

Admin assigns plan

Student views fees and dues

Make payment (admin records or student views)

Download receipt

📈 Database Structure (LocalStorage)
Key	Purpose
ef_users	Store all user accounts
ef_plans	Store fee plans with installments
ef_assignments	Link students to fee plans
ef_payments	Store all payment transactions
ef_notifications	Store system notifications
ef_counter	Auto-increment ID counters
🔧 Customization Guide
Modify Fee Structure
Edit generateInstallmentFields() function to change due date logic

Update createFeePlan() to validate installment amounts

Add Payment Methods
javascript
// In recordPayment() method, add new option:
<option value="Credit Card">Credit Card</option>
Change Currency
Update fmt() function for currency symbol

Replace "PKR" with desired currency code

🐛 Known Limitations
Issue	Workaround
LocalStorage only	No multi-device sync
No email integration	Manual notification sending
No PDF generation	Browser print to PDF
No data export	Manual backup via browser dev tools
🔮 Future Enhancements
Email notification integration

PDF receipt generation

Bulk student import (CSV/Excel)

Payment gateway integration

Advanced analytics and charts

Multi-institution support

Data export functionality

SMS reminders for due dates

Late fee calculation

Scholarship/discount management

📞 Support
For technical support or feature requests:

Documentation: Refer to this README

Issues: Report bugs through repository issues

Email: admin@edufee.com (demo contact)

📝 License
This project is licensed under the MIT License.

🙏 Acknowledgments
Fonts: Google Fonts

Icons: Unicode Consortium

Inspiration: Educational institution fee management requirements

📊 Version History
Version	Date	Changes
1.0.0	2024	Initial release with core features
🔗 Project Link
text
file:///C:/Users/Home-PC/Documents/GitHub/BSE-A-038-Mehwish-Web/Fee%20managment%20System/fee-management-system.html
