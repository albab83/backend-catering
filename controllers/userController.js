const pool = require('../config/db');

exports.getProfile = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, email, phone, address, role FROM users WHERE id = $1', [req.user.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  const { name, phone, address } = req.body;

  try {
    const result = await pool.query(
      'UPDATE users SET name = $1, phone = $2, address = $3 WHERE id = $4 RETURNING id, name, email, phone, address, role',
      [name, phone, address, req.user.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
