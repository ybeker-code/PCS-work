const loginForm = document.querySelector('#loginForm');
const userName = document.querySelector('#name');
const chat = document.querySelector('#chat')
chat.style.display = 'none';
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  loginForm.style.display = 'none';
  chat.style.display = 'block';
  socketIo.emit('login', userName.value);
})


// console.log('js works');

const socketIo = io();

const messages = document.querySelector('#messages');
socketIo.on('msg', msg => {
  messages.innerHTML += `<div>${msg}</div>`;
});

const messageInput = document.querySelector('#messageInput');

document.querySelector('#messageForm').addEventListener('submit', e => {
  e.preventDefault();
  socketIo.emit('msg', messageInput.value);
});
