// routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Obtener todas las tareas
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear una nueva tarea
router.post('/', async (req, res) => {
  const task = new Task({
    title: req.body.title,
    completed: false,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar una tarea
router.put('/:id', async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findById(taskId);
    if (task) {
      task.completed = req.body.completed || task.completed;
      await task.save();
      res.json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const taskId = req.params.id;

  try {
    const deletedTask = await Task.findOneAndDelete({ _id: taskId });
    res.json(deletedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;