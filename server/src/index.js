require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const accountRoutes = require('./routes/accounts');
const paymentRoutes = require('./routes/payments');
const errorHandler = require('./middleware/errorHandler');


const app = express();
app.use(cors(), express.json());
app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/payments', paymentRoutes);
app.use(errorHandler);


sequelize.sync()
  .then(() => app.listen(process.env.PORT || 5000, () => console.log('Server started')))
  .catch(err => console.error('DB sync failed:', err));
