const params = new URLSearchParams(window.location.search);
const nombreBuscado = params.get("nombre");

const resultado = seriesPeliculas.find(
  (serie) => serie.titulo === nombreBuscado
);

if (resultado && resultado.temporadas) {
  const temporadasSelect = document.getElementById("temporadas");
  const capitulosSelect = document.getElementById("capitulos");

  // Llenar temporadas
  for (let temporada in resultado.temporadas) {
    const option = document.createElement("option");
    option.value = temporada;
    option.textContent = `Temporada ${temporada}`;
    temporadasSelect.appendChild(option);
  }

  // Llenar capítulos según la temporada
  function actualizarCapitulos(temp) {
    capitulosSelect.innerHTML = "";
    resultado.temporadas[temp].forEach((cap) => {
      const opt = document.createElement("option");
      opt.value = cap;
      opt.textContent = cap;
      capitulosSelect.appendChild(opt);
    });
  }

  temporadasSelect.addEventListener("change", (e) => {
    actualizarCapitulos(e.target.value);
  });

  // Cargar primera temporada
  actualizarCapitulos(Object.keys(resultado.temporadas)[0]);
} else {
  console.warn("Serie no encontrada:", nombreBuscado);
}
