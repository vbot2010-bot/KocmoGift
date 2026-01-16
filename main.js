document.addEventListener("DOMContentLoadeddocument.addEventListener("DOMContentLoaded", () => {

  // Проверяем, что TonConnectUI загружен
  if(typeof TON_CONNECT_UI === "undefined"){
    alert("Ошибка: библиотека TonConnectUI не подключена!");
    return;
  }

  const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: "https://meek-bubblegum-52c533.netlify.app/tonconnect-manifest.json"
  });

  const walletStatus = document.getElementById("wallet-status");
  const connectBtn = document.getElementById("connect-wallet");

  function updateWalletUI(wallet){
    if(wallet){
      walletStatus.textContent = "✅ Кошелёк подключён";
      connectBtn.textContent = "Отключить кошелёк";
    } else {
      walletStatus.textContent = "❌ Кошелёк не подключён";
      connectBtn.textContent = "Подключить кошелёк";
    }
  }

  // Главное: проверяем объект и используем try/catch
  connectBtn.onclick = async () => {
    if(!tonConnectUI){
      alert("Ошибка: TonConnectUI не инициализирован");
      return;
    }
    try {
      if(tonConnectUI.wallet){
        await tonConnectUI.disconnect();
        updateWalletUI(null);
      } else {
        const wallet = await tonConnectUI.connectWallet();
        updateWalletUI(wallet);
      }
    } catch(e){
      console.error("Ошибка подключения TonConnect:", e);
      alert("Не удалось подключить кошелек. Проверьте manifest и интернет.");
    }
  };

  tonConnectUI.onStatusChange(wallet => updateWalletUI(wallet));

});
