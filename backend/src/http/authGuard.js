const jwt = require('jsonwebtoken');

const exclusions = [
  `${process.env.URI}/auth`,
  `${process.env.URI}/register`,
];

const authGuard = (req, res, next) => {
  if (!exclusions.includes(req.href())) {
    const token = req.headers['x-access-token'];
    if (!token) {
      res.status(400);
      res.json({ status: 400, message: 'token not provided' });
      return;
    }
    try {
      req.decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      res.status(401);
      res.json({ status: 401, message: 'invalid token' });
      return;
    }
  }
  next();
}

module.exports = authGuard;
