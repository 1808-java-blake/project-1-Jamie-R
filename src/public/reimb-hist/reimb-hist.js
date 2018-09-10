function addReimbursementToTable(reimbursement) {
    const tbody = document.getElementById('employee-reimbs-table-body');
    tbody.innerHTML += `
    <tr>
      <th scope="row">${reimbursement.reimbId}</th>
      <td>${reimbursement.reimbAmount}</td>
      <td>${reimbursement.reimbSubmitted}</td>
      <td>${reimbursement.reimbResolved}</td>
      <td>${reimbursement.reimbDescription}</td>
      <td>${reimbursement.reimbResolver}</td>
      <td>${reimbursement.reimbStatusId}</td>
      <td>${reimbursement.reimbTypeId}</td>
    </tr>
    `
}

let userObject = JSON.parse(localStorage.getItem("user"));
let reimbAuthor = userObject.userId;
fetch('http://localhost:3000/reimbursement/' + reimbAuthor)
    .then(res => res.json())
    .then(res => {
        res.forEach(reimbursement => {
            addReimbursementToTable(reimbursement);
        })
    })
    .catch(err => {
        console.log(err);
    })