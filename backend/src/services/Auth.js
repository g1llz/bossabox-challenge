const sha1 = require('sha1');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
  login: async (req, res, next) => {
    const { email, password } = req.body;
    if (email && password) {
      try {
        await User.findOne({ email, password: sha1(password) })
          .exec((err, user) => {
            if (err) {
              res.json({
                status: 0,
                message: err,
              });
              return;
            }
            if (!user) {
              res.status(404);
              res.json({
                status: 404,
                message: 'user not found',
              });
              return;
            }
            const token = jwt.sign(
              { email: user.email, id: user._id },
              process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 },
            );
            res.status(200);
            res.json({ token });
          });
      } catch (error) {
        res.json(error);
        return;
      }
    } else {
      res.status(400);
      res.json({
        status: 400,
        message: 'email and password is required',
      });
    }
    next();
  },
};
