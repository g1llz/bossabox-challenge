const sha1 = require('sha1');
const User = require('../models/User');

module.exports = {
  list: async (req, res, next) => {
    try {
      const users = await User.find();
      if (!users.length) {
        res.status(404);
        res.json({ status: 404, message: 'No users' });
        return;
      }
      res.json(users);
    } catch (error) {
      res.json(error);
    }
    next();
  },
  listById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      res.json(user);
    } catch (error) {
      res.json(error);
    }
    next();
  },
  create: async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
      await User.create({ name, email, password: sha1(password) });
      res.status(201);
      res.json({
        status: 201,
        message: 'User created',
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        const messages = Object.keys(error.errors).map(key => (
          { field: key, text: error.errors[key].message }
        ));
        res.status(400);
        res.json({
          status: 400,
          errors: messages,
        });
        return;
      }
      res.json(error)
    }
    next();
  },
  delete: async (req, res, next) => {
    const { id } = req.params;
    try {
      await User.findByIdAndDelete(id);
      res.json({
        status: 200,
        message: 'User removed',
      });
    } catch (error) {
      res.json(error);
    }
    next();
  },
};
