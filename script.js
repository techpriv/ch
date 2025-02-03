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

    // Fetch all messages from the database
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
    const username = document.getElementById("username").value.trim();
    const message = document.getElementById("message").value.trim();

    if (username === "" || message === "") {
        alert("Please enter both your name and a message.");
        return;
    }

    console.log("Sending message:", username, message);  // Debugging line

    // Push message to Firebase Realtime Database
    db.ref("messages").push({
        user: username,
        text: message
    }).then(() => {
        console.log("Message sent successfully!");  // Debugging line
        document.getElementById("message").value = ""; // Clear the message input after sending
    }).catch((error) => {
        console.error("Error sending message:", error);  // Debugging line
        alert("Failed to send message. Please try again.");
    });
}

// Function to add a message to chat UI
function addMessageToChat(user, text) {
    const chatBox = document.getElementById("chat-box");
    const msgElement = document.createElement("div");
    msgElement.textContent = `${user}: ${text}`;
    chatBox.appendChild(msgElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to latest message
}
