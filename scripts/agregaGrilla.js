class VistaHome {
  agregaGrilla(elementos) {
    const nodoRaiz = document.querySelector(".grilla__content");

    nodoRaiz.innerHTML = ""; // Limpia la grilla antes de agregar contenido

    for (let elemento of elementos) {
      const enlace = document.createElement("a");
      enlace.href =
        elemento.clase === "js-pelicula"
          ? `./index_pelicula.html?nombre=${encodeURIComponent(
              elemento.titulo
            )}`
          : `./index_series.html?nombre=${encodeURIComponent(elemento.titulo)}`;
      enlace.target = "_blank";
      enlace.className = `btn btn-img ${elemento.clase}`;
      enlace.dataset.category = elemento.genero.toLowerCase();

      const img = document.createElement("img");
      img.src = elemento.imagen;
      img.className = "img img-primary";
      img.alt = elemento.titulo;

      enlace.appendChild(img);
      nodoRaiz.appendChild(enlace);
    }
  }
}
