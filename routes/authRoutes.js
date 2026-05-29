const express = require('express');
const { validationResult } = require('express-validator');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

const db = require('../config/db');
const isAuthenticated = require('../middleware/auth');
const {
  registerValidation,
  loginValidation
} = require('../middleware/validators');

const router = express.Router();
router.get('/register', (req, res) => {
  res.render('register');
});


router.post('/register', registerValidation, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const query = `
      INSERT INTO users (username, email, password)
      VALUES (?, ?, ?)
    `;

    db.run(query, [username, email, hashedPassword], function(err) {
      if (err) {
        return res.status(500).json({ error: 'User already exists' });
      }

      res.redirect('/login');
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/login', (req, res) => {
  res.render('login');
});


router.post('/login', loginValidation, (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const query = `SELECT * FROM users WHERE email = ?`;

  db.get(query, [email], async (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    
    if (user.is_twofa_enabled) {
      req.session.tempUser = user;
      return res.redirect('/verify-2fa');
    }

    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email
    };

    res.redirect('/dashboard');
  });
});


router.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', {
    user: req.session.user
  });
});


router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

router.get('/enable-2fa', isAuthenticated, (req, res) => {
  const secret = speakeasy.generateSecret({
    name: `SessionSafeX (${req.session.user.email})`
  });

  const query = `
    UPDATE users
    SET twofa_secret = ?, is_twofa_enabled = 1
    WHERE id = ?
  `;

  db.run(query, [secret.base32, req.session.user.id], async (err) => {
    if (err) {
      return res.status(500).send('Error enabling 2FA');
    }

    const qrCodeImage = await QRCode.toDataURL(secret.otpauth_url);

    res.send(`
      <h2>Scan QR Code with Google Authenticator</h2>
      <img src="${qrCodeImage}" />
      <br><br>
      <a href="/dashboard">Back to Dashboard</a>
    `);
  });
});

router.get('/verify-2fa', (req, res) => {
  res.render('verify-2fa');
});

router.post('/verify-2fa', (req, res) => {
  const { token } = req.body;
  const user = req.session.tempUser;

  if (!user) {
    return res.redirect('/login');
  }

  const verified = speakeasy.totp.verify({
    secret: user.twofa_secret,
    encoding: 'base32',
    token
  });

  if (!verified) {
    return res.status(401).send('Invalid 2FA token');
  }

  req.session.user = {
    id: user.id,
    username: user.username,
    email: user.email
  };

  delete req.session.tempUser;

  res.redirect('/dashboard');
});

module.exports = router;