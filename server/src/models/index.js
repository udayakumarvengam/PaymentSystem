const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
  username: { type: Sequelize.STRING, unique: true, allowNull: false },
  password: { type: Sequelize.STRING, allowNull: false },
});

const Account = sequelize.define('Account', {
  id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
  name: { type: Sequelize.STRING, allowNull: false },
  balance: { type: Sequelize.FLOAT, defaultValue: 0 },
  userId: { type: Sequelize.UUID, allowNull: false },
});

const Payment = sequelize.define('Payment', {
  id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
  amount: { type: Sequelize.FLOAT, allowNull: false },
  date: { type: Sequelize.DATE, allowNull: false },
  accountId: { type: Sequelize.UUID, allowNull: false },
  userId: { type: Sequelize.UUID, allowNull: false },
});

// Associations
User.hasMany(Account, { foreignKey: 'userId' });
Account.belongsTo(User,    { foreignKey: 'userId' });
Account.hasMany(Payment,   { foreignKey: 'accountId' });
Payment.belongsTo(Account, { foreignKey: 'accountId' });
User.hasMany(Payment,      { foreignKey: 'userId' });
Payment.belongsTo(User,    { foreignKey: 'userId' });

module.exports = { sequelize, User, Account, Payment };
