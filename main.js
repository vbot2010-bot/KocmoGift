document.addEventListener("DOMContentLoaded", () => {
  console.log("JS OK");

  const homeBtn = document.getElementById("btn-home");
  const profileBtn = document.getElementById("btn-profile");
  const openCaseBtn = document.getElementById("open-case");

  const home = document.getElementById("home");
  const profile = document.getElementById("profile");

  if (!homeBtn || !profileBtn || !openCaseBtn || !home || !profile) {
    alert("HTML IDs не совпадают");
    return;
  }

  profile.style.display = "none";

  homeBtn.onclick = () => {
    home.style.display = "block";
    profile.style.display = "none";
  };

  profileBtn.onclick = () => {
    home.style.display = "none";
    profile.style.display = "block";
  };

  openCaseBtn.onclick = () => {
    alert("Кейс открылся ✅");
  };
});
