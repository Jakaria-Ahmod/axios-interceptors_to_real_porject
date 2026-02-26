🚀 Axios Interceptors Authentication System

A Full Stack Authentication System built with React (Vite) and Node.js (Express) using JWT Authentication and Axios Interceptors.

📌 Project Overview

This project demonstrates a secure authentication system with:

✅ User Registration & Login

✅ JWT Access Token Authentication

✅ Protected Routes (Frontend + Backend)

✅ Role Based Authorization

✅ Axios Interceptor for Auto Token Handling

✅ Private & Public Route System

✅ MongoDB Database Integration

✅ CI/CD Ready Deployment Setup

🏗️ Project Structure
```bash
axios-interceptors/
├─ .github/
│  └─ workflows/
│     └─ ci.yml
├─ backend/
│  ├─ config/
│  │  └─ index.js
│  ├─ controllers/
│  │  └─ authController.js
│  ├─ helper/
│  │  └─ ValidEmail.js
│  ├─ middleware/
│  │  ├─ authmiddleware.js
│  │  └─ jwt-varification.js
│  ├─ models/
│  │  └─ User.js
│  ├─ routes/
│  │  └─ authRoutes.js
│  ├─ .env
│  ├─ .gitignore
│  ├─ index.js
│  ├─ package-lock.json
│  ├─ package.json
│  └─ vercel.json
├─ Frontend/
│  ├─ public/
│  │  └─ vite.svg
│  ├─ src/
│  │  ├─ assets/
│  │  │  └─ react.svg
│  │  ├─ axios/
│  │  │  └─ index.js
│  │  ├─ commonLayout/
│  │  │  ├─ Footer.jsx
│  │  │  └─ index.jsx
│  │  ├─ components/
│  │  │  ├─ PrivateRoute.jsx
│  │  │  └─ PublicRoute.jsx
│  │  ├─ pages/
│  │  │  ├─ About.jsx
│  │  │  ├─ AdminDashboard.jsx
│  │  │  ├─ AllUser.jsx
│  │  │  ├─ Collections.jsx
│  │  │  ├─ Contact.jsx
│  │  │  ├─ Hadith.jsx
│  │  │  ├─ Home.jsx
│  │  │  ├─ Login.jsx
│  │  │  ├─ Profile.jsx
│  │  │  ├─ Register.jsx
│  │  │  ├─ Unauthorized.jsx
│  │  │  └─ UserDashboard.jsx
│  │  ├─ RooComponents/
│  │  │  └─ index.jsx
│  │  ├─ App.css
│  │  ├─ App.jsx
│  │  ├─ index.css
│  │  └─ main.jsx
│  ├─ .env
│  ├─ .gitignore
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ README.md
│  ├─ vercel.json
│  └─ vite.config.js
└─ README.md
```
⚙️ Technologies Used

React.js

Vite

React Router DOM

Axios

Axios Interceptors

Protected Route System

🔐 Features

Login / Register

Private Route

Public Route

Role-based Dashboard

Unauthorized Page Handling

🗄️ Backend (Node.js + Express)
⚙️ Technologies Used

Node.js

Express.js

MongoDB

Mongoose

JWT Authentication

Custom Middleware

Email Validation Helper

🔒 Security Features

Password Hashing

JWT Token Verification

Authorization Middleware

Protected API Routes

🔄 Axios Interceptor Flow

User লগইন করে Access Token পায়

Token LocalStorage এ সংরক্ষণ হয়

Axios Request Interceptor → Token Header এ যোগ করে

Axios Response Interceptor → Unauthorized হলে Redirect করে

🌐 Environment Variables
Backend .env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
Frontend .env
VITE_API_URL=http://localhost:5000
🚀 Deployment (CI/CD Ready)

This project supports automatic deployment using:

GitHub Actions (CI)

Vercel (Frontend + Backend Deployment)

Push to main branch → Auto Deploy 🚀

🛠️ How To Run Locally
🔹 Backend
cd backend
npm install
npm run dev
🔹 Frontend
cd Frontend
npm install
npm run dev
📌 Live Demo (Add After Deploy)

Frontend: https://your-frontend-url

Backend: https://your-backend-url

📷 Features Screens

Login Page

Register Page

Admin Dashboard

User Dashboard

Unauthorized Page

🧠 Learning Outcomes

How JWT Authentication Works

How Axios Interceptors Handle Tokens

Role-Based Authorization

CI/CD Workflow Implementation

Production Deployment on Vercel

🧑‍💻 Developer Information

👨‍🎓 Developer Name: Md Jakaria Ahmod

💼 Profession: MERN Stack Web Developer
📧 Email: jakariaahmodmd@gmail.com

📞 Phone: +8801889913945
🔗 Portfolio: https://mdjakariaahmod.onrender.com

🔗 LinkedIn: https://www.linkedin.com/in/mdjakariaahmod/

🔗 GitHub: https://github.com/Jakaria-Ahmod