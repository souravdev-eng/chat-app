const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

// ----------------------------------
const app = express();

// 1.Create our won server with http modul
const server = http.createServer(app);

// 3.Use our server into socket.io
const io = socketio(server);

const PORT = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, './public');
app.use(express.static(publicDirectoryPath));

const msg = 'Wellcome';

io.on('connection', (socket) => {
  console.log('New socket connection');
  socket.emit('message', msg);
  socket.on('sendMessage', (message) => {
    io.emit('message', message);
  });
});

// 2.Use it here
server.listen(PORT, () => {
  console.log('App listening on port 3000...');
});
