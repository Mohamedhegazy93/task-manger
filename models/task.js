const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must enter a task name"],
    trim: true,
    maxLength: [20, "task name is too long"],
    minLength: [3, "task name is too short"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", taskSchema);
