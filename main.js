document.addEventListener("DOMContentLoaded", () => {
  console.log("JS WORKS");

  const homeBtn = document.getElementById("btn-home");
  const profileBtn = document.getElementById("btn-profile");

  const home = document.getElementById("home");
  const profile = document.getElementById("profile");

  homeBtn.onclick = () => {
    home.style.display = "block";
    profile.style.display = "none";
  };

  profileBtn.onclick = () => {
    home.style.display = "none";
    profile.style.display = "block";
  };

  const openCase = document.getElementById("open-case");
  openCase.onclick = () => {
    alert("Кейс открылся");
  };
});
