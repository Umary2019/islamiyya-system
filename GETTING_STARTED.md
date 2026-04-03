# GETTING STARTED GUIDE

This guide will help you set up and run the complete Islamiyya School Management System.

## Prerequisites

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (local or MongoDB Atlas cloud) - [Download](https://www.mongodb.com/try/download/community) or [Signup](https://www.mongodb.com/cloud/atlas)
- **Git** (optional, for version control)
- **Terminal/Command Prompt**

## Step 1: Get the Code

If using Git:
```bash
git clone <repository-url>
cd Ahmad\ Taraba
```

Or download and extract the project files.

## Step 2: Setup MongoDB

### Option A: Local MongoDB
1. Download and install MongoDB Community Edition
2. Start MongoDB service:
   - **Windows**: MongoDB runs as a service
   - **Mac**: `brew services start mongodb-community`
   - **Linux**: `sudo systemctl start mongod`

### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/islamiyya_school`

## Step 3: Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

### Configure .env file

Open `backend/.env` and update:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/islamiyya_school
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/islamiyya_school

JWT_SECRET=your_super_secret_key_change_this_in_production_12345
NODE_ENV=development
```

**Important**: Change `JWT_SECRET` to a strong random string.

### Start Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# OR production mode
npm start
```

You should see:
```
MongoDB Connected: localhost
Server running on port 5000
```

✅ **Backend is ready!** Keep this terminal open.

## Step 4: Setup Frontend

Open a **new terminal window** and:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

You should see:
```
  VITE v4.3.9  ready in XXX ms

  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
```

✅ **Frontend is ready!** Keep this terminal open.

## Step 5: Access the System

Open your browser and go to:
```
http://localhost:3000
```

You should see the beautiful landing page! 🎉

## Step 6: Create Test Data

### Create Admin User (via Database)

MongoDB will create the admin automatically. For your first admin, you can manually insert one:

```javascript
// In MongoDB (using MongoDB Compass or Atlas):
db.users.insertOne({
  name: "Admin User",
  email: "admin@example.com",
  phone: "+1234567890",
  password: "$2a$10$...", // Use a hashed password (or register as another role first)
  role: "admin",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

**OR** - Register as a regular user first, then manually change their role in the database.

### Register Test Users

1. Go to http://localhost:3000
2. Click on "Staff/Teacher" card
3. Click "Register"
4. Fill in the form:
   - **Name**: Test Teacher
   - **Email**: teacher@example.com
   - **Phone**: +1234567890
   - **Password**: password123
5. Submit

Repeat for:
- Student: student@example.com
- Parent: parent@example.com
- More staff/students as needed

## Step 7: Test the System

### As Admin
1. Login with admin credentials
2. Navigate to "Link Parent" tab
3. Select a parent and student to link them
4. Assign a teacher to a student

### As Teacher
1. Login as staff
2. Go to "Create Record"
3. Fill in student memorization details:
   - Select a student
   - Choose date
   - Enter Surah (e.g., "Al-Fatiha")
   - Ayah range (e.g., 1 to 7)
   - Grade (A+, A, B, etc.)
4. Submit

### As Student
1. Login as student
2. View your daily records (created by teacher)
3. View performance metrics

### As Parent
1. Login as parent
2. See your linked child's progress
3. View performance alerts

## Troubleshooting

### Port Already in Use
If you get "port 5000 already in use":
```bash
# Find the process using the port
lsof -i :5000

# Kill the process
kill -9 <PID>
```

### MongoDB Connection Error
- Ensure MongoDB is running
- Check the connection string in .env
- For MongoDB Atlas, make sure your IP is whitelisted

### Backend API Not Connecting
- Ensure backend is running on port 5000
- Check console for errors
- Verify CORS is enabled in backend

### CORS Error
- Make sure backend is running first
- Check that frontend proxy is configured (vite.config.js)

### Blank Landing Page
- Check browser console for errors (F12)
- Ensure both servers are running
- Clear cache and reload

## Useful Commands

### Backend
```bash
cd backend

# Development (auto-reload on changes)
npm run dev

# Production
npm start

# Check if MongoDB is connected
# Look for "MongoDB Connected: ..." message
```

### Frontend
```bash
cd frontend

# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Database
```bash
# Using MongoDB shell
mongo

# List databases
show databases

# Use the database
use islamiyya_school

# List collections
show collections

# Check users
db.users.find()

# Clear all data (careful!)
db.users.deleteMany({})
db.records.deleteMany({})
db.weeklySummaries.deleteMany({})
```

## File Locations

- **Backend source**: `/backend`
- **Frontend source**: `/frontend/src`
- **Backend config**: `/backend/.env`
- **API endpoints**: `http://localhost:5000/api`
- **Frontend**: `http://localhost:3000`

## Next Steps

1. ✅ Run the system
2. ✅ Test all user roles
3. ✅ Check the API documentation: `backend/API_DOCUMENTATION.md`
4. ✅ Customize branding and colors
5. ✅ Deploy to production (AWS, Heroku, DigitalOcean, etc.)

## Project Documentation

- **Main README**: `./README.md`
- **Backend README**: `./backend/README.md`
- **Frontend README**: `./frontend/README.md`
- **API Documentation**: `./backend/API_DOCUMENTATION.md`

## Support & Next Steps

- For API details, see `backend/API_DOCUMENTATION.md`
- For database schema details, see `backend/README.md`
- For component documentation, check `frontend/README.md`

---

**Everything set up? Great! Start contributing! 🚀**
