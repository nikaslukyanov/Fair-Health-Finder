const express = require('express');
const app = express();

// Add basic error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Add more detailed logging
console.log('Initializing server...');

app.get('/', (req, res) => {
    console.log('Received request to /');
    res.send('Hello World!');
});

// Add error handling for the server startup
const server = app.listen(1000, (error) => {
    if (error) {
        console.error('Error starting server:', error);
        return;
    }
    console.log('Server successfully started on port 3000');
});

// Handle server errors
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error('Port 3000 is already in use');
    } else {
        console.error('Server error:', error);
    }
});