// Selectors
const form = document.querySelector("form");
const usernameInput = document.querySelector("#username"); // Add selector for username
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

    const username = usernameInput.value.trim(); // Get the username value
    const email = document.querySelector("#email").value.trim();
    const password = passwordInput.value.trim();

    // Regex patterns
    const usernameRegex = /^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/; // Username regex pattern
    const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    // Clear previous errors
    document.querySelectorAll(".input-group .error").forEach(field => field.classList.remove("error"));
    document.querySelectorAll(".error-text").forEach(errorText => errorText.remove());

    // Validate username, email, and password
    if (!usernameRegex.test(username)) {
        displayError(usernameInput, "Invalid Username");
    }
    if (!emailRegex.test(email)) {
        displayError(document.querySelector("#email"), "Invalid Email");
    }
    if (!passwordRegex.test(password)) {
        displayError(passwordInput, "Create a valid Password");
    }

    // Check for any errors before proceeding
    const errorInputs = document.querySelectorAll(".input-group .error");
    if (errorInputs.length > 0) return;

    // Session management
    sessionStorage.setItem('username', username); // Store username
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('password', password);

    // Redirect to dashboard or appropriate page after successful login
    window.location.href = 'dashboard.html';
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
    const username = sessionStorage.getItem('username'); // Retrieve username
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');

    // Pre-fill the form if session data exists
    if (username && email && password) {
        usernameInput.value = username;
        document.querySelector("#email").value = email;
        passwordInput.value = password;
    }
});
