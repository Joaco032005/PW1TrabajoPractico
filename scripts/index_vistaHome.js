let seriesPeliculas = [];

const seriesPeliculasJSON = localStorage.getItem("seriesPeliculas");

if (!seriesPeliculasJSON) {
  localStorage.setItem("seriesPeliculas", JSON.stringify(DATA_CONTENT));
  seriesPeliculas = DATA_CONTENT;
} else {
  seriesPeliculas = JSON.parse(seriesPeliculasJSON);
}

const vista = new VistaHome();
vista.agregaGrilla(seriesPeliculas);
