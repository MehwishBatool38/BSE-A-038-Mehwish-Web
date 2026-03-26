# MediBook - Hospital Appointment REST API

A simple REST API for managing hospital patients, doctors, and appointments.
Built with **Node.js** and **Express.js**.



## Tech Stack

- Node.js
- Express.js v5
- Postman (for testing)

---

## Installation & Setup

```bash
# Step 1: Install dependencies
npm install

# Step 2: Start server
npm start
```

Server will start at: `http://localhost:3000`

---

## Project Structure

```
medibook-api/
├── server.js        # Main server file
├── package.json     # Dependencies
└── README.md        # Documentation
```

---

## API Endpoints

### Base URL
```
http://localhost:3000
```

---

### Patients

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/patients` | Get all patients |
| GET | `/api/patients/:id` | Get patient by ID |
| POST | `/api/patients` | Register new patient |
| PUT | `/api/patients/:id` | Update patient |
| DELETE | `/api/patients/:id` | Delete patient |

**POST /api/patients — Request Body**
```json
{
  "name": "Usman Raza",
  "email": "usman@gmail.com",
  "phone": "0300-3333333",
  "age": 22
}
```

---

### Doctors

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/doctors` | Get all doctors |
| GET | `/api/doctors/available` | Get available doctors only |
| GET | `/api/doctors/:id` | Get doctor by ID |
| POST | `/api/doctors` | Add new doctor |
| PUT | `/api/doctors/:id` | Update doctor |
| DELETE | `/api/doctors/:id` | Delete doctor |

**POST /api/doctors — Request Body**
```json
{
  "name": "Dr. Zara",
  "specialization": "Dentist",
  "available": true
}
```

---

### Appointments

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/appointments` | Get all appointments |
| GET | `/api/appointments/:id` | Get appointment by ID |
| GET | `/api/appointments/patient/:patientId` | Get patient's appointments |
| POST | `/api/appointments` | Book new appointment |
| PUT | `/api/appointments/:id` | Update appointment |
| DELETE | `/api/appointments/:id` | Cancel appointment |

**POST /api/appointments — Request Body**
```json
{
  "patientId": 1,
  "doctorId": 2,
  "date": "2025-08-15",
  "time": "02:00 PM"
}
```

**Appointment Status Values:** `Scheduled` | `Completed` | `Cancelled`

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (missing/invalid fields) |
| 404 | Not Found |
| 500 | Server Error |

---

## Testing with Postman

1. Run server: `npm start`
2. Open Postman
3. For POST/PUT requests: `Body → raw → JSON`

**Quick Test Order:**
```
1. GET  /                               → Check API is running
2. GET  /api/patients                   → View patients
3. POST /api/patients                   → Add patient
4. GET  /api/doctors/available          → Check doctors
5. POST /api/appointments               → Book appointment
6. GET  /api/appointments               → View bookings
```

---

## Future Improvements

- [ ] MongoDB database
- [ ] JWT Authentication
- [ ] Input validation (express-validator)
- [ ] Cloud deployment (Render / Railway)

---
# MediBook - Hospital Appointment REST API

A simple REST API for managing hospital patients, doctors, and appointments.
Built with **Node.js** and **Express.js**.

---

## Tech Stack

- Node.js
- Express.js v5
- Postman (for testing)

---

## Installation & Setup

```bash
# Step 1: Install dependencies
npm install

# Step 2: Start server
npm start
```

Server will start at: `http://localhost:3000`

---

## Project Structure

```
medibook-api/
├── server.js        # Main server file
├── package.json     # Dependencies
└── README.md        # Documentation
```

---

## API Endpoints

### Base URL
```
http://localhost:3000
```

---

### Patients

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/patients` | Get all patients |
| GET | `/api/patients/:id` | Get patient by ID |
| POST | `/api/patients` | Register new patient |
| PUT | `/api/patients/:id` | Update patient |
| DELETE | `/api/patients/:id` | Delete patient |

**POST /api/patients — Request Body**
```json
{
  "name": "Usman Raza",
  "email": "usman@gmail.com",
  "phone": "0300-3333333",
  "age": 22
}
```

---

### Doctors

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/doctors` | Get all doctors |
| GET | `/api/doctors/available` | Get available doctors only |
| GET | `/api/doctors/:id` | Get doctor by ID |
| POST | `/api/doctors` | Add new doctor |
| PUT | `/api/doctors/:id` | Update doctor |
| DELETE | `/api/doctors/:id` | Delete doctor |

**POST /api/doctors — Request Body**
```json
{
  "name": "Dr. Zara",
  "specialization": "Dentist",
  "available": true
}
```

---

### Appointments

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/appointments` | Get all appointments |
| GET | `/api/appointments/:id` | Get appointment by ID |
| GET | `/api/appointments/patient/:patientId` | Get patient's appointments |
| POST | `/api/appointments` | Book new appointment |
| PUT | `/api/appointments/:id` | Update appointment |
| DELETE | `/api/appointments/:id` | Cancel appointment |

**POST /api/appointments — Request Body**
```json
{
  "patientId": 1,
  "doctorId": 2,
  "date": "2025-08-15",
  "time": "02:00 PM"
}
```

**Appointment Status Values:** `Scheduled` | `Completed` | `Cancelled`

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (missing/invalid fields) |
| 404 | Not Found |
| 500 | Server Error |

---

## Testing with Postman

1. Run server: `npm start`
2. Open Postman
3. For POST/PUT requests: `Body → raw → JSON`

**Quick Test Order:**
```
1. GET  /                               → Check API is running
2. GET  /api/patients                   → View patients
3. POST /api/patients                   → Add patient
4. GET  /api/doctors/available          → Check doctors
5. POST /api/appointments               → Book appointment
6. GET  /api/appointments               → View bookings
```

---

## Future Improvements

- [ ] MongoDB database
- [ ] JWT Authentication
- [ ] Input validation (express-validator)
- [ ] Cloud deployment (Render / Railway)

---
##screenshots
<img width="1366" height="768" alt="{FBD1BA0B-86E6-47AA-BCA9-5F3D939C7234}" src="https://github.com/user-attachments/assets/b4178872-b0f3-4eb9-9638-c60c0034343e" />

<img width="1366" height="768" alt="{BBE70D61-5D3F-482A-A038-AB5F0E88EE17}" src="https://github.com/user-attachments/assets/99be1f07-c645-41fe-9acb-a3b7fa6fa318" />

<img width="1366" height="768" alt="{E05720B1-2DF8-4AB4-AE7C-98546DB1DA63}" src="https://github.com/user-attachments/assets/83311b98-2774-403e-9322-98be2cb033b9" />

<img width="1366" height="768" alt="{D91D999C-04D3-416D-9AD1-1A98F478BFB9}" src="https://github.com/user-attachments/assets/7c668a3d-2856-46f4-a1a0-fffd5b733008" />

<img width="1366" height="768" alt="{5182CB87-72CC-4FAB-B98A-B83513419C49}" src="https://github.com/user-attachments/assets/6fbd209d-9977-4863-b1fd-cc8ca0f085a5" />
