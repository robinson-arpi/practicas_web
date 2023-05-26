// Obtener el campo de entrada
var input_nombre = document.getElementById('nombre');
var input_direccion = document.getElementById('direccion');
var input_telefono = document.getElementById('telefono');
var input_email = document.getElementById('email');

// Llamar a la función pasando el campo de entrada como parámetro
validarSoloLetras(input_nombre, 50);
validarSoloNumeros(input_telefono, 10);
validarDimension(input_direccion, 50);
validarDimension(input_email, 50);

/*--------------------------------------------
VALIDACIONES
--------------------------------------------*/
function camposVacios(nombre, direccion, telefono, mail) {
    if (nombre.length == 0) {
        mostrarAlertaFallida("Campo nombre esta vacio.");
        return true;
    }
    if (direccion.length == 0) {
        mostrarAlertaFallida("Campo direccion esta vacio.");
        return true;
    }
    if (telefono.length == 0) {
        mostrarAlertaFallida("Campo telefono esta vacio.");
        return true;
    }
    if (mail.length == 0) {
        mostrarAlertaFallida("Campo mail esta vacio.");
        return true;
    }
    return false;
}

function validarDimension(input, maximo) {
    var valorAnterior = "";
    input.addEventListener('input', function(event) {
        var valor = input.value;
        if (valor.length > maximo) {
            mostrarAlertaFallida("La longitud maxima permitida es " + maximo);
            // Borrar la tecla ingresada
            input.value = valorAnterior;
        }else {
            // Actualizar el valor anterior
            valorAnterior = valor;
        }
    });
    input.addEventListener('keydown', function(event) {
        // Almacenar el valor antes de que se ingrese una nueva tecla
        valorAnterior = input.value;
    });
}

function validarSoloLetras(input, maximo) {
    var valorAnterior = "";
    input.addEventListener('input', function(event) {
        var valor = input.value;
        var soloLetras = /^[A-Za-z\s]+$/;
        // Verificar si se presionó una tecla de borrado
        if (event.inputType === 'deleteContentBackward' || event.inputType === 'deleteContentForward') {
            // No realizar validación ni mostrar alerta
            return;
        }
        if (!soloLetras.test(valor)) {
            mostrarAlertaFallida("El campo debe contener solo letras.");
            // Restaurar el valor anterior
            input.value = valorAnterior;
        } else if (valor.length > maximo) {
            mostrarAlertaFallida("La longitud maxima permitida es " + maximo);
            // Borrar la tecla ingresada
            input.value = valorAnterior;
        }else {
            // Actualizar el valor anterior
            valorAnterior = valor;
        }
    });
    input.addEventListener('keydown', function(event) {
        // Almacenar el valor antes de que se ingrese una nueva tecla
        valorAnterior = input.value;
    });
}

function validarSoloNumeros(input, maximo) {
    var valorAnterior = "";
    input.addEventListener('input', function(event) {
        var valor = input.value;
        var soloNumeros = /^[0-9]+$/;
        // Verificar si se presionó una tecla de borrado
        if (event.inputType === 'deleteContentBackward' || event.inputType === 'deleteContentForward') {
            // No realizar validación ni mostrar alerta
            return;
        }
        if (!soloNumeros.test(valor)) {
            mostrarAlertaFallida("El campo debe contener solo numeros.");
            // Restaurar el valor anterior
            input.value = valorAnterior;
        } else if (valor.length > maximo) {
            mostrarAlertaFallida("La longitud maxima permitida es " + maximo);
            // Borrar la tecla ingresada
            input.value = valorAnterior;
        }else {
            // Actualizar el valor anterior
            valorAnterior = valor;
        }
    });
    input.addEventListener('keydown', function(event) {
        // Almacenar el valor antes de que se ingrese una nueva tecla
        valorAnterior = input.value;
    });
}

function validarCorreo(input) {
    var correoValido = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!correoValido.test(input)) {
      mostrarAlertaFallida("Por favor, ingresa un correo electrónico válido.");
      return false;
    } else {
      return true;
    }
}  
  
/*--------------------------------------------
ALERTAS
--------------------------------------------*/
function mostrarAlertaExitosa(mensaje) {
    Swal.fire({
        icon: 'success',
        title: 'Accion exitosa',
        text: mensaje,
        customClass: {
        confirmButton: 'btn_sweet',
      },
    });
}
  
function mostrarAlertaFallida(mensaje) {
    Swal.fire({
        icon: 'error',
        title: 'Accion fallida',
        text: mensaje,
        customClass: {
        confirmButton: 'btn_sweet',
        },
    });
}