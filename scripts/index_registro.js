function validacionRegister() {
  const formRegister = document.querySelector(".register-form");
  const errorNombre = formRegister.querySelector(".js-name-error");
  const errorApellido = formRegister.querySelector(".js-lastname-error");
  const errorMail = formRegister.querySelector(".js-mail-error");
  const errorUser = formRegister.querySelector(".js-error-user");
  const errorPassword = formRegister.querySelector(".js-error-password");
  const errorPasswordRepeat = formRegister.querySelector(
    ".js-error-repeatPassword"
  );
  const errorMetodoPago = formRegister.querySelector(".js-error-metodo-pago");

  const btnConfirmar = formRegister.querySelector('button[type="submit"]');

  const REGEX = {
    NOMBRE: /^[a-zA-Z\s]+$/,
    APELLIDO: /^[a-zA-Z\s]+$/,
    EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    USERNAME: /^[a-zA-Z0-9]+$/,
    PASSWORD: /^[a-zA-Z0-9._%+-]{8}$/,
  };

  function marcarError(input, mostrarError) {
    if (mostrarError) {
      input.classList.add("error");
    } else {
      input.classList.remove("error");
    }
  }

  function toggleConfirmButton() {
    const nombre = formRegister.querySelector("#nombre").value.trim();
    const apellido = formRegister.querySelector("#apellido").value.trim();
    const mail = formRegister.querySelector("#email").value.trim();
    const userName = formRegister.querySelector("#user").value.trim();
    const password = formRegister.querySelector("#password").value.trim();
    const passwordrepeat = formRegister
      .querySelector("#repeatPassword")
      .value.trim();
    const metodoPago = formRegister.querySelector(
      'input[name="metodo_pago"]:checked'
    );
    const numeroTarjeta = formRegister.querySelector(
      'input[name="numero_tarjeta"]'
    );
    const claveTarjeta = formRegister.querySelector(
      'input[name="clave_tarjeta"]'
    );
    const cuponSeleccionados = formRegister.querySelectorAll(
      'input[name="cupon_tipo"]:checked'
    );

    let habilitar =
      nombre &&
      apellido &&
      mail &&
      userName &&
      password &&
      passwordrepeat &&
      metodoPago;

    if (habilitar) {
      if (metodoPago.value === "tarjeta") {
        habilitar = numeroTarjeta.value.trim() && claveTarjeta.value.trim();
      } else if (metodoPago.value === "cupon") {
        habilitar = cuponSeleccionados.length > 0;
      }
    }

    btnConfirmar.disabled = !habilitar;
  }

  // Limpiar selección de cupones al cambiar método de pago
  formRegister
    .querySelectorAll('input[name="metodo_pago"]')
    .forEach((radio) => {
      radio.addEventListener("change", () => {
        const cupones = formRegister.querySelectorAll(
          'input[name="cupon_tipo"]'
        );
        cupones.forEach((cupon) => (cupon.checked = false));
        toggleConfirmButton(); // Actualizar estado del botón
      });
    });

  formRegister.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", toggleConfirmButton);
    input.addEventListener("change", toggleConfirmButton);
  });

  toggleConfirmButton();

  formRegister.addEventListener("submit", (event) => {
    event.preventDefault();

    let isValid = true;

    const nombreInput = formRegister.querySelector("#nombre");
    const apellidoInput = formRegister.querySelector("#apellido");
    const mailInput = formRegister.querySelector("#email");
    const userInput = formRegister.querySelector("#user");
    const passwordInput = formRegister.querySelector("#password");
    const repeatPasswordInput = formRegister.querySelector("#repeatPassword");

    const nombre = nombreInput.value.trim();
    const apellido = apellidoInput.value.trim();
    const mail = mailInput.value.trim();
    const userName = userInput.value.trim();
    const password = passwordInput.value.trim();
    const passwordrepeat = repeatPasswordInput.value.trim();

    const metodoPago = formRegister.querySelector(
      'input[name="metodo_pago"]:checked'
    );
    const numeroTarjeta = formRegister.querySelector(
      'input[name="numero_tarjeta"]'
    );
    const claveTarjeta = formRegister.querySelector(
      'input[name="clave_tarjeta"]'
    );
    const cupones = formRegister.querySelectorAll('input[name="cupon_tipo"]');
    const cuponSeleccionados = formRegister.querySelectorAll(
      'input[name="cupon_tipo"]:checked'
    );

    // Limpiar errores
    errorNombre.textContent = "";
    errorApellido.textContent = "";
    errorMail.textContent = "";
    errorUser.textContent = "";
    errorPassword.textContent = "";
    errorPasswordRepeat.textContent = "";
    errorMetodoPago.textContent = "";

    marcarError(nombreInput, false);
    marcarError(apellidoInput, false);
    marcarError(mailInput, false);
    marcarError(userInput, false);
    marcarError(passwordInput, false);
    marcarError(repeatPasswordInput, false);
    marcarError(numeroTarjeta, false);
    marcarError(claveTarjeta, false);
    cupones.forEach((c) => marcarError(c, false));

    // Validaciones
    if (nombre === "") {
      errorNombre.textContent = "El nombre es requerido";
      marcarError(nombreInput, true);
      isValid = false;
    } else if (!REGEX.NOMBRE.test(nombre)) {
      errorNombre.textContent = "Los valores ingresados son incorrectos";
      marcarError(nombreInput, true);
      isValid = false;
    }

    if (apellido === "") {
      errorApellido.textContent = "El apellido es requerido";
      marcarError(apellidoInput, true);
      isValid = false;
    } else if (!REGEX.APELLIDO.test(apellido)) {
      errorApellido.textContent = "Los valores ingresados son incorrectos";
      marcarError(apellidoInput, true);
      isValid = false;
    }

    if (mail === "") {
      errorMail.textContent = "El correo es requerido";
      marcarError(mailInput, true);
      isValid = false;
    } else if (!REGEX.EMAIL.test(mail)) {
      errorMail.textContent = "Los valores ingresados son incorrectos";
      marcarError(mailInput, true);
      isValid = false;
    }

    if (userName === "") {
      errorUser.textContent = "El nombre de usuario es requerido";
      marcarError(userInput, true);
      isValid = false;
    } else if (!REGEX.USERNAME.test(userName)) {
      errorUser.textContent = "Los valores ingresados son incorrectos";
      marcarError(userInput, true);
      isValid = false;
    }

    if (password === "") {
      errorPassword.textContent = "La contraseña es requerida";
      marcarError(passwordInput, true);
      isValid = false;
    } else if (!REGEX.PASSWORD.test(password)) {
      errorPassword.textContent =
        "La contraseña debe tener exactamente 8 caracteres";
      marcarError(passwordInput, true);
      isValid = false;
    } else if (!validarContraseña(password)) {
      errorPassword.textContent =
        "La contraseña debe contener al menos 2 letras, 2 números y 2 caracteres especiales";
      marcarError(passwordInput, true);
      isValid = false;
    }

    if (passwordrepeat === "") {
      errorPasswordRepeat.textContent = "La contraseña es requerida";
      marcarError(repeatPasswordInput, true);
      isValid = false;
    } else if (passwordrepeat !== password) {
      errorPasswordRepeat.textContent = "Las contraseñas no coinciden";
      marcarError(repeatPasswordInput, true);
      isValid = false;
    }

    if (!metodoPago) {
      errorMetodoPago.textContent = "Debe seleccionar un método de pago";
      isValid = false;
    } else if (metodoPago.value === "tarjeta") {
      const claveTarjetaVal = claveTarjeta.value.trim();
      const numeroTarjetaVal = numeroTarjeta.value.trim();

      if (claveTarjetaVal.length !== 3) {
        errorMetodoPago.textContent = "La clave debe tener 3 números";
        marcarError(claveTarjeta, true);
        isValid = false;
      } else if (!/^[0-9]{3}$/.test(claveTarjetaVal)) {
        errorMetodoPago.textContent = "La clave solo debe contener números";
        marcarError(claveTarjeta, true);
        isValid = false;
      } else if (claveTarjetaVal === "000") {
        errorMetodoPago.textContent = "La clave no puede ser 000";
        marcarError(claveTarjeta, true);
        isValid = false;
      }

      if (!/^\d{16}$/.test(numeroTarjetaVal)) {
        errorMetodoPago.textContent =
          "El número de tarjeta debe tener 16 dígitos numéricos";
        marcarError(numeroTarjeta, true);
        isValid = false;
      } else {
        const numeros = numeroTarjetaVal.split("").map(Number);
        const sumaPrimeros15 = numeros
          .slice(0, 15)
          .reduce((acc, n) => acc + n, 0);
        const ultimo = numeros[15];

        if (
          (sumaPrimeros15 % 2 === 1 && ultimo % 2 !== 0) ||
          (sumaPrimeros15 % 2 === 0 && ultimo % 2 === 0)
        ) {
          errorMetodoPago.textContent =
            "Número de tarjeta inválido según regla del último dígito";
          marcarError(numeroTarjeta, true);
          isValid = false;
        }
      }
    } else if (metodoPago.value === "cupon") {
      if (cuponSeleccionados.length === 0) {
        errorMetodoPago.textContent =
          "Debe seleccionar al menos un tipo de cupón (Pago Fácil o Rapipago)";
        cupones.forEach((c) => marcarError(c, true));
        isValid = false;
      } else {
        cupones.forEach((c) => marcarError(c, false));
      }
    }

    if (isValid) {
      // Bloque seguro para obtener usuariosRegistrados
      let usuariosRegistrados = [];
      try {
        const data = localStorage.getItem("usuariosRegistrados");
        if (data) {
          const parsed = JSON.parse(data);
          if (Array.isArray(parsed)) {
            usuariosRegistrados = parsed;
          }
        }
      } catch (e) {
        usuariosRegistrados = [];
      }

      const nuevoUsuario = {
        nombre,
        apellido,
        email: mail,
        usuario: userName,
        password,
        metodoPago: metodoPago ? metodoPago.value : null,
        datosPago:
          metodoPago && metodoPago.value === "tarjeta"
            ? {
                numeroTarjeta: numeroTarjeta.value.trim(),
                claveTarjeta: claveTarjeta.value.trim(),
              }
            : null,
        cupones:
          metodoPago && metodoPago.value === "cupon"
            ? Array.from(cuponSeleccionados).map((el) => el.value)
            : [],
      };

      const existe = usuariosRegistrados.some(
        (user) =>
          user.usuario === nuevoUsuario.usuario ||
          user.email === nuevoUsuario.email
      );

      if (existe) {
        alert("El usuario o correo ya está registrado");
        return;
      }

      usuariosRegistrados.push(nuevoUsuario);
      localStorage.setItem(
        "usuariosRegistrados",
        JSON.stringify(usuariosRegistrados)
      );

      alert("¡Registro exitoso!");
      formRegister.reset();
      formRegister.querySelectorAll(".error").forEach((input) => {
        input.classList.remove("error");
      });
      toggleConfirmButton();
    }
  });
}
validacionRegister();

function validarContraseña(password) {
  const letras = (password.match(/[a-zA-Z]/g) || []).length;
  const numeros = (password.match(/[0-9]/g) || []).length;
  const especiales = (password.match(/[._%+-]/g) || []).length;

  if (letras >= 2 && numeros >= 2 && especiales >= 2) {
    return true;
  } else {
    return false;
  }
}
