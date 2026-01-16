        document.addEventListener("DOMContentLoaded", () => {

  // Подключение TonConnect
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

  // Обработчик кнопки подключения
  connectBtn.onclick = async () => {
    try {
      if(tonConnectUI.wallet){
        await tonConnectUI.disconnect();
        updateWalletUI(null);
      } else {
        // Добавляем короткую паузу для корректной работы на телефоне
        await new Promise(r => setTimeout(r, 150));
        const wallet = await tonConnectUI.connectWallet();
        updateWalletUI(wallet);
      }
    } catch(e){
      console.error("Ошибка подключения TonConnect:", e);
      alert("Не удалось подключить кошелек. Попробуйте ещё раз.");
    }
  };

  // Слушаем изменения статуса
  tonConnectUI.onStatusChange(wallet => {
    updateWalletUI(wallet);
  });

});
