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
    const rewards = ["🎁 Gift
