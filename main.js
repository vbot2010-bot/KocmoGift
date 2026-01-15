// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand(); // расширяем окно

// Получаем данные пользователя из Telegram
const user = tg.initDataUnsafe.user;
document.getElementById("username").innerText = user.username || user.first_name;

// Баланс пользователя (для примера 10 TON)
let balance = 10;
document.getElementById("balance").innerText = balance.toFixed(2);

// Инвентарь
const inventoryDiv = document.getElementById("inventory");

// Кнопка открыть кейс
document.getElementById("open-case").addEventListener("click", () => {
  if(balance < 0.25){
    alert("Недостаточно TON для открытия кейса!");
    return;
  }

  // Снимаем стоимость кейса
  balance -= 0.25;
  document.getElementById("balance").innerText = balance.toFixed(2);

  // Генерируем случайный кейс
  const rewards = ["🎁 Подарок", "💎 Алмаз", "⚡ Энергия"];
  const reward = rewards[Math.floor(Math.random() * rewards.length)];

  // Добавляем в инвентарь
  const p = document.createElement("p");
  p.innerText = reward;
  inventoryDiv.appendChild(p);
});
