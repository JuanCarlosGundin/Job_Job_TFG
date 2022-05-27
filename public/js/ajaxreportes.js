window.onload = function() {
    /*CODIGO MODAL*/

    // Get the modal
    modal = document.getElementById("myModal");

    // Get the button that opens the modal
    btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function() {
        modal.style.display = "block";
    }

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

function reportesJS() {
    let incidencia = document.getElementById('incidencia').value;
    let desarrollar_incidencia = document.getElementById('desarrollar_incidencia').value;

    if (incidencia == '' || desarrollar_incidencia == '') {
        swal.fire({
            title: "Error",
            text: "Tienes que rellenar todos los datos",
            icon: "error",
        });
        return false;

    }
    /* Si hace falta obtenemos el elemento HTML donde introduciremos la recarga (datos o mensajes) */
    /* Usar el objeto FormData para guardar los parámetros que se enviarán:
       formData.append('clave', valor);
       valor = elemento/s que se pasarán como parámetros: token, method, inputs... */
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');
    formData.append('id_reportador', document.getElementById('id_reportador').value);
    formData.append('id_reportado', document.getElementById('id_reportado').value);
    formData.append('incidencia', document.getElementById('incidencia').value);
    formData.append('desarrollar_incidencia', document.getElementById('desarrollar_incidencia').value);

    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();

    ajax.open("POST", "crearreporte", true);
    ajax.onreadystatechange = function() {
        console.log(ajax.responseText);
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            // /* Leerá la respuesta que es devuelta por el controlador: */
            console.log(respuesta);
            if (respuesta.resultado == 'OK') {
                swal.fire({
                    title: "Reporte enviado",
                    text: "Hemos recibido tu reporte, enseguida nos pondremos a revisarlo.",
                    showConfirmButton: true,
                    icon: "success",

                });
            } else {
                swal.fire({
                    title: "Oops",
                    text: "Parece que ha habido un error, inténtalo de nuevo.",
                    icon: "error",
                });
            }

        }
    }

    ajax.send(formData);
}
// function reportesJS() {
//     /* Si hace falta obtenemos el elemento HTML donde introduciremos la recarga (datos o mensajes) */
//     /* Usar el objeto FormData para guardar los parámetros que se enviarán:
//        formData.append('clave', valor);
//        valor = elemento/s que se pasarán como parámetros: token, method, inputs... */
//     var formData = new FormData();
//     formData.append('_token', document.getElementById('token').getAttribute("content"));
//     formData.append('_method', 'POST');
//     formData.append('id_reportador', document.getElementById('id_reportador').value);
//     formData.append('id_reportado', document.getElementById('id_reportado').value);
//     formData.append('incidencia', document.getElementById('incidencia').value);
//     formData.append('desarrollar_incidencia', document.getElementById('desarrollar_incidencia').value);

//     /* Inicializar un objeto AJAX */
//     var ajax = objetoAjax();

//     ajax.open("POST", "crearreporte", true);
//     ajax.onreadystatechange = function() {
//         if (ajax.readyState == 4 && ajax.status == 200) {
//             var respuesta = JSON.parse(this.responseText);
//             /* Leerá la respuesta que es devuelta por el controlador: */
//             if (respuesta.resultado == 'OK') {
//                 swal.fire({
//                     title: "Reporte enviado",
//                     text: "Gracias por tu reporte, enseguida nos pondremos a revisarlo.",
//                     showConfirmButton: true,
//                     icon: "success",

//                 });
//             } else {
//                 swal.fire({
//                     title: "Oops",
//                     text: "Parece que ha habido un error, inténtalo de nuevo.",
//                     icon: "error",
//                 });
//             }

//         }
//     }

//     ajax.send(formData);
// }