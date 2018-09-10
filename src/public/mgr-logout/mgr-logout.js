function logout(event) {
    event.preventDefault();

    localStorage.removeItem('user');
    alert("You are now logged out!");

    window.location = 'http://localhost:3000/login/login.html';
}