function validacionLogin() {
  const formLogin = document.querySelector("form");
  const inputUser = formLogin.querySelector("#usuario");
  const inputPassword = formLogin.querySelector("#password");
  const btnIniciar = formLogin.querySelector("#btn-iniciar-sesion");

  // Habilitar botón solo si hay texto en ambos campos
  function toggleButton() {
    btnIniciar.disabled = !(
      inputUser.value.trim() && inputPassword.value.trim()
    );
  }
  inputUser.addEventListener("input", toggleButton);
  inputPassword.addEventListener("input", toggleButton);
  toggleButton(); // al cargar la página

  formLogin.addEventListener("submit", (event) => {
    event.preventDefault();

    const userName = inputUser.value.trim();
    const password = inputPassword.value.trim();

    // Validaciones simples
    if (!userName) {
      alert("Por favor, ingresa tu usuario o correo");
      return;
    }
    if (!password) {
      alert("Por favor, ingresa tu contraseña");
      return;
    }

    // Obtener usuarios registrados desde localStorage
    const usuariosRegistradosRaw = localStorage.getItem("usuariosRegistrados");
    let usuariosRegistrados = [];

    try {
      usuariosRegistrados = usuariosRegistradosRaw
        ? JSON.parse(usuariosRegistradosRaw)
        : [];
      if (!Array.isArray(usuariosRegistrados)) {
        usuariosRegistrados = [];
      }
    } catch {
      usuariosRegistrados = [];
    }

    // Buscar usuario por nombre de usuario o correo
    const usuarioEncontrado = usuariosRegistrados.find(
      (user) => user.usuario === userName || user.email === userName
    );

    if (!usuarioEncontrado) {
      alert("Usuario o correo no encontrado");
      return;
    }

    if (usuarioEncontrado.password !== password) {
      alert("Contraseña incorrecta");
      return;
    }

    // Usuario y contraseña correctos: guardar usuario activo
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));

    alert("¡Ingreso exitoso!");
    formLogin.reset();
    toggleButton();

    // Redirigir a la página principal después de login
    window.location.href = "./index_Home.html";
  });
}

validacionLogin();
