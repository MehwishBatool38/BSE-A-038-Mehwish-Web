<div align="center">

# 🏥 MediBook
### Hospital Appointment REST API

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express.js-v5.2-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/REST-API-FF6C37?style=for-the-badge&logo=postman&logoColor=white"/>
  <img src="https://img.shields.io/badge/License-ISC-blue?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge"/>
</p>

<p align="center">
  A clean, lightweight, and production-ready REST API for managing<br/>
  hospital patients, doctors, and appointments.
</p>

<p align="center">
  <a href="#-overview">Overview</a> &nbsp;•&nbsp;
  <a href="#-features">Features</a> &nbsp;•&nbsp;
  <a href="#-quick-start">Quick Start</a> &nbsp;•&nbsp;
  <a href="#-api-reference">API Reference</a> &nbsp;•&nbsp;
  <a href="#-testing">Testing</a> &nbsp;•&nbsp;
  <a href="#-roadmap">Roadmap</a>
</p>

---

</div>

## 📋 Overview

**MediBook** is a RESTful backend API that solves the real-world problem of manual hospital appointment management. It eliminates paperwork, prevents double-bookings, and provides a structured digital system for clinics and hospitals.

```
Client (Postman / Frontend)
        ↓  HTTP Request
   Express Router
        ↓  Route Handler
   Business Logic + Validation
        ↓  Read / Write
   In-Memory Database (Arrays)
        ↓  JSON Response
Client receives structured data ✅
```

> **Designed for:** Computer Science students, junior developers, and small clinics needing a lightweight backend system.

---

## ✨ Features

- 🧑‍⚕️ **Patient Management** — Full CRUD for patient records
- 👨‍⚕️ **Doctor Management** — Manage profiles with availability toggle
- 📅 **Appointment Booking** — Smart booking with multi-layer validation
- 🔍 **Filter & Search** — Available doctors, patient-wise appointments
- ✅ **Input Validation** — Required field checks with clear error messages
- 🚦 **HTTP Status Codes** — Proper 200, 201, 400, 404 responses
- 📦 **JSON Format** — Clean, consistent response structure throughout

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js v18+ |
| Framework | Express.js v5.2 |
| Data Storage | In-Memory (Arrays) |
| API Testing | Postman |
| Package Manager | npm |

---

## ⚡ Quick Start

### Prerequisites

