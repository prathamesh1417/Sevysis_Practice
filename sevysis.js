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

$(document).ready(function(){
  $('.slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
  });
});
