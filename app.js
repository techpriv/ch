// Import Firebase 
import (initializeApp} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js"; 
import (getDatabase, ref, push, onChildAdded] from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js"; 

// Firebase Config 
const firebaseConfig = {
  apiKey: "AIzaSyDohkyAJIUHop4d7eqbdbmVDUidHtzlAhI",
  authDomain: "chatapp-83001.firebaseapp.com",
  projectId: "chatapp-83001",
  storageBucket: "chatapp-83001.firebasestorage.app",
  messagingSenderId: "988283174951",
  appId: "1:988283174951:web:f4dba87388716ed17a4e02",
  measurementId: "G-T0FXLY7YTL"
};

// Initialise Firebase 
const app - initializeApp(firebaseConfig); 
const db getDatabase (app); 

//DOM Elements 
const chatBox document.querySelector(".messages"); 
const userInput document.getElementById('username'); 
const messageInput document.getElementById('message'); 
const sendBtn document.getElementById("send-btn"); 

// Firebase DB Reference 
const messageRef ref(db, "liveChat");

// Send Message 
sendBtn.addEventListener("click", sendMessage); 
messageInput.addEventListener("keydown", (event) => { 
	if(event.key "Enter"){ 
		sendMessage(); 
	}
});

function sendMessage(){
	const username = userInput.value.trim();
	const message = messageInput.value.trim();
	
	if(username && message){
		const timestamp = new Date().toISOString();
		push(messageRef, {
			username,
			message,
			timestamp,
		})
		.then(() => {
			console.log("Message sent successfully");
		});
		
		messageInput.value = '';
	}else{
		console.error("Username or message is emmpty");
	}
}

// Listen for new message 
onChildAdded(messageRef, (data) => { 
	const {username, message, timestamp } = data.val(); 
	displayMessage(username, message, timestamp);
});

// Display message function
function displayMessage(username, message, timestamp){
	const messageDiv = document.createElement('div'); 
	messageDiv.classList.add("message"); 
	
	const span1 = document.createElement("span"); 
	const profileImg = document.createElement("img"); 
	profileImg.src = "assets/images/user.png"; 
	profileImg.classList.add("profilelmg"); 

	span1.appendChild(profileImg); 

	const userName = document.createElement("p"); 
	userName.classList.add("UserName"); 
	userName.textContent = '${username}'; 
	span1.appendChild(userName); 

	const span2 document.createElement("span");
	span2.textContent = message;
 
	const span3 = document.createElement("span"); 
	const date = new Date(timestamp); 
	const formattedTime = date.toLocaleString("en-US", { 
		dateStyle: "short", 
		timeStyle: "short", 
	}); 

	span3.textContent = formattedTime; 

	messageDiv.appendChild(span1); 
	messageDiv.appendChild(span2); 
	messageDiv.appendChild(span3);
 
	chatBox.appendChild (messageDiv);
	chatBox.scrollTop = chatBox.scrollHeight;
}
