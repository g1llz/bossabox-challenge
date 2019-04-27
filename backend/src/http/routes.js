const model = require('../models');

const routes = (server) => {
  server.get(`${process.env.URI}/tools`, async (req, res, next) => {
    try {
      const tools = await model.tool().find();
      res.json(tools);
    } catch (error) {
      res.json(error);
    }
    next();
  });

  server.get(`${process.env.URI}/tools/:id`, async (req, res, next) => {
    const { id } = req.params;
    try {
      const tool = await model.tool().findById(id);
      res.json(tool);
    } catch (error) {
      res.json(error);
    }
    next();
  });

  server.post(`${process.env.URI}/tools`, async (req, res, next) => {
    const { ...data } = req.body;
    try {
      const tools = await model.tool().create(data);
      res.json(tools);
    } catch (error) {
      res.json(error);
    }
    next();
  });
}

module.exports = routes;
