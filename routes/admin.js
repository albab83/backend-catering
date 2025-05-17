const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware');

// Contoh: akses dashboard admin
router.get('/dashboard', verifyToken, verifyAdmin, (req, res) => {
  res.json({ message: 'Selamat datang di dashboard admin', admin: req.user });
});

// Contoh: kelola user (opsional)
router.get('/users', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const result = await require('../config/db').query('SELECT id, name, email, role FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
