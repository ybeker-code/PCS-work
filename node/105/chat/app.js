import express from 'express';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const __dirname = import.meta.dirname;
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
  console.log('got a connection');

  /*setInterval(() => {
    socket.emit('msg', 'hello from server');
  }, 1000);*/

  let userName;
  socket.on('login', user => {
    userName = user;
    io.emit('msg', `${userName} logged in.`);
  })


  socket.on('msg', msg => {
    //socket.broadcast.emit('msg', msg);
    io.emit('msg', `${userName}: ${msg}`);
  });

  socket.on('disconnect', () => {
    io.emit('msg', `${userName} logged out.`);
  });
});



server.listen(80);
