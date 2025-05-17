const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const menuRoutes = require('./routes/menu');
const userRoutes = require('./routes/users');

const app = express();

app.use(cors());
app.use(express.json()); // Sudah cukup, tanpa body-parser

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/users', userRoutes);


module.exports = app;
