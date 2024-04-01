// Selectors
const form = document.querySelector("form");
const passwordInput = document.querySelector("#password");
const passToggleBtn = document.querySelector("#togglePassword");

// Function to display error
const displayError = (inputField, errorMessage) => {
    inputField.classList.add("error");
    const errorElement = document.createElement("small");
    errorElement.classList.add("error-text");
    errorElement.textContent = errorMessage;
    inputField.parentElement.appendChild(errorElement);
};

// Function to handle form data
const processFormData = (event) => {
    event.preventDefault();

    const email = document.querySelector("#email").value.trim();
    const password = passwordInput.value.trim();

    // Regex patterns
    const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const capitalLetterRegex = /^[A-Z]/;
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    // Clear previous errors
    document.querySelectorAll(".input-group .error").forEach(field => field.classList.remove("error"));
    document.querySelectorAll(".error-text").forEach(errorText => errorText.remove());

    // Validate email and password
    if (!emailRegex.test(email)) {
        displayError(document.querySelector("#email"), "Invalid Email");
    }
    if (!capitalLetterRegex.test(password)) {
        displayError(passwordInput, "Password must start with an uppercase letter");
    }
    if (!passwordRegex.test(password)) {
        displayError(passwordInput, "Invalid Password");
    }

    // Check for any errors before proceeding
    const errorInputs = document.querySelectorAll(".input-group .error");
    if (errorInputs.length > 0) return;

    // Session management
    // Store email and password
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('password', password);
    sessionStorage.setItem('isPasswordReset', true);

    // Redirect to login page after successful password reset
    window.location.href = 'login.html';
};

// Event listeners
passToggleBtn.addEventListener('click', () => {
    const isPassword = passwordInput.type === "password";
    passToggleBtn.className = isPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye";
    passwordInput.type = isPassword ? "text" : "password";
});

form.addEventListener("submit", processFormData);

// On page load, check if session data exists and pre-fill the form
window.addEventListener('load', () => {
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');

    // Pre-fill the form if session data exists
    if (email && password) {
        document.querySelector("#email").value = email;
        passwordInput.value = password;
    }
});
