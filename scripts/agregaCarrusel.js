class Carrusel {
  constructor(carruselSelector) {
    this.carrusel = document.querySelector(carruselSelector);
    if (!this.carrusel) return;

    this.trackContainer = this.carrusel.querySelector(
      ".carrusel__track-container"
    );
    this.track = this.carrusel.querySelector(".carrusel__track");
    this.prevBtn = this.carrusel.querySelector(".carrusel__btn--prev");
    this.nextBtn = this.carrusel.querySelector(".carrusel__btn--next");
    this.slides = Array.from(this.track.children);

    this.paginaActual = 0;
    this.slidesPorPagina = this.getSlidesPorPagina();

    this.addEventListeners();
    this.actualizaCarrusel();
  }

  getSlidesPorPagina() {
    const width = window.innerWidth;
    if (width <= 768) return 1; // Celulares
    else if (width <= 1024) return 2; // Tablets
    else return 3; // Escritorio
  }

  actualizaCarrusel() {
    this.slidesPorPagina = this.getSlidesPorPagina();
    const containerWidth = this.trackContainer.offsetWidth;
    const offset = containerWidth * this.paginaActual;
    this.track.style.transform = `translateX(-${offset}px)`;
  }

  getTotalPaginas() {
    return Math.ceil(this.slides.length / this.slidesPorPagina);
  }

  addEventListeners() {
    this.nextBtn.addEventListener("click", () => {
      const totalPaginas = this.getTotalPaginas();
      if (this.paginaActual < totalPaginas - 1) {
        this.paginaActual++;
        this.actualizaCarrusel();
      }
    });

    this.prevBtn.addEventListener("click", () => {
      if (this.paginaActual > 0) {
        this.paginaActual--;
        this.actualizaCarrusel();
      }
    });

    window.addEventListener("resize", () => {
      this.paginaActual = 0; // Reinicia a la primera página al redimensionar
      this.actualizaCarrusel();
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Carrusel(".similares__grilla.carrusel");
});
