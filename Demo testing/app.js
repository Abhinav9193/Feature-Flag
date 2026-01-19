const API_URL = "http://localhost:8080/api/flags";

async function loadFlags() {
  const response = await fetch(API_URL);
  const flags = await response.json();

  const isEnabled = (key) =>
    flags.find(f => f.key === key)?.enabled;

  // 1. Beta Banner
  toggle("betaBanner", isEnabled("SHOW_BETA_BANNER"));

  // 2. Checkout Flow
  const checkoutText = document.getElementById("checkoutText");
  checkoutText.innerText = isEnabled("ENABLE_NEW_CHECKOUT")
    ? "Using NEW checkout flow"
    : "Using legacy checkout flow";

  // 3. Logging
  if (isEnabled("ENABLE_LOGGING")) {
    console.log("🔍 Frontend logging enabled");
  }

  // 4. Recommendations
  toggle("recommendations", isEnabled("SHOW_RECOMMENDATIONS"));

  // 5. Rate Limit Warning
  toggle("rateLimit", isEnabled("ENABLE_RATE_LIMIT_WARNING"));
}

function toggle(id, enabled) {
  document.getElementById(id)
    .classList.toggle("hidden", !enabled);
}

// Poll backend every 5 seconds
setInterval(loadFlags, 5000);
loadFlags();
