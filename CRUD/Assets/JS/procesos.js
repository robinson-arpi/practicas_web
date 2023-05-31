// Obtener referencia al botones
var btnRegistrar = document.getElementById('btnRegistrar');
var btnActualizar = document.getElementById('btnActualizar');
var btnCancelar = document.getElementById('btnCancelar');
var btnBuscar = document.getElementById('btnBuscar');

// Obtener referencia a los campos
var input_busqueda = document.getElementById('busqueda');
var input_nombre = document.getElementById('nombre');
var input_direccion = document.getElementById('direccion');
var input_telefono = document.getElementById('telefono');
var input_email = document.getElementById('email');
var lbl_ID = document.getElementById('lbl_ID');
var select_provincias = document.getElementById('provincias');
var select_ciudad = document.getElementById('ciudades');

/*-----------------------------------------------------
Botones
-----------------------------------------------------*/
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

input_busqueda.addEventListener('input', function() {
  // Llamar a tu función aquí
  obtenerBusqueda();
});

// Agregar el evento onchange al select
select_provincias.addEventListener('change', function() {
  cargarCiudades(select_provincias.selectedIndex + 1);
});

/*-----------------------------------------------------
Carga de la vista
-----------------------------------------------------*/
window.onload = function () {
  actualizarVentana();

};

function cargarProvincias(){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '../CRUD/Controlador/procesar.php?accion=obtenerProvincias', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function () {
    if (xhr.status === 200) {
      var provincias = JSON.parse(xhr.responseText);
      crearSelect(provincias, select_provincias); // Llamar a la función para crear la tabla de usuarios
    } else {
      console.error('Error en la solicitud: ' + xhr.status);
    }
  };
  xhr.send();
}

function cargarCiudades(id_provincia){
  var queryString = 'accion=obtenerCiudades' +  '&provincia=' + id_provincia;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '../CRUD/Controlador/procesar.php?' +  queryString, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function () {
    if (xhr.status === 200) {
      var ciudades = JSON.parse(xhr.responseText);
      crearSelect(ciudades, select_ciudad); // Llamar a la función para crear la tabla de usuarios
    } else {
      console.error('Error en la solicitud: ' + xhr.status);
    }
  };
  xhr.send();
}

function crearSelect(campos, campoSelect) {
  // Limpiar el select
  campoSelect.innerHTML = '';

  // Iterar sobre los campos y crear las opciones
  for (var i = 0; i < campos.length; i++) {
    var campo = campos[i];
    var opcion = document.createElement('option');
    opcion.value = campo.valor;
    opcion.textContent = campo.nombre;
    campoSelect.appendChild(opcion);
  }
  campoSelect.selectedIndex = 0;
}

function actualizarVentana(){
  obtenerUsuarios();
  obtenerSiguienteID();
  alternarBotones(false);
  limpiarCampos();
  cargarProvincias();
  select_provincias.selectedIndex = 0;
  cargarCiudades(select_provincias.selectedIndex + 1);
}

