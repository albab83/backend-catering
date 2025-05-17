const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Lihat profil sendiri
router.get('/profile', verifyToken, userController.getProfile);

// Update profil
router.put('/profile', verifyToken, userController.updateProfile);

module.exports = router;
