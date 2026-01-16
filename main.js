// Инициализация TonConnect
const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
  manifestUrl: "https://kocmo-gift-git-main-kocmogift.vercel.app/tonconnect-manifest.json"
});

// Селекторы
const walletStatus = document.getElementById("wallet-status");
const connectBtn = document.getElementById("connect-wallet");
const OWNER_WALLET = "UQAFXBXzBzau6ZCWzruiVrlTg3HAc8MF6gKIntqTLDifuWOi"; // твой кошелёк для пополнений

// Обновление UI
function updateWalletUI(wallet) {
  if (wallet) {
    walletStatus.innerText = "✅ Кошелёк подключён";
    connectBtn.innerText = "🔌 Отключить кошелёк";
  } else {
    walletStatus.innerText = "❌ Кошелёк не подключён";
    connectBtn.innerText = "🔗 Подключить кошелёк";
  }
}

// Кнопка подключения
connectBtn.onclick = async () => {
  if (tonConnectUI.wallet) {
    await tonConnectUI.disconnect();
    updateWalletUI(null);
  } else {
    await tonConnectUI.connectWallet();
  }
};

// Пополнение
document.getElementById("deposit").onclick = async () => {
  if (!tonConnectUI.wallet) { alert("Сначала подключи кошелёк"); return; }

  const amountTON = 1;
  const amountNano = amountTON * 1e9;

  try {
    await tonConnectUI.sendTransaction({
      validUntil: Math.floor(Date.now() / 1000) + 300,
      messages: [{ address: OWNER_WALLET, amount: amountNano.toString() }]
    });

    alert("Баланс пополнен!");
  } catch {
    alert("Платёж отменён");
  }
};

// Слушаем изменения кошелька
tonConnectUI.onStatusChange(wallet => {
  updateWalletUI(wallet);
});

// Изначально обновляем статус
updateWalletUI(tonConnectUI.wallet);
// Навигация между страницами
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");
}

// Кнопки
document.getElementById("btn-home").onclick = () => showPage("home");
document.getElementById("btn-profile").onclick = () => showPage("profile");
