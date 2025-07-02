document.addEventListener("DOMContentLoaded", () => { // ESTA FUNCION CARGA TODO EL CONTENIDO EN CONSTANTES
  const inputNombre = document.getElementById("nombre-usuario-input");
  const inputEmail = document.getElementById("email-usuario-input");
  const inputPass = document.getElementById("nueva-contraseña");
  const inputPassRepeat = document.getElementById("repetir-contraseña");
  const inputTarjeta = document.querySelector('input[name="numero-tarjeta"]');
  const inputCodigo = document.querySelector('input[name="codigo-seguridad"]');
  const radiosMetodoPago = document.querySelectorAll('input[name="metodo-pago"]');
  const radiosCuponPago = document.querySelectorAll('input[name="cupon-pago"]');
  const btnGuardar = document.getElementById("guardar-cambios");
  const btnCancelar = document.getElementById("cancelar-sub");

  const errores = {
    nombre: document.getElementById("error-nombre"),
    email: document.getElementById("error-email"),
    pass: document.getElementById("error-pass"),
    passRepeat: document.getElementById("error-pass-repeat"),
    tarjeta: document.getElementById("error-tarjeta"),
    codigo: document.getElementById("error-codigo"),
    cupon: document.getElementById("error-cupon"),
  };

  function cargarDatosUsuario() {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo")); // RECUPERA AL USUARIO QUE ESTA ACTIVO
    if (!usuario) { // REALIZA UNA VERIFICACION. SI NO EXISTE VUELVE AL LOGIN. 
      alert("No hay usuario cargado.");
      window.location.href = "index.html";
      return;
    }

    // Carga los valores del formulario con nombre y email guardados
    document.getElementById("nombre-usuario").textContent = usuario.usuario;
    document.getElementById("email-usuario").textContent = `E-mail: ${usuario.email}`;

    //Vacía los campos 
    inputNombre.value = usuario.nombre || "";
    inputEmail.value = usuario.email || "";
    inputPass.value = "";
    inputPassRepeat.value = "";

    // MARCA COMO SELECCIONADO EL METODO DE PAGO QUE EL USUARIO HABIA ELEGIDO
    if (usuario.metodoPago) {
      radiosMetodoPago.forEach(r => r.checked = r.value === usuario.metodoPago.tipo);

      if (usuario.metodoPago.tipo === "tarjeta") {
        inputTarjeta.value = usuario.metodoPago.datos?.numeroTarjeta || "";
        inputCodigo.value = usuario.metodoPago.datos?.codigoSeguridad || "";
      }

      if (usuario.metodoPago.tipo === "cupon") {
        radiosCuponPago.forEach(r => {
          r.checked = r.value === usuario.metodoPago.datos?.cuponSeleccionado;
        });
      }
    }

    btnGuardar.disabled = false; // HABILITA EL BOTON GUARDAR
  }

  function limpiarErrores() { // ERRORES ES EL OBJETO QUE CONTIENE LOS MENSAJES. EN ESTE CASO HACE REFERENCIA A LOS SMALL DEL HTML. SE UTILIZA EN GUARDARCAMBIOS() PARA QUE SE LIMPIE EN PANTALLA LOS ERRORES LUEGO DE QUE EL USUARIO CORRIJA LOS DATOS INGRESADOS
    Object.values(errores).forEach(e => {
      e.textContent = "";
      e.classList.remove("visible");
    });

    document.querySelectorAll(".error").forEach(el => el.classList.remove("error"));
  }

  function mostrarError(input, contenedor, mensaje) {
    if (input) input.classList.add("error");
    contenedor.textContent = mensaje;
    contenedor.classList.add("visible");
  }

  function validarNombre(nombre) {
    return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombre);
  }

  function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validarContrasena(pass) {
    const letras = pass.match(/[a-zA-Z]/g) || [];
    const numeros = pass.match(/[0-9]/g) || [];
    const especiales = pass.match(/[^a-zA-Z0-9]/g) || [];
    return pass.length >= 8 && letras.length >= 2 && numeros.length >= 2 && especiales.length >= 2;
  }

  function validarTarjeta(numero, codigo) {
    // Código no puede ser 000
    if (codigo === "000") return false;

    // Validar formato
    if (!/^\d{16}$/.test(numero)) return false;
    if (!/^[1-9]{3}$/.test(codigo)) return false;

    // Validar paridad último dígito
    const nums = numero.split("").map(Number); // convierte el número de tarjeta (que es un string) en un array de números enteros.
    const suma = nums.slice(0, 15).reduce((acc, n) => acc + n, 0); // SEPARA LOS NUMEROS DE TARJETA EN UN ARRAY DE 15 POSICIONES. EL METODO REDUCE SE UTILIZA PARA SUMAR CADA POSICION
    const ultimo = nums[15];

    // Regla: último número par si suma anterior impar, e impar si suma anterior par
    if ((suma % 2 === 1 && ultimo % 2 !== 0) || (suma % 2 === 0 && ultimo % 2 === 0)) {
      return false;
    }

    return true;
  }

  function validarCuponSeleccionado() {
    return Array.from(radiosCuponPago).some(r => r.checked);
  }

  function guardarCambios(e) {
    e.preventDefault();
    limpiarErrores();

    const nombre = inputNombre.value.trim();
    const email = inputEmail.value.trim();
    const pass = inputPass.value.trim();
    const passRepeat = inputPassRepeat.value.trim();
    const tarjeta = inputTarjeta.value.trim();
    const codigo = inputCodigo.value.trim();
    const metodo = [...radiosMetodoPago].find(r => r.checked)?.value;

    let esValido = true;

    if (!validarNombre(nombre)) {
      mostrarError(inputNombre, errores.nombre, "Solo se permiten letras.");
      esValido = false;
    }

    if (!validarEmail(email)) {
      mostrarError(inputEmail, errores.email, "Email inválido.");
      esValido = false;
    }

    // Validar contraseñas
    if (pass || passRepeat) {
      if (pass !== passRepeat) {
        mostrarError(inputPassRepeat, errores.passRepeat, "Las contraseñas no coinciden.");
        esValido = false;
      } else if (!validarContrasena(pass)) {
        mostrarError(inputPass, errores.pass, "Debe tener mínimo 8 caracteres, 2 letras, 2 números y 2 caracteres especiales.");
        esValido = false;
      }
    }

    // Validar tarjeta y código
    if (metodo === "tarjeta") {
      if (codigo === "000") {
        mostrarError(inputCodigo, errores.codigo, "El código de seguridad no puede ser 000.");
        esValido = false;
      }
      if (!/^\d{16}$/.test(tarjeta)) {
        mostrarError(inputTarjeta, errores.tarjeta, "Número de tarjeta inválido (16 dígitos).");
        esValido = false;
      }
      if (!validarTarjeta(tarjeta, codigo)) {
        mostrarError(inputTarjeta, errores.tarjeta, "Número de tarjeta inválido según la regla de paridad.");
        esValido = false;
      }
      if (!/^[1-9]{3}$/.test(codigo)) {
        mostrarError(inputCodigo, errores.codigo, "Código inválido (3 dígitos entre 1 y 9).");
        esValido = false;
      }
    }

    if (metodo === "cupon" && !validarCuponSeleccionado()) {
      mostrarError(null, errores.cupon, "Debe seleccionar un cupón.");
      esValido = false;
    }

    if (!esValido) return;

    const usuarioActual = JSON.parse(localStorage.getItem("usuarioActivo"));
    const usuarios = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
    const indice = usuarios.findIndex(u => u.email === usuarioActual.email);

    if (indice === -1) {
      alert("Usuario no encontrado.");
      return;
    }

    const actualizado = {
      usuario: usuarioActual.usuario,
      nombre,
      email,
      password: (pass && pass === passRepeat) ? pass : usuarioActual.password,
      metodoPago: metodo ? { tipo: metodo, datos: {} } : null
    };

    // Validar tarjeta y código
    if (metodo === "tarjeta") {

    let tarjetaValida = true;
    let codigoValido = true;

    if (!/^\d{16}$/.test(tarjeta)) {
        mostrarError(inputTarjeta, errores.tarjeta, "Número de tarjeta inválido (debe tener 16 dígitos).");
        tarjetaValida = false;
    } else {
        const nums = tarjeta.split("").map(Number);
        const suma = nums.slice(0, 15).reduce((acc, n) => acc + n, 0);
        const ultimo = nums[15];

        if ((suma % 2 === 1 && ultimo % 2 !== 0) || (suma % 2 === 0 && ultimo % 2 === 0)) {
        mostrarError(inputTarjeta, errores.tarjeta, "Número de tarjeta inválido");
        tarjetaValida = false;
        }
    }

    if (codigo === "000") {
        mostrarError(inputCodigo, errores.codigo, "El código de seguridad no puede ser 000.");
        codigoValido = false;
    } else if (!/^[1-9]{3}$/.test(codigo)) {
        mostrarError(inputCodigo, errores.codigo, "Código inválido (Debe ser 3 dígitos entre 1 y 9).");
        codigoValido = false;
    }

    if (!tarjetaValida || !codigoValido) {
        esValido = false;
    }

    if (tarjetaValida && codigoValido) {
        actualizado.metodoPago.datos = {
        numeroTarjeta: tarjeta,
        codigoSeguridad: codigo
        };
    }
    } else if (metodo === "cupon") {
      const cuponSeleccionado = [...radiosCuponPago].find(r => r.checked);
      actualizado.metodoPago.datos = {
        cuponSeleccionado: cuponSeleccionado?.value
      };
    }

    usuarios[indice] = actualizado;
    localStorage.setItem("usuariosRegistrados", JSON.stringify(usuarios));
    localStorage.setItem("usuarioActivo", JSON.stringify(actualizado));

    alert("Cambios guardados correctamente.");
    cargarDatosUsuario();
  }

  function cancelarSubscripcion() {
    if (!confirm("¿Seguro que desea cancelar la subscripción?")) return;

    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    let lista = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];

    lista = lista.filter(u => u.email !== usuario.email);

    localStorage.setItem("usuariosRegistrados", JSON.stringify(lista));
    localStorage.removeItem("usuarioActivo");

    alert("Subscripción cancelada.");
    window.location.href = "index.html";
  }

  btnGuardar.addEventListener("click", guardarCambios);
  btnCancelar.addEventListener("click", cancelarSubscripcion);

  cargarDatosUsuario();
});
