const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  tags: {
    type: [String],
    require: false,
  },
  owner: {
    type: String,
    required: true,
  },
});

const tool = mongoose.model('Tool', toolSchema);

module.exports = tool;
