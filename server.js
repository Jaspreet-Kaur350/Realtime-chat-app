const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  let username = '';

  socket.on('setUsername', (name) => {
    username = name;
    socket.broadcast.emit('chat message', `${username} joined the chat`);
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', `${username}: ${msg}`);
  });

  socket.on('disconnect', () => {
    if (username) {
      socket.broadcast.emit('chat message', `${username} left the chat`);
    }
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
const mongoose = require('mongoose');

// Replace with your actual connection string
const mongoURI = 'mongodb+srv://Jaspreet_lpu:I7xHGJBUo3dyu4uZ@cluster0.cf87slh.mongodb.net/FUll_stack';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));
