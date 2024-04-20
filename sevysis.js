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
const number = document.getElementById('number');
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


$(document).ready(function(){
    $('.slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false, 
      fade: true,
      autoplay: true, 
      autoplaySpeed: 2000, 
    });
  
    
    $('.slider__dots .dot').on('click', function() {
      var dotIndex = $(this).index();
      $('.slider').slick('slickGoTo', dotIndex);
    });
  
    
    $('.slider').on('afterChange', function(event, slick, currentSlide) {
      $('.slider__dots .dot').removeClass('active');
      $('.slider__dots .dot').eq(currentSlide).addClass('active');
    });
  });
  