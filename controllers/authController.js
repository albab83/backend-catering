const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET ; // ganti nanti ke env

exports.register = async (req, res) => {
    const { name, email, password, phone, address, role } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const result = await pool.query(
        'INSERT INTO users (name, email, password, phone, address, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, email, phone, address, role',
        [name, email, hashedPassword, phone, address, role || 'user']
      );
  
      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  


exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
        return res.status(401).json({ message: 'Email tidak ditemukan' });
        }

        const user = result.rows[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
        return res.status(401).json({ message: 'Password salah' });
        }

        const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '1d' }
        );

        // Role verifikasi disini jika mau arahkan
        if (user.role !== 'admin' && user.role !== 'user') {
        return res.status(403).json({ message: 'Role tidak dikenali' });
        }

        res.json({
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
  

