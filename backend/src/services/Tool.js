const Tool = require('../models/Tool');

module.exports = {
  list: async (req, res, next) => {
    const { tag } = req.query;
    let data = {};
    try {
      if (tag) data = { tags: tag };
      const tools = await Tool.find(data);

      if (!tools.length) {
        res.status(404);
        res.json({
          status: 404,
          message: 'No tool found',
        });
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
      const tool = await Tool.findById(id);
      if (!tool) {
        res.status(404);
        res.json({
          status: 404,
          message: 'No tool found by id',
        });
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
    try {
      const tool = await Tool.create(data);
      res.status(201);
      res.json(tool);
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
  update: async (req, res, next) => {
    const { id } = req.params;
    const { ...data } = req.body;
    try {
      await Tool.findByIdAndUpdate(id, data);
      res.status(200);
      res.json({
        status: 200,
        message: 'Tool updated successfully',
      });
    } catch (error) {
      res.json(error);
    }
    next();
  },
  delete: async (req, res, next) => {
    const { id } = req.params;
    try {
      await Tool.findByIdAndDelete(id);
      res.json({});
    } catch (error) {
      if (error.name === 'CastError') {
        res.status(400);
        res.json({
          status: 400,
          error: { kind: error.kind, message: error.message },
        });
        return;
      }
      res.json(error);
    }
    next();
  },
};
