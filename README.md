🏥 MediBook — Hospital Appointment REST API
A complete REST API for managing hospital appointments, built with Node.js and Express.js.

📌 Table of Contents

Project Overview
Tech Stack
Installation & Setup
Project Structure
API Endpoints

Patients
Doctors
Appointments


Sample Request & Response
HTTP Status Codes
Testing with Postman
Author


📖 Project Overview
MediBook is a Hospital Appointment Management REST API that allows:

✅ Patient registration and management
✅ Doctor listing and availability check
✅ Appointment booking, updating, and cancellation
✅ Full CRUD operations on all resources
✅ Input validation and proper error handling


🛠 Tech Stack
TechnologyPurposeNode.jsBackend runtimeExpress.jsWeb frameworkPostmanAPI testing

⚙️ Installation & Setup
Step 1 — Node.js Install Karo
Download from: https://nodejs.org (LTS version)
Step 2 — Project Folder Banao
mkdir medibook-api
cd medibook-api
Step 3 — server.js File Paste Karo
medibook-api/
  └── server.js
Step 4 — Dependencies Install Karo
bashnpm init -y
npm install express
Step 5 — Server Run Karo
bashnode server.js
Step 6 — Confirm Karo
Terminal mein yeh message aana chahiye:
MediBook Hospital API running on http://localhost:3000

📁 Project Structure
medibook-api/
│
├── server.js          # Main server file (all routes)
├── package.json       # Project info & dependencies
└── node_modules/      # Installed packages

🔗 API Endpoints
Base URL
http://localhost:3000

👨‍⚕️ Patients
MethodEndpointDescriptionGET/api/patientsSab patients ki listGET/api/patients/:idEk patient ID sePOST/api/patientsNaya patient register karoPUT/api/patients/:idPatient info update karoDELETE/api/patients/:idPatient delete karo

🩺 Doctors
MethodEndpointDescriptionGET/api/doctorsSab doctors ki listGET/api/doctors/availableSirf available doctorsGET/api/doctors/:idEk doctor ID sePOST/api/doctorsNaya doctor add karoPUT/api/doctors/:idDoctor info update karoDELETE/api/doctors/:idDoctor delete karo

📅 Appointments
MethodEndpointDescriptionGET/api/appointmentsSab appointmentsGET/api/appointments/:idEk appointment ID seGET/api/appointments/patient/:patientIdPatient ki sab appointmentsPOST/api/appointmentsNaya appointment book karoPUT/api/appointments/:idAppointment update karoDELETE/api/appointments/:idAppointment cancel karo

📝 Sample Request & Response
✅ POST — Naya Patient Register
Request:
POST http://localhost:3000/api/patients
Content-Type: application/json
json{
  "name": "Usman Raza",
  "email": "usman@gmail.com",
  "phone": "0300-3333333",
  "age": 22
}
Response (201 Created):
json{
  "message": "Patient registered successfully",
  "patient": {
    "id": 3,
    "name": "Usman Raza",
    "email": "usman@gmail.com",
    "phone": "0300-3333333",
    "age": 22
  }
}

✅ POST — Appointment Book Karo
Request:
POST http://localhost:3000/api/appointments
Content-Type: application/json
json{
  "patientId": 1,
  "doctorId": 2,
  "date": "2025-08-15",
  "time": "02:00 PM"
}
Response (201 Created):
json{
  "message": "Appointment booked successfully",
  "appointment": {
    "id": 3,
    "patientId": 1,
    "doctorId": 2,
    "date": "2025-08-15",
    "time": "02:00 PM",
    "status": "Scheduled"
  },
  "patientName": "Ali Khan",
  "doctorName": "Dr. Bilal"
}

❌ Error Response Example
Request: Patient not found
json{
  "message": "Patient not found"
}

📊 HTTP Status Codes
CodeMeaningKab Use Hota Hai200OKSuccessful GET, PUT, DELETE201CreatedSuccessful POST400Bad RequestMissing fields ya invalid data404Not FoundResource exist nahi karta500Server ErrorInternal server problem

🧪 Testing with Postman

Postman download karo: https://www.postman.com/downloads
Server run karo: node server.js
Postman open karo
Method select karo (GET / POST / PUT / DELETE)
URL enter karo: http://localhost:3000/api/...
POST/PUT ke liye: Body → raw → JSON select karo
Send button dabao


🚀 Future Improvements

 MongoDB database integration
 JWT Authentication add karna
 Input validation (express-validator)
 Password hashing (bcrypt)
 API rate limiting
 Cloud deployment (Render / Railway)


👩‍💻 Author
MediBook Hospital API
Built with ❤️ using Node.js + Express.js
