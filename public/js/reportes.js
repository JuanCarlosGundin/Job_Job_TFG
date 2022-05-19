window.onload = function() {
    leerreportesJS();
    //document.getElementById("nombre").focus();
    /*CODIGO MODAL*/

    // Get the modal
    modal = document.getElementById("myModal");

    // Get the <span> element that closes the modal
    span = document.getElementsByClassName("close")[0];



    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function abrirModal(id, nombre) {
    modal.style.display = "block";
    document.getElementById('nombreForm').value = nombre;
    document.getElementById('idModificar').value = id;
}

function objetoAjax() {
    var xmlhttp = false;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}

function leerreportesJS() {

    var tabla = document.getElementById("main");
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('reporte', document.getElementById('reporte').value);

    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();

    ajax.open("POST", "leerreportes", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            var recarga = '';
            recarga += '<tr><td>ID</td><td>INCIDENCIA</td><td>ESTADO INCIDENCIA</td><td>ID_REPORTADOR</td><td>ID_REPORTADO</td><td>ELIMINAR</td></tr>';
            for (let i = 0; i < respuesta.length; i++) {
                recarga += `<tr>`;
                recarga += '<td>' + respuesta[i].id + '</td>'
                recarga += '<td>' + respuesta[i].incidencia + '</td>'
                recarga += '<td>' + respuesta[i].estado_incidencia + '</td>'
                recarga += '<td>' + respuesta[i].id_reportador + '</td>'
                recarga += '<td>' + respuesta[i].id_reportado + '</td>'
                recarga += '<td><img src="storage/' + respuesta[i].foto + '" style="width:15px;"></td>'
                recarga += '<td><button onclick="eliminarJS(' + respuesta[i].id + ')">Eliminar</button></td>'
                recarga += '<td><button type="submit" value="Modificar" onclick="abrirModal(' + respuesta[i].id + ',\'' + respuesta[i].nombre + '\');return false;">Modificar</button></td>'
                recarga += '</tr>';

            }
            tabla.innerHTML = recarga;
        }
    }

    ajax.send(formData);
}

/* Función implementada con AJAX que inserta un archivo */
function insertarJS() {
    /* Si hace falta obtenemos el elemento HTML donde introduciremos la recarga (datos o mensajes) */
    /* Usar el objeto FormData para guardar los parámetros que se enviarán:
       formData.append('clave', valor);
       valor = elemento/s que se pasarán como parámetros: token, method, inputs... */
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('nombre', document.getElementById('nombre').value);
    formData.append('foto', document.getElementById('foto').files[0]);

    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();

    ajax.open("POST", "crear", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            /* Leerá la respuesta que es devuelta por el controlador: */
            if (respuesta.resultado == 'OK') {
                document.getElementById('mensaje').innerHTML = "Inserción correcta."
            } else {
                document.getElementById('mensaje').innerHTML = "Fallo en la inserción: " + respuesta.resultado;
            }
            leerJS();
            document.getElementById('nombre').value = '';
            document.getElementById('foto').value = '';
            document.getElementById("nombre").focus();
        }
    }

    ajax.send(formData);
}

//BORRAR
function eliminarJS(id_usu) {
    /* Si hace falta obtenemos el elemento HTML donde introduciremos la recarga (datos o mensajes) */
    /* Usar el objeto FormData para guardar los parámetros que se enviarán:
       formData.append('clave', valor);
       valor = elemento/s que se pasarán como parámetros: token, method, inputs... */
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'DELETE');
    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();

    ajax.open("POST", "eliminar/" + id_usu, true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            /* Leerá la respuesta que es devuelta por el controlador: */
            if (respuesta.resultado == 'OK') {
                document.getElementById('mensaje').innerHTML = "eliminado correctamente."
            } else {
                document.getElementById('mensaje').innerHTML = "Fallo eliminando " + respuesta.resultado;
            }
            leerJS();
        }
    }

    ajax.send(formData);
}
//EDITAR
function editarJS() {
    /* Si hace falta obtenemos el elemento HTML donde introduciremos la recarga (datos o mensajes) */
    /* Usar el objeto FormData para guardar los parámetros que se enviarán:
       formData.append('clave', valor);
       valor = elemento/s que se pasarán como parámetros: token, method, inputs... */
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', "PUT");
    formData.append('id', document.getElementById('idModificar').value);
    formData.append('nombre', document.getElementById('nombreForm').value);
    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();

    ajax.open("POST", "modificar", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            /* Leerá la respuesta que es devuelta por el controlador: */
            if (respuesta.resultado == 'OK') {
                document.getElementById('mensaje').innerHTML = "editado correctamente."
            } else {
                document.getElementById('mensaje').innerHTML = "Fallo editando " + respuesta.resultado;
            }
            leerJS();
        }
    }

    ajax.send(formData);
    modal.style.display = "none";
}