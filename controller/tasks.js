const Task = require("../models/task");
const asyncWrap = require("../middleware/asyncwrap");
const createCustomError = require("../errors/customErrors");

const getAllTasks = asyncWrap(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const createTask = asyncWrap(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(200).json({ task });
});

const updateTask = asyncWrap(async (req, res) => {
  const { id: taskid } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskid }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return res.status(404).json({ msg: "no task for this id" });
  }
  res.status(200).json({ task, msg: "task updated successfully" });
});

const getTask = asyncWrap(async (req, res, next) => {
  const id = req.params.id;
  const task = await Task.findOne({ _id: id });
  if (!task) {
    return next(createCustomError("Task not found", 404));
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrap(async (req, res) => {
  const { id } = req.params.id;
  const task = await Task.findOneAndDelete({ _id: id });

  if (!task) {
    return res.status(404).json({ msg: "no task for this id" });
  }
  res.json({ msg: `task ${task.name} was deleted` });
});

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  getTask,
  deleteTask,
};
