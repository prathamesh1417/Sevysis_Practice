// Function to display the content without session checks
const form = document.querySelector('form');
const fullname = document.getElementById('name');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const msg = document.getElementById('message');
const number = document.getElementById('phone');
const displayError = (inputField, errorMessage) => {

    let errorElement = inputField.parentElement.querySelector('.error-text');
    if (!errorElement) {
     
        errorElement = document.createElement("div");
        errorElement.classList.add("error-text");
        inputField.parentElement.appendChild(errorElement);
    }
  
    errorElement.textContent = errorMessage;
    errorElement.style.color = "red";
    inputField.style.borderColor = "red";
};


const clearErrors = () => {
    document.querySelectorAll('.error-text').forEach(errorText => {
        errorText.textContent = '';
    });
    const inputFields = [fullname, email, subject, msg];
    inputFields.forEach(field => field.style.borderColor = "");
};



const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

function sendEmail() {
    clearErrors(); 


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
    if (!number.value.trim()) {
        displayError(number, "Invalid number.");
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
   
    if (valid) {
        const bodyMessage = `Name: ${fullname.value} <br> Email: ${email.value}<br> Number: ${number.value}
        <br> Subject: ${subject.value} <br> Message: ${msg.value}`;
        
        
       
        Email.send({
            SecureToken : "4b985981-407c-4986-b5f6-735991b38e12",
            Password: "F5F3E1ACEB858FED658D2FBBF82892D76D36",
            Authentication: true,
            auth: {
                user: 'prathamesh.184054@gmail.com',
                pass: 'F5F3E1ACEB858FED658D2FBBF82892D76D36'
              },
            DMARC: true,
            To: 'prathamesh.184054@gmail.com',
            From: "prathamesh.184054@gmail.com",
            Port: 2525 ,
            secure: true,
            isTransactional: true,
            spam:false,
            ReplyTo: email.value, 
            Subject: subject.value,
            Body: bodyMessage
        })
    }
    };
    
    
  
    document.getElementById('enquiryForm').addEventListener("submit", (e) => {
        e.preventDefault();
        sendEmail();
    
      
        document.getElementById('enquiryForm').reset();
    });


function displayContent() {
    document.body.style.display = 'block';
}


function logout() {
    window.location.href = 'login.html';
}


window.logout = logout;


displayContent();

// JavaScript code for the chatbot with suggestions

// Responses object
const responses = {
    "hello": "Hi there! How can I assist you today?",
    "sevysis": "Here you will get an overview of our company, its services, & many more. Send an Enquiry to Sevysis.<a href='' target='_blank'>Visit Website</a>",
    "how are you?": "I'm just a bot, but I'm here to help you!",
    "need help": "How can I help you today?",
    "bye": "Goodbye! Have a great day!",
    "default": "I'm sorry, I didn't understand that. Want to connect with an expert?",
    "expert": "Great! Please wait a moment while we connect you with an expert.",
    "no": "Okay, if you change your mind just let me know!"
  };
  
  // Suggestion questions
  const suggestionQuestions = [
    "Can I help you find a product?",
    "Do you need assistance with an order?",
    "Are you looking for information about our services?",
    "Would you like to know more about our company?",
    "Do you have any technical issues?"
  ];
  
  // Event listeners for chatbot buttons
  document.getElementById('chatbot-toggle-btn').addEventListener('click', toggleChatbot);
  document.getElementById('close-btn').addEventListener('click', toggleChatbot);
  document.getElementById('send-btn').addEventListener('click', sendMessage);
  document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
  
  // Toggle chatbot display
  function toggleChatbot() {
    const chatbotPopup = document.getElementById('chatbot-popup');
    chatbotPopup.style.display = chatbotPopup.style.display === 'none' ? 'block' : 'none';
    if (chatbotPopup.style.display === 'block') {
      populateSuggestions();
    }
  }
  
  // Send message
  function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    if (userInput !== '') {
      appendMessage('user', userInput);
      respondToUser(userInput.toLowerCase());
      document.getElementById('user-input').value = '';
    }
  }
  
  // Respond to user input
  function respondToUser(userInput) {
    const response = responses[userInput] || responses["default"];
    setTimeout(function() {
      appendMessage('bot', response);
    }, 500);
  }
  
  // Append message to chat
  function appendMessage(sender, message) {
    const chatBox = document.getElementById('message-container');
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageElement.innerHTML = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  
  // Populate suggestions
  function populateSuggestions() {
    const suggestionsContainer = document.getElementById('suggestions-container');
    suggestionsContainer.innerHTML = ''; // Clear previous suggestions
    suggestionQuestions.forEach(question => {
      const suggestionElement = document.createElement('div');
      suggestionElement.classList.add('suggestion');
      suggestionElement.textContent = question;
      suggestionElement.onclick = function() {
        handleSuggestionClick(question);
      };
      suggestionsContainer.appendChild(suggestionElement);
    });
  }
  
  // Handle suggestion click
  function handleSuggestionClick(question) {
    const suggestionResponses = {
      "Can I help you find a product?": "Sure, what type of product are you looking for?",
      "Do you need assistance with an order?": "I can help with that. What's your order number?",
      "Are you looking for information about our services?": "Yes, what would you like to know about our services?",
      "Would you like to know more about our company?": "Certainly! What do you want to know about us?",
      "Do you have any technical issues?": "I'm here to help. Can you describe the issue?"
    };
    const response = suggestionResponses[question];
    appendMessage('bot', response);
  }
  
  // Append default response buttons
  function appendDefaultResponseButtons(chatBox) {
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
  



document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.indicator-value');
    counters.forEach(counter => {
      const updateCounter = () => {
        const target = +counter.getAttribute('data-target');
        let c = +counter.innerText;
  
        const increment = target / 20000; 
  
        if(c < target) {
            counter.innerText = `${Math.ceil(c + increment)}`;
            setTimeout(updateCounter, 50); 
        } else {
            counter.innerText = '0'; 
            setTimeout(updateCounter, 50); 
        }
      };
      updateCounter();
    });
  });
  
  document.addEventListener("DOMContentLoaded", function() {
    // Function to update the flag when a country is selected
    document.getElementById('countrySelect').addEventListener('change', function() {
        var selectedOption = this.options[this.selectedIndex];
        var flagClass = selectedOption.dataset.countryFlag;
        var countryCode = selectedOption.value;
        var flagElement = document.getElementById('selected-flag');
        flagElement.className = 'flag-icon ' + flagClass;
        document.getElementById('countryCode').value = countryCode;
    });
});
