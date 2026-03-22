/* =========================
   MOBILE NAV
========================= */

const toggleBtn = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (toggleBtn && navMenu) {
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.toggle('open');
    toggleBtn.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });

  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      navMenu.classList.remove('open');
      toggleBtn.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });

  const navLinks = document.querySelectorAll('.nav-menu a, .nav-menu button');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      toggleBtn.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });
}


/* =========================
   CRYPTO CONVERTER
========================= */

const convertBtn = document.getElementById('convertBtn');
const result = document.getElementById('result');

if (convertBtn) {

  convertBtn.addEventListener('click', async () => {

    const amount = document.getElementById('amount').value;
    const currency = document.getElementById('currency').value;
    const crypto = document.getElementById('crypto').value;

    if (!amount) {
      result.textContent = "Please enter an amount";
      return;
    }

    result.textContent = "Fetching crypto price...";

    try {

      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=${currency}`
      );

      const data = await response.json();
      const price = data[crypto][currency];
      const converted = amount / price;

      result.textContent =
        `${amount} ${currency.toUpperCase()} ≈ ${converted.toFixed(6)} ${crypto.toUpperCase()}`;

      // Save conversion if logged in
      if (localStorage.getItem("isLoggedIn")) {

        const reports = JSON.parse(localStorage.getItem("reports")) || [];

        reports.unshift({
          date: new Date().toLocaleString(),
          amount: amount,
          currency: currency.toUpperCase(),
          crypto: crypto.toUpperCase(),
          result: converted.toFixed(6)
        });

        localStorage.setItem("reports", JSON.stringify(reports));
      }

    } catch (error) {

      result.textContent = "API unavailable. Please try again.";

    }

  });

}


/* =========================
   QUICK CRYPTO BUTTONS
========================= */

const quickButtons = document.querySelectorAll('.quick-convert button');
const cryptoSelect = document.getElementById('crypto');

quickButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    cryptoSelect.value = btn.dataset.crypto;
  });
});


/* =========================
   LOGIN + SIGNUP MODALS
========================= */

document.addEventListener("DOMContentLoaded", () => {

  const loginOverlay = document.getElementById("loginModal");
  const signupOverlay = document.getElementById("signupModal");

  const loginBtn = document.getElementById("openLogin");
  const signupBtn = document.querySelector(".signup-btn");

  const loginClose = loginOverlay?.querySelector(".modal-close");
  const loginX = loginOverlay?.querySelector(".modal-x");

  const signupClose = signupOverlay?.querySelector(".modal-close");
  const signupX = signupOverlay?.querySelector(".modal-x");

  const loginSubmit = loginOverlay?.querySelector(".primary-btn");

  function openLogin() {
    loginOverlay?.classList.add("active");
  }

  function closeLogin() {
    loginOverlay?.classList.remove("active");
  }

  function openSignup() {
    signupOverlay?.classList.add("active");
  }

  function closeSignup() {
    signupOverlay?.classList.remove("active");
  }

  loginBtn?.addEventListener("click", openLogin);
  signupBtn?.addEventListener("click", openSignup);

  loginClose?.addEventListener("click", closeLogin);
  loginX?.addEventListener("click", closeLogin);

  signupClose?.addEventListener("click", closeSignup);
  signupX?.addEventListener("click", closeSignup);

  loginOverlay?.addEventListener("click", (e) => {
    if (e.target === loginOverlay) closeLogin();
  });

  signupOverlay?.addEventListener("click", (e) => {
    if (e.target === signupOverlay) closeSignup();
  });

  // Fake login
  loginSubmit?.addEventListener("click", () => {
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "dashboard.html";
  });

  // ESC key closes modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeLogin();
      closeSignup();
    }
  });

});


/* =========================
   NAV AUTH STATE
========================= */

const navLogin = document.querySelector(".nav-login");
const navSignup = document.querySelector(".nav-signup");
const navDashboard = document.querySelector(".nav-dashboard");
const navLogout = document.querySelector(".nav-logout");
const logoutBtn = document.getElementById("logoutBtn");

function updateNav() {

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn) {

    navLogin.style.display = "none";
    navSignup.style.display = "none";
    navDashboard.style.display = "block";
    navLogout.style.display = "block";

  } else {

    navLogin.style.display = "block";
    navSignup.style.display = "block";
    navDashboard.style.display = "none";
    navLogout.style.display = "none";

  }

}

updateNav();

logoutBtn?.addEventListener("click", () => {

  localStorage.removeItem("isLoggedIn");
  updateNav();
  window.location.href = "index.html";

});


/* =========================
   LIVE BITCOIN PRICE TICKER
========================= */

async function updateBTCPrice() {

  const btcEl = document.getElementById("btcPrice");

  if (!btcEl) return;

  try {

    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
    );

    const data = await response.json();

    const price = data.bitcoin.usd;

    btcEl.textContent = "$" + price.toLocaleString();

  } catch {

    btcEl.textContent = "Price unavailable";

  }

}

updateBTCPrice();
setInterval(updateBTCPrice, 10000);