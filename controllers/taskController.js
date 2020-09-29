const Task = require("../models/Task");
const Project = require("../models/Project");
const { validationResult } = require("express-validator");

exports.createTask = async (req, res) => {
  //checking errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { projectId } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ msg: "project not found" });
    }

    // verify owner project is equal userId
    if (project.owner.toString() !== req.user.userId) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const task = new Task(req.body);
    await task.save();
    res.json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "There was a mistake" });
  }
};

exports.getTask = async (req, res) => {
  try {
    const { projectId } = req.query;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ msg: "project not found" });
    }

    // verify owner project is equal userId
    if (project.owner.toString() !== req.user.userId) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const tasks = await Task.find({ projectId }).sort({created_at:-1});
    res.json({ tasks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "There was a mistake" });
  }
};

exports.updateTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { projectId, name, state } = req.body;

    const getTask = await Task.findById(req.params.id);
    if (!getTask) {
      res.status(404).json({ msg: "task not found" });
    }
    const project = await Project.findById(projectId);

    // verify owner project is equal userId
    if (project.owner.toString() !== req.user.userId) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const newTask = {};
    newTask.name = name;
    newTask.state = state;

    //   save de task
    const task = await Task.findByIdAndUpdate({ _id: req.params.id }, newTask, {
      new: true,
    });
    res.json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "There was a mistake" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { projectId } = req.query;

    const getTask = await Task.findById(req.params.id);
    if (!getTask) {
      res.status(404).json({ msg: "task not found" });
    }
    const project = await Project.findById(projectId);

    // verify owner project is equal userId
    if (project.owner.toString() !== req.user.userId) {
      return res.status(401).json({ msg: "Unauthorized" });
    };
    
    // delete
    await Task.findByIdAndRemove({_id:req.params.id});
    res.json({ msg:"task successfully deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "There was a mistake" });
  }
};
