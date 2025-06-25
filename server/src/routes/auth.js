const express = require('express');
const { body } = require('express-validator');
const controller = require('../controllers/authController');
const router = express.Router();

router.post('/register', body('username').isString(), body('password').isLength({ min: 6 }), controller.register);
router.post('/login',    body('username').isString(), body('password').exists(), controller.login);

module.exports = router;
