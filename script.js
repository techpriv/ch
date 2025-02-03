// Firebase Configuration (Replace with your own Firebase config)
const firebaseConfig = {
  apiKey: "AIzaSyAWB7L2VChohiYcqqvvmYjxMWx5ZMlJEoI",
  authDomain: "chatapp-2e90b.firebaseapp.com",
  databaseURL: "https://chatapp-2e90b-default-rtdb.firebaseio.com",
  projectId: "chatapp-2e90b",
  storageBucket: "chatapp-2e90b.firebasestorage.app",
  messagingSenderId: "482873746706",
  appId: "1:482873746706:web:a3bf3b30128c1436477fcb"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Send message to Firebase
function sendMessage() {
    const username = document.getElementById('username').value;
    const message = document.getElementById('message').value;
    if (username.trim() === "" || message.trim() === "") return;
    
    db.ref("messages").push({
        user: username,
        text: message
    });
    document.getElementById('message').value = "";
}

// Listen for new messages and update chat box
db.ref("messages").on("child_added", function(snapshot) {
    const msg = snapshot.val();
    const chatBox = document.getElementById('chat-box');
    const msgElement = document.createElement('div');
    msgElement.textContent = `${msg.user}: ${msg.text}`;
    chatBox.appendChild(msgElement);
    chatBox.scrollTop = chatBox.scrollHeight;
});
