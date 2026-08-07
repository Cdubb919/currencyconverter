document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     ELEMENTS
  ========================= */

  const toggleBtn = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  const convertBtn = document.getElementById("convertBtn");
  const amountInput = document.getElementById("amount");
  const currencySelect = document.getElementById("currency");
  const cryptoSelect = document.getElementById("crypto");
  const result = document.getElementById("result");

  const quickButtons = document.querySelectorAll(
    ".quick-convert button"
  );

  const loginOverlay = document.getElementById("loginModal");
  const signupOverlay = document.getElementById("signupModal");

  const loginOpenBtn = document.getElementById("openLogin");
  const signupOpenBtn = document.querySelector(".signup-btn");

  const loginCloseBtn =
    loginOverlay?.querySelector(".modal-close");
  const loginXBtn =
    loginOverlay?.querySelector(".modal-x");

  const signupCloseBtn =
    signupOverlay?.querySelector(".modal-close");
  const signupXBtn =
    signupOverlay?.querySelector(".modal-x");

  const loginSubmitBtn =
    loginOverlay?.querySelector(".primary-btn");

  const createAccountBtn =
    document.getElementById("createAccountBtn");

  const signupName =
    document.getElementById("signupName");

  const signupEmail =
    document.getElementById("signupEmail");

  const signupPassword =
    document.getElementById("signupPassword");

  const signupConfirmPassword =
    document.getElementById("signupConfirmPassword");

  const signupMessage =
    document.getElementById("signupMessage");

  const navLogin = document.querySelector(".nav-login");
  const navSignup = document.querySelector(".nav-signup");
  const navDashboard =
    document.querySelector(".nav-dashboard");
  const navLogout = document.querySelector(".nav-logout");
  const logoutBtn = document.getElementById("logoutBtn");

  /* =========================
     MOBILE NAVIGATION
  ========================= */

  function closeMobileMenu() {
    navMenu?.classList.remove("open");
    toggleBtn?.classList.remove("active");
    toggleBtn?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }

  toggleBtn?.addEventListener("click", (event) => {
    event.stopPropagation();

    const menuIsOpen = navMenu?.classList.toggle("open");

    toggleBtn.classList.toggle("active", menuIsOpen);
    toggleBtn.setAttribute(
      "aria-expanded",
      String(Boolean(menuIsOpen))
    );

    document.body.classList.toggle(
      "menu-open",
      Boolean(menuIsOpen)
    );
  });

  document.addEventListener("click", (event) => {
    const clickedMenu = navMenu?.contains(event.target);
    const clickedToggle = toggleBtn?.contains(event.target);

    if (!clickedMenu && !clickedToggle) {
      closeMobileMenu();
    }
  });

  document
    .querySelectorAll(".nav-menu a")
    .forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });

  /* =========================
     AUTH NAVIGATION
  ========================= */

  function updateNav() {
    const isLoggedIn =
      localStorage.getItem("isLoggedIn") === "true";

    if (navLogin) {
      navLogin.style.display = isLoggedIn
        ? "none"
        : "";
    }

    if (navSignup) {
      navSignup.style.display = isLoggedIn
        ? "none"
        : "";
    }

    if (navDashboard) {
      navDashboard.style.display = isLoggedIn
        ? ""
        : "none";
    }

    if (navLogout) {
      navLogout.style.display = isLoggedIn
        ? ""
        : "none";
    }
  }

  updateNav();

  logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("businessName");

    updateNav();
    closeMobileMenu();

    window.location.href = "index.html";
  });

  /* =========================
     MODALS
  ========================= */

  function openModal(overlay) {
    if (!overlay) return;

    closeMobileMenu();
    overlay.classList.add("active");
    document.body.classList.add("menu-open");

    const firstInput = overlay.querySelector("input");

    window.setTimeout(() => {
      firstInput?.focus();
    }, 100);
  }

  function closeModal(overlay) {
    if (!overlay) return;

    overlay.classList.remove("active");

    if (!document.querySelector(".modal-overlay.active")) {
      document.body.classList.remove("menu-open");
    }
  }

  loginOpenBtn?.addEventListener("click", () => {
    openModal(loginOverlay);
  });

  signupOpenBtn?.addEventListener("click", () => {
    openModal(signupOverlay);
  });

  loginCloseBtn?.addEventListener("click", () => {
    closeModal(loginOverlay);
  });

  loginXBtn?.addEventListener("click", () => {
    closeModal(loginOverlay);
  });

  signupCloseBtn?.addEventListener("click", () => {
    closeModal(signupOverlay);
  });

  signupXBtn?.addEventListener("click", () => {
    closeModal(signupOverlay);
  });

  loginOverlay?.addEventListener("click", (event) => {
    if (event.target === loginOverlay) {
      closeModal(loginOverlay);
    }
  });

  signupOverlay?.addEventListener("click", (event) => {
    if (event.target === signupOverlay) {
      closeModal(signupOverlay);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    closeModal(loginOverlay);
    closeModal(signupOverlay);
    closeMobileMenu();
  });

  /* =========================
     LOGIN
  ========================= */

  loginSubmitBtn?.addEventListener("click", () => {
    const loginEmail = loginOverlay?.querySelector(
      'input[type="email"]'
    );

    const loginPassword = loginOverlay?.querySelector(
      'input[type="password"]'
    );

    if (!loginEmail?.value.trim()) {
      loginEmail?.focus();
      return;
    }

    if (!loginPassword?.value.trim()) {
      loginPassword?.focus();
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem(
      "userEmail",
      loginEmail.value.trim()
    );

    window.location.href = "dashboard.html";
  });

  /* =========================
     SIGNUP
  ========================= */

  function showSignupMessage(message, type = "error") {
    if (!signupMessage) return;

    signupMessage.textContent = message;
    signupMessage.dataset.type = type;
    signupMessage.classList.add("show");
  }

  function clearSignupMessage() {
    if (!signupMessage) return;

    signupMessage.textContent = "";
    signupMessage.classList.remove("show");
    signupMessage.removeAttribute("data-type");
  }

  createAccountBtn?.addEventListener("click", () => {
    clearSignupMessage();

    const name = signupName?.value.trim() || "";
    const email = signupEmail?.value.trim() || "";
    const password = signupPassword?.value || "";
    const confirmedPassword =
      signupConfirmPassword?.value || "";

    if (!name) {
      showSignupMessage(
        "Please enter your name or business name."
      );
      signupName?.focus();
      return;
    }

    if (!email) {
      showSignupMessage(
        "Please enter your email address."
      );
      signupEmail?.focus();
      return;
    }

    const validEmail =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!validEmail) {
      showSignupMessage(
        "Please enter a valid email address."
      );
      signupEmail?.focus();
      return;
    }

    if (password.length < 8) {
      showSignupMessage(
        "Password must contain at least 8 characters."
      );
      signupPassword?.focus();
      return;
    }

    if (password !== confirmedPassword) {
      showSignupMessage(
        "The passwords do not match."
      );
      signupConfirmPassword?.focus();
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("businessName", name);
    localStorage.setItem("userEmail", email);

    showSignupMessage(
      "Account created successfully!",
      "success"
    );

    updateNav();

    window.setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 700);
  });

  signupName?.addEventListener("input", clearSignupMessage);
  signupEmail?.addEventListener("input", clearSignupMessage);
  signupPassword?.addEventListener(
    "input",
    clearSignupMessage
  );
  signupConfirmPassword?.addEventListener(
    "input",
    clearSignupMessage
  );

  /* =========================
     RESULT DISPLAY
  ========================= */

  function showResult(message, type = "success") {
    if (!result) return;

    result.textContent = message;
    result.dataset.type = type;
    result.classList.add("show");
  }

  function hideResult() {
    if (!result) return;

    result.textContent = "";
    result.classList.remove("show");
    result.removeAttribute("data-type");
  }

  /* =========================
     CRYPTO CONVERTER
  ========================= */

  function getCryptoSymbol(cryptoName) {
    const symbols = {
      bitcoin: "BTC",
      ethereum: "ETH",
      tether: "USDT",
      solana: "SOL",
      litecoin: "LTC",
    };

    return symbols[cryptoName] || cryptoName.toUpperCase();
  }

  function saveConversionReport({
    amount,
    currency,
    cryptoName,
    converted,
  }) {
    const isLoggedIn =
      localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) return;

    try {
      const savedReports = JSON.parse(
        localStorage.getItem("reports") || "[]"
      );

      const reports = Array.isArray(savedReports)
        ? savedReports
        : [];

      reports.unshift({
        id:
          window.crypto?.randomUUID?.() ||
          Date.now().toString(),
        date: new Date().toLocaleString(),
        amount,
        currency: currency.toUpperCase(),
        crypto: getCryptoSymbol(cryptoName),
        result: converted.toFixed(8),
      });

      localStorage.setItem(
        "reports",
        JSON.stringify(reports.slice(0, 50))
      );
    } catch (error) {
      console.error(
        "Conversion history could not be saved:",
        error
      );
    }
  }

  async function convertCurrency() {
    if (
      !amountInput ||
      !currencySelect ||
      !cryptoSelect ||
      !convertBtn
    ) {
      return;
    }

    const amount = Number(amountInput.value);
    const currency = currencySelect.value;
    const cryptoName = cryptoSelect.value;

    if (!amountInput.value.trim() || amount <= 0) {
      showResult(
        "Please enter an amount greater than zero.",
        "error"
      );
      amountInput.focus();
      return;
    }

    convertBtn.disabled = true;
    convertBtn.textContent = "Converting...";

    showResult(
      "Fetching the latest crypto price...",
      "loading"
    );

    try {
      const url =
        "https://api.coingecko.com/api/v3/simple/price" +
        `?ids=${encodeURIComponent(cryptoName)}` +
        `&vs_currencies=${encodeURIComponent(currency)}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Request failed with status ${response.status}`
        );
      }

      const data = await response.json();
      const price = data?.[cryptoName]?.[currency];

      if (typeof price !== "number" || price <= 0) {
        throw new Error("Price was unavailable");
      }

      const converted = amount / price;

      const formattedAmount = amount.toLocaleString(
        undefined,
        {
          maximumFractionDigits: 2,
        }
      );

      const formattedConversion =
        converted.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 8,
        });

      showResult(
        `${formattedAmount} ${currency.toUpperCase()} ≈ ` +
          `${formattedConversion} ${getCryptoSymbol(cryptoName)}`,
        "success"
      );

      saveConversionReport({
        amount,
        currency,
        cryptoName,
        converted,
      });
    } catch (error) {
      console.error("Conversion failed:", error);

      showResult(
        "The price service is unavailable. Please try again.",
        "error"
      );
    } finally {
      convertBtn.disabled = false;
      convertBtn.textContent = "Convert";
    }
  }

  convertBtn?.addEventListener("click", convertCurrency);

  amountInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      convertCurrency();
    }
  });

  amountInput?.addEventListener("input", () => {
    if (!amountInput.value) {
      hideResult();
    }
  });

  /* =========================
     QUICK CRYPTO BUTTONS
  ========================= */

  function updateActiveQuickButton(selectedCrypto) {
    quickButtons.forEach((button) => {
      const isActive =
        button.dataset.crypto === selectedCrypto;

      button.classList.toggle("active", isActive);
      button.setAttribute(
        "aria-pressed",
        String(isActive)
      );
    });
  }

  quickButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!cryptoSelect) return;

      cryptoSelect.value = button.dataset.crypto;
      updateActiveQuickButton(button.dataset.crypto);
      hideResult();
    });
  });

  cryptoSelect?.addEventListener("change", () => {
    updateActiveQuickButton(cryptoSelect.value);
    hideResult();
  });

  if (cryptoSelect) {
    updateActiveQuickButton(cryptoSelect.value);
  }

  /* =========================
     LIVE BITCOIN PRICE
  ========================= */

  async function updateBTCPrice() {
    const btcElement =
      document.getElementById("btcPrice");

    if (!btcElement) return;

    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price" +
          "?ids=bitcoin&vs_currencies=usd"
      );

      if (!response.ok) {
        throw new Error(
          `Request failed with status ${response.status}`
        );
      }

      const data = await response.json();
      const price = data?.bitcoin?.usd;

      if (typeof price !== "number") {
        throw new Error("Bitcoin price unavailable");
      }

      btcElement.textContent = new Intl.NumberFormat(
        "en-US",
        {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }
      ).format(price);
    } catch (error) {
      console.error("Bitcoin ticker failed:", error);
      btcElement.textContent = "Price unavailable";
    }
  }

  updateBTCPrice();
  window.setInterval(updateBTCPrice, 60000);
});