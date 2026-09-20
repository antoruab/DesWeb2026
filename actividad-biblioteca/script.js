function procesarSolicitud(solicitud) {
  const nombreUsuario = solicitud.shift();
  solicitud.unshift("Carné de socio");
  solicitud.push(nombreUsuario);
  return solicitud;
}
 
function ejecutar() {
  const nombre = document.getElementById("nombreUsuario").value;
  const librosTexto = document.getElementById("libros").value;
  const librosArray = librosTexto.split(",").map(l => l.trim());
 
  const solicitud = [nombre, ...librosArray];
  const resultado = procesarSolicitud(solicitud);
 
  document.getElementById("resultado").textContent = JSON.stringify(resultado);
}
 