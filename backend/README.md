# Islamiyya School Management System - Backend

This is the backend API server for the Islamiyya School Management System built with Node.js, Express, and MongoDB.

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create .env file:**
   Copy `.env.example` to `.env` and update with your configuration:
   ```bash
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/islamiyya_school
   JWT_SECRET=your_secure_jwt_secret_here
   NODE_ENV=development
   ```

3. **Start the server:**
   - **Development mode (with auto-reload):**
     ```bash
     npm run dev
     ```
   - **Production mode:**
     ```bash
     npm start
     ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile (requires auth)

### Users Management
- `GET /api/users` - Get users by role (admin only)
- `GET /api/users/staff` - Get all staff (admin only)
- `GET /api/users/students` - Get all students (admin only)
- `GET /api/users/parents` - Get all parents (admin only)
- `POST /api/users/assign-teacher` - Assign teacher to student (admin only)
- `POST /api/users/link-parent` - Link parent to student (admin only)
- `GET /api/users/:id` - Get user by ID
- `DELETE /api/users/:id` - Delete user (admin only)

### Student Records
- `POST /api/records` - Create new record (staff only)
- `GET /api/records/staff/records` - Get all records created by staff
- `GET /api/records/student/:studentId` - Get records for a student
- `PUT /api/records/:id` - Update a record
- `DELETE /api/records/:id` - Delete a record
- `GET /api/records/pending` - Get pending records (admin only)
- `PUT /api/records/approve/:id` - Approve a record (admin only)

### Weekly Summaries
- `POST /api/summaries` - Create weekly summary
- `GET /api/summaries/student/:studentId` - Get summaries for a student
- `GET /api/summaries` - Get all summaries (admin only)
- `PUT /api/summaries/:id` - Update a summary
- `DELETE /api/summaries/:id` - Delete a summary

## Database Schema

### Users Collection
- name, email, phone, password (hashed), role, isActive, studentId, teacherId

### Student Records Collection
- studentId, staffId, date, surah, ayahFrom, ayahTo, grade, remarks, signature, status

### Weekly Summary Collection
- studentId, week, year, startDate, endDate, surahFrom, ayahFromStart, surahTo, ayahToEnd, totalPages, averageGrade, recordIds