function limpiarCampos(){
  input_nombre.value = "";
  input_direccion.value = "";
  input_telefono.value = "";
  input_email.value = "";
  input_busqueda.value = "";
  cargarProvincias();
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

/*-----------------------------------------------------
METODOS CRUD
-----------------------------------------------------*/
function registrarUsuario() {
  // Obtener los valores del formulario
  var nombre = input_nombre.value;
  var direccion = input_direccion.value;
  var telefono = input_telefono.value;
  var email = input_email.value;
  var ciudad = select_ciudad.options[select_ciudad.selectedIndex].text;

  //Condicion de campos llenos
  if(camposVacios(nombre, direccion, telefono, email)){
    return;
  }else{
    if(!validarCorreo(email)){
      //console.log("correo invalido: " + email;
      return;
    }
  }
  
  // Codificar los datos en la cadena de consulta
  var queryString = 'accion=registrarUsuario' +
    '&nombre=' + encodeURIComponent(nombre) +
    '&direccion=' + encodeURIComponent(direccion) +
    '&telefono=' + encodeURIComponent(telefono) +
    '&email=' + encodeURIComponent(email) +
    '&ciudad=' + encodeURIComponent(ciudad);

  // Construir la URL con los datos en la cadena de consulta
  var url = '../CRUD/Controlador/procesar.php?' + queryString;
  
  // Crear la solicitud GET
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onload = function() {
    if (xhr.status === 200) {
      var respuesta = xhr.responseText;
      if (respuesta === 'registrado') {
        mostrarAlertaExitosa('Usuario registrado')
        actualizarVentana();
        obtenerSiguienteID();
        enviarCorreo(nombre, email);
      } else {
        mostrarAlertaFallida('El registro ha fallado: '+ respuesta)
      }
    } else {
      mostrarAlertaFallida('Problema con la conexion');
    }
  };
  // Enviar la solicitud GET
  xhr.send();
}

function enviarCorreo(nombre, email) {
  // Codificar los datos en la cadena de consulta
  var queryString = 'accion=enviarCorreo' +
    '&nombre=' + encodeURIComponent(nombre) +
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
      if (respuesta === 'enviado') {
        console.log('Correo enviado')
      } else {
        mostrarAlertaFallida("respuesta: "+respuesta+ "--");
      }
    } else {
      mostrarAlertaFallida('Problema con la conexion');
    }
  };
  xhr.send();
}

function actualizarUsuario() {
  // Obtener los valores del formulario
  var nombre = input_nombre.value;
  var direccion = input_direccion.value;
  var telefono = input_telefono.value;
  var email = input_email.value;
  var contenido = lbl_ID.textContent;
  var ciudad = select_ciudad.options[select_ciudad.selectedIndex].text;

  // Codificar los datos en la cadena de consulta
  var queryString = 'accion=actualizarUsuario' +
    '&id=' + parseInt(contenido.substring(3)) +
    '&nombre=' + encodeURIComponent(nombre) +
    '&direccion=' + encodeURIComponent(direccion) +
    '&telefono=' + encodeURIComponent(telefono) +
    '&email=' + encodeURIComponent(email) + 
    '&ciudad=' + encodeURIComponent(ciudad);

  // Construir la URL con los datos en la cadena de consulta
  var url = '../CRUD/Controlador/procesar.php?' + queryString;

  // Crear la solicitud GET
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onload = function() {
    if (xhr.status === 200) {
      var respuesta = xhr.responseText;
      if (respuesta === 'actualizado') {
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
        '<td>' + usuario.ciudad + '</td>' +
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
  //Construcción URL
  var queryString = 'accion=obtenerUsuarioPorID' + '&id=' + idUsuario;
  var url = '../CRUD/Controlador/procesar.php?' + queryString;
  // Crear la solicitud GET
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  
  xhr.onload = function () {
    if (xhr.status === 200) {
      var usuario = JSON.parse(xhr.responseText)[0];
      lbl_ID.textContent = "ID: " + usuario.id;
      input_nombre.value = usuario.nombre;
      input_direccion.value = usuario.direccion;
      input_telefono.value = usuario.telefono;
      input_email.value = usuario.email;
      alternarBotones(true);

    } else {
      alert('Error en la solicitud: ' + xhr.status + '--');
    }
  };

  xhr.send();
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

function obtenerSiguienteID() {
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
        //var lbl_ID = document.getElementById('lbl_ID');
        lbl_ID.textContent = "ID: "+ respuesta;
      }
    } else {
      mostrarAlertaFallida('Problema con el servidor');
    }
  };
  xhr.send();
}



/*-----------------------------------------------------
BUSQUEDA POR CARACTERES
-----------------------------------------------------*/
function obtenerBusqueda() {
  var queryString = 'accion=buscarUsuario' +
  '&cadenaBusqueda=' + encodeURIComponent(input_busqueda.value);

  // Construir la URL con los datos en la cadena de consulta
  var url = '../CRUD/Controlador/procesar.php?' + queryString;

  var xhr = new XMLHttpRequest();

  xhr.open('GET', url, true);
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
    }
  });
}