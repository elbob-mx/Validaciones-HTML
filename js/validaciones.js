const inputNacimiento = document.querySelector("#birth");
inputNacimiento.addEventListener("blur", (evento) => {
  validarNacimiento(evento.target);
});

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = ""
  if(!mayorDeEdad(fechaCliente)) {
    mensaje = "Debes tener al menos 18 años";
  }
};

function mayorDeEdad(fechaCliente) { 
  const fechaActual = new Date();
  const diferenciaFechas = new Date(fechaCliente.getUTCFullYear() + 18, fechaCliente.getUTCMonth(), fechaCliente.getUTCDate())
  return diferenciaFechas <= fechaActual;
};