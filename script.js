// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAWB7L2VChohiYcqqvvmYjxMWx5ZMlJEoI",
    authDomain: "chatapp-2e90b.firebaseapp.com",
    databaseURL: "https://chatapp-2e90b-default-rtdb.firebaseio.com",
    projectId: "chatapp-2e90b",
    storageBucket: "chatapp-2e90b.appspot.com",
    messagingSenderId: "482873746706",
    appId: "1:482873746706:web:a3bf3b30128c1436477fcb"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Load existing messages on page load
window.onload = function () {
    loadMessages();
};

// Function to load existing messages
function loadMessages() {
    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML = ""; // Clear the chat box

    db.ref("messages").once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const msg = childSnapshot.val();
            addMessageToChat(msg.user, msg.text);
        });
    });

    // Listen for new messages in real-time
    db.ref("messages").on("child_added", function (snapshot) {
        const msg = snapshot.val();
        addMessageToChat(msg.user, msg.text);
    });
}

// Function to send a message
function sendMessage() {
    const username = document.getElementById("username").value;
    const message = document.getElementById("message").value;
    if (username.trim() === "" || message.trim() === "") return;

    db.ref("messages").push({
        user: username,
        text: message
    });

    document.getElementById("message").value = "";
}

// Function to add a message to chat UI
function addMessageToChat(user, text) {
    const chatBox = document.getElementById("chat-box");
    const msgElement = document.createElement("div");
    msgElement.textContent = `${user}: ${text}`;
    chatBox.appendChild(msgElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to latest message
}
