const Task = require("../models/tasks");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (err) {
    res.status(500).json({ success: false, err });
  }
};

const addTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (err) {
    res.status(500).json({ success: false, err });
  }
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id });
    if (!task) {
      return res
        .status(404)
        .json({ success: false, msg: `No task with an id of ${id}` });
    }
    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ success: false, err });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const body = req.body;
    const task = await Task.findOneAndUpdate({ _id }, body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res
        .status(404)
        .json({ success: false, msg: `No task found with the id ${_id}` });
    }
    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ success: false, err });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const task = await Task.findOneAndDelete({ _id });
    res.status(200).json({ task });
    if (!task) {
      return res
        .status(404)
        .json({ success: false, msg: `No task found with the id ${_id}` });
    }
  } catch (err) {
    res.status(500).json({ success: false, err });
  }
};

module.exports = {
  getTasks,
  addTask,
  getTask,
  updateTask,
  deleteTask,
};
