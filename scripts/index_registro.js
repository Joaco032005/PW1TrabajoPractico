const usuario = {
}

function validacionRegister() {
    
    const formRegister = document.querySelector(".register-form");
    const errorNombre = formRegister.querySelector(".js-name-error");
    const errorApellido = formRegister.querySelector(".js-lastname-error");
    const errorMail = formRegister.querySelector(".js-mail-error");
    const errorUser = formRegister.querySelector(".js-error-user");
    const errorPassword = formRegister.querySelector(".js-error-password");
    const errorPasswordRepeat = formRegister.querySelector(".js-error-repeatPassword");

    const REGEX = {
      NOMBRE: /^[a-zA-Z\s]+$/,
      APELLIDO: /^[a-zA-Z\s]+$/,
      EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      USERNAME: /^[a-zA-Z0-9]+$/,
      PASSWORD: /^[a-zA-Z0-9._%+-]{8}$/
    };

    let isValid = true;
    const errorMessage = {
    
    NOMBRE: "El nombre es requerido",
    APELLIDO: "El apeliido es requerido",
    MAIL: "El correo es requerido",
    VALOR_INCORRECTO: "Los valores ingresados son incorrectos",
    USER: "El nombre de usuario es requerido",
    CONTRASEÑA: "La contraseña es requerida",
    CONTRASEÑA_INCORRECTA: "La contraseña debe contener al menos 2 letras, 2 numeros y 2 caracteres especiales",
    CANTIDAD_CONTRASEÑA: "La contraseña debe contar con 8 caracteres",  
    CONTRASEÑAREPETIDA_INCORRECTA: "Las contraseñas no coinciden"
    };

    formRegister.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = formRegister.querySelector("#nombre").value.trim();
    const apellido = formRegister.querySelector("#apellido").value.trim();
    const mail = formRegister.querySelector("#email").value.trim();
    const userName = formRegister.querySelector("#user").value.trim();
    const password = formRegister.querySelector("#password").value.trim();
    const passwordrepeat = formRegister.querySelector("#repeatPassword").value.trim();
    

    if(nombre === "") {
        errorNombre.textContent = errorMessage.NOMBRE;
        isValid = false;
    }else if(!REGEX.NOMBRE.test(nombre)){
        errorNombre.textContent = errorMessage.VALOR_INCORRECTO;
        isValid = false;
    }else{
        isValid = true;
        errorNombre.textContent = "";
    }

    if(apellido === "") {
        errorApellido.textContent = errorMessage.APELLIDO;
        isValid = false;
    }else if(!REGEX.APELLIDO.test(apellido)){
        errorApellido.textContent = errorMessage.VALOR_INCORRECTO;
        isValid = false;
    }else{
        isValid = true;
        errorApellido.textContent = "";
    }

    if(mail === "") {
        errorMail.textContent = errorMessage.MAIL;
        isValid = false;
    }else if(!REGEX.EMAIL.test(mail)) {
        errorMail.textContent = errorMessage.VALOR_INCORRECTO;
        isValid = false;
    }else {
        isValid = true;
        errorMail.textContent = "";
    }

    if(userName === "") {
        errorUser.textContent = errorMessage.USER;
        isValid = false;
    }else if(!REGEX.USERNAME.test(userName)) {
        errorUser.textContent = errorMessage.VALOR_INCORRECTO;
        isValid = false;
    }else {
        isValid = true;
        errorUser.textContent = "";
    }

    if(password === "") {
        errorPassword.textContent = errorMessage.CONTRASEÑA;
        isValid = true;
    }else if(!REGEX.PASSWORD.test(password)) {
        errorPassword.textContent = errorMessage.CANTIDAD_CONTRASEÑA;
        isValid = false;
    }else if(!validarContraseña(password)){
        errorPassword.textContent = errorMessage.CONTRASEÑA_INCORRECTA;
        isValid = false;
    }else {
        errorPassword.textContent = "";
        isValid = true;
    }

    if(passwordrepeat === "") {
        errorPasswordRepeat.textContent = errorMessage.CONTRASEÑA;
        isValid = false;
    }else if(passwordrepeat !== password) {
        errorPasswordRepeat.textContent = errorMessage.CONTRASEÑAREPETIDA_INCORRECTA;
        isValid = false;        
    }else {
        isValid = true;
        errorPasswordRepeat.textContent = "";
    }})
};

validacionRegister();


function validarContraseña(password) {

  const letras = (password.match(/[a-zA-Z]/g) || []).length;
  const numeros = (password.match(/[0-9]/g) || []).length;
  const especiales = (password.match(/[._%+-]/g) || []).length;

  if(letras >= 2 && numeros >= 2 && especiales >= 2){
    return true;
  }else{
    return false;
  }
}