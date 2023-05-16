const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  taskDetails: {
    type: String,
    required: true,
  },
  taskAddedOn: {
    type: String,
    required: true,
  },
});

module.exports = Task = mongoose.model("Task", TaskSchema);
