const tg = window.Telegram.WebApp;
tg.expand();

/* ---------- Telegram user ---------- */
const user = tg.initDataUnsafe.user || {};
document.getElementById("username").innerText =
  user.username || user.first_name || "—";
document.getElementById("user-id").innerText = user.id || "—";

/* ---------- Balance ---------- */
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
  manifestUrl: "https://YOUR_SITE.vercel.app/tonconnect-manifest.json"
});

const walletStatus = document.getElementById("wallet-status");
const connectBtn = document.getElementById("connect-wallet");
const OWNER_WALLET = "UQAFXBXzBzau6ZCWzruiVrlTg3HAc8MF6gKIntqTLDifuWOi"; // сюда твой кошелёк
const depositBtn = document.getElementById("deposit");

/* ---------- Обновление UI ---------- */
function updateWalletUI(wallet) {
  if (wallet) {
    walletStatus.innerText = "✅ Кошелёк подключён";
    connectBtn.innerText = "🔌 Отключить кошелёк";
  } else {
    walletStatus.innerText = "❌ Кошелёк не подключён";
    connectBtn.innerText = "🔗 Подключить кошелёк";
  }
}

/* ---------- Кнопка подключения ---------- */
connectBtn.onclick = async () => {
  if (tonConnectUI.wallet) {
    await tonConnectUI.disconnect();
    updateWalletUI(null);
  } else {
    await tonConnectUI.connectWallet();
  }
};

/* ---------- Пополнение ---------- */
depositBtn.onclick = async () => {
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

/* ---------- Слушаем изменения кошелька ---------- */
tonConnectUI.onStatusChange(wallet => {
  updateWalletUI(wallet);
});

/* ---------- Навигация ---------- */
function showPage(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(page).classList.add("active");
}

