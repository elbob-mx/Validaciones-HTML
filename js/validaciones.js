// const inputNacimiento = document.querySelector("#birth");
// inputNacimiento.addEventListener("blur", (evento) => {
//   validarNacimiento(evento.target);
// });

 export function valida(input) {
  const tipoDeInput = input.dataset.tipo;
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }
  console.log(input.parentElement
    );
  if(input.validity.valid){
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = ""
  } else {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
  }
};

const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

const mensajesDeError = {
  nombre: {
    valueMissing: "Este campo nombre no puede estar vacío"
},
  email: {
    valueMissing: "Este campo email no puede estar vacío",
    typeMismatch: "El correo no es válido",
},
  password: {
    valueMissing: "Este campo contraseña no puede estar vacío",
    patternMismatch: "Debe tener mínimo 8 caracteres, al menos una mayúscula, una minúscula, un número y un símbolo",
},
  nacimiento: {
    valueMissing: "Este campo fecha de nacimiento no puede estar vacío",
    customError: "Debes tener al menos 18 años",
  },
  numero: {
    valueMissing: "Este campo no puede estar vacío",
  }  
};

const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
  let mensaje = "";
  tipoDeErrores.forEach(error => {
    if(input.validity[error]){
      console.log(tipoDeInput, error);
      console.log(input.validity[error]);
      console.log(mensajesDeError[tipoDeInput][error]);
      mensaje = mensajesDeError[tipoDeInput][error];
    }
  });
  return mensaje;
};

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = ""
  if(!mayorDeEdad(fechaCliente)) {
    mensaje = "Debes tener al menos 18 años";
  }
  input.setCustomValidity(mensaje);
};

function mayorDeEdad(fechaCliente) { 
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
    fechaCliente.getUTCFullYear() + 18,
    fechaCliente.getUTCMonth(),
    fechaCliente.getUTCDate()
    );
  return diferenciaFechas <= fechaActual;
};