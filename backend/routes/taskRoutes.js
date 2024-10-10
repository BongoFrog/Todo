const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Task = require('../models/Task');

//GET
router.get('/', authMiddleware, async(req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  } 
});

router.get('/:id', authMiddleware, async(req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
//POST
router.post('/',authMiddleware,async(req, res) => {
  const {task,finished,date} = req.body;
  try {
    const newTask = new Task({
      task,
      finished,
      date,
      user:req.user.id
    });
    const savedTask = await newTask.save();
    res.json("Task saved successfully");
  }
  catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
//PUT
router.put('/:id',authMiddleware, async(req, res) => {
  const { task, finished, date } = req.body;

  const taskFields = {};
  if (task) taskFields.task = task;
  if (finished !== undefined) taskFields.finished = finished;
  if (date) taskFields.date = date;

  try {
    let task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: 'Task not found' });

    // Make sure user owns the task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: taskFields },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
//DELETE
router.delete('/',authMiddleware, async(req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Make sure user owns the task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await task.remove();

    res.json({ msg: 'Task removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
