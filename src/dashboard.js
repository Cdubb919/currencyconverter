// Redirect if not logged in
if (!localStorage.getItem('isLoggedIn')) {
  window.location.href = "index.html";
}

const logoutBtn = document.getElementById('logoutBtn');
const tableBody = document.querySelector('#reportTable tbody');

// Logout button
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = "index.html";
  });
}

// Load reports
if (tableBody) {
  const reports = JSON.parse(localStorage.getItem('reports')) || [];
reports.reverse().forEach(report => {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${report.date}</td>
    <td>${report.amount}</td>
    <td>${report.currency}</td>
    <td>${report.crypto}</td>
    <td>${report.result}</td>
  `;
  tableBody.appendChild(row);
});
}