function createReimbursement(event) {
    event.preventDefault();

    const reimbAmount = document.getElementById('reimb-input-amount').value;
    const reimbSubmitted = document.getElementById('reimb-input-submitted').value;
    const reimbDescription = document.getElementById('reimb-textarea-desc').value;
    const reimbTypeId = document.getElementById('reimb-select-type').value;

    let userObject = JSON.parse(localStorage.getItem("user"));
    let reimbAuthor = userObject.userId;
    const localReimbursement = { reimbAmount, reimbSubmitted, reimbDescription,
         reimbAuthor, reimbTypeId }

    console.log(localReimbursement);
    fetch('http://localhost:3000/reimbursement/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(localReimbursement)
    })
        .then(resp => {
            if (resp.status === 401) {
                document.getElementById('error-message').innerText = 'Not loggged in as a valid user';
            } else if (resp.status === 200) {
                return resp.json();
            } else {
                document.getElementById('error-message').innerText = 'Failed to create reimbursement at this time';
            }
            throw 'Failed to create reimbursement';
        })
        .then(resp => {
            alert("Reimbursement successfully submitted!");
            window.location = 'http://localhost:3000/emp-home/emp-home.html';
        })
        .catch(err => {
            console.log(err);
        });
}