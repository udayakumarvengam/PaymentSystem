const { Account, Payment } = require('../models');

exports.list = async (req, res, next) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const offset = (page - 1) * limit;
  try {
    const { rows, count } = await Account.findAndCountAll({
      where: { userId: req.user.id }, offset, limit
    });
    res.json({ data: rows, total: count, page, limit });
  } catch (err) { next(err); }
};

exports.getTransactions = async (req, res, next) => {
  const accId = req.params.id;
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  try {
    const { rows, count } = await Payment.findAndCountAll({
      where: { accountId: accId, userId: req.user.id },
      include: [{ model: Account, attributes: ['name'] }],
      offset: (page - 1) * limit, limit
    });
    res.json({ data: rows, total: count, page, limit });
  } catch (err) { next(err); }
};

