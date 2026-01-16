document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Навигация ---------- */
  const home = document.getElementById("home");
  const profile = document.getElementById("profile");

  document.getElementById("btn-home").onclick = () => {
    home.classList.add("active");
    profile.classList.remove("active");
  };

  document.getElementById("btn-profile").onclick = () => {
    profile.classList.add("active");
    home.classList.remove("active");
  };

  /* ---------- Баланс и инвентарь ---------- */
  let balance = 0;
  const inventory = [];

  const balanceEl = document.getElementById("balance");
  const balanceProfile = document.getElementById("balance-profile");
  const inventoryEl = document.getElementById("inventory");

  function updateUI() {
    balanceEl.textContent = balance;
    balanceProfile.textContent = balance;
    inventoryEl.innerHTML = inventory.map(i => `<div>${i}</div>`).join("");
  }

  /* ---------- Открытие кейса ---------- */
  document.getElementById("open-case").onclick = () => {
    if (balance < 1) {
      alert("Недостаточно TON");
      return;
    }
    balance -= 1;
    const rewards = ["🎁 Gift", "💎 Diamond", "⚡ Energy"];
    inventory.push(rewards[Math.floor(Math.random() * rewards.length)]);
    updateUI();
  };

  /* ---------- TonConnect ---------- */
  const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: "https://meek-bubblegum-52c533.netlify.app/?v=2"
  });

  const walletStatus = document.getElementById("wallet-status");
  const connectBtn = document.getElementById("connect-wallet");

  function updateWalletUI(wallet) {
    if (wallet) {
      walletStatus.textContent = "✅ Кошелёк подключён";
      connectBtn.textContent = "Отключить кошелёк";
    } else {
      walletStatus.textContent = "❌ Кошелёк не подключён";
      connectBtn.textContent = "Подключить кошелёк";
    }
  }

  connectBtn.onclick = async () => {
    if (tonConnectUI.wallet) {
      await tonConnectUI.disconnect();
    } else {
      await tonConnectUI.connectWallet();
    }
  };

  tonConnectUI.onStatusChange(wallet => {
    updateWalletUI(wallet);
  });

  /* ---------- Пополнение (РЕАЛЬНЫЕ TON) ---------- */
  document.getElementById("deposit").onclick = async () => {
    if (!tonConnectUI.wallet) {
      alert("Сначала подключите кошелёк");
      return;
    }

    try {
      await tonConnectUI.sendTransaction({
        validUntil: Math.floor(Date.now() / 1000) + 300,
        messages: [{
          address: "UQAFXBXzBzau6ZCWzruiVrlTg3HAc8MF6gKIntqTLDifuWOi",
          amount: "1000000000" // 1 TON в nanoTON
        }]
      });

      balance += 1;
      updateUI();
      alert("Пополнение успешно!");
    } catch (e) {
      alert("Ошибка перевода");
    }
  };

  updateUI();
});
