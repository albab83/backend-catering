const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware');
const { validateMenu } = require('../validators/menuValidators');
const { validationResult } = require('express-validator');

router.post(
    '/',
    verifyToken,
    verifyAdmin,
    validateMenu,
    (req, res, next) => {
      // Tangani hasil validasi
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      menuController.createMenu(req, res, next);
    }
  );
  
router.get('/', menuController.getMenus);
router.get('/:id', menuController.getMenuById);
router.put('/:id', verifyToken, verifyAdmin, menuController.updateMenu);
router.delete('/:id', verifyToken, verifyAdmin, menuController.deleteMenu);

module.exports = router;
