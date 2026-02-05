/* =========================
   MOBILE NAV DROPDOWN
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

  // Close nav when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      navMenu.classList.remove('open');
      toggleBtn.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });

  // Close nav when clicking a menu item
  const navLinks = document.querySelectorAll('.nav-menu a, .nav-menu button');
  navLinks.forEach((link) => {
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
      result.textContent = 'Please enter an amount';
      return;
    }

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=${currency}`
      );

      const data = await response.json();
      const price = data[crypto][currency];
      const converted = amount / price;

      result.textContent = `${amount} ${currency.toUpperCase()} ≈ ${converted.toFixed(6)} ${crypto.toUpperCase()}`;
    } catch (error) {
      result.textContent = 'Failed to fetch conversion data';
    }
  });
}

const quickButtons = document.querySelectorAll('.quick-convert button');
const cryptoSelect = document.getElementById('crypto');

quickButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    cryptoSelect.value = btn.dataset.crypto;
  });
});

/* =========================
   LOGIN MODAL
========================= */

const loginButtons = document.querySelectorAll('.login-btn');
const modal = document.getElementById('loginModal');
const closeModal = document.querySelector('.modal-close');

loginButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    modal.classList.add('active');
  });
});

if (closeModal) {
  closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
  });
}

// Close modal when clicking outside content
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}
