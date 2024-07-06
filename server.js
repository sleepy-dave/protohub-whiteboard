const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

let drawingUser = null;

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // send the user their socket ID
  io.to(socket.id).emit('yourId', socket.id);

  if (drawingUser === null) {
    drawingUser = socket.id;
    io.to(drawingUser).emit('enableDrawing');
    console.log('New drawing user:', drawingUser);
  } else {
    io.to(socket.id).emit('disableDrawing');
  }

  // listen for drawing events
  socket.on('draw', (data) => {
    socket.broadcast.emit('draw', data);
  });

  // listen for clear events
  socket.on('clear', () => {
    socket.broadcast.emit('clear');
  });

  // listen for step back events
  socket.on('stepBack', () => {
    drawingUser = (drawingUser === socket.id) ? null : socket.id;
    io.to(drawingUser).emit('enableDrawing');
    io.to(socket.id).emit('forceDisableDrawing');
  });

  // listen for start drawing events
  socket.on('startDrawing', () => {
    if (drawingUser === null) {
      drawingUser = socket.id;
      io.to(drawingUser).emit('enableDrawing');
      console.log('New drawing user after startDrawing:', drawingUser);
    }
  });

  // listen for disconnect events
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    if (drawingUser === socket.id) {
      drawingUser = null;
      io.emit('disableDrawing');
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});