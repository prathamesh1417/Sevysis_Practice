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

    const emailInput = document.querySelector("#email");
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    document.querySelectorAll(".input-group .error").forEach(field => field.classList.remove("error"));
    document.querySelectorAll(".error-text").forEach(errorText => errorText.remove());

    if (!emailRegex.test(email)) {
        displayError(emailInput, "Invalid Email");
    }
    if (!passwordRegex.test(password)) {
        displayError(passwordInput, "Invalid Password");
    }

    const errorInputs = document.querySelectorAll(".input-group .error");
    if (errorInputs.length === 0) {
        sessionStorage.setItem('isLoggedIn', true);
        sessionStorage.setItem('isPasswordReset', false);
        window.location.href = 'dashboard.html'; // Redirect to the dashboard page
    }
};

// Event listeners
passToggleBtn.addEventListener('click', () => {
    const isPassword = passwordInput.type === "password";
    passToggleBtn.className = isPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye";
    passwordInput.type = isPassword ? "text" : "password";
});

form.addEventListener("submit", processFormData);

// Redirect if already logged in
window.addEventListener('load', () => {
    if (sessionStorage.getItem('isLoggedIn')) {
        window.location.href = 'dashboard.html'; // Redirect to the dashboard page
    }
});
