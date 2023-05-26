// Obtener referencia al botones
var btnRegistrar = document.getElementById('btnRegistrar');
var btnActualizar = document.getElementById('btnActualizar');
var btnCancelar = document.getElementById('btnCancelar');

// Agregar evento de escucha al botón
btnRegistrar.addEventListener('click', function() {
    event.preventDefault();
    registrarUsuario();
});

btnActualizar.addEventListener('click', function() {
  event.preventDefault();
  actualizarUsuario();
});

btnCancelar.addEventListener('click', function() {
  event.preventDefault();
  actualizarVentana();
});

function registrarUsuario() {
  // Obtener los valores del formulario
  var nombre = document.getElementById('nombre').value;
  var direccion = document.getElementById('direccion').value;
  var telefono = document.getElementById('telefono').value;
  var email = document.getElementById('email').value;

  // Codificar los datos en la cadena de consulta
  var queryString = 'accion=registrarUsuario' +
    '&nombre=' + encodeURIComponent(nombre) +
    '&direccion=' + encodeURIComponent(direccion) +
    '&telefono=' + encodeURIComponent(telefono) +
    '&email=' + encodeURIComponent(email);

  // Construir la URL con los datos en la cadena de consulta
  var url = '../CRUD/Controlador/procesar.php?' + queryString;

  // Crear la solicitud GET
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onload = function() {
    if (xhr.status === 200) {
      var respuesta = xhr.responseText;

      if (respuesta === 'success') {
        mostrarAlertaExitosa('Usuario registrado')
        actualizarVentana();
        obtenerSiguienteID();
      } else {
        mostrarAlertaFallida('El registro ha fallado')
      }
    } else {
      mostrarAlertaFallida('Problema con la conexion');
    }
  };

  // Enviar la solicitud GET
  xhr.send();

}


function actualizarUsuario() {
  // Obtener los valores del formulario
  var nombre = document.getElementById('nombre').value;
  var direccion = document.getElementById('direccion').value;
  var telefono = document.getElementById('telefono').value;
  var email = document.getElementById('email').value;
  
  // Obtener el elemento por su ID
  var lblID = document.getElementById('lbl_ID');

  // Obtener el contenido del elemento
  var contenido = lblID.textContent;


  // Codificar los datos en la cadena de consulta
  var queryString = 'accion=actualizarUsuario' +
    '&id=' + parseInt(contenido.substring(3)) +
    '&nombre=' + encodeURIComponent(nombre) +
    '&direccion=' + encodeURIComponent(direccion) +
    '&telefono=' + encodeURIComponent(telefono) +
    '&email=' + encodeURIComponent(email);

  // Construir la URL con los datos en la cadena de consulta
  var url = '../CRUD/Controlador/procesar.php?' + queryString;

  console.log(url);

  // Crear la solicitud GET
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onload = function() {
    if (xhr.status === 200) {
      var respuesta = xhr.responseText;
      if (respuesta === 'Actualizado') {
        mostrarAlertaExitosa('Usuario actualizado')
        actualizarVentana();
      } else {
        mostrarAlertaFallida('La actualizacion ha fallado')
      }
    } else {
      mostrarAlertaFallida('Problema con la conexion');
    }
  };
  // Enviar la solicitud GET
  xhr.send();
}


function eliminarUsuario(id) {
  // Codificar los datos en la cadena de consulta
  var queryString = 'accion=eliminarUsuario' +
    '&id=' + encodeURIComponent(id);

  // Construir la URL con los datos en la cadena de consulta
  var url = '../CRUD/Controlador/procesar.php?' + queryString;

  // Crear la solicitud GET
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onload = function() {
    if (xhr.status === 200) {
      var respuesta = xhr.responseText;
      console.log('Respuesta' + respuesta +'--');
      if (respuesta === 'eliminado') {
        mostrarAlertaExitosa('Usuario eliminado');
        obtenerUsuarios();
      }else {
        mostrarAlertaFallida('No ha sido posible eliminar al usuario: ' + respuesta);
      }
    } else {
      mostrarAlertaFallida('Problema con el servidor');
    }
  };

  // Enviar la solicitud GET
  xhr.send();

}




// Función para crear la tabla de usuarios
function crearTablaUsuarios(usuarios) {
    // Obtener la referencia a la tabla de usuarios
    var tabla = document.getElementById('tabla-usuarios');
    
                var tablaCabecera = tabla.querySelector('thead');
                var tablaCuerpo = tabla.querySelector('tbody');
    // Limpiar la tabla
    tabla.innerHTML = '';
  
    // Iterar sobre los usuarios y agregar filas a la tabla
    usuarios.forEach(function (usuario) {
      var fila = '<tr>' +
        '<td>' + usuario.id + '</td>' +
        '<td>' + usuario.nombre + '</td>' +
        '<td>' + usuario.direccion + '</td>' +
        '<td>' + usuario.telefono + '</td>' +
        '<td>' + usuario.email + '</td>' +
        '<td>' +
        '<a href="" id="btnActualizar" class="btn btn-small btn-warning" data-id="' + usuario.id + '"><i class="fa-solid fa-pen-to-square"></i></a>' +
        '<a href="" id="btnEliminar" class="btn btn.small btn-danger" data-id="' + usuario.id + '"><i class="fa-solid fa-trash"></i></a>' +
        '</td>' +
        '</tr>';
  
      tabla.innerHTML += fila;
    });

    tabla.appendChild(tablaCabecera);
  
    // Obtener todos los botones de eliminar
    var botonesEliminar = document.querySelectorAll('#tabla-usuarios .btn-danger');
    botonesEliminar.forEach(function (boton) {
      boton.addEventListener('click', function (event) {
        event.preventDefault();
        var idUsuario = this.getAttribute('data-id');
        confirmarEliminarUsuario(idUsuario);
      });    
    });

    // Obtener todos los botones de eliminar
    var botonesActualizar = document.querySelectorAll('#tabla-usuarios .btn-warning');
    botonesActualizar.forEach(function (boton) {
      boton.addEventListener('click', function (event) {
        event.preventDefault();
        var idUsuario = this.getAttribute('data-id');
        cargarDatos(idUsuario);
      });    
    });
}

