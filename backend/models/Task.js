const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true
  },
  finished: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date
  }
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
