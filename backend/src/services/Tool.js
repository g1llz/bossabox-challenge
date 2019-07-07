const Tool = require('../models/Tool');

module.exports = {
  list: async (req, res, next) => {
    const { tag } = req.query;
    let data = {};
    try {
      if (tag) data = { tags: tag };
      const tools = await Tool.find({ owner: req.decoded.id, ...data });

      if (tag && !tools.length) {
        res.status(404);
        res.json({ status: 404, message: 'No tool found' });
        return;
      }
      res.json(tools);
    } catch (error) {
      res.json(error);
    }
    next();
  },
  listById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const tool = await Tool.findOne({ owner: req.decoded.id, _id: id });
      if (!tool) {
        res.status(404);
        res.json({ status: 404, message: 'No tool found by id' });
        return;
      }
      res.json(tool);
    } catch (error) {
      res.json(error);
    }
    next();
  },
  create: async (req, res, next) => {
    const { ...data } = req.body;
    // 'owner' can't be comming in the request body; check and remove;
    if ('owner' in data) delete data.owner;
    try {
      const tool = await Tool.create({ ...data, owner: req.decoded.id });
      res.status(201);
      res.json(tool);
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
    }
    next();
  },
  update: async (req, res, next) => {
    const { id } = req.params;
    const { ...data } = req.body;
    try {
      await Tool.findOneAndUpdate({ owner: req.decoded.id, _id: id }, data);
      res.status(200);
      res.json({ status: 200, message: 'Tool updated successfully' });
    } catch (error) {
      res.json(error);
    }
    next();
  },
  delete: async (req, res, next) => {
    const { id } = req.params;
    try {
      await Tool.findOneAndDelete({ owner: req.decoded.id, _id: id });
      res.json({});
    } catch (error) {
      if (error.name === 'CastError') {
        res.status(400);
        res.json({ status: 400, error: { kind: error.kind, message: error.message } });
        return;
      }
      res.json(error);
    }
    next();
  },
};
