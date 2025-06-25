document.addEventListener("DOMContentLoaded", () => {
  const nombreUsuarioElem = document.getElementById("nombre-usuario");
  const emailUsuarioElem = document.getElementById("email-usuario");
  const inputNombre = document.getElementById("nombre-usuario-input");
  const inputEmail = document.getElementById("email-usuario-input");
  const inputPass = document.getElementById("nueva-contraseña");
  const inputPassRepeat = document.getElementById("repetir-contraseña");
  const radiosMetodoPago = document.querySelectorAll(
    'input[name="metodo-pago"]'
  );
  const radiosCuponPago = document.querySelectorAll('input[name="cupon-pago"]');
  const inputNumeroTarjeta = document.querySelector(
    'input[name="numero-tarjeta"]'
  );
  const inputCodigoSeguridad = document.querySelector(
    'input[name="codigo-seguridad"]'
  );
  const btnGuardar = document.getElementById("guardar-cambios");
  const btnCancelar = document.getElementById("cancelar-sub");

  const errorPassElem = document.getElementById("error-pass");
  const errorRepeatElem = document.getElementById("error-pass-repeat");
  const errorTarjetaElem = document.getElementById("error-tarjeta");
  const errorCodigoElem = document.getElementById("error-codigo");

  function cargarDatosUsuario() {
    const usuarioJSON = localStorage.getItem("usuarioActivo");
    if (!usuarioJSON) {
      alert("No hay usuario cargado.");
      window.location.href = "index.html";
      return;
    }
    const usuario = JSON.parse(usuarioJSON);

    nombreUsuarioElem.textContent = usuario.usuario || "";
    inputNombre.value = usuario.nombre || "";
    emailUsuarioElem.textContent = `E-mail: ${usuario.email || ""}`;
    inputEmail.value = usuario.email || "";
    inputPass.value = "";
    inputPassRepeat.value = "";

    if (usuario.metodoPago) {
      radiosMetodoPago.forEach(
        (r) => (r.checked = r.value === usuario.metodoPago.tipo)
      );

      if (usuario.metodoPago.tipo === "tarjeta" && usuario.metodoPago.datos) {
        inputNumeroTarjeta.value = usuario.metodoPago.datos.numeroTarjeta || "";
        inputCodigoSeguridad.value =
          usuario.metodoPago.datos.codigoSeguridad || "";
      } else {
        inputNumeroTarjeta.value = "";
        inputCodigoSeguridad.value = "";
      }

      if (usuario.metodoPago.tipo === "cupon" && usuario.metodoPago.datos) {
        radiosCuponPago.forEach((r) => {
          const textoCupon = r.parentElement.textContent.trim();
          r.checked = textoCupon === usuario.metodoPago.datos.cuponSeleccionado;
        });
      } else {
        radiosCuponPago.forEach((r) => (r.checked = false));
      }
    } else {
      radiosMetodoPago.forEach((r) => (r.checked = false));
      radiosCuponPago.forEach((r) => (r.checked = false));
      inputNumeroTarjeta.value = "";
      inputCodigoSeguridad.value = "";
    }

    validarFormulario();
  }

  function validarContrasena(pass) {
    if (pass.length < 8) return false;
    const letras = pass.match(/[a-zA-Z]/g) || [];
    const numeros = pass.match(/[0-9]/g) || [];
    const especiales = pass.match(/[^a-zA-Z0-9]/g) || [];
    return letras.length >= 2 && numeros.length >= 2 && especiales.length >= 2;
  }

  function validarTarjeta(numero, codigo) {
    if (!/^\d{16}$/.test(numero)) return false;
    if (!/^[1-9]{3}$/.test(codigo)) return false;
    const nums = numero.split("").map((n) => parseInt(n));
    const suma = nums.slice(0, 15).reduce((acc, n) => acc + n, 0);
    const ultimo = nums[15];
    return !(
      (suma % 2 === 1 && ultimo % 2 !== 0) ||
      (suma % 2 === 0 && ultimo % 2 === 0)
    );
  }

  function validarCupon() {
    return Array.from(radiosCuponPago).some((r) => r.checked);
  }

  function mostrarError(input, elem, mensaje) {
    input.classList.add("error");
    elem.textContent = mensaje;
    elem.classList.add("visible");
  }

  function limpiarError(input, elem) {
    input.classList.remove("error");
    elem.textContent = "";
    elem.classList.remove("visible");
  }

  function validarFormulario() {
    const pass = inputPass.value.trim();
    const passRepeat = inputPassRepeat.value.trim();
    const numeroTarjeta = inputNumeroTarjeta.value.trim();
    const codigoSeguridad = inputCodigoSeguridad.value.trim();

    let passValida = true;
    let metodoPagoValido = true;

    if (pass !== "" || passRepeat !== "") {
      if (pass !== passRepeat) {
        passValida = false;
        mostrarError(
          inputPassRepeat,
          errorRepeatElem,
          "Las contraseñas no coinciden."
        );
      } else if (!validarContrasena(pass)) {
        passValida = false;
        mostrarError(
          inputPass,
          errorPassElem,
          "La contraseña debe contener al menos 2 letras, 2 números y 2 caracteres especiales"
        );
      } else {
        limpiarError(inputPass, errorPassElem);
        limpiarError(inputPassRepeat, errorRepeatElem);
      }
    } else {
      limpiarError(inputPass, errorPassElem);
      limpiarError(inputPassRepeat, errorRepeatElem);
    }

    const metodo = [...radiosMetodoPago].find((r) => r.checked)?.value;
    if (metodo === "tarjeta") {
      if (!validarTarjeta(numeroTarjeta, codigoSeguridad)) {
        metodoPagoValido = false;
        mostrarError(
          inputNumeroTarjeta,
          errorTarjetaElem,
          "Número de tarjeta (16 dígitos)."
        );
        mostrarError(
          inputCodigoSeguridad,
          errorCodigoElem,
          "Código de tarjeta (3 dígitos entre 1-9)."
        );
      } else {
        limpiarError(inputNumeroTarjeta, errorTarjetaElem);
        limpiarError(inputCodigoSeguridad, errorCodigoElem);
      }
    } else if (metodo === "cupon") {
      metodoPagoValido = validarCupon();
    }

    btnGuardar.disabled = !(passValida && metodoPagoValido);
  }

  function manejarCambioMetodoPago() {
    const seleccionado = Array.from(radiosMetodoPago).find((r) => r.checked);
    if (!seleccionado) return;
    if (seleccionado.value !== "cupon") {
      radiosCuponPago.forEach((r) => (r.checked = false));
    }
    validarFormulario();
  }

  function guardarCambios(e) {
    e.preventDefault();
    const usuarioActualJSON = localStorage.getItem("usuarioActivo");
    if (!usuarioActualJSON) return alert("Usuario no encontrado.");
    const usuarioActual = JSON.parse(usuarioActualJSON);

    const usuariosRegistradosJSON = localStorage.getItem("usuariosRegistrados");
    let usuariosRegistrados = usuariosRegistradosJSON
      ? JSON.parse(usuariosRegistradosJSON)
      : [];
    const indiceUsuario = usuariosRegistrados.findIndex(
      (u) => u.email === usuarioActual.email
    );
    if (indiceUsuario === -1)
      return alert("No se encontró el usuario en la lista de registrados.");

    const usuarioActualizado = {
      nombre: inputNombre.value.trim(),
      email: inputEmail.value.trim(),
      usuario: usuarioActual.usuario,
      metodoPago: null,
      password: usuarioActual.password,
    };

    const pass = inputPass.value.trim();
    const passRepeat = inputPassRepeat.value.trim();
    if (pass && pass === passRepeat && validarContrasena(pass)) {
      usuarioActualizado.password = pass;
    }

    let metodoSeleccionado = null;
    radiosMetodoPago.forEach((radio) => {
      if (radio.checked) metodoSeleccionado = radio.value;
    });

    if (metodoSeleccionado) {
      usuarioActualizado.metodoPago = { tipo: metodoSeleccionado, datos: {} };
      if (metodoSeleccionado === "tarjeta") {
        usuarioActualizado.metodoPago.datos.numeroTarjeta =
          inputNumeroTarjeta.value.trim();
        usuarioActualizado.metodoPago.datos.codigoSeguridad =
          inputCodigoSeguridad.value.trim();
      } else if (metodoSeleccionado === "cupon") {
        const cuponSeleccionado = Array.from(radiosCuponPago).find(
          (r) => r.checked
        );
        if (cuponSeleccionado) {
          usuarioActualizado.metodoPago.datos.cuponSeleccionado =
            cuponSeleccionado.parentElement.textContent.trim();
        }
      }
    }

    usuariosRegistrados[indiceUsuario] = usuarioActualizado;
    localStorage.setItem(
      "usuariosRegistrados",
      JSON.stringify(usuariosRegistrados)
    );
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActualizado));

    alert("Cambios guardados correctamente.");
    cargarDatosUsuario();
  }

  function cancelarSubscripcion() {
    if (
      !confirm(
        "¿Está seguro que desea cancelar la subscripción? Se eliminarán sus datos."
      )
    )
      return;
    const usuarioActualJSON = localStorage.getItem("usuarioActivo");
    if (!usuarioActualJSON) return alert("Usuario no encontrado.");
    const usuarioActual = JSON.parse(usuarioActualJSON);
    let usuariosRegistrados =
      JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
    usuariosRegistrados = usuariosRegistrados.filter(
      (u) => u.email !== usuarioActual.email
    );
    localStorage.setItem(
      "usuariosRegistrados",
      JSON.stringify(usuariosRegistrados)
    );
    localStorage.removeItem("usuarioActivo");
    alert("Subscripción cancelada. Será redirigido al login.");
    window.location.href = "index.html";
  }

  radiosMetodoPago.forEach((r) =>
    r.addEventListener("change", manejarCambioMetodoPago)
  );
  radiosCuponPago.forEach((r) =>
    r.addEventListener("change", validarFormulario)
  );
  inputNumeroTarjeta.addEventListener("input", validarFormulario);
  inputCodigoSeguridad.addEventListener("input", validarFormulario);
  inputPass.addEventListener("input", validarFormulario);
  inputPassRepeat.addEventListener("input", validarFormulario);
  btnGuardar.addEventListener("click", guardarCambios);
  btnCancelar.addEventListener("click", cancelarSubscripcion);

  cargarDatosUsuario();
});
