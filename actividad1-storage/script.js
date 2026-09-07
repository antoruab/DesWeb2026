if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

// ===== LOCAL STORAGE =====
const inputLocal = document.getElementById("inputLocal");
const btnLocal = document.getElementById("btnLocal");
const resultadoLocal = document.getElementById("resultadoLocal");

const nombreLocalGuardado = localStorage.getItem("nombreLocal");
if (nombreLocalGuardado) {
  resultadoLocal.textContent = nombreLocalGuardado;
}

btnLocal.addEventListener("click", () => {
  const nombre = inputLocal.value.trim();

  if (nombre === "") {
    return; 
  }

  localStorage.setItem("nombreLocal", nombre);
  resultadoLocal.textContent = nombre;
  inputLocal.value = "";
});

// ===== SESSION STORAGE =====
const inputSession = document.getElementById("inputSession");
const btnSession = document.getElementById("btnSession");
const resultadoSession = document.getElementById("resultadoSession");


const nombreSessionGuardado = sessionStorage.getItem("nombreSession");
if (nombreSessionGuardado) {
  resultadoSession.textContent = nombreSessionGuardado;
}

btnSession.addEventListener("click", () => {
  const nombre = inputSession.value.trim();

  if (nombre === "") {
    return;
  }

  sessionStorage.setItem("nombreSession", nombre);
  resultadoSession.textContent = nombre;
  inputSession.value = "";
});
