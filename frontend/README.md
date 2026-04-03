# Frontend README

A modern React-based frontend for the Islamiyya School Management System with Tailwind CSS styling.

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Project Structure

- **src/pages/**: Full page components for different views
- **src/components/**: Reusable components (Navbar, ProtectedRoute)
- **src/context/**: React Context for authentication state
- **src/utils/**: API calls and utility functions
- **src/App.jsx**: Main routing configuration

## Features

- Role-based authentication (Admin, Staff, Student, Parent)
- Protected routes with authorization
- Beautiful Tailwind CSS styling
- Responsive design for all devices
- Real-time data fetching
- Form validation
- Error handling

## API Integration

The frontend communicates with the backend via REST API:
- Base URL: `http://localhost:5000/api`
- All requests include JWT token in headers
- Automatic token refresh on new login

## Environment Variables

No .env file needed for frontend in development (Vite proxy handles API calls).

For production, update the API_BASE_URL in `src/utils/api.js`
