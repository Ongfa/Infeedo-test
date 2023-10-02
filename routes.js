// routes.js
const express = require('express');
const bodyParser = require('body-parser');
const Task = require('./TaskController');

const app = express();
app.use(bodyParser.json());

const taskService = new Task();

// Create a new task
app.post('/createTask', (req, res) => {
    const taskData = req.body;
    // Perform input validation (e.g., check if required fields are present)
    if (!taskData || !taskData.title || !taskData.status) {
        const validationError = new Error('Incomplete task data. Title and status are required.');
        console.error(validationError.message);
        callback(validationError, null);
        return; // Exit the function
    }

    taskService.createTask(taskData, (err, result) => {
        if (err) {
            console.error('Error creating task:', err);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
        res.status(201).json({ success: true, message: 'Task created successfully', taskId: result });
    });
});

// Update a task
app.put('/updateTask', (req, res) => {
    const taskData = req.body;
    // Perform input validation (e.g., check if required fields are present)
    if (!taskData || !taskData.title || !taskData.status) {
        return res.status(400).json({ error: 'Incomplete task data. Title and status are required.' });
    }

    taskService.updateTask(taskData, (err, result) => {
        if (err) {
            console.error('Error updating task:', err);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
        res.status(201).json({success: true, message: 'Task updated successfully'});
    });
});

// Get all tasks with pagination
app.get('/getAllTasks', (req, res) => {
    req.query.pageSize = undefined;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    taskService.getAllTasks(page, pageSize, (err, result) => {
        if (err) {
            console.error('Error getting all tasks:', err);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
        res.json(result);
    });
});

// Get task metrics
app.get('/getTaskMetrics', (req, res) => {
    const status = req.query.status;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    // Check if required parameters are provided
    if (!status || !startDate || !endDate) {
        return res.status(400).json({ error: 'Status, startDate, and endDate parameters are required.' });
    }
    taskService.getTaskMetrics(status, startDate, endDate, (err, result) => {
        if (err) {
            console.error('Error getting all tasks:', err);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
        const taskMetricsJson = {
            'start_date': startDate,
            'metrics': result,
            'end_date': endDate,
        }
        res.json(taskMetricsJson);
    });
});

module.exports = app;
