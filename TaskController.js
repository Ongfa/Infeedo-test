const taskDto = require('./TaskDto');
class TaskController {
    constructor() {
        this.db = new taskDto();
    }

    createTask(taskData, callback) {
        // Insert the task into the database
        const query = `
        INSERT INTO tasks (title, status, date_created)
        VALUES (?, ?, NOW())
    `;
        this.db.createTaskInDB(query, [taskData.title, taskData.status], (err, results) => {
            if (err) {
                // Handle the error
                console.error('Error in creating task:', err);
                callback(err, null);
            } else {
                // Process the results and send a response
                console.log('Task created successfully.', results.insertId);
                callback(null, results.insertId);
            }
        });
    }


    updateTask(taskData, callback) {
        const query = `
        UPDATE tasks SET status = ? WHERE title = ?
    `;

        // update the task into the database
        this.db.updateTaskInDB(query, [taskData.status, taskData.title], (err, results) => {
            if (err) {
                // Handle the error
                console.error('Error in updating task:', err);
                callback(err, null);
            } else {
                // Process the results and send a response
                console.log('Task updated successfully.');
                callback(null, results);
            }
        });
    }

    getAllTasks(page, pageSize, callback) {
        // Calculate the offset based on the page and pageSize
        const offset = (page - 1) * pageSize;

        const query = `
        SELECT *
        FROM tasks
        LIMIT ? OFFSET ?
    `;

        this.db.getAllTasks(query, [pageSize, offset], (err, results) => {
            if (err) {
                console.error('Error getting all tasks:', err);
                callback(err, null); // Pass the error to the callback
            } else {
                if (results && results.length > 0) {
                    callback(null, results); // Pass the results to the callback
                } else {
                    console.log('No data found');
                    callback(null, []); // Return an empty array when no data is found
                }
            }
        });
    }


    getTaskMetrics(status, startDate, endDate, callback) {
        const query = `
        SELECT
            SUM(CASE WHEN status = 'open' THEN 1 ELSE 0 END) AS open_tasks,
            SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END) AS inprogress_tasks,
            SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed_tasks
        FROM
            tasks
        WHERE
            date_created BETWEEN ? AND ?
    `;

        //calculate task metrics
        this.db.getTaskMetrics(query, [status, startDate, endDate], (err, results) => {
            if (err) {
                console.error('Error getting all tasks:', err);
                callback(err, null); // Pass the error to the callback
            } else {
                if (results && results.length > 0) {
                    callback(null, results[0]); // Pass the results to the callback
                } else {
                    console.log('No data found');
                    callback(null, []); // Return an empty array when no data is found
                }
            }
        });
    }
}

module.exports = TaskController;