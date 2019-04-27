require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./server');

mongoose.connect(process.env.MLAB, { useNewUrlParser: true })
  .then(() => {
    console.info('MongoDB: Successfully connected.');
    server.listen(process.env.PORT || 8080, () => {
      console.info('DONE! Listen on %s', process.env.PORT || 8080);
    });
  })
  .catch(err => console.error('MongoDB: Houston we have a problem.', err));
