# Islamiyya School Management System

A comprehensive full-stack application for managing Islamiyya school operations, with specialized features for monitoring students' Qur'anic memorization (Hifz) and tracking staff activities.

## 📋 Project Overview

This system provides role-based dashboards for four user types:
- **Admin**: System management, approvals, and analytics
- **Staff/Teachers**: Record student progress and create weekly reports
- **Students**: View personal progress and daily records
- **Parents/Guardians**: Monitor child's development

## 🛠️ Tech Stack

### Backend
- **Framework**: Node.js with Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing
- **Validation**: express-validator

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Date Handling**: date-fns

## 📁 Project Structure

```
islamiyya-school/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── User.js
│   │   ├── StudentRecord.js
│   │   └── WeeklySummary.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── recordController.js
│   │   └── summaryController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── recordRoutes.js
│   │   └── summaryRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── RolePage.jsx
│   │   │   ├── LoginRegisterPage.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── StaffDashboard.jsx
│   │   │   ├── StudentDashboard.jsx
│   │   │   └── ParentDashboard.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── .gitignore
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud instance)
- Git

### Backend Setup

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file:**
   ```bash
   cp .env.example .env
   ```
   
   Update the values:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/islamiyya_school
   JWT_SECRET=your_super_secret_jwt_key_change_in_production
   NODE_ENV=development
   ```

4. **Start MongoDB** (if using local):
   ```bash
   mongod
   ```

5. **Start the server:**
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:3000`

## 📚 Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  phone: String,
  password: String (hashed),
  role: String (admin, staff, parent, student),
  isActive: Boolean,
  studentId: ObjectId (for parents),
  teacherId: ObjectId (for students),
  timestamps: { createdAt, updatedAt }
}
```

### StudentRecord Model
```javascript
{
  studentId: ObjectId,
  staffId: ObjectId,
  date: Date,
  surah: String,
  ayahFrom: Number,
  ayahTo: Number,
  grade: String (A+, A, A-, B+, B, B-, C+, C, C-, D, F),
  remarks: String,
  signature: String,
  status: String (pending, approved, rejected),
  timestamps: { createdAt, updatedAt }
}
```

### WeeklySummary Model
```javascript
{
  studentId: ObjectId,
  week: Number,
  year: Number,
  startDate: Date,
  endDate: Date,
  surahFrom: String,
  ayahFromStart: Number,
  surahTo: String,
  ayahToEnd: Number,
  totalPages: Number,
  averageGrade: String,
  recordIds: [ObjectId],
  timestamps: { createdAt, updatedAt }
}
```

## 🔐 Authentication & Authorization

- **JWT-based**: Secure token-based authentication
- **Role-based access control**: Different permissions for each role
- **Protected routes**: Frontend routes validate user roles
- **Password security**: Passwords are hashed using bcryptjs with salt rounds

## 📊 Key Features

### Admin Dashboard
- ✅ View all staff, students, and parents
- ✅ Manage user relationships (assign teachers, link parents)
- ✅ Approve student records
- ✅ View system analytics and statistics
- ✅ Monitor pending records

### Staff/Teacher Dashboard
- ✅ Record daily student memorization
- ✅ Input structured data: Date, Student, Surah, Ayah range, Grade
- ✅ Add remarks and signature
- ✅ Create weekly summaries
- ✅ View and edit own records
- ✅ Track weekly progress (pages, surahs)

### Student Dashboard
- ✅ View daily recitation records
- ✅ See weekly summaries
- ✅ Monitor performance metrics
- ✅ View assigned teacher information
- ✅ Track grades and progress

### Parent/Guardian Dashboard
- ✅ Monitor child's daily progress
- ✅ View weekly summaries
- ✅ Receive performance alerts
- ✅ See grades and performance analysis
- ✅ Track child's teacher assignment

## 🔗 API Endpoints

See [backend/README.md](backend/README.md) for complete API documentation.

### Quick Reference
- **Auth**: `/api/auth/register`, `/api/auth/login`, `/api/auth/profile`
- **Users**: `/api/users/*` (admin only)
- **Records**: `/api/records/*` (staff create, others view)
- **Summaries**: `/api/summaries/*` (staff create, all view own)

## 🎨 UI/UX Features

- **Modern design** with green and blue color scheme (Islamic theme)
- **Responsive layout** works on mobile, tablet, and desktop
- **Card-based components** for easy navigation
- **Data tables** with sorting and filtering
- **Form validation** for data integrity
- **Clear error messages** and success notifications
- **Accessible navigation** with intuitive role selection

## ✨ Best Practices

- ✅ Clean code architecture (MVC pattern)
- ✅ Proper separation of concerns
- ✅ Reusable React components
- ✅ Context API for state management
- ✅ Protected routes and authorization
- ✅ Error handling and validation
- ✅ Environment-based configuration
- ✅ RESTful API design

## 📝 Example Workflow

### 1. Admin Setup
1. Login as admin (pre-created)
2. Register staff and students
3. Link teachers to students
4. Link parents to their children

### 2. Staff Recording
1. Login to staff dashboard
2. Create daily records for students
3. Input: Date, Surah, Ayah range, Grade
4. Create weekly summaries

### 3. Student View
1. Login to student dashboard
2. See daily records created by teacher
3. View weekly summaries
4. Monitor performance trends

### 4. Parent Monitoring
1. Login to parent dashboard
2. See child's daily records
3. Read weekly summaries
4. Get performance alerts

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in .env
- Verify database existence

### Port Already in Use
```bash
# Change port in .env or kill process
lsof -i :5000
kill -9 <PID>
```

### CORS Issues
- Check that backend is running on port 5000
- Verify frontend proxy configuration
- Check CORS settings in app.js

## 📈 Future Enhancements

- Add email notifications for parents
- Implement SMS alerts
- Add bulk record import
- Generate PDF reports
- Export to Excel
- Mobile app version
- Advanced analytics dashboard
- Student peer comparison (anonymous)
- Remedial tracking system
- Parent-teacher messaging

## 📄 License

This project is open source and available under the MIT License.

## 👥 Support

For technical support or questions, please contact the development team.

---

**Built with ❤️ for Islamic Education**
