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
