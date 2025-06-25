const { Payment, Account } = require('../models');
const { validationResult } = require('express-validator');

exports.create = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const { amount, date, accountId } = req.body;
    const payment = await Payment.create({ amount, date, accountId, userId: req.user.id });
    res.status(201).json(payment);
  } catch (err) { next(err); }
};

exports.list = async (req, res, next) => {
  const page = +req.query.page || 1, limit = +req.query.limit || 10;
  try {
    const { rows, count } = await Payment.findAndCountAll({
      where: { userId: req.user.id },
      include: [{ model: Account, attributes: ['name'] }],
      offset: (page - 1) * limit, limit
    });
    res.json({ data: rows, total: count, page, limit });
  } catch (err) { next(err); }
};

exports.getOne = async (req, res, next) => {
  try {
    const p = await Payment.findOne({ 
      where: { id: req.params.id, userId: req.user.id }
    });
    if (!p) return res.status(404).json({ message: 'Not found' });
    res.json(p);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const p = await Payment.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!p) return res.status(404).json({ message: 'Not found' });
    await p.update(req.body);
    res.json(p);
  } catch (err) { next(err); }
};

exports.delete = async (req, res, next) => {
  try {
    const p = await Payment.destroy({ where: { id: req.params.id, userId: req.user.id } });
    if (!p) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};
