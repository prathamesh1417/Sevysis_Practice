
function submitPrint() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    if (user === "prathameshcparmar@gmail.com" || "Admin1417" && pass === "admin@123") {
        window.location.href = 'dashboard.html';
        
    } else{
            alert("Invalid Username or Password");
    }
};
