const URI = '/api/v1';

const routes = (server) => {
  server.get(`${URI}/tools`, async (req, res, next) => {
    try {
      res.send('test...');
    } catch (error) {
      res.send(error);
    }
    next();
  });
}

module.exports = routes;
