function addReimbursementToTable(reimbursement) {
    const tbody = document.getElementById('mgr-reimbs-table-body');
    tbody.innerHTML += `
    <tr>
      <th scope="row">${reimbursement.reimbId}</th>
      <td>${reimbursement.reimbAmount}</td>
      <td>${reimbursement.reimbSubmitted}</td>
      <td>${reimbursement.reimbResolved}</td>
      <td>${reimbursement.reimbDescription}</td>
      <td>${reimbursement.reimbAuthor}</td>
      <td>${reimbursement.reimbResolver}</td>
      <td>${reimbursement.reimbStatusId}</td>
      <td>${reimbursement.reimbTypeId}</td>
      <td><button type="button" class="btn btn-success" onclick="updateReimbStatus(${reimbursement.reimbId}, 1)">Approve</button></td>
      <td><button type="button" class="btn btn-danger" onclick="updateReimbStatus(${reimbursement.reimbId}, 2)">Deny</button></td>
    </tr>
    `
}

function updateReimbStatus(reimbId, reimbStatusId) {
    let userObject = JSON.parse(localStorage.getItem("user"));
    let reimbResolver = userObject.userId;
    const newInfo = { reimbId, reimbStatusId, reimbResolver };
    fetch('http://localhost:3000/reimbursement/updateStatus', {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        newInfo: 'include',
        body: JSON.stringify(newInfo)
    })
    alert("Reimbursement sucessfully updated!")
    window.location = 'http://localhost:3000/mgr-home/mgr-home.html';
}

function findAll(event) {
    event.preventDefault();

    const tbody = document.getElementById('mgr-reimbs-table-body');
    tbody.innerHTML = "";

    fetch('http://localhost:3000/reimbursement/')
    .then(res => res.json())
    .then(res => {
        res.forEach(reimbursement => {
            addReimbursementToTable(reimbursement);
        })
    })
    .catch(err => {
        console.log(err);
    })
}

function findById(event) {
    event.preventDefault();

    const tbody = document.getElementById('mgr-reimbs-table-body');
    tbody.innerHTML = "";

    let requestedId = document.getElementById("input-id").value;
    fetch('http://localhost:3000/reimbursement/' + requestedId)
        .then(res => res.json())
        .then(res => {
            res.forEach(reimbursement => {
                addReimbursementToTable(reimbursement);
            })
        })
        .catch(err => {
            console.log(err);
        })
}