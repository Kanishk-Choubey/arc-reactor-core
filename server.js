const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public')); // Serve files from 'public' folder

io.on('connection', (socket) => {
    console.log('A device connected: ' + socket.id);

    // When phone sends gesture data...
    socket.on('gesture_data', (data) => {
        // ...broadcast it to the laptop (and everyone else)
        socket.broadcast.emit('update_model', data);
    });
});

http.listen(3000, () => {
    console.log('J.A.R.V.I.S. is listening on port 3000');
});
