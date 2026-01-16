// ======= Telegram Mini App =======
const tg = window.Telegram.WebApp;
tg.expand();

// Пользователь
const user = tg.initDataUnsafe.user || {};
document.getElementById("username").innerText = user.username || user.first_name || "—";
document.getElementById("user-id").innerText = user.id || "—";

// Баланс
let balance = 10;
document.getElementById("balance").innerText = balance;

// Инвентарь
const inventory = document.getElementById("inventory");

// ======= Навигация между страницами =======
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");
}

document.getElementById("btn-home").onclick = () => showPage("home");
document.getElementById("btn-profile").onclick = () => showPage("profile");

// ======= TonConnect =======
const OWNER_WALLET = "UQAFXBXzBzau6ZCWzruiVrlTg3HAc8MF6gKIntqTLDifuWOi"; // сюда твой TON кошелёк
const walletStatus = document.getElementById("wallet-status");
const connectBtn = document.getElementById("connect-wallet");
const depositBtn = document.getElementById("deposit");

const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
  manifestUrl: "https://kocmo-gift-git-main-kocmogift.vercel.app/tonconnect-manifest.json"
});

// Обновление UI кошелька
function updateWalletUI(wallet) {
  if(wallet) {
    walletStatus.innerText = "✅ Кошелёк подключён";
    connectBtn.innerText = "🔌 Отключить кошелёк";
  } else {
    walletStatus.innerText = "❌ Кошелёк не подключён";
    connectBtn.innerText = "🔗 Подключить кошелёк";
  }
}

// Слушаем статус кошелька
tonConnectUI.onStatusChange(wallet => updateWalletUI(wallet));
updateWalletUI(tonConnectUI.wallet);

// Кнопка подключения
connectBtn.onclick = async () => {
  if(tonConnectUI.wallet) {
    await tonConnectUI.disconnect();
    updateWalletUI(null);
  } else {
    await tonConnectUI.connectWallet();
  }
};

// Пополнение
depositBtn.onclick = async () => {
  if(!tonConnectUI.wallet) { 
    alert("Сначала подключи кошелёк"); 
    return; 
  }

  const amountTON = 1; // 1 TON
  const amountNano = amountTON * 1e9;

  try {
    await tonConnectUI.sendTransaction({
      validUntil: Math.floor(Date.now() / 1000) + 300,
      messages: [{ address: OWNER_WALLET, amount: amountNano.toString() }]
    });

    balance += amountTON;
    document.getElementById("balance").innerText = balance;
    alert("Баланс пополнен!");
  } catch {
    alert("Платёж отменён");
  }
};

// ======= Открытие кейсов =======
document.getElementById("open-case").onclick = () => {
  if(balance < 1) { alert("Недостаточно TON"); return; }
  balance -= 1;
  document.getElementById("balance").innerText = balance;

  const rewards = ["🎁 Gift", "💎 Diamond", "⚡ Energy"];
  const reward = rewards[Math.floor(Math.random() * rewards.length)];
  inventory.innerHTML += `<div>${reward}</div>`;
};
