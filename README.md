# Smart Campus Complaint & Maintenance System

A modern full-stack web application that helps students report campus issues such as WiFi problems, water leakage, broken classroom equipment, dirty washrooms, electricity faults, and more.

The system allows admins to manage complaints efficiently by assigning workers, tracking progress, setting priorities, and viewing analytics.

---

## Live Features

### Student Panel
- Register / Login
- Raise complaints with image proof
- Select issue category
- Add location details
- Track complaint status
- View complaint history
- Get notifications

### Admin Panel
- Secure admin login
- View all complaints
- Assign worker/staff
- Change complaint status
- Set priorities
- Dashboard analytics
- Complaint heatmap
- Performance monitoring

### Worker Panel (Optional)
- Login
- View assigned tasks
- Update task progress
- Mark complaint resolved

---

## Problem Statement

In many colleges, students report issues manually through teachers, office staff, or verbal communication. This creates delays, lost complaints, poor tracking, and no accountability.

This project digitizes the complaint system for faster resolution and better campus management.

---

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Authentication
- JWT (JSON Web Token)

### File Upload
- Cloudinary / Multer

### Deployment
- Frontend: Vercel / Netlify
- Backend: Render
- Database: MongoDB Atlas

---

## Project Modules

### Student Module
- Complaint Registration
- Complaint Tracking
- Notifications

### Admin Module
- Complaint Management
- Staff Assignment
- Reports & Analytics

### Worker Module
- Task Updates
- Resolution Status

---

## Database Collections

### Users
- name
- email
- password
- role (student/admin/worker)
- department
- year

### Complaints
- title
- description
- category
- image
- location
- status
- priority
- createdBy
- assignedTo
- createdAt
- updatedAt

---

## API Routes

### Auth
- POST /register
- POST /login

### Complaints
- POST /complaint/create
- GET /complaints
- PUT /complaint/status
- PUT /assign-worker

### Analytics
- GET /analytics

---

## Future Enhancements

- AI priority detection
- Complaint auto-routing
- Mobile app version
- Email alerts
- QR complaint system
- Voice complaint support

---

## Screenshots

(Add screenshots here after completion)

---

## Installation
```bash
git clone <repo-link>
cd smart-campus-complaint-system
npm install
```

---

## Frontend
```bash
npm run dev
```
---

## Backend
```bash
npm start
```

---

## Author
 Aditya Nayak

---

## License
 MIT License