// indexVista.js

// Asegurate que DATA_CONTENT esté definido antes de esto
let seriesPeliculas = [];

const seriesPeliculasJSON = localStorage.getItem("seriesPeliculas");

if (!seriesPeliculasJSON) {
  localStorage.setItem("seriesPeliculas", JSON.stringify(DATA_CONTENT));
  seriesPeliculas = DATA_CONTENT;
} else {
  seriesPeliculas = JSON.parse(seriesPeliculasJSON);
}

// Instancia de la clase
const vista = new VistaSeriesPeliculas();

// Asociar eventos a los botones (opcional, si en esta vista hay botones)
seriesPeliculas.forEach((item) => {
  const botones = document.querySelectorAll(item.clase);
  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      // Guardar la data seleccionada en localStorage para que se pueda usar en la vista detalle
      localStorage.setItem("seleccionado", JSON.stringify(item));
      // Aquí podrías redirigir si hace falta, pero normalmente esto se hace en el home
      // window.location.href = "index_pelicula.html"; 
      vista.actualizaInformacion(item);
    });
  });
});

// Al cargar la página, buscar en localStorage el item seleccionado y actualizar la vista
document.addEventListener("DOMContentLoaded", () => {
  const seleccionadoJSON = localStorage.getItem("seleccionado");

  if (!seleccionadoJSON) return;

  const data = JSON.parse(seleccionadoJSON);
  vista.actualizaInformacion(data);
});