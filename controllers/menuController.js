const pool = require('../config/db');

// CREATE
exports.createMenu = async (req, res) => {
  const { name, description, price, image_url, category, is_available } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO menus (name, description, price, image_url, category, is_available) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, description, price, image_url, category, is_available ?? true]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ALL
exports.getMenus = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM menus ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
exports.getMenuById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM menus WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Menu not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateMenu = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image_url, category, is_available } = req.body;
  try {
    const result = await pool.query(
      `UPDATE menus 
       SET name=$1, description=$2, price=$3, image_url=$4, category=$5, is_available=$6
       WHERE id=$7 RETURNING *`,
      [name, description, price, image_url, category, is_available, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Menu not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteMenu = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM menus WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Menu not found' });
    res.json({ message: 'Menu deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
