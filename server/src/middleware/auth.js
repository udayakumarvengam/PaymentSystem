const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  const checkauth = req.headers.authorization;
  if (!checkauth) return res.status(401).json({ message: 'No token provided' });
  const token = checkauth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};
