const socket = io();
let username = '';

function setUsername() {
  const input = document.getElementById('usernameInput');
  username = input.value.trim();
  if (username) {
    socket.emit('setUsername', username);
    document.getElementById('popup').style.display = 'none';
    document.getElementById('chatContainer').style.display = 'block';
  }
}

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

socket.on('chat message', function(msg) {
  const item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});
