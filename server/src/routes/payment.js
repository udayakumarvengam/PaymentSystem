const express = require('express');
const controller = require('../controllers/paymentController');
const auth = require('../middleware/auth');
const { query, body, param } = require('express-validator');
const router = express.Router();

router.use(auth);
router.post('/', [
  body('amount').isFloat({ gt: 0 }),
  body('date').isISO8601(),
  body('accountId').isUUID()
], controller.create);
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1 })
], controller.list);
router.get('/:id', param('id').isUUID(), controller.getOne);
router.put('/:id', [param('id').isUUID()], controller.update);
router.delete('/:id', param('id').isUUID(), controller.delete);

module.exports = router;