- [Node.js](https://nodejs.org) — v14 or higher
- [Postman](https://www.postman.com/downloads) — for testing

---

### Step-by-Step Setup

**1. Project folder banao**
```bash
mkdir medibook-api
cd medibook-api
```

**2. Files paste karo**
```
medibook-api/
  ├── server.js
  └── package.json
```

**3. Dependencies install karo**
```bash
npm install
```

**4. Server start karo**
```bash
npm start
# or
node server.js
```

**5. Confirm karo**
```
MediBook Hospital API running on http://localhost:3000
```

> 🎉 API is now live at `http://localhost:3000`

---

## 📁 Project Structure

```
medibook-api/
│
├── 📄 server.js            ← Main server (all routes + logic)
├── 📄 package.json         ← Project info & dependencies
├── 📄 package-lock.json    ← Locked dependency versions
├── 📄 README.md            ← Project documentation
└── 📦 node_modules/        ← Installed packages (auto-generated)
```

---

## 🔗 API Reference

### 🌐 Base URL
```
http://localhost:3000
```

---

### 🏠 Root Endpoint

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/` | API info + available endpoints |

**Response**
```json
{
  "message": "Welcome to MediBook Hospital API 🏥",
  "endpoints": {
    "patients":     "/api/patients",
    "doctors":      "/api/doctors",
    "appointments": "/api/appointments"
  }
}
```

---

### 👤 Patients

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/patients` | Get all patients |
| `GET` | `/api/patients/:id` | Get patient by ID |
| `POST` | `/api/patients` | Register new patient |
| `PUT` | `/api/patients/:id` | Update patient info |
| `DELETE` | `/api/patients/:id` | Delete patient |

#### GET `/api/patients`
```json
// Response 200 OK
[
  { "id": 1, "name": "Ali Khan",   "email": "ali@gmail.com",  "phone": "0300-1111111", "age": 25 },
  { "id": 2, "name": "Sara Ahmed", "email": "sara@gmail.com", "phone": "0300-2222222", "age": 30 }
]
```

#### GET `/api/patients/:id`
```json
// Response 200 OK
{ "id": 1, "name": "Ali Khan", "email": "ali@gmail.com", "phone": "0300-1111111", "age": 25 }

// Response 404 Not Found
{ "message": "Patient not found" }
```

#### POST `/api/patients`
```json
// Request Body (required: name, email, phone, age)
{
  "name":  "Usman Raza",
  "email": "usman@gmail.com",
  "phone": "0300-3333333",
  "age":   22
}

// Response 201 Created
{
  "message": "Patient registered successfully",
  "patient": { "id": 3, "name": "Usman Raza", "email": "usman@gmail.com", "phone": "0300-3333333", "age": 22 }
}

// Response 400 Bad Request (missing fields)
{ "message": "All fields required: name, email, phone, age" }
```

#### PUT `/api/patients/:id`
```json
// Request Body (all fields optional — partial update supported)
{
  "name":  "Usman Raza Updated",
  "phone": "0300-9999999"
}

// Response 200 OK
{ "message": "Patient updated", "patient": { "id": 3, "name": "Usman Raza Updated", ... } }
```

#### DELETE `/api/patients/:id`
```json
// Response 200 OK
{ "message": "Patient deleted successfully" }

// Response 404 Not Found
{ "message": "Patient not found" }
```

---

### 🩺 Doctors

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/doctors` | Get all doctors |
| `GET` | `/api/doctors/available` | Get only available doctors |
| `GET` | `/api/doctors/:id` | Get doctor by ID |
| `POST` | `/api/doctors` | Add new doctor |
| `PUT` | `/api/doctors/:id` | Update doctor info |
| `DELETE` | `/api/doctors/:id` | Delete doctor |

#### GET `/api/doctors`
```json
// Response 200 OK
[
  { "id": 1, "name": "Dr. Ayesha", "specialization": "Cardiologist",  "available": true  },
  { "id": 2, "name": "Dr. Bilal",  "specialization": "Neurologist",   "available": true  },
  { "id": 3, "name": "Dr. Fatima", "specialization": "Dermatologist", "available": false }
]
```

#### GET `/api/doctors/available`
```json
// Response 200 OK — only available: true doctors
[
  { "id": 1, "name": "Dr. Ayesha", "specialization": "Cardiologist", "available": true },
  { "id": 2, "name": "Dr. Bilal",  "specialization": "Neurologist",  "available": true }
]
```

#### POST `/api/doctors`
```json
// Request Body (required: name, specialization)
{
  "name":           "Dr. Zara",
  "specialization": "Dentist",
  "available":      true
}

// Response 201 Created
{
  "message": "Doctor added successfully",
  "doctor": { "id": 4, "name": "Dr. Zara", "specialization": "Dentist", "available": true }
}
```

#### PUT `/api/doctors/:id`
```json
// Request Body — toggle availability or update info
{
  "available": false
}

// Response 200 OK
{ "message": "Doctor updated", "doctor": { "id": 1, "available": false, ... } }
```

---

### 📅 Appointments

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/appointments` | Get all appointments |
| `GET` | `/api/appointments/:id` | Get appointment by ID |
| `GET` | `/api/appointments/patient/:patientId` | Get all appointments of a patient |
| `POST` | `/api/appointments` | Book new appointment |
| `PUT` | `/api/appointments/:id` | Update appointment |
| `DELETE` | `/api/appointments/:id` | Cancel appointment |

#### GET `/api/appointments`
```json
// Response 200 OK
[
  { "id": 1, "patientId": 1, "doctorId": 1, "date": "2025-07-10", "time": "10:00 AM", "status": "Scheduled" },
  { "id": 2, "patientId": 2, "doctorId": 2, "date": "2025-07-11", "time": "11:00 AM", "status": "Scheduled" }
]
```

#### GET `/api/appointments/patient/:patientId`
```json
// Response 200 OK — all appointments for patient ID 1
[
  { "id": 1, "patientId": 1, "doctorId": 1, "date": "2025-07-10", "time": "10:00 AM", "status": "Scheduled" }
]
```

#### POST `/api/appointments`
```json
// Request Body (required: patientId, doctorId, date, time)
{
  "patientId": 1,
  "doctorId":  2,
  "date":      "2025-08-15",
  "time":      "02:00 PM"
}

// Response 201 Created
{
  "message":     "Appointment booked successfully",
  "appointment": { "id": 3, "patientId": 1, "doctorId": 2, "date": "2025-08-15", "time": "02:00 PM", "status": "Scheduled" },
  "patientName": "Ali Khan",
  "doctorName":  "Dr. Bilal"
}

// Validation Errors:
// 404 → Patient not found
// 404 → Doctor not found
// 400 → Doctor is not available
```

#### PUT `/api/appointments/:id`
```json
// Request Body — update date, time, or status
{
  "date":   "2025-09-01",
  "time":   "03:00 PM",
  "status": "Completed"
}
```

> **Appointment Status Values:** `Scheduled` | `Completed` | `Cancelled`

#### DELETE `/api/appointments/:id`
```json
// Response 200 OK
{ "message": "Appointment cancelled successfully" }
```

---

## 📊 HTTP Status Codes Reference

| Code | Status | When Used |
|------|--------|-----------|
| `200` | ✅ OK | Successful GET, PUT, DELETE |
| `201` | ✅ Created | Resource successfully created via POST |
| `400` | ❌ Bad Request | Missing fields or invalid input |
| `404` | ❌ Not Found | Requested resource does not exist |
| `500` | ❌ Internal Server Error | Unexpected server-side failure |

---

## 🧪 Testing with Postman

### Setup
1. Download → [postman.com/downloads](https://www.postman.com/downloads)
2. Start server: `npm start`
3. Open Postman → New Request

### For POST / PUT Requests
```
Body → raw → JSON
```

### Recommended Test Sequence

```
1. GET   http://localhost:3000/                              → Root check
2. GET   http://localhost:3000/api/patients                  → View all patients
3. POST  http://localhost:3000/api/patients                  → Add new patient
4. GET   http://localhost:3000/api/doctors/available         → Check available doctors
5. POST  http://localhost:3000/api/appointments              → Book appointment
6. GET   http://localhost:3000/api/appointments              → Verify booking
7. PUT   http://localhost:3000/api/appointments/1            → Update status
8. GET   http://localhost:3000/api/appointments/patient/1    → Patient history
```

---

## 📌 All Endpoints — Quick Reference

```
GET     /                                       API root info

GET     /api/patients                           All patients
GET     /api/patients/:id                       Single patient
POST    /api/patients                           Register patient
PUT     /api/patients/:id                       Update patient
DELETE  /api/patients/:id                       Delete patient

GET     /api/doctors                            All doctors
GET     /api/doctors/available                  Available doctors only
GET     /api/doctors/:id                        Single doctor
POST    /api/doctors                            Add doctor
PUT     /api/doctors/:id                        Update doctor
DELETE  /api/doctors/:id                        Delete doctor

GET     /api/appointments                       All appointments
GET     /api/appointments/:id                   Single appointment
GET     /api/appointments/patient/:patientId    Patient's appointments
POST    /api/appointments                       Book appointment
PUT     /api/appointments/:id                   Update appointment
DELETE  /api/appointments/:id                   Cancel appointment
```

---

## 🚀 Roadmap

- [x] Patient CRUD operations
- [x] Doctor CRUD with availability
- [x] Appointment booking with multi-layer validation
- [x] Proper HTTP status codes
- [ ] MongoDB / Mongoose database integration
- [ ] JWT Authentication & Role-based Authorization
- [ ] Input validation with `express-validator`
- [ ] Password hashing with `bcrypt`
- [ ] API rate limiting with `express-rate-limit`
- [ ] Swagger / OpenAPI auto-documentation
- [ ] Unit testing with Jest
- [ ] Docker containerization
- [ ] Cloud deployment on Render / Railway

---

## 📄 License

This project is licensed under the **ISC License** — free to use, modify, and distribute.

---

<div align="center">

**MediBook Hospital API**

Built with ❤️ using **Node.js** + **Express.js**

⭐ *Star this repo if it helped you!*

</div>
