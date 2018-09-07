function login(event) {
    event.preventDefault();
    let username = document.getElementById('input-username').value;
    let password = document.getElementById('input-password').value;
    
    const credentials = { username, password };
    fetch('http://localhost:3000/users/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(credentials)
  })
    .then(resp => {
      if (resp.status === 401) {
        document.getElementById('error-message').innerText = 'Invalid Credentials';
      } else if (resp.status === 200) {
        return resp.json();
      } else {
        document.getElementById('error-message').innerText = 'Failed to Login at this time';
      }
      throw 'Failed to login';
    })
    .then(resp => {
      localStorage.setItem('user', JSON.stringify(resp));

      if (localStorage.user.includes(`"roleId":1`)) {
        window.location = 'http://localhost:3000/mgr-home/mgr-home.html';
      }
      else {
        window.location = 'http://localhost:3000/emp-home/emp-home.html';
      }
    })
    .catch(err => {
      console.log(err);
    });
}