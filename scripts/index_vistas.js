// index_vista.js
class VistaSeriesPeliculas {
  actualizaInformacion(data) {
    const iframe = document.querySelector(".video.video-primary");
    const btnComenzar = document.querySelector(".js-comenzar-btn");

    document.getElementById("titulo").textContent = data.titulo || "";
    document.getElementById("duracion").textContent = data.duracion || "-";
    document.getElementById("genero").textContent = data.genero || "-";
    document.getElementById("resumen").textContent = data.resumen || "-";

    // Iframe y botón
    if (iframe) iframe.src = data.iframe;
    if (btnComenzar) btnComenzar.href = data.comenzarBtn;

    // Actores con links
    const actoresContainer = document.getElementById("actores");
    if (actoresContainer) {
      actoresContainer.innerHTML = "";

      const actorNombres = data.actores.split(", ");
      actorNombres.forEach((nombre, i) => {
        const a = document.createElement("a");
        a.href = data[`wiki${i + 1}`] || "#";
        a.textContent = nombre;
        a.className = "btn btn-tertiary";
        a.target = "_blank";
        actoresContainer.appendChild(a);

        if (i < actorNombres.length - 1) {
          actoresContainer.append(", ");
        } else {
          actoresContainer.append(".");
        }
      });
    }
  }
}