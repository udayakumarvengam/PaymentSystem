const express = require('express');
const controller = require('../controllers/accountController');
const auth = require('../middleware/auth');
const { query, param } = require('express-validator');
const router = express.Router();

router.use(auth);
router.get('/', controller.list);
router.get('/:id/transactions', [param('id').isUUID(), query('page').optional().isInt(), query('limit').optional().isInt()], controller.getTransactions);

module.exports = router;
