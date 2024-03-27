const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: [true, "This field is required"],
    trim: true,
    maxlength: [20, "Max length is 20 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
