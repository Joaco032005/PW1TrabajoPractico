// 1. Obtener el parámetro 'nombre' de la URL
function obtenerNombreDesdeURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("nombre");
}

// 2. Buscar la película o serie por título
function mostrarContenidoPorTitulo(arrayDB) {
  const nombreBuscado = obtenerNombreDesdeURL();

  if (!nombreBuscado) {
    console.log("No se especificó ningún nombre en la URL.");
  }

  // 3. Buscar el elemento cuyo título coincida (puede ser sensible a mayúsculas)
  const resultado = arrayDB.find(
    (elemento) => elemento.titulo === nombreBuscado
  );

  if (resultado) {
    // 4. Insertar contenido en el HTML (ajustalo según tus etiquetas)
    document.querySelector(".iframe").innerHTML = `<iframe width="100%" 
                  height="100%" 
                  src="${resultado.iframe}" 
                  title="YouTube video player" 
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
       </iframe>`;
    document.querySelector(
      ".boton-comenzar"
    ).innerHTML = `<a href="${resultado.trailer}" target="_blank">COMENZAR</a>`;
    document.getElementById("titulo").textContent = resultado.titulo;
    document.getElementById("genero").textContent = resultado.genero;
    document.getElementById("actores").textContent = resultado.actores;
    if (resultado.clase === "js-pelicula") {
      document.getElementById("duracion").textContent = resultado.duracion;
    }
    if (resultado.clase === "js-serie") {
      document.getElementById("resumen").textContent = resultado.resumen;
    }
    // y así con las demás propiedades que tengas
  } else {
    console.log(
      "No se encontró un título que coincida con el nombre proporcionado."
    );
  }
}

// USO
document.addEventListener("DOMContentLoaded", () => {
  const seriesPeliculasJSON = localStorage.getItem("seriesPeliculas");
  let seriesPeliculas = [];

  if (seriesPeliculasJSON) {
    seriesPeliculas = JSON.parse(seriesPeliculasJSON);
  }

  mostrarContenidoPorTitulo(seriesPeliculas);
});
