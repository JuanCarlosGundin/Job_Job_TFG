window.onload = function() {
    leerreportesJS();
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
    formData.append('filtro', document.getElementById('filtro').value);

    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();

    ajax.open("POST", "leerreportes", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            var recarga = '';
            recarga += '<tr><td>ID</td><td>INCIDENCIA</td><td>INCIDENCIA DESARROLLADA</td><td>ESTADO INCIDENCIA</td><td>ID_REPORTADOR</td><td>ID_REPORTADO</td><td>FECHA</td></tr>';
            for (let i = 0; i < respuesta.length; i++) {
                recarga += `<tr>`;
                recarga += '<td>' + respuesta[i].id + '</td>'
                recarga += '<td>' + respuesta[i].incidencia + '</td>'
                recarga += '<td>' + respuesta[i].desarrollar_incidencia + '</td>'
                recarga += '<td>' + respuesta[i].estado_incidencia + '</td>'
                recarga += '<td>' + respuesta[i].id_reportador + '</td>'
                recarga += '<td>' + respuesta[i].id_reportado + '</td>'
                recarga += '<td>' + respuesta[i].fecha_incidencia + '</td>'
                    // recarga += '<td><button onclick="eliminarreportesJS(' + respuesta[i].id + ')">Eliminar</button></td>'
                if (respuesta[i].estado_incidencia == "abierta") {
                    recarga += '<td><button type="button" class="btn btn-warning" onclick="estadoreporteJS(' + respuesta[i].id + '); return false;">Cerrar</button></td>';
                } else {
                    recarga += '<td><button type="button" class="btn btn-warning" onclick="estadoreporteJS(' + respuesta[i].id + '); return false;">Abrir</button></td>';
                }
                recarga += '</tr>';

            }
            tabla.innerHTML = recarga;
        }
    }

    ajax.send(formData);
}
// function leerreportesJS() {

//     var tabla = document.getElementById("main");
//     var formData = new FormData();
//     formData.append('_token', document.getElementById('token').getAttribute("content"));
//     formData.append('filtro', document.getElementById('filtro').value);
//     formData.append('abierta', document.getElementById("abierta").checked);
//     formData.append('cerrada', document.getElementById("cerrada").checked);

//     /* Inicializar un objeto AJAX */
//     var ajax = objetoAjax();

//     ajax.open("POST", "leerreportes", true);
//     ajax.onreadystatechange = function() {
//         if (ajax.readyState == 4 && ajax.status == 200) {
//             var respuesta = JSON.parse(this.responseText);
//             if (respuesta.hasOwnProperty('abierta')) {
//                 var abierta = respuesta.abierta;
//                 var recargaabierta = '';
//                 recargaabierta += '<tr><td>ID</td><td>INCIDENCIA</td><td>INCIDENCIA DESARROLLADA</td><td>ESTADO INCIDENCIA</td><td>ID_REPORTADOR</td><td>ID_REPORTADO</td><td>FECHA</td></tr>';

//                 for (let i = 0; i < trabajador.length; i++) {
//                     recargaabierta += `<tr>`;
//                     recargaabierta += '<td>' + abierta[i].id + '</td>'
//                     recargaabierta += '<td>' + abierta[i].incidencia + '</td>'
//                     recargaabierta += '<td>' + abierta[i].desarrollar_incidencia + '</td>'
//                     recargaabierta += '<td>' + abierta[i].estado_incidencia + '</td>'
//                     recargaabierta += '<td>' + abierta[i].id_reportador + '</td>'
//                     recargaabierta += '<td>' + abierta[i].id_reportado + '</td>'
//                     recargaabierta += '<td>' + abierta[i].fecha_incidencia + '</td>'
//                         // recargaabierta += '<td><button onclick="eliminarreportesJS(' + respuesta[i].id + ')">Eliminar</button></td>'
//                     if (abierta[i].estado_incidencia == "abierta") {
//                         recargaabierta += '<td><button type="button" class="btn btn-warning" onclick="estadoreporteJS(' + abierta[i].id + '); return false;">Cerrar</button></td>';
//                     } else {
//                         recargaabierta += '<td><button type="button" class="btn btn-warning" onclick="estadoreporteJS(' + abierta[i].id + '); return false;">Abrir</button></td>';
//                     }
//                     recargaabierta += '</tr>';

//                 }
//                 tabla.innerHTML = recargaabierta;
//             }

//             ajax.send(formData);
//         }
//     }
// }

function estadoreporteJS(id) {

    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'PUT');

    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();

    ajax.open("POST", "estadoreporte/" + id, true);

    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);

            leerreportesJS();

        }

    }

    ajax.send(formData)

}


// //BORRAR
// function eliminarreportesJS(id_usu) {
//     var formData = new FormData();
//     formData.append('_token', document.getElementById('token').getAttribute("content"));
//     formData.append('_method', 'DELETE');
//     /* Inicializar un objeto AJAX */
//     var ajax = objetoAjax();

//     ajax.open("POST", "eliminarreporte/" + id_usu, true);
//     ajax.onreadystatechange = function() {
//         if (ajax.readyState == 4 && ajax.status == 200) {
//             var respuesta = JSON.parse(this.responseText);
//             /* Leerá la respuesta que es devuelta por el controlador: */
//             if (respuesta.resultado == 'OK') {
//                 document.getElementById('mensaje').innerHTML = "eliminado correctamente."
//             } else {
//                 document.getElementById('mensaje').innerHTML = "Fallo eliminando " + respuesta.resultado;
//             }
//             leerreportesJS();
//         }
//     }

//     ajax.send(formData);
// }