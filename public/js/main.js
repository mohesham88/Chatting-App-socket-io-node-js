const chatForm = document.querySelector("#chat-form");

const chatMessages = document.querySelector(".chat-messages");

let params = new URLSearchParams(document.location.search);
let username = params.get("username"); 
let room = params.get("room");
// console.log(username, room);




chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // get the msg text
  const msg = e.target.elements.msg.value;
  // console.log(msg);
  // sending a message to the server
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
  
  socket.emit('chatMessage', {text : msg, username, room});
  
  
  
  // scroll down 
  chatMessages.scrollTop = chatMessages.scrollHeight;
  // console.log(chatMessages.scrollTop)
})

const socket = io();



// join chat room

socket.emit('join_room', {room, username});



socket.on('message' , (msg) => {
  console.log(msg);
  outputMessage(msg);
})



function outputMessage(message) {

  const div = document.createElement('div');
  div.className = 'message';
  
  div.innerHTML = `
    <p class = "meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
      ${message.text}
    </p>
  `;

  document.querySelector(".chat-messages").appendChild(div);

}




socket.on('online_users', ({room, users}) => {
  outputRoomName(room);
  outputOnlineUsers(users);
})

socket.on('online_users', ({room, users}) => {
  outputRoomName(room);
  outputOnlineUsers(users);
})



function outputRoomName(room) {
  console.log(`Room ${room}`)
  document.querySelector("#room-name").textContent = room;
}

function outputOnlineUsers(users) {
  const usersList = document.querySelector("#users");
  usersList.innerHTML = "";
  console.log(users);
  users.forEach(user => {
    usersList.innerHTML += `<li>${user.username}</li>`;
  });  
}