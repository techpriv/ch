function sendMessage() {
    const userMessage = document.getElementById('userInput').value;
    const messagesContainer = document.getElementById('messages');

    if (userMessage.trim()) {
        // Display user's message
        const userMessageElement = document.createElement('div');
        userMessageElement.classList.add('user-message');
        userMessageElement.textContent = userMessage;
        messagesContainer.appendChild(userMessageElement);

        // Clear the input field
        document.getElementById('userInput').value = '';

        // Simulate response generation by fetching updated response from GitHub (GitHub Actions triggered the update)
        fetch('response.txt')
            .then(response => response.text())
            .then(data => {
                const botMessageElement = document.createElement('div');
                botMessageElement.classList.add('bot-message');
                botMessageElement.textContent = data;
                messagesContainer.appendChild(botMessageElement);
            });
    }
}
