function verificarCampos() {
  const formulario = document.querySelector(".form");
  const campoMail = formulario.querySelector(".js-input-mail");
  const campoUser = formulario.querySelector(".js-input-nombre");
  const btnEnviar = formulario.querySelector("#BotonEnviar");

  campoMail.addEventListener("input", chequearCampos); // Input se dispara cada vez que el contenido del campo cambia
  campoUser.addEventListener("input", chequearCampos);

  function chequearCampos() {
    const mail = campoMail.value.trim();
    const user = campoUser.value.trim();
    btnEnviar.disabled = !(mail && user);
  }

  btnEnviar.addEventListener("click", function () {
    validarYEnviarEmail(
      // Cuando se hace click en "Enviar", se ejecuta la funcion validarYEnviarEmail
      campoMail.value.trim().toLowerCase(),
      campoUser.value.trim().toLowerCase()
    );
  });

  chequearCampos(); // Estado inicial del botón
}

function validarYEnviarEmail(email, username) {
  if (!esEmailValido(email)) {
    alert("El formato del email no es válido.");
    return;
  }

  const usuariosGuardados =
    JSON.parse(localStorage.getItem("usuariosRegistrados")) || []; // Guarda en una constante el array de usuarios registrados

  let usuarioValido = null; // DECLARO UNA VARIABLE USUARIO VALIDO

  usuariosGuardados.forEach((u) => {
    // HAGO UN FOR EACH Y GUARDO EN LA VARIABLE CUANDO SE ENCUENTRE AL MISMO EMAIL Y USERNAME
    if (
      u.email.toLowerCase() === email &&
      u.usuario.toLowerCase() === username
    ) {
      usuarioValido = u; // lo encontramos
    }
  });

  if (usuarioValido) {
    alert("Email enviado con éxito (simulado).");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  } else {
    alert("Los datos ingresados no coinciden con ningún usuario registrado.");
  }
}

function esEmailValido(email) {
  // Verifica que se que lo ingresado sea efectivamente un email.
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Ejecutar al cargar
verificarCampos();
