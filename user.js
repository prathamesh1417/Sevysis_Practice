document.getElementById('loginButton').addEventListener('click', function() {
    window.location.href = 'login.html'; // Replace 'login.html' with the actual login page URL
});



const responses = {
    "hello": "Hi there! How can I assist you today?",
    "sevysis": "Here you will get a overview of our company, it's services, & many more.visit Sevysis.<a href='' target='_blank'>Visit Website</a>",
    "how are you?": "I'm just a bot, but I'm here to help you!",
    "need help": "How I can help you today?",
    "bye": "Goodbye! Have a great day!",
    "default": "I'm sorry, I didn't understand that. Want to connect with expert?",
    "expert": "Great! Please wait a moment while we connect you with an expert.",
    "no": "Okay, if you change your mind just let me know!"
};
document.getElementById('chatbot-toggle-btn').addEventListener('click', toggleChatbot);
document.getElementById('close-btn').addEventListener('click', toggleChatbot);
document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
function toggleChatbot() {
    const chatbotPopup = document.getElementById('chatbot-popup');
    chatbotPopup.style.display = chatbotPopup.style.display === 'none' ? 'block' : 'none';
}
function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    if (userInput !== '') {
        appendMessage('user', userInput);
        respondToUser(userInput.toLowerCase());
        document.getElementById('user-input').value = '';
    }
}
function respondToUser(userInput) {
    const response = responses[userInput] || responses["default"];
    setTimeout(function() {
        appendMessage('bot', response);
    }, 500);
}
function appendMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageElement.innerHTML = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
    if (sender === 'bot' && message === responses["default"]) {
        const buttonYes = document.createElement('button');
        buttonYes.textContent = '✔ Yes';
        buttonYes.onclick = function() {
            appendMessage('bot', responses["expert"]);
        };
        const buttonNo = document.createElement('button');
        buttonNo.textContent = '✖ No';
        buttonNo.onclick = function() {
            appendMessage('bot', responses["no"]);
        };
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        buttonContainer.appendChild(buttonYes);
        buttonContainer.appendChild(buttonNo);
        chatBox.appendChild(buttonContainer);
    }
}

// JavaScript to animate the counting
// JavaScript to animate the counting with infinite loop and slow animation
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.indicator-value');
    counters.forEach(counter => {
      const updateCounter = () => {
        const target = +counter.getAttribute('data-target');
        let c = +counter.innerText;
  
        const increment = target / 20000; // Slower increment value
  
        if(c < target) {
            counter.innerText = `${Math.ceil(c + increment)}`;
            setTimeout(updateCounter, 50); // Slower animation speed
        } else {
            counter.innerText = '0'; // Reset after reaching the target
            setTimeout(updateCounter, 50); // Continue the loop
        }
      };
      updateCounter();
    });
  });
  