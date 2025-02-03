let chatBox = document.getElementById('chat-box');
let messageInput = document.getElementById('message');

function sendMessage() {
  const message = messageInput.value.trim();
  if (message) {
    let messageElement = document.createElement('div');
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    messageInput.value = '';
    
    // Auto-scroll to the latest message
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

// Simulate a message every 3 seconds (you would replace this with real-time functionality)
setInterval(() => {
  let messageElement = document.createElement('div');
  messageElement.textContent = "Simulated message at " + new Date().toLocaleTimeString();
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}, 3000);
