const toolService = require('../services/Tool');
const userService = require('../services/User');
const authService = require('../services/Auth');

const routes = (server) => {
  server.get(`${process.env.URI}/tools`, toolService.list);
  server.get(`${process.env.URI}/tools/:id`, toolService.listById);
  server.post(`${process.env.URI}/tools`, toolService.create);
  server.put(`${process.env.URI}/tools/:id`, toolService.update);
  server.del(`${process.env.URI}/tools/:id`, toolService.delete);

  // TODO: document this part;
  server.get(`${process.env.URI}/users`, userService.list);
  server.get(`${process.env.URI}/users/:id`, userService.listById);
  server.del(`${process.env.URI}/users/:id`, userService.delete);
  //

  server.post(`${process.env.URI}/auth`, authService.login);
  server.post(`${process.env.URI}/register`, userService.create);
}

module.exports = routes;
