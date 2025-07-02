const express = require('express');
const db = require('../db');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, (req, res) => {
  db.all('SELECT cam_id FROM favorites WHERE user_id = ?', [req.user.userId], (err, rows) => {
    if (err) return res.sendStatus(500);
    res.json(rows.map(r => r.cam_id));
  });
});

router.post('/', auth, (req, res) => {
  const { camId } = req.body;
  db.run('INSERT INTO favorites (user_id, cam_id) VALUES (?, ?)', [req.user.userId, camId], err => {
    if (err) return res.sendStatus(500);
    res.json({ success: true });
  });
});

router.delete('/', auth, (req, res) => {
  const { camId } = req.body;
  db.run('DELETE FROM favorites WHERE user_id = ? AND cam_id = ?', [req.user.userId, camId], err => {
    if (err) return res.sendStatus(500);
    res.json({ success: true });
  });
});

module.exports = router;
