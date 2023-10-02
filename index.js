const express = require('express');
const routes = require('./routes');
const port = process.env.PORT || 8080;
const app = express();
app.use('/', routes);

app.listen(port, () => console.log(`Listening on port ${port}..`));

// Close the MySQL connection when the application shuts down
process.on('SIGINT', () => {
        console.log('Shutting down...');
        process.exit();
});