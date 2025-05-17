const { body } = require('express-validator');

exports.validateMenu = [
  body('name').notEmpty()
  .withMessage('Nama menu wajib diisi')
  .isLength({ max: 100 }).withMessage('Nama maksimal 100 karakter'),

  body('price')
    .notEmpty().withMessage('Harga wajib diisi')
    .isInt({ min: 0 }).withMessage('Harga harus berupa angka positif'),

  body('category')
    .optional()
    .isLength({ max: 50 }).withMessage('Kategori maksimal 50 karakter'),

  body('description')
    .optional(),

  body('image_url')
    .optional()
    .isURL().withMessage('Image URL tidak valid'),

  body('is_available')
    .optional()
    .isBoolean().withMessage('is_available harus true atau false')
];
