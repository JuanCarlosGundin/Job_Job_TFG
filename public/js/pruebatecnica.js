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
                    recarga += `
                    <div class="pruebas">
                        <p>${empresa[i].enunciado}</p>
                        <p>${empresa[i].descripcion}</p>
                        <p>Numero de inscritos</p>`;
                    if (!respuesta.inscritos[i].inscritos) {
                        recarga += `<p>0 personas</p>`;
                    } else {
                        recarga += `<p>${respuesta.inscritos[i].inscritos} personas</p>`;
                    }
                    recarga += `</div><hr>`;

                }
                recarga += `<button id="crear">Crear</button>`
                contenidoajax.innerHTML = recarga;
                document.getElementById("crear").addEventListener("click", form_crear_prueba_tecnica)
                for (let i = 0; i < empresa.length; i++) {
                    document.getElementsByClassName("pruebas")[i].id = empresa[i].id;
                    document.getElementsByClassName("pruebas")[i].addEventListener("click", mostrar_prueba_tecnica_empresa)

                }
            }
            if (respuesta.hasOwnProperty('trabajador')) {

                var trabajador = respuesta.trabajador;
                var id_trabajador = respuesta.id_trabajador;
                for (let i = 0; i < trabajador.length; i++) {
                    recarga += `
                    <div class="pruebas">
                    <p>${trabajador[i].nom_emp}</p>
                    <p>${trabajador[i].enunciado}</p>
                    <p>${trabajador[i].duracion}</p>
                    </div>
                    <hr>
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
            recarga += `
            <button id="volver">Volver</button>
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
                    <button id="iniciar_prueba">Iniciar prueba</button>
                </div>
            </div>
            `;
            contenidoajax.innerHTML = recarga;
            document.getElementById("volver").addEventListener("click", leer_contenido)
            document.getElementById("iniciar_prueba").id_empresa = trabajador.id_empresa;
            document.getElementById("iniciar_prueba").addEventListener("click", iniciar_ptecnica_trabajador)

        }
    }
    ajax.send(formData);

}

function iniciar_ptecnica_trabajador(evt) {
    var id_empresa = evt.currentTarget.id_empresa;

    var contenidoajax = document.getElementById("contenidoajax");
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    var ajax = objetoAjax();
    ajax.open("POST", "iniciar_ptecnica_trabajador/" + id_empresa, true);
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
            recarga += `
            <button id="volver">Volver</button>
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
                    <p>Formato de respuesta</p>
                    <p>Texto donde dice zip</p>
                </div>
                <form id="formarchivo" enctype="multipart/form-data">
                    <input type="file" class="" name="zip_participante" id="zip_participante" accept=".zip,.rar,.7zip">
                    <button type="submit" id="enviar_respuesta">Enviar respuesta</button>
                </form>
            </div>
            `;
            contenidoajax.innerHTML = recarga;
            document.getElementById("volver").id_empresa = trabajador.id_empresa;
            document.getElementById("volver").addEventListener("click", mostrar_prueba_tecnica)
            document.getElementById("formarchivo").id = trabajador.id;
            document.getElementById("formarchivo").addEventListener("submit", enviar_zip_trabajador);

        }
    }
    ajax.send(formData);

}

function enviar_zip_trabajador(evt) {

    evt.preventDefault();
    var id_pt = evt.currentTarget.id;
    var zip_participante = document.getElementById("zip_participante").files[0]

    var contenidoajax = document.getElementById("contenidoajax");
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');
    formData.append('zip_participante', zip_participante);
    var ajax = objetoAjax();
    ajax.open("POST", "insertar_trabajador_ptecnica/" + id_pt, true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            console.log(respuesta);

        }
    }
    ajax.send(formData);
}

function form_crear_prueba_tecnica() {

    var contenidoajax = document.getElementById("contenidoajax");
    var recarga = ``;
    recarga += `
    <button id="volver">Volver</button>
    <form id="form_crear_prueba_tecnica" enctype="multipart/form-data">
    <p>lenguaje</p>
    <input type="text" class="" id="lenguaje" name="lenguaje">
    <p>fecha_limite</p>
    <input type="date" class="" id="fecha_limite" name="fecha_limite">
    <p>duracion</p>
    <input type="time" class="" id="duracion" name="duracion">
    <p>enunciado</p>
    <input type="text" class="" id="enunciado" name="enunciado">
    <p>descripcion</p>
    <input type="text" class="" id="descripcion" name="descripcion">
    <p>zip</p>
    <input type="file" class="" id="zip_prueba" name="zip_prueba">
    <button type="submit">Enviar</button>
    </form>
    `
    contenidoajax.innerHTML = recarga;
    document.getElementById("volver").addEventListener("click", leer_contenido)
    document.getElementById("form_crear_prueba_tecnica").addEventListener("submit", crear_prueba_tecnica);
}

function crear_prueba_tecnica(evt) {
    evt.preventDefault();

    var lenguaje = document.getElementById("lenguaje").value;
    var fecha_limite = document.getElementById("fecha_limite").value;
    var duracion = document.getElementById("duracion").value;
    var enunciado = document.getElementById("enunciado").value;
    var descripcion = document.getElementById("descripcion").value;
    var zip_prueba = document.getElementById("zip_prueba").files[0];

    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');
    formData.append('lenguaje', lenguaje);
    formData.append('fecha_limite', fecha_limite);
    formData.append('duracion', duracion);
    formData.append('enunciado', enunciado);
    formData.append('descripcion', descripcion);
    formData.append('zip_prueba', zip_prueba);
    var ajax = objetoAjax();
    ajax.open("POST", "crear_prueba_tecnica", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            console.log(respuesta);

        }
    }
    ajax.send(formData);

}

function mostrar_prueba_tecnica_empresa(evt) {
    var id_pt = evt.currentTarget.id;
    var contenidoajax = document.getElementById("contenidoajax");

    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');

    var ajax = objetoAjax();
    ajax.open("POST", "mostrar_zip_trabajadores/" + id_pt, true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            console.log(respuesta);
            var empresa = respuesta.empresa;
            var json_prueba = JSON.parse(empresa.json_prueba);
            console.log(json_prueba);
            var recarga = ``;
            recarga += `
            <button id="volver">Volver</button>
            <p>${empresa.enunciado}</p>
            <p>${empresa.descripcion}</p>
            `;
            if (json_prueba) {
                for (let i = 0; i < json_prueba.length; i++) {
                    recarga += `
                    <button class="participantes">Participante ${i+1}</button>
                    <button class="descargas">Descargar zip</button>
                    `

                }
            }
            contenidoajax.innerHTML = recarga;
            document.getElementById("volver").addEventListener("click", leer_contenido)
            if (json_prueba) {
                for (let i = 0; i < json_prueba.length; i++) {
                    document.getElementsByClassName("participantes")[i].id_participante = json_prueba[i].id_participante;
                    document.getElementsByClassName("participantes")[i].addEventListener("click", mostrar_participantes);
                    document.getElementsByClassName("descargas")[i].zip_participante = json_prueba[i].zip_participante;
                    document.getElementsByClassName("descargas")[i].addEventListener("click", descargar_archivo);

                }
            }
        }
    }
    ajax.send(formData);

}

function mostrar_participantes(evt) {
    var id_participante = evt.currentTarget.id_participante;
    var contenidoajax = document.getElementById("contenidoajax");

    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');

    var ajax = objetoAjax();
    ajax.open("POST", "mostrar_un_trabajador/" + id_participante, true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);

        }
    }
    ajax.send(formData);
}

function descargar_archivo(evt) {
    var zip_participante = evt.currentTarget.zip_participante;
    window.location.href = "./storage/" + zip_participante;
}