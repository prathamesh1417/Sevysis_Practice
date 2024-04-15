
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

// JavaScript Code
const responses = {
  "hello": "Hi there! How can I assist you today?",
  " What are your products/services?": "Sevysis is one service provider platform for education system, healthcare system,  HRMS system, web development, mobile app development, change management in existing/application software and customize development related website, and all other platform",
  "how are you?": "I'm just a bot, but I'm here to help you!",
  
  "Can you provide information about your company's values and mission?": "Please check company home page for value, mission and vision",
  "Can you tell me more about [specific product/service]?": " For detail information regarding service, please go to sevysis official website and click on “services” section",
    "Do you offer customization options": "Yes",
  "What features does [product/service] have?": "Have lot of innovative feature as well as skilled team ready for customization as per your requirement",
  "expert": "Great! Please wait a moment while we connect you with an expert.",
  "no": "Okay, if you change your mind just let me know!"
};

const suggestionQuestions = [
  "Is my personal information secure?",
  "Do you offer customization options?",
  "Are you looking for information about our services?",
  "Would you like to know more about our company?",
  "Do you have any technical issues?"
];

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
  if (chatbotPopup.style.display === 'block') {
    populateSuggestions();
  }
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
  const chatBox = document.getElementById('message-container');
  const messageElement = document.createElement('div');
  messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
  messageElement.innerHTML = message;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function populateSuggestions() {
  const suggestionsContainer = document.getElementById('suggestions-container');
  suggestionsContainer.innerHTML = ''; 
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


function handleSuggestionClick(question) {
  const suggestionResponses = {
    "Is my personal information secure?": "Yes, Completely secure",
    "Do you offer customization options?": "Yes",
    "Are you looking for information about our services?": "Yes, what would you like to know about our services? <a href='#' onclick='openEnquiryModal();return false;'>Enquire here</a>",
    "Would you like to know more about our company?": "Certainly! What do you want to know about us? <a href='#' onclick='openEnquiryModal();return false;'>Enquire here</a>",
    "Do you have any technical issues?": " Please, go with the enquiry form. Our expert will contact you soon <a href='#' onclick='openEnquiryModal();return false;'>Enquire here</a>"
  };
  const response = suggestionResponses[question];
  appendMessage('bot', response);
}

// Function to open the enquiry modal
// Function to open the enquiry modal
function openEnquiryModal() {
  // Trigger the modal to open
  $('#enquiryModal').modal('show');
}

// Function to close the enquiry modal
function closeEnquiryModal() {
  // Trigger the modal to close
  $('#enquiryModal').modal('hide');
}

// Add this function to the form submission event or a close button within the modal
document.getElementById('enquiryForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission
  
  // Show the spinner
  document.getElementById('spinner').style.display = 'block';
  
  // Simulate form submission process
  setTimeout(function() {
    // Hide the spinner after the 'submission' is complete
    document.getElementById('spinner').style.display = 'none';
    
    // Append a thank you message to the chat message section
    appendMessage('bot', 'Thank you for your enquiry. We will get back to you shortly.');
    
    // Close the enquiry modal
    closeEnquiryModal();
    
    // Clear the form inputs
    document.getElementById('enquiryForm').reset();
  }, 2000); // Adjust the timeout duration as needed
});



// If you have a close button within the modal, add an event listener to it
document.querySelector('#enquiryModal .close').addEventListener('click', closeEnquiryModal);
// Add this function where you handle the rest of your button events
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
    
    document.getElementById('countrySelect').addEventListener('change', function() {
        var selectedOption = this.options[this.selectedIndex];
        var flagClass = selectedOption.dataset.countryFlag;
        var countryCode = selectedOption.value;
        var flagElement = document.getElementById('selected-flag');
        flagElement.className = 'flag-icon ' + flagClass;
        document.getElementById('countryCode').value = countryCode;
    });
});
