const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();
const SECRET = 'supersecret'; // move to env var later

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  db.run('INSERT INTO users (username, password_hash) VALUES (?, ?)', [username, hash], err => {
    if (err) return res.status(400).json({ error: 'Username taken' });
    res.json({ success: true });
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '1d' });
    res.json({ token, username: user.username });
  });
});

module.exports = router;
