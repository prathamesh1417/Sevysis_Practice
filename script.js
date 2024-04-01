class SessionManager {
    constructor() {
        this.init();
    }

    async init() {
        // Check if the user is logged in
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        const isPasswordReset = sessionStorage.getItem('isPasswordReset');

        // If not logged in or password was reset, redirect to the login page without displaying any content
        if (!isLoggedIn || isPasswordReset) {
            sessionStorage.removeItem('isPasswordReset');
            window.location.href = 'login.html';
        } else {
            // If logged in and password was not reset, display the content and update the URL state
            document.body.style.display = 'block';
            history.pushState(null, null, window.location.href);
        }
    }

    logout() {
        // Remove the logged-in status and redirect to the login page
        sessionStorage.removeItem('isLoggedIn');
        window.location.href = 'login.html';
    }

    handlePopState() {
        // Check if the user is logged in when navigating with the browser's back and forward buttons
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');

        // If not logged in, redirect to the login page
        if (!isLoggedIn) {
            window.location.href = 'login.html';
        } else {
            // If logged in, maintain the current state
            history.pushState(null, null, window.location.href);
        }
    }
}

// Instantiate the SessionManager
const sessionManager = new SessionManager();

// Expose the logout function to the global window object
window.logout = sessionManager.logout.bind(sessionManager);

// Handle browser back and forward navigation
window.onpopstate = sessionManager.handlePopState.bind(sessionManager);

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
  
  