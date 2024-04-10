// Function to display the content without session checks
const form = document.querySelector('form');
const fullname = document.getElementById('name');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const msg = document.getElementById('message');

const displayError = (inputField, errorMessage) => {
    // Check if an error message is already displayed
    let errorElement = inputField.parentElement.querySelector('.error-text');
    if (!errorElement) {
        // If there is no error message, create a new one
        errorElement = document.createElement("div");
        errorElement.classList.add("error-text");
        inputField.parentElement.appendChild(errorElement);
    }
    // Update the error message
    errorElement.textContent = errorMessage;
    errorElement.style.color = "red";
    inputField.style.borderColor = "red";
};

// Function to clear errors
const clearErrors = () => {
    document.querySelectorAll('.error-text').forEach(errorText => {
        errorText.textContent = '';
    });
    const inputFields = [fullname, email, subject, msg];
    inputFields.forEach(field => field.style.borderColor = "");
};


// Email validation regex
const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

function sendEmail() {
    clearErrors(); // Clear all previous errors

    // Validate fields
    let valid = true;
    if (!fullname.value.trim()) {
        displayError(fullname, "Name is required.");
        valid = false;
    }
    if (!email.value.trim()) {
        displayError(email, "Email is required.");
        valid = false;
    } else if (!emailRegex.test(email.value.trim())) {
        displayError(email, "Please enter a valid email address.");
        valid = false;
    }
    if (!subject.value.trim()) {
        displayError(subject, "Subject is required.");
        valid = false;
    }
    if (!msg.value.trim()) {
        displayError(msg, "Message is required.");
        valid = false;
    }
    // If all fields are valid, send the email
    if (valid) {
        const bodyMessage = `Name: ${fullname.value} <br> Email: ${email.value}
        <br> Subject: ${subject.value} <br> Message: ${msg.value}`;
        
        Email.send({
            Host: "smtp.elasticemail.com",
            Username: "prathamesh.184054@gmail.com",
            Password: "F5F3E1ACEB858FED658D2FBBF82892D76D36",
            To: 'prathamesh.184054@gmail.com',
            From: "prathamesh.184054@gmail.com",
            Subject: subject.value,
            Body: bodyMessage
        }).then(
            message => {
                if (message == "OK") {
                    Swal.fire({
                        title: "Success!",
                        text: "Enquiry sent Successfully!",
                        icon: "success"
                      });
                }
            }
        );
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    sendEmail();

    form.reset();
    return false;
});




function displayContent() {
    document.body.style.display = 'block';
}

// Function to handle logout without session management
function logout() {
    window.location.href = 'login.html';
}

// Expose the logout function to the global window object
window.logout = logout;

// Call displayContent on page load to show the content
displayContent();

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
  

  
  