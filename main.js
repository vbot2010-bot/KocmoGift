const tg = window.Telegram.WebApp;
tg.expand();

// Telegram user
const user = tg.initDataUnsafe.user;

document.getElementById("username").innerText =
  user?.username || user?.first_name || "—";

document.getElementById("user-id").innerText = user?.id || "—";

// Balance
let balance = 10;
document.getElementById("balance").innerText = balance;

// Inventory
const inventory = document.getElementById("inventory");

// Open case
document.getElementById("open-case").onclick = () => {
  if (balance < 1) {
    alert("Недостаточно TON");
    return;
  }

  balance -= 1;
  document.getElementById("balance").innerText = balance;

  const rewards = ["🎁 Gift", "💎 Diamond", "⚡ Energy"];
  const reward = rewards[Math.floor(Math.random() * rewards.length)];

  inventory.innerHTML += `<div>${reward}</div>`;
};

// Wallet (заглушка)
document.getElementById("connect-wallet").onclick = () => {
  document.getElementById("wallet-status").innerText =
    "✅ Кошелёк будет подключён позже";
};

// Navigation
function showPage(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(page).classList.add("active");
  }
