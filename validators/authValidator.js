const { body } = require('express-validator');

exports.validateRegister = [
  body('name').notEmpty().withMessage('Nama wajib diisi'),
  body('email').isEmail().withMessage('Email tidak valid'),
  body('password').isLength({ min: 6 }).withMessage('Password minimal 6 karakter'),
  body('phone').notEmpty().withMessage('Nomor telepon wajib diisi'),
  body('address').notEmpty().withMessage('Alamat wajib diisi'),
  body('role').optional().isIn(['admin', 'user']).withMessage('Role harus admin atau user'),
];

exports.validateLogin = [
    body('email').isEmail().withMessage('Email tidak valid'),
    body('password').notEmpty().withMessage('Password wajib diisi'),
  ];
  