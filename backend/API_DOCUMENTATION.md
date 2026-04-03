# API Documentation

## Base URL
All endpoints are prefixed with `/api`

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Auth Endpoints

#### Register User
- **POST** `/auth/register`
- **Body:**
```json
{
  "name": "Ahmed Ali",
  "email": "ahmed@example.com",
  "phone": "+1234567890",
  "password": "securePassword123",
  "role": "student" // admin (not allowed), staff, parent, student
}
```
- **Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Ahmed Ali",
    "email": "ahmed@example.com",
    "role": "student"
  }
}
```

#### Login
- **POST** `/auth/login`
- **Body:**
```json
{
  "email": "ahmed@example.com",
  "password": "securePassword123"
}
```
- **Response:** Same as register

#### Get Profile
- **GET** `/auth/profile`
- **Headers:** Requires JWT token
- **Response:**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Ahmed Ali",
    "email": "ahmed@example.com",
    "phone": "+1234567890",
    "role": "student",
    "studentId": null,
    "teacherId": "507f1f77bcf86cd799439012"
  }
}
```

---

## User Management Endpoints (Admin Only)

#### Get Users by Role
- **GET** `/users?role=student`
- **Query Params:** `role` (optional) - admin, staff, parent, student
- **Response:**
```json
{
  "count": 5,
  "users": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Ahmed Ali",
      "email": "ahmed@example.com",
      "phone": "+1234567890",
      "role": "student",
      "createdAt": "2025-04-03T10:00:00Z"
    }
  ]
}
```

#### Get All Staff
- **GET** `/users/staff`

#### Get All Students
- **GET** `/users/students`

#### Get All Parents
- **GET** `/users/parents`

#### Get User by ID
- **GET** `/users/:id`

#### Delete User
- **DELETE** `/users/:id`
- **Admin only**

#### Assign Teacher to Student
- **POST** `/users/assign-teacher`
- **Admin only**
- **Body:**
```json
{
  "studentId": "507f1f77bcf86cd799439011",
  "teacherId": "507f1f77bcf86cd799439012"
}
```

#### Link Parent to Student
- **POST** `/users/link-parent`
- **Admin only**
- **Body:**
```json
{
  "parentId": "507f1f77bcf86cd799439013",
  "studentId": "507f1f77bcf86cd799439011"
}
```

---

## Student Records Endpoints

#### Create Student Record
- **POST** `/records`
- **Staff only**
- **Body:**
```json
{
  "studentId": "507f1f77bcf86cd799439011",
  "date": "2025-04-03",
  "surah": "Al-Fatiha",
  "ayahFrom": 1,
  "ayahTo": 7,
  "grade": "A+",
  "remarks": "Excellent recitation",
  "signature": "Teacher Name"
}
```
- **Response:**
```json
{
  "message": "Student record created successfully",
  "record": {
    "_id": "507f1f77bcf86cd799439020",
    "studentId": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Ahmed Ali",
      "email": "ahmed@example.com"
    },
    "staffId": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Teacher Name",
      "email": "teacher@example.com"
    },
    "date": "2025-04-03T00:00:00Z",
    "surah": "Al-Fatiha",
    "ayahFrom": 1,
    "ayahTo": 7,
    "grade": "A+",
    "remarks": "Excellent recitation",
    "signature": "Teacher Name",
    "status": "pending"
  }
}
```

#### Get Student Records
- **GET** `/records/student/:studentId`
- **Query Params:**
  - `startDate` (optional) - YYYY-MM-DD
  - `endDate` (optional) - YYYY-MM-DD
- **Response:**
```json
{
  "count": 10,
  "records": [
    { /* record objects */ }
  ]
}
```

#### Get Staff Records
- **GET** `/records/staff/records`
- **Staff only - gets own records**

#### Update Record
- **PUT** `/records/:id`
- **Staff and Admin**
- **Body:** Any fields to update (same as create)

#### Delete Record
- **DELETE** `/records/:id`

#### Get Pending Records
- **GET** `/records/pending`
- **Admin only**

#### Approve Record
- **PUT** `/records/approve/:id`
- **Admin only**
- **Response:** Updated record with status "approved"

---

## Weekly Summary Endpoints

#### Create Weekly Summary
- **POST** `/summaries`
- **Staff and Admin**
- **Body:**
```json
{
  "studentId": "507f1f77bcf86cd799439011",
  "week": 1,
  "year": 2025,
  "startDate": "2025-03-31",
  "endDate": "2025-04-06",
  "surahFrom": "Al-Fatiha",
  "ayahFromStart": 1,
  "surahTo": "Al-Baqarah",
  "ayahToEnd": 50,
  "totalPages": 5
}
```
- **Response:**
```json
{
  "message": "Weekly summary created successfully",
  "summary": {
    "_id": "507f1f77bcf86cd799439030",
    "studentId": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Ahmed Ali"
    },
    "week": 1,
    "year": 2025,
    "surahFrom": "Al-Fatiha",
    "ayahFromStart": 1,
    "surahTo": "Al-Baqarah",
    "ayahToEnd": 50,
    "totalPages": 5,
    "averageGrade": "A",
    "recordIds": []
  }
}
```

#### Get Student Weekly Summaries
- **GET** `/summaries/student/:studentId`
- **Query Params:**
  - `week` (optional)
  - `year` (optional)

#### Get All Weekly Summaries
- **GET** `/summaries`
- **Admin only**

#### Update Weekly Summary
- **PUT** `/summaries/:id`
- **Staff and Admin**

#### Delete Weekly Summary
- **DELETE** `/summaries/:id`
- **Staff and Admin**

---

## Error Responses

All error responses follow this format:

```json
{
  "message": "Error description"
}
```

### Status Codes
- **200**: Success
- **201**: Created
- **400**: Bad Request (validation error)
- **401**: Unauthorized (missing/invalid token)
- **403**: Forbidden (insufficient permissions)
- **404**: Not Found
- **409**: Conflict (duplicate email)
- **500**: Server Error

---

## Examples

### User Registration Flow
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ahmed Ali",
    "email": "ahmed@example.com",
    "phone": "+1234567890",
    "password": "securePassword123",
    "role": "student"
  }'
```

### Creating a Record as Staff
```bash
curl -X POST http://localhost:5000/api/records \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "studentId": "507f1f77bcf86cd799439011",
    "date": "2025-04-03",
    "surah": "Al-Fatiha",
    "ayahFrom": 1,
    "ayahTo": 7,
    "grade": "A+",
    "remarks": "Excellent recitation"
  }'
```

### Getting Student Records as Parent
```bash
curl -X GET http://localhost:5000/api/records/student/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer <token>"
```
