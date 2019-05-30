const toolService = require('../services/Tool');
const userService = require('../services/User');

const routes = (server) => {
  server.get(`${process.env.URI}/tools`, toolService.list);
  server.get(`${process.env.URI}/tools/:id`, toolService.listById);
  server.post(`${process.env.URI}/tools`, toolService.create);
  server.del(`${process.env.URI}/tools/:id`, toolService.delete);

  server.get(`${process.env.URI}/users`, userService.list);
  server.get(`${process.env.URI}/users/:id`, userService.listById);
  server.post(`${process.env.URI}/users`, userService.create);
  server.del(`${process.env.URI}/users/:id`, userService.delete);
}

module.exports = routes;
