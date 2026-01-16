document.addEventListener("DOMContentLoaded", () => {
  // Навигация
  const btnHome = document.getElementById("btn-home");
  const btnProfile = document.getElementById("btn-profile");
  const home = document.getElementById("home");
  const profile = document.getElementById("profile");
  home.classList.add("active");

  btnHome.onclick = () => {
    home.classList.add("active");
    profile.classList.remove("active");
  };
  btnProfile.onclick = () => {
    home.classList.remove("active");
    profile.classList.add("active");
  };

  // Инвентарь и баланс
  let balance = 0;
  let inventoryItems = [];
  const balanceEl = document.getElementById("balance");
  const balanceProfile = document.getElementById("balance-profile");
  const inventoryDiv = document.getElementById("inventory");

  function updateUI() {
    balanceEl.textContent = balance;
    balanceProfile.textContent = balance;
    inventoryDiv.innerHTML = inventoryItems.map(i => `<div>${i}</div>`).join("");
  }

  // Кейс
  const openCaseBtn = document.getElementById("open-case");
  openCaseBtn.onclick = () => {
    if(balance < 1){
      alert("Недостаточно TON");
      return;
    }
    balance -= 1;
    const rewards = ["🎁 Gift", "💎 Diamond", "⚡ Energy"];
    const reward = rewards[Math.floor(Math.random() * rewards.length)];
    inventoryItems.push(reward);
    alert(`Кейс открыт: ${reward}`);
    updateUI();
  }

  // TonConnect
  const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: "https://meek-bubblegum-52c533.netlify.app//tonconnect-manifest.json"
  });
  let wallet = null;
  const walletStatus = document.getElementById("wallet-status");
  const connectBtn = document.getElementById("connect-wallet");
  const depositBtn = document.getElementById("deposit");

  function updateWalletUI() {
    if(wallet){
      walletStatus.textContent = `✅ Кошелек: ${wallet.account}`;
      connectBtn.textContent = "Отключить кошелек";
    } else {
      walletStatus.textContent = "❌ Кошелек не подключён";
      connectBtn.textContent = "Подключить кошелек";
    }
  }

  connectBtn.onclick = async () => {
    if(wallet){
      await tonConnectUI.disconnect();
      wallet = null;
      updateWalletUI();
    } else {
      wallet = await tonConnectUI.connectWallet();
      updateWalletUI();
    }
  }

  tonConnectUI.onStatusChange((newWallet) => {
    wallet = newWallet;
    updateWalletUI();
  });

  // Пополнение реального TON
  depositBtn.onclick = async () => {
    if(!wallet){
      alert("Сначала подключите кошелек");
      return;
    }
    try {
      const tx = await wallet.sendTransaction({
        to: "UQAFXBXzBzau6ZCWzruiVrlTg3HAc8MF6gKIntqTLDifuWOi",
        value: 1 // 1 TON
      });
      balance += 1;
      updateUI();
      alert("Пополнение прошло успешно!");
    } catch(e) {
      alert("Ошибка: " + e.message);
    }
  }

  updateUI();
  updateWalletUI();
});
