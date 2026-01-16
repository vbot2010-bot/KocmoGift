document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Навигация ---------- */
  const home = document.getElementById("home");
  const profile = document.getElementById("profile");

  document.getElementById("btn-home").addEventListener("click", () => {
    home.classList.add("active");
    profile.classList.remove("active");
  });

  document.getElementById("btn-profile").addEventListener("click", () => {
    profile.classList.add("active");
    home.classList.remove("active");
  });

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
  document.getElementById("open-case").addEventListener("click", () => {
    if (balance < 1) {
      alert("Недостаточно TON");
      return;
    }
    balance -= 1;
    const rewards = ["🎁 Gift", "💎 Diamond", "⚡ Energy"];
    const reward = rewards[Math.floor(Math.random() * rewards.length)];
    inventory.push(reward);
    updateUI();
  });

  /* ---------- TonConnect ---------- */
  if (typeof TonConnectUI === "undefined") {
    alert("Ошибка: библиотека TonConnectUI не подключена!");
    return;
  }

  const tonConnectUI = new TonConnectUI.TonConnectUI({
    manifestUrl: "https://meek-bubblegum-52c533.netlify.app/tonconnect-manifest.json"
  });

  const walletStatus = document.getElementById("wallet-status");
  const connectBtn = document.getElementById("connect-wallet");

  function updateWalletUI(wallet) {
    if (wallet) {
      walletStatus.textContent = "✅ Кошелёк подключён: " + wallet.name;
      connectBtn.textContent = "🔌 Отключить кошелёк";
    } else {
      walletStatus.textContent = "❌ Кошелёк не подключён";
      connectBtn.textContent = "Подключить кошелёк";
    }
  }

  // Подключение/отключение кошелька
  connectBtn.addEventListener("click", async () => {
    try {
      if (tonConnectUI.activeWallet) {
        await tonConnectUI.disconnect();
        updateWalletUI(null);
      } else {
        const wallet = await tonConnectUI.connectWallet();
        updateWalletUI(wallet);
      }
    } catch (e) {
      alert("Ошибка подключения кошелька. Проверьте браузер и доступность манифеста.");
      console.error(e);
    }
  });

  tonConnectUI.onStatusChange(wallet => updateWalletUI(wallet));
  updateWalletUI(tonConnectUI.activeWallet);

  /* ---------- Пополнение баланса ---------- */
  document.getElementById("deposit").addEventListener("click", async () => {
    if (!tonConnectUI.activeWallet) {
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
      alert("Пополнение прошло успешно!");
    } catch (e) {
      alert("Ошибка перевода: " + e.message);
      console.error(e);
    }
  });

  updateUI();
});
