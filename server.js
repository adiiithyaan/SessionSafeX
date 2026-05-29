require('dotenv').config();

const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
require('./config/db');
const app = express();
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(
  session({
    name: 'sessionsafex.sid',

    secret:
      process.env.SESSION_SECRET ||
      'sessionsafex_ultra_secure_secret',

    resave: false,

    saveUninitialized: false,

    cookie: {
      httpOnly: true,

      secure: false, 

      sameSite: 'strict',

      maxAge: 1000 * 60 * 30 
    }
  })
);


app.use('/', authRoutes);


app.get('/', (req, res) => {
  res.redirect('/login');
});


app.use((req, res) => {
  res.status(404).send(`
    <div style="
      background:#000;
      color:#fff;
      height:100vh;
      display:flex;
      justify-content:center;
      align-items:center;
      font-family:Arial;
      flex-direction:column;
    ">
      <h1>404 - Page Not Found</h1>
      <a href="/login" style="
        color:#ccc;
        margin-top:15px;
        text-decoration:none;
      ">
        Go to Login
      </a>
    </div>
  `);
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`
========================================
  SessionSafeX Server Running
  http://localhost:${PORT}
========================================
  `);
});