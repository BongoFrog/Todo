const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

// @route    GET api/protected-route
// @desc     Get protected data
// @access   Private
//GET
router.get('/', authMiddleware, (req, res) => {
  res.json({ msg: 'This is protected data' });
});

router.get('/:id', authMiddleware, (req, res) => {
  res.json({ msg: 'This is protected data' });
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
router.put('/',authMiddleware, (req, res) => {
  res.json({ msg: 'This is protected data' });
});
//DELETE

module.exports = router;
