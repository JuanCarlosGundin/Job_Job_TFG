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
                    document.getElementsByClassName("pruebas")[i].id_pt = empresa[i].id;
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
                </div>`;
            if (respuesta.hasOwnProperty('existe')) {
                recarga += `<div>
                <button id="entrar_prueba">Entrar prueba</button>
                </div>`;
            } else {
                recarga += `<div>
                    <button id="iniciar_prueba">Iniciar prueba</button>
                </div>`;
            }
            recarga += `</div>
            `;
            contenidoajax.innerHTML = recarga;
            document.getElementById("volver").addEventListener("click", leer_contenido)
            if (respuesta.hasOwnProperty('existe')) {
                document.getElementById("entrar_prueba").id_empresa = trabajador.id_empresa;
                document.getElementById("entrar_prueba").addEventListener("click", entrar_ptecnica_trabajador)
            } else {
                document.getElementById("iniciar_prueba").id_empresa = trabajador.id_empresa;
                document.getElementById("iniciar_prueba").addEventListener("click", iniciar_ptecnica_trabajador)
            }

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
        console.log(ajax.responseText);
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            var recarga = ``;
            console.log(respuesta);
            if (respuesta.hasOwnProperty('trabajador')) {
                var trabajador = respuesta.trabajador;
                var date_p = new Date(trabajador.fecha_publicacion);
                var fecha_publicacion = date_p.getDate() + "/" + (date_p.getMonth() + 1) + "/" + date_p.getFullYear();
                var date_l = new Date(trabajador.fecha_limite);
                var fecha_limite = date_l.getDate() + "/" + (date_l.getMonth() + 1) + "/" + date_l.getFullYear();
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
                document.getElementById("formarchivo").id_pt = trabajador.id;
                document.getElementById("formarchivo").addEventListener("submit", enviar_zip_trabajador);
            } else {
                swal.fire({
                    title: "Inscrito",
                    text: "Ya te inscribiste previamente",
                    icon: "error",
                    confirmButtonText: "OK",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                })
            }

        }
    }
    ajax.send(formData);

}

function entrar_ptecnica_trabajador(evt) {
    var id_empresa = evt.currentTarget.id_empresa;

    var contenidoajax = document.getElementById("contenidoajax");
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    var ajax = objetoAjax();
    ajax.open("POST", "entrar_ptecnica_trabajador/" + id_empresa, true);
    ajax.onreadystatechange = function() {
        console.log(ajax.responseText);
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            var recarga = ``;
            console.log(respuesta);
            var trabajador = respuesta.trabajador;
            var date_p = new Date(trabajador.fecha_publicacion);
            var fecha_publicacion = date_p.getDate() + "/" + (date_p.getMonth() + 1) + "/" + date_p.getFullYear();
            var date_l = new Date(trabajador.fecha_limite);
            var fecha_limite = date_l.getDate() + "/" + (date_l.getMonth() + 1) + "/" + date_l.getFullYear();
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
            document.getElementById("formarchivo").id_pt = trabajador.id;
            document.getElementById("formarchivo").addEventListener("submit", enviar_zip_trabajador);

        }
    }
    ajax.send(formData);
}

function enviar_zip_trabajador(evt) {

    evt.preventDefault();
    var id_pt = evt.currentTarget.id_pt;
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
            if (respuesta.resultado == "fuera") {
                swal.fire({
                    title: "Fuera",
                    text: "Fuera de tiempo",
                    icon: "error",
                    confirmButtonText: "OK",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        leer_contenido();
                    }
                });
            }

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
    var id_pt = evt.currentTarget.id_pt;
    console.log(id_pt);
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
                    console.log(json_prueba[i].zip_participante)
                    recarga += `
                    <button class="participantes">Participante ${i+1}</button>`;
                    if (!json_prueba[i].zip_participante) {
                        recarga += `<p>Aun no ha subido el zip</p>`;
                    } else {
                        recarga += `
                        <button class="descargas">Descargar zip</button>
                        `
                    }

                }
            }
            contenidoajax.innerHTML = recarga;
            document.getElementById("volver").addEventListener("click", leer_contenido)
            if (json_prueba) {
                for (let i = 0; i < json_prueba.length; i++) {
                    document.getElementsByClassName("participantes")[i].id_participante = json_prueba[i].id_participante;
                    document.getElementsByClassName("participantes")[i].id_pt = id_pt;
                    document.getElementsByClassName("participantes")[i].addEventListener("click", mostrar_participantes);
                    if (!json_prueba[i].zip_participante) {

                    } else {
                        document.getElementsByClassName("descargas")[i].zip_participante = json_prueba[i].zip_participante;
                        document.getElementsByClassName("descargas")[i].addEventListener("click", descargar_archivo);
                    }

                }
            }
        }
    }
    ajax.send(formData);

}

function mostrar_participantes(evt) {
    var id_participante = evt.currentTarget.id_participante;
    var id_pt = evt.currentTarget.id_pt;
    console.log(id_pt);
    var contenidoajax = document.getElementById("contenidoajax");

    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');

    var ajax = objetoAjax();
    ajax.open("POST", "mostrar_un_trabajador/" + id_participante, true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            console.log(respuesta);
            var recarga = ``;
            var trabajador = respuesta.participante;

            /* Foto */
            recarga += '<div class="user-vista">';
            //Volver
            recarga += '<div class="return">';
            recarga += '<button id="volver">';
            recarga += '<i class="fa-solid fa-angle-left"></i>';
            recarga += '</button>';
            recarga += '</div>';
            recarga += '<div class="user-ver-foto">';
            recarga += '<div class="container-foto">';

            if (trabajador.foto_perfil != null) {

                recarga += '<img class="user-profilefoto" src="storage/' + trabajador.foto_perfil + '">';

            } else {

                recarga += '<img class="user-profilefoto" src="storage/img/usuario.png">';

            }

            recarga += '</div>';
            recarga += '</div>';
            /* Inputs para editar el usuario */
            recarga += '<div class="user-ver">';
            /* Nombre, apellido y edad */
            recarga += '<div class="user-div-name">';
            recarga += '<div class="user-icon-name">';
            recarga += '<i class="fa-solid fa-user"></i>';
            recarga += '</div>';
            recarga += '<div class="divs-name">';
            recarga += '<span class="p-name">  ' + trabajador.nombre + ' </span>';
            recarga += '<span class="p-surname">  ' + trabajador.apellido + ' </span>';
            recarga += '<i class="fa-solid fa-cake-candles"></i>';
            recarga += '<span class="p-age"> ' + trabajador.edad + '</span>';
            recarga += '</div>';
            recarga += '</div>';
            recarga += '<hr>';
            /* Correo */
            recarga += '<div class="user-div-house">';
            recarga += '<div class="user-icon-name">';
            recarga += '<i class="fa-solid fa-at"></i>';
            recarga += '</div>';
            recarga += '<div class="divs-house">';
            recarga += '<span class="p-house">' + trabajador.mail + '</span>';
            recarga += '</div>';
            recarga += '</div>';
            /* Vivienda */
            recarga += '<div class="user-div-house">';
            recarga += '<div class="user-icon-name">';
            recarga += '<i class="fa-solid fa-house-chimney"></i>';
            recarga += '</div>';
            recarga += '<div class="divs-house">';
            recarga += '<span class="p-house">' + trabajador.loc_trabajador + '</span>';
            recarga += '</div>';
            recarga += '</div>';
            /* Estudios y cursos */
            recarga += '<div class="user-div-house">';
            recarga += '<div class="user-icon-name">';
            recarga += '<i class="fa-solid fa-book-open"></i>';
            recarga += '</div>';
            recarga += '<div class="divs-house">';
            recarga += '<span class="p-house">' + trabajador.estudios + '</span>';
            recarga += '</div>';
            recarga += '</div>';
            /* Experiencia */
            recarga += '<div class="user-div-house">';
            recarga += '<div class="user-icon-name">';
            recarga += '<i class="fa-solid fa-briefcase"></i>';
            recarga += '</div>';
            recarga += '<div class="divs-house">';
            recarga += '<span class="p-house">' + trabajador.experiencia + '</span>';
            recarga += '</div>';
            recarga += '</div>';
            /* Idioma */
            recarga += '<div class="user-div-house">';
            recarga += '<div class="user-icon-name">';
            recarga += '<i class="fa-solid fa-language"></i>';
            recarga += '</div>';
            recarga += '<div class="divs-house">';
            recarga += '<span class="p-house">' + trabajador.idiomas + '</span>';
            recarga += '</div>';
            recarga += '</div>';
            /* Sector */
            recarga += '<div class="user-div-house">';
            recarga += '<div class="user-icon-name">';
            recarga += '<i class="fa-solid fa-building"></i>';
            recarga += '</div>';
            recarga += '<div class="divs-house">';
            recarga += '<span class="p-house">' + trabajador.campo_user + '</span>';
            recarga += '</div>';
            recarga += '</div>';
            /* Jornada */
            recarga += '<div class="user-div-house">';
            recarga += '<div class="user-icon-name">';
            recarga += '<i class="fa-solid fa-business-time"></i>';
            recarga += '</div>';
            recarga += '<div class="divs-house">';
            recarga += '<span class="p-house">' + trabajador.disponibilidad + '</span>';
            recarga += '</div>';
            recarga += '</div>';
            /* Descripcion */
            recarga += '<hr>';
            recarga += '<div class="user-div-desc">';
            recarga += '<div class="user-icon-desc">';
            recarga += '<span class="sobre-mi-desc">Sobre mi:</span>';
            recarga += '</div>';
            recarga += '<div class="divs-desc">';
            recarga += '<span class="p-desc">' + trabajador.about_user + '</span>';
            recarga += '</div>';
            recarga += '</div>';
            recarga += '</div>';
            recarga += '</div>';
            contenidoajax.innerHTML = recarga;
            document.getElementById("volver").id_pt = id_pt;
            document.getElementById("volver").addEventListener("click", mostrar_prueba_tecnica_empresa)

        }
    }
    ajax.send(formData);
}

function descargar_archivo(evt) {
    var zip_participante = evt.currentTarget.zip_participante;
    window.location.href = "./storage/" + zip_participante;
}