const tg = window.Telegram.WebApp;
tg.expand();

/* ---------- Telegram user ---------- */
const user = tg.initDataUnsafe.user || {};
document.getElementById("username").innerText =
  user.username || user.first_name || "—";
document.getElementById("user-id").innerText = user.id || "—";

/* ---------- Balance (local) ---------- */
let balance = 10;
document.getElementById("balance").innerText = balance;

/* ---------- Inventory ---------- */
const inventory = document.getElementById("inventory");

/* ---------- Open case ---------- */
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

/* ---------- TonConnect ---------- */
const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
  manifestUrl: "https://kocmo-gift.vercel.app//tonconnect-manifest.json"
});
const OWNER_WALLET = "UQAFXBXzBzau6ZCWzruiVrlTg3HAc8MF6gKIntqTLDifuWOi";

document.getElementById("deposit").onclick = async () => {
  if (!tonConnectUI.wallet) {
    alert("Сначала подключи кошелёк");
    return;
  }

  const amountTON = 1;
  const amountNano = amountTON * 1e9;

  try {
    await tonConnectUI.sendTransaction({
      validUntil: Math.floor(Date.now() / 1000) + 300,
      messages: [
        {
          address: OWNER_WALLET,
          amount: amountNano.toString()
        }
      ]
    });

    balance += amountTON;
    document.getElementById("balance").innerText = balance;
    alert("Баланс пополнен!");

  } catch {
    alert("Платёж отменён");
  }
};

const walletStatus = document.getElementById("wallet-status");
const connectBtn = document.getElementById("connect-wallet");

// обновление статуса
function updateWalletUI(wallet) {
  if (wallet) {
    walletStatus.innerText = "✅ Кошелёк подключён";
    connectBtn.innerText = "🔌 Отключить кошелёк";
  } else {
    walletStatus.innerText = "❌ Кошелёк не подключён";
    connectBtn.innerText = "🔗 Подключить кошелёк";
  }
}

// кнопка подключения
connectBtn.onclick = async () => {
  if (tonConnectUI.wallet) {
    await tonConnectUI.disconnect();
    updateWalletUI(null);
  } else {
    await tonConnectUI.connectWallet();
  }
};

// слушаем изменения
tonConnectUI.onStatusChange(wallet => {
  updateWalletUI(wallet);}):

/* ---------- Navigation ---------- */
function showPage(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(page).classList.add("active");
}
