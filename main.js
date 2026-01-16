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
    if (balance < 1) { alert("Недостаточно TON"); return; }
    balance -= 1;
    const rewards = ["🎁 Gift", "💎 Diamond", "⚡ Energy"];
    inventory.push(rewards[Math.floor(Math.random() * rewards.length)]);
    updateUI();
  };

  /* ---------- TonConnect ---------- */
  const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: "https://meek-bubblegum-52c533.netlify.app/tonconnect-manifest.json"
  });

  const walletStatus = document.getElementById("wallet-status");
  const connectBtn = document.getElementById("connect-wallet");

  function updateWalletUI(wallet) {
    if(wallet){
      walletStatus.textContent = "✅ Кошелёк подключён";
      connectBtn.textContent = "Отключить кошелёк";
    } else {
      walletStatus.textContent = "❌ Кошелёк не подключён";
      connectBtn.textContent = "Подключить кошелёк";
    }
  }

  // Новый обработчик с проверкой и try/catch
  connectBtn.onclick = async () => {
    try {
      if(tonConnectUI.wallet){
        await tonConnectUI.disconnect();
        updateWalletUI(null);
      } else {
        // Ждём 100ms перед connect, чтобы Telegram корректно открыл окно
        await new Promise(r => setTimeout(r, 100));
        const wallet = await tonConnectUI.connectWallet();
        updateWalletUI(wallet);
      }
    } catch(e){
      alert("Ошибка подключения кошелька. Попробуйте ещё раз");
      console.error(e);
    }
  };

  tonConnectUI.onStatusChange(wallet => {
    updateWalletUI(wallet);
  });

  /* ---------- Пополнение баланса ---------- */
  document.getElementById("deposit").onclick = async () => {
    if(!tonConnectUI.wallet){
      alert("Сначала подключите кошелёк");
      return;
    }
    try{
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
    }catch(e){
      alert("Ошибка перевода: " + e.message);
    }
  };

  updateUI();
});
