<div align="center">

# 🛡️ SessionSafeX

### Secure Authentication System with Modern UI

A modern and secure authentication web application built using **Node.js**, **Express.js**, **SQLite**, and **bcrypt** with session management and optional Two-Factor Authentication (2FA).

---

![Node.js](https://img.shields.io/badge/Node.js-Backend-green?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express.js-Framework-black?style=for-the-badge&logo=express)
![SQLite](https://img.shields.io/badge/SQLite-Database-blue?style=for-the-badge&logo=sqlite)
![Security](https://img.shields.io/badge/Security-Authentication-red?style=for-the-badge)
![License](https://img.shields.io/badge/License-Proprietary-darkred?style=for-the-badge)

---

## 🌐 Live Demo

🚀 **Deployment:**  
https://session-safe-x--adiiithyaannn.replit.app

📂 **GitHub Repository:**  
https://github.com/adiiithyaan/SessionSafeX

</div>

---

# ✨ About The Project

SessionSafeX is a secure authentication platform designed to provide safe and modern user authentication for web applications. The project focuses on implementing industry-standard security practices such as password hashing, secure session handling, protected routes, input validation, and optional Two-Factor Authentication.

The application features a modern grayscale glassmorphism-inspired interface that delivers both functionality and a clean user experience.

---

# 🚀 Features

✅ User Registration  
✅ Secure Login System  
✅ bcrypt Password Hashing  
✅ Session-Based Authentication  
✅ Protected Dashboard Routes  
✅ Secure Logout  
✅ SQL Injection Protection  
✅ Input Validation & Sanitization  
✅ Optional Two-Factor Authentication (2FA)  
✅ Responsive Modern UI  
✅ Glassmorphism Design  

---

# 🎨 UI Theme

SessionSafeX uses a custom grayscale security-inspired palette.

| Color | Hex |
|---|---|
| Light Gray | `#e4e4e4` |
| Silver | `#a6a6a6` |
| Gray | `#6f6f6f` |
| Dark Gray | `#343434` |
| Black | `#000000` |

---

# 🛠️ Tech Stack

## Backend
- Node.js
- Express.js
- SQLite3

## Security
- bcrypt
- express-session
- Helmet
- express-validator
- speakeasy

## Frontend
- EJS
- CSS3

---

# 📂 Project Structure

```bash
SessionSafeX/
│
├── config/
│   └── db.js
│
├── middleware/
│   ├── auth.js
│   └── validators.js
│
├── public/
│   └── style.css
│
├── routes/
│   └── authRoutes.js
│
├── views/
│   ├── login.ejs
│   ├── register.ejs
│   ├── dashboard.ejs
│   └── verify-2fa.ejs
│
├── .env.example
├── .gitignore
├── package.json
├── server.js
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/adiiithyaan/SessionSafeX.git
```

---

## Open Project

```bash
cd SessionSafeX
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

Create a `.env` file:

```env
PORT=3000
SESSION_SECRET=your_secret_here
```

---

## Start Server

```bash
node server.js
```

---

# 🌐 Open Application

```text
http://localhost:3000
```

---

# 🔐 Security Features

## Password Hashing

Passwords are securely encrypted using bcrypt.

```js
bcrypt.hash(password, 12)
```

---

## SQL Injection Protection

Parameterized database queries prevent SQL injection attacks.

---

## Session Security

Secure sessions using:
- `httpOnly`
- `sameSite`
- session expiration

---

## Input Validation

Request validation using express-validator.

---

## Optional Two-Factor Authentication

Authenticator-based verification using TOTP.

---


# 🧠 Learning Objectives

This project demonstrates:
- Authentication Systems
- Backend Security
- Session Management
- Secure Password Storage
- Express.js Architecture
- Two-Factor Authentication
- Modern UI Design

---

# 📄 License

### Proprietary License

© 2025 SessionSafeX Team.  
All rights reserved.

Unauthorized copying, modification, distribution, or commercial use of this software is prohibited without permission.

---

<div align="center">

## ⭐ SessionSafeX

Built with security-first principles 🔐

</div>
