let pestañaActiva = "home";
const error = document.querySelector(".js-error-search");

const homeBtn = document.querySelectorAll(".js-home-btn");
homeBtn.forEach((btns) => {
  btns.addEventListener("click", () => {
    pestañaActiva = "home";
  });
});

function filtroSerie() {
  const select = document.querySelector("#category");
  const barraBusqueda = document.querySelector(".js-busqueda");
  const serieBtn = document.querySelectorAll(".js-serie-btn");
  const peliculabtn = document.querySelectorAll(".js-pelicula-btn");
  const errorDeBusqueda = document.querySelectorAll(".js-error-search");
  const peliculaIcon = document.querySelectorAll(".js-pelicula-icon");
  const serieIcon = document.querySelectorAll(".js-serie-icon");
  const homeIcon = document.querySelectorAll(".js-home-icon");

  serieBtn.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      barraBusqueda.value = "";
      select.value = "todas";
      errorDeBusqueda.textContent = "";
      pestañaActiva = "serie";
      homeBtn.forEach((btn) => (btn.style.color = "white"));
      serieBtn.forEach((btn) => (btn.style.color = "rgb(255, 123, 0)"));
      peliculabtn.forEach((btn) => (btn.style.color = "white"));
      peliculaIcon.forEach((btn) => (btn.style.color = "rgb(255, 123, 0)"));
      serieIcon.forEach((btn) => (btn.style.color = "rgb(255, 123, 0)"));
      homeIcon.forEach((btn) => (btn.style.color = "rgb(255, 123, 0)"));

      const grilla = document.querySelector(".grilla__content");
      const peliculas = grilla.querySelectorAll(".js-pelicula");
      peliculas.forEach((p) => (p.style.display = "none"));

      const series = grilla.querySelectorAll(".js-serie");
      series.forEach((s) => (s.style.display = "block"));
    });
  });

  serieIcon.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      barraBusqueda.value = "";
      select.value = "todas";
      errorDeBusqueda.textContent = "";
      pestañaActiva = "serie";
      homeBtn.forEach((btn) => (btn.style.color = "white"));
      serieBtn.forEach((btn) => (btn.style.color = "rgb(255, 123, 0)"));
      peliculabtn.forEach((btn) => (btn.style.color = "white"));
      peliculaIcon.forEach((btn) => (btn.style.color = "rgb(255, 123, 0)"));
      serieIcon.forEach((btn) => (btn.style.color = "rgb(255, 123, 0)"));
      homeIcon.forEach((btn) => (btn.style.color = "rgb(255, 123, 0)"));

      const grilla = document.querySelector(".grilla__content");
      const peliculas = grilla.querySelectorAll(".js-pelicula");
      peliculas.forEach((p) => (p.style.display = "none"));

      const series = grilla.querySelectorAll(".js-serie");
      series.forEach((s) => (s.style.display = "block"));
    });
  });
}

function filtroPeliculas() {
  const select = document.querySelector("#category");
  const barraBusqueda = document.querySelector(".js-busqueda");
  const serieBtn = document.querySelectorAll(".js-serie-btn");
  const peliculabtn = document.querySelectorAll(".js-pelicula-btn");
  const errorDeBusqueda = document.querySelector(".js-error-search");
  const peliculaIcon = document.querySelectorAll(".js-pelicula-icon");
  const serieIcon = document.querySelectorAll(".js-serie-icon");
  const homeIcon = document.querySelectorAll(".js-home-icon");

  peliculabtn.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      barraBusqueda.value = "";
      select.value = "todas";
      errorDeBusqueda.textContent = "";
      pestañaActiva = "pelicula";
      homeBtn.forEach((btn) => (btn.style.color = "white"));
      peliculabtn.forEach((btn) => (btn.style.color = "rgb(255, 123, 0)"));
      serieBtn.forEach((btn) => (btn.style.color = "white"));
      peliculaIcon.forEach((btn) => (btn.style.color = "rgb(255, 123, 0)"));
      serieIcon.forEach((btn) => (btn.style.color = "rgb(255, 123, 0)"));
      homeIcon.forEach((btn) => (btn.style.color = "rgb(255, 123, 0)"));

      const grilla = document.querySelector(".grilla__content");
      const series = grilla.querySelectorAll(".js-serie");
      series.forEach((s) => (s.style.display = "none"));

      const peliculas = grilla.querySelectorAll(".js-pelicula");
      peliculas.forEach((p) => (p.style.display = "block"));
    });
  });

  peliculaIcon.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      barraBusqueda.value = "";
      select.value = "todas";
      errorDeBusqueda.textContent = "";
      pestañaActiva = "pelicula";
      homeBtn.forEach((btn) => (btn.style.color = "white"));
      peliculabtn.forEach((btn) => (btn.style.color = "rgb(255, 123, 0)"));
      serieBtn.forEach((btn) => (btn.style.color = "white"));
      peliculaIcon.forEach((btn) => (btn.style.color = "rgb(255, 123, 0)"));
      serieIcon.forEach((btn) => (btn.style.color = "rgb(255, 123, 0)"));
      homeIcon.forEach((btn) => (btn.style.color = "rgb(255, 123, 0)"));

      const grilla = document.querySelector(".grilla__content");
      const series = grilla.querySelectorAll(".js-serie");
      series.forEach((s) => (s.style.display = "none"));

      const peliculas = grilla.querySelectorAll(".js-pelicula");
      peliculas.forEach((p) => (p.style.display = "block"));
    });
  });
}

function filtrarPorNombre() {
  const select = document.querySelector("#category");
  const barraBusqueda = document.querySelector(".js-busqueda");
  const grilla = document.querySelector(".grilla__content");
  const items = grilla.querySelectorAll(".js-pelicula, .js-serie");
  const errorDeBusqueda = document.querySelector(".js-error-search");

  barraBusqueda.addEventListener("input", () => {
    const busqueda = barraBusqueda.value.toLowerCase().trim();
    select.value = "todas";

    let hayCoincidencias = false;

    items.forEach((item) => {
      const img = item.querySelector("img");
      const nombre = img.alt.toLowerCase();

      const perteneceAPestaña =
        pestañaActiva === "home" ||
        (pestañaActiva === "serie" && item.classList.contains("js-serie")) ||
        (pestañaActiva === "pelicula" &&
          item.classList.contains("js-pelicula"));

      const coincideBusqueda = busqueda === "" || nombre.includes(busqueda);

      if (perteneceAPestaña && coincideBusqueda) {
        item.style.display = "block";
        hayCoincidencias = true;
      } else {
        item.style.display = "none";
      }
    });

    if (!hayCoincidencias) {
      errorDeBusqueda.style.display = "block";
      errorDeBusqueda.textContent = "No hay resultados para la búsqueda.";
    } else {
      errorDeBusqueda.style.display = "none";
      errorDeBusqueda.textContent = "";
    }
  });
}

function filtrarPorGenero() {
  const barraBusqueda = document.querySelector(".js-busqueda");
  const select = document.querySelector("#category");
  const contenido = document.querySelectorAll(".js-serie, .js-pelicula");

  select.addEventListener("change", () => {
    barraBusqueda.value = "";
    const categoriaSeleccionada = select.value.toLowerCase();

    contenido.forEach((elm) => {
      const categoriaElemento = elm.dataset.category.toLowerCase();
      if (
        categoriaSeleccionada === "todas" ||
        categoriaElemento === categoriaSeleccionada
      ) {
        elm.style.display = "block";
      } else {
        elm.style.display = "none";
      }
    });
  });
}

filtroPeliculas();
filtroSerie();
filtrarPorNombre();
filtrarPorGenero();
