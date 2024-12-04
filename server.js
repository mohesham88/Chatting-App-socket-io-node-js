require('dotenv').config(); 
const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const server = http.createServer(app);
const io = socketio(server);


const {formatMessage} = require("./utils/messages.js");
// static folders
app.use(express.static(path.join(__dirname, "public")));


const {userJoin, getCurrentUser, getRoomUsers, userLeave} = require('./utils/users');

const botName = "CHATOO";

// Run when client is connected
io.on('connection' , socket => {

  
  socket.on('join_room' , (data) => {
    const user = userJoin( socket.id ,data.username, data.room);

    socket.emit('message' , formatMessage(botName, "welcome to CHATOO!"));
    socket.join(user.room);
    socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${data.username} has entered the chat`)); // broadcast emits to all users but the user who connected

    // send connected users
    io.to(user.room).emit("online_users",{room: user.room ,users : getRoomUsers(user.room)});
  })
  
  
  // broadcast when user is connected
  
  
  socket.on('disconnect' , () => {
    const user = userLeave(socket.id);;
    
    if(user){
      io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));

      // console.log(users);
      io.to(user.room).emit("online_users",{users : getRoomUsers(user.room), room : user.room});

      console.log(getRoomUsers(user.room));
    }
    

  });


  // chat messages
  socket.on('chatMessage' , (msg) => {
    console.log(msg);
    io.to(msg.room).emit('message', formatMessage(msg.username , msg.text));
  });

  

})


const SERVERPORT = process.env.SERVERPORT || 3000;











server.listen( SERVERPORT , () => {
  console.log("Server listening on port " + SERVERPORT)
})