window.onload = function() {
    leer_contenido();
}

////////////////////////////REDIRECCIONES/////////////////////////////////
var navbarProfile = document.getElementById("navbar-profile-icon");
var navbarMain = document.getElementById("navbar-main-icon");
var navbarAlerts = document.getElementById("navbar-alerts-icon");
var navbarPT = document.getElementById("navbar-PT-icon");

navbarProfile.onclick = function() {

    window.location.href = "./perfil";

}

navbarAlerts.onclick = function() {

    window.location.href = "./notificaciones";

}

navbarMain.onclick = function() {

    window.location.href = "./home";

}

navbarPT.onclick = function() {

    window.location.href = "./pruebatecnica";

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

function leer_contenido() {
    var contenidoajax = document.getElementById("contenidoajax");
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    var ajax = objetoAjax();
    ajax.open("POST", "leercontenido", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            console.log(respuesta);
            var recarga = ``;
            if (respuesta.hasOwnProperty('empresa')) {
                var empresa = respuesta.empresa;
                for (let i = 0; i < empresa.length; i++) {
                    recarga = `
                    <div>
                    <p>${empresa[i].enunciado}</p>
                    <p>${empresa[i].descripcion}</p>
                    <p>Numero de inscritos</p>
                    </div>
                    `;

                }
                contenidoajax.innerHTML = recarga;
            }
            if (respuesta.hasOwnProperty('trabajador')) {

                var trabajador = respuesta.trabajador;
                for (let i = 0; i < trabajador.length; i++) {
                    recarga = `
                    <div class="pruebas">
                    <p>${trabajador[i].nom_emp}</p>
                    <p>${trabajador[i].enunciado}</p>
                    <p>${trabajador[i].duracion}</p>
                    </div>
                    `;

                }
                contenidoajax.innerHTML = recarga;
                for (let i = 0; i < trabajador.length; i++) {
                    document.getElementsByClassName("pruebas")[i].id_empresa = trabajador[i].id_empresa;
                    document.getElementsByClassName("pruebas")[i].addEventListener("click", mostrar_prueba_tecnica)

                }

            }

        }
    }
    ajax.send(formData);
}

function mostrar_prueba_tecnica(evt) {
    var id_empresa = evt.currentTarget.id_empresa;

    var contenidoajax = document.getElementById("contenidoajax");
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    var ajax = objetoAjax();
    ajax.open("POST", "mostrar_ptecnica_trabajador/" + id_empresa, true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            console.log(respuesta);
            var trabajador = respuesta.trabajador;
            var date_p = new Date(trabajador.fecha_publicacion);
            var fecha_publicacion = date_p.getDate() + "/" + (date_p.getMonth() + 1) + "/" + date_p.getFullYear();
            var date_l = new Date(trabajador.fecha_limite);
            var fecha_limite = date_l.getDate() + "/" + (date_l.getMonth() + 1) + "/" + date_l.getFullYear();
            var recarga = ``;
            recarga = `
            <div>
                <p>Prueba tecnica para:</p>
                <p>${trabajador.enunciado}</p>
                <div>
                    <p>Empresa</p>
                    <p>${trabajador.nom_emp}</p>
                </div>
                <div>
                    <p>Duración</p>
                    <p>${trabajador.duracion}</p>
                </div>
                <div>
                    <p>Fecha de publicación</p>
                    <p>${fecha_publicacion}</p>
                </div>
                <div>
                    <p>Fecha limite</p>
                    <p>${fecha_limite}</p>
                </div>
                <div>
                    <p>Habilidades requeridas:</p>
                    <p>Lo que sea</p>
                </div>
                <div>
                    <p>Descripción:</p>
                    <p>${trabajador.descripcion}</p>
                </div>
                <div>
                    <button id="iniciar prueba">Iniciar prueba</button>
                </div>
            </div>
            `;
            contenidoajax.innerHTML = recarga;

        }
    }
    ajax.send(formData);

}