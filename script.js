document.addEventListener('DOMContentLoaded', function() {
  var dropdown = document.querySelector('.dropdown');
  var dropdownMenu = document.querySelector('.dropdown-menu');

  dropdown.addEventListener('click', function(event) {
    event.stopPropagation();
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
  });

  document.addEventListener('click', function() {
    dropdownMenu.style.display = 'none';
  });
});
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
      // Define the HTML template
      const htmlTemplate = `
       
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
       body {
        font-family: Georgia, "Times New Roman", Times, serif;
        color: #333;
    }
    .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 10px;
        background-color: #f9f9f9;
    }
    .h2{
      
      text-align: center;
      text-transform: uppercase;
    }
    .logo {
        text-align: center;
        margin-bottom: 20px;
    }
    .content {
        margin-bottom: 20px;
    }
    .footer {
        text-align: left;
        margin-top: 20px;
    }
    img {
        max-width: 90%;
        height: auto;
    }
      </style>
    </head>
    <body>
        <body>
            <div class='container'>
            <div class='logo'>
            <img src='https://i.postimg.cc/ncMRL37r/Untitled-3-6-removebg-preview.png' alt='School Logo'>
        </div>
        <h2>Client's Enquiry:-</h2>
        <div class='content'>
        
            <p>Client Name : ${fullname.value},</p>
            <p>Email Id : ${email.value}</p>
            <p>Mobile Number :<strong> ${number.value}.</strong></p>
            <p>Subject :<strong> ${subject.value}.</strong></p>
            <p>Message : ${msg.value}.</strong></p>
           
        </div>
        <div class='footer'>
            <p>Sevysis<br>Pune, Maharashtra</p>
            <p>End of the Message</p>
            
        </div>
    </div>
    </body>
      <!-- Add more HTML content as needed -->
    </body>
    
</html>
      `;
       
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
            Body: htmlTemplate
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
const smileEmoji = '😊';
console.log(smileEmoji); // Output: 😊

const responses = {
  "hello": "Hello user! I hope you're doing well, How may I assist you? 😊",
  "hi": "Hi user! I hope you're doing well, How may I assist you? 😊",
  "hey": "Hey user! I hope you're doing well, How may I assist you? 😊",
  "what are your products/services": "Sevysis is one service provider platform for education system, healthcare system,  HRMS system, web development, mobile app development, change management in existing/application software and customize development related website, and all other platform",
  "how are you": "I'm just a bot, but I'm here to help you! 😊",
  "can you provide information about your company's values and mission": "Please check company home page for value, mission and vision 🧐",
  "can you tell me more about [specific product/service]": " For detail information regarding service, please go to sevysis official website and click on “services” section",
  "do you offer customization options": "Yes",
  "what features does [product/service] have": " We Have a lot of innovative feature as well as skilled team ready for customization as per your requirement",
  "do you offer any discounts or promotions": "Please, go with the enquiry form. Our expert will contact you soon <a href='#' onclick='openEnquiryModal();return false;'>Enquire here</a>",
  "do you have any packages or bundles available":"Please, go with the enquiry form and mention your query.Our expert will contact you soon <a href='#' onclick='openEnquiryModal();return false;'>Enquire here</a>",
  "can I upgrade my service plan":"Yes",
  ".Do you offer any add-on services or features":"Yes",
  "can you provide a tutorial or user manual": "Once service delivered, our expert team will contact you soon and team will give manual kit"
};

const suggestionQuestions = [
  "Is my personal information secure?",
  "How much does[product/service] cost",
  "How can I schedule an appointment?",
  "What payment methods do you accept?",
  "Do you have any technical issues?",
  "Do you provide international service?",
  "Do you offer customization options?",
  
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
    respondToUser(userInput.toLowerCase()|| userInput.toUpperCase());
    document.getElementById('user-input').value = '';
  }
}


function respondToUser(userInput) {
  const response = responses[userInput] || "I'm sorry, I didn't get that! If you need any help, reach out to us through <a href='#' onclick='openEnquiryModal()'>this link</a>.";
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
    "Is my personal information secure?": "Yes, Completely secure 😉",
    "How much does[product/service] cost": "Depends on requirement. For detail, please fill up enquiry form 🧐 <a href='#' onclick='openEnquiryModal();return false;'>Enquire here</a>",
    "How can I schedule an appointment?": " Please, go with the enquiry form and mention your query 🧐.Our expert will contact you soon <a href='#' onclick='openEnquiryModal();return false;'>Enquire here</a>",
    "What payment methods do you accept?": " Please, go with the enquiry form. Our expert will contact you soon <a href='#' onclick='openEnquiryModal();return false;'>Enquire here</a>",
    "Do you have any technical issues?": " Please, go with the enquiry form. Our expert will contact you soon 🧐 <a href='#' onclick='openEnquiryModal();return false;'>Enquire here</a>",
    "Do you provide international service?": "Yes",
    "Do you offer customization options?": "Yes"
   
  };
  const response = suggestionResponses[question];
  appendMessage('bot', response);
}



function openEnquiryModal() {
  
  $('#enquiryModal').modal('show');
}


function closeEnquiryModal() {
  
  $('#enquiryModal').modal('hide');
}


document.getElementById('enquiryForm').addEventListener('submit', function(event) {
  event.preventDefault(); 
  
  
  document.getElementById('spinner').style.display = 'block';
  
  
  setTimeout(function() {
    
    document.getElementById('spinner').style.display = 'none';
    
    
    appendMessage('bot', 'Thank you for your enquiry. We will get back to you shortly.');
    
    
    closeEnquiryModal();
    
    
    document.getElementById('enquiryForm').reset();
  }, 2000); 
});




document.querySelector('#enquiryModal .close').addEventListener('click', closeEnquiryModal);

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

