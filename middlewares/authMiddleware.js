const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'rahasia123';

// Verifikasi token
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token tidak diberikan' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // simpan info user ke req.user
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token tidak valid' });
  }
};

// Khusus admin
exports.verifyAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Akses ditolak. Hanya admin yang diperbolehkan.' });
  }
  next();
};

// Khusus user biasa
exports.verifyUser = (req, res, next) => {
  if (req.user.role !== 'user') {
    return res.status(403).json({ message: 'Akses ditolak. Hanya user yang diperbolehkan.' });
  }
  next();
};
