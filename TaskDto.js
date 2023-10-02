// database.js

const mysql = require('mysql2');

class TaskDTO {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '20January!',
            database: 'taskList',
            multipleStatements: true,
        });

        this.connection.connect((err) => {
            if (err) {
                console.error('Connection Failed! Error: ' + JSON.stringify(err, undefined, 2));
            } else {
                console.log('Connection established successfully!');
            }
        });
    }

    // Implement methods for database operations (e.g., insert, update, select)
    createTaskInDB(query, data, callback) {
        // Execute the SQL query with parameters
        this.connection.query(query, data, (err, results) => {
            if (err) {
                const errorMessage = `Error creating task: ${err.message}, Query: ${query}`;
                console.error(errorMessage);
                callback(new Error(errorMessage), null);
            } else {
                callback(null, results);
            }
        });
    }

    updateTaskInDB(query, data, callback){

        // Execute the SQL query with parameters
        this.connection.query(query, data, (err, results) => {
            if (err) {
                const errorMessage = `Error creating task: ${err.message}, Query: ${query}`;
                console.error(errorMessage);
                callback(new Error(errorMessage), null);
            } else {
                // Task updated successfully, return a success response
                callback(null, results);
            }
        });
    }

    getAllTasks(query, data, callback) {
        this.connection.query(query, data, (err, rows, fields) => {
            if (!err) {
                if (rows != null) {
                    console.log('Query results:', rows);
                    callback(null, rows);
                } else {
                    console.log('No data found');
                    callback(null, []); // Return an empty array when no data is found
                }
            } else {
                const errorMessage = err ? `Error: ${err.message}, Query: ${query}` : 'Internal Server Error';
                console.error(errorMessage);
                callback(new Error(errorMessage), null);
            }
        });
    }


    getTaskMetrics(query, data, callback) {

        this.connection.query(query, data, (err, rows, fields) => {
            if (!err) {
                if (rows != null) {
                    console.log('Query results:', rows);
                    callback(null, rows);
                }
                else {
                    console.log('No data found');
                    callback(null, []);
                }
            }
            else{
                const errorMessage = err ? `Error: ${err.message}, Query: ${query}` : 'Internal Server Error';
                console.error(errorMessage);
                callback(new Error(errorMessage), null);
            }

        });
    }
}

process.on('SIGINT', () => {
    console.log('Closing MySQL connection...');

    // Close the MySQL connection
    connection.end((err) => {
        if (err) {
            console.error('Error closing MySQL connection:', err);
        } else {
            console.log('MySQL connection closed.');
        }
        process.exit(); // Exit the application
    });
});

module.exports = TaskDTO;