function cargarDatos(idUsuario) {
  var queryString = 'accion=obtenerUsuarioPorID' +
    '&id=' + encodeURIComponent(idUsuario);

  // Construir la URL con los datos en la cadena de consulta
  var url = '../CRUD/Controlador/procesar.php?' + queryString;

  // Crear la solicitud GET
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  console.log(url);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onload = function () {
    if (xhr.status === 200) {
      var usuario = JSON.parse(xhr.responseText);
      var lbl_ID = document.getElementById('lbl_ID');
      var input_nombre = document.getElementById('nombre');
      var input_direccion = document.getElementById('direccion');
      var input_telefono = document.getElementById('telefono');
      var input_email = document.getElementById('email');
      lbl_ID.textContent = "ID: " + usuario.id;
      input_nombre.value = usuario.nombre;
      input_direccion.value = usuario.direccion;
      input_telefono.value = usuario.telefono;
      input_email.value = usuario.email;
      alternarBotones(true);
    } else {
      console.error('Error en la solicitud: ' + xhr.status + '--');

    }
  };

  xhr.send();
}

function limpiarCampos(){
  var input_nombre = document.getElementById('nombre');
  var input_direccion = document.getElementById('direccion');
  var input_telefono = document.getElementById('telefono');
  var input_email = document.getElementById('email');
  input_nombre.value = "";
  input_direccion.value = "";
  input_telefono.value = "";
  input_email.value = "";
}

  
  // Función para obtener los usuarios mediante una solicitud AJAX
  function obtenerUsuarios() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../CRUD/Controlador/procesar.php?accion=obtenerUsuarios', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
  
    xhr.onload = function () {
      if (xhr.status === 200) {
        var usuarios = JSON.parse(xhr.responseText);
        crearTablaUsuarios(usuarios); // Llamar a la función para crear la tabla de usuarios
      } else {
        console.error('Error en la solicitud: ' + xhr.status);

      }
    };
  
    xhr.send();
  }

  // Función para obtener los usuarios mediante una solicitud AJAX
  function obtenerSiguienteID() {
    // Crear la solicitud GET
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../CRUD/Controlador/procesar.php?accion=obtenerSiguienteID', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  
    xhr.onload = function() {
      if (xhr.status === 200) {
        var respuesta = xhr.responseText;
        console.log('Obtiene: ' +respuesta);
        if (respuesta === '') {
          mostrarAlertaFallida('No ha sido posibleobtener el siguiente ID: ' + respuesta);
        }else{
          var lbl_ID = document.getElementById('lbl_ID');
          lbl_ID.textContent = "ID: "+ respuesta;
        }
      } else {
        mostrarAlertaFallida('Problema con el servidor');
      }
    };
  
    // Enviar la solicitud GET
    xhr.send();
  
  }
  
  // Llamar a la función para obtener los usuarios al cargar la página
  window.onload = function () {
    actualizarVentana();
  };

  function actualizarVentana(){
    obtenerUsuarios();
    obtenerSiguienteID();
    alternarBotones(false);
    limpiarCampos();
  }
  
/*-----------------------------------------------------
ALERTAS
-----------------------------------------------------*/
// Después de registrar un usuario exitosamente
// Llamar a la función para mostrar la alerta
//mostrarAlertaRegistroExitoso();


// Función para mostrar la alerta de registro exitoso
function mostrarAlertaRegistroExitoso() {
  Swal.fire({
    icon: 'success',
    title: 'Registro exitoso',
    text: 'El usuario ha sido registrado correctamente',
  });
};

function mostrarAlertaRegistroFallido() {
  Swal.fire({
    icon: 'error',
    title: 'Registro fallido',
    text: 'Usuario no ha sido registrado',
  });
};

function confirmarEliminarUsuario(idUsuario) {
  Swal.fire({
    icon: 'question',
    title: 'Confirmar eliminacion',
    text: 'Esta seguro de que desea eliminar al usuario ' + idUsuario + '?',
    showCancelButton: true,
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
    customClass: {
      confirmButton: 'btn_sweet',
    },
  }).then((result) => {
    if (result.isConfirmed) {
      // El usuario confirmó la acción
      eliminarUsuario(idUsuario);
    } else {
      mostrarAlertaExitosa('Eliminacion cancelada');
    }
  });
}

function alternarBotones(bandera){
  // Obtener el elemento por su clase
  var contenedorBtnRegistro = document.querySelector('.contenedor_btn_registro');
  var contenedorBtnActualizar = document.querySelector('.contenedor_btn_actualizar');

  if (bandera){
    // Ocultar el elemento cambiando la propiedad display a "none"
    contenedorBtnRegistro.style.display = 'none';
    contenedorBtnActualizar.style.display = 'flex';
  }else{
    contenedorBtnRegistro.style.display = 'flex';
    contenedorBtnActualizar.style.display = 'none';
  }
}