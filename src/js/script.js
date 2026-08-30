// ===== Modo oscuro / claro =====
const boton = document.getElementById("toggle-theme");
const body = document.body;

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  boton.textContent = "☀️";
}

boton.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    boton.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    boton.textContent = "🌙";
  }
});


boton.addEventListener("click", () => {
  let clicks = sessionStorage.getItem("clicksTema");

  if (clicks) {
    clicks = Number(clicks) + 1;
  } else {
    clicks = 1;
  }

  sessionStorage.setItem("clicksTema", clicks);
  console.log("Cambiaste el tema " + clicks + " veces en esta sesión");
});