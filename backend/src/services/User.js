const sha1 = require('sha1');
const User = require('../models/User');

module.exports = {
  list: async (req, res, next) => {
    if (req.decoded.role !== 'admin') {
      res.status(403);
      res.json({ status: 403, message: 'You are not allowed to make this request' });
      return;
    }
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
    if (req.decoded.id !== id && req.decoded.role !== 'admin') {
      res.status(403);
      res.json({ status: 403, message: 'You are not allowed to make this request' });
      return;
    }
    try {
      const user = await User.findById(id);
      if (!user) {
        res.status(404);
        res.json({ status: 404, message: 'No user found' });
        return;
      }
      res.status(200);
      res.json(user);
    } catch (error) {
      res.json(error);
    }
    next();
  },
  create: async (req, res, next) => {
    const { name, email, password } = req.body;
    if (name && email && password) {
      try {
        await User.create({ name, email, password: sha1(password) });
        res.status(201);
        res.json({ status: 201, message: 'User created' });
      } catch (error) {
        if (error.name === 'ValidationError') {
          const messages = Object.keys(error.errors).map(key => (
            { field: key, text: error.errors[key].message }
          ));
          res.status(400);
          res.json({ status: 400, errors: messages });
          return;
        }
        res.json(error)
        return;
      }
    }
    res.status(400);
    res.json({ status: 400, message: "Name or password or email can't be blank" });
    next();
  },
  delete: async (req, res, next) => {
    const { id } = req.params;
    if (req.decoded.id !== id && req.decoded.role !== 'admin') {
      res.status(403);
      res.json({ status: 403, message: 'You are not allowed to make this request' });
      return;
    }
    try {
      await User.findByIdAndDelete(id);
      res.json({ status: 200, message: 'User removed' });
    } catch (error) {
      res.json(error);
    }
    next();
  },
};
