const express = require('express');
const router = express.Router();    
const Task = require('../models/task');
const mongoose = require('mongoose'); // Import mongoose




router.get('/',async(req,res) => {
    try {
        const tasks = await Task.find(); // Retrieve all tasks from the database
        res.json(tasks); // Send all tasks as JSON response
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }



});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: "Invalid ObjectId" });
    }

    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).send({ message: "Task not found" });
        }
        res.json(task);
    } catch (error) {
        console.error("Error fetching task by ID:", error);
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
});

router.post('/', async (req, res) => {
    console.log("post request received")
    console.log("Received data :", req.body)

    
        const newTask = new Task(req.body); 
        const savedTask = await newTask.save(); 
        res.status(201).send(savedTask); 
});

router.put('/:id', async (req, res) => {
    console.log("PUT request received");
    console.log("Received data:", req.body);
    console.log("Received ID:", req.params.id);  // Log the ID received to debug

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log("Invalid ID attempted:", id);  // More detailed logging
        return res.status(400).send({ message: "Invalid ObjectId" });
    }

    try {
        const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedTask) {
            console.log("No task found with ID:", id);  // Log when no task is found
            return res.status(404).send({ message: "Task not found" });
        }
        res.send(updatedTask);
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: "Invalid ObjectId" });
    }

    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).send({ message: "Task not found" });
        }
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
});


module.exports = router;
