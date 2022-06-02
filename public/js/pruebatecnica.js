window.onload = function() {
    leer_contenido();
}

////////////////////////////REDIRECCIONES/////////////////////////////////
var navbarProfile = document.getElementById("navbar-profile-icon");
var navbarMain = document.getElementById("navbar-main-icon");
var navbarAlerts = document.getElementById("navbar-alerts-icon");
var navbarPT = document.getElementById("navbar-PT-icon");
var navbarCHAT = document.getElementById("navbar-chat-icon");

navbarProfile.onclick = function() {

    window.location.href = "./perfil";
}
navbarAlerts.onclick = function() {

    window.location.href = "./notificaciones";
}
navbarMain.onclick = function() {

    window.location.href = "./home";
}
navbarCHAT.onclick = function() {

    window.location.href = "./chat";
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

function htmlEncode(str) {
    return String(str).replace(/[^\w. ]/gi, function(c) {
        return '&#' + c.charCodeAt(0) + ';';
    });
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
            var recarga = ``;
            if (respuesta.hasOwnProperty('empresa')) {
                var recarga = `<div class="content">
                                    <div class="div-crear-pt">
                                        <div class="titulo-ptecnica">
                                            <h1 class="h1-title">Pruebas tecnicas</h1>
                                        </div>
                                        <div class="subtitulo-ptecnica">
                                            <p class="p-subtitle">Las pruebas técnicas son pruebas creadas por las empresas para valorar los conocimientos de los usuarios y así, poder saber que persona se adapta mejor y esta mas preparada para las necesidades de la empresa ¡Crear una ahora!</p>
                                        </div>
                                        <div class="crear-ptecnica">
                                            <button class="crear-ptecnica-btn" id="crear"><p class="button-text">Nueva Prueba Técnica</p></button>
                                        </div>
                                    </div>
                                    <div class="ver-ptecnica">`;
                var empresa = respuesta.empresa;
                for (let i = 0; i < empresa.length; i++) {
                    recarga += `
                    <div class="prueba-tecnica">
                        <div class="pruebas">
                            <div class="estado-ptecnica">
                                <div class="title">
                                    <p class="p-title">ESTADO: </p>
                                </div>
                                <div class="text">`;
                    if (empresa[i].estado_prueba) {
                        recarga += `<p class="p-text-active"><i class="fa-solid fa-circle-check"></i> Activo</p>`;
                    } else {
                        recarga += `<p class="p-text-unactive"><i class="fa-solid fa-circle-xmark"></i> Cerrado</p>`;
                    }
                    recarga += `</div>
                            </div>`;
                    recarga += `<div class="enunciado-ptecnica">
                                    <p class="title">Enunciado: </p>
                                    <p class="text">${empresa[i].enunciado}</p>
                                </div>
                                <div class="desc-ptecnica">
                                    <p class="title">Descripción: </p>
                                    <p class="text">${empresa[i].descripcion}</p>
                                </div>
                                <div class="ins-ptecnica">
                                    <p class="title"><b>Inscripciones:</b></p>`;
                    if (!respuesta.inscritos[i].inscritos) {
                        recarga += `<p class="text">0 personas</p>`;
                    } else {
                        recarga += `<p class="text">${respuesta.inscritos[i].inscritos} personas</p>`;

                    }
                    recarga += `</div>
                            </div>
                            <div class="botones-prueba">
                                <div class="entrar-ptecnica">
                                    <button class="entrar"><p class="button-text"><i class="fa-solid fa-arrow-right-to-bracket"></i></p></button>
                                </div>
                                <div class="des-ptecnica">
                                    <button class="deshabilitar"><p class="button-text"><i class="fa-solid fa-trash-can"></i></p></button>
                                </div>
                            </div>
                        </div>`;
                }
                recarga += `</div>                     
                        </div> `;
                contenidoajax.innerHTML = recarga;
                document.getElementById("crear").addEventListener("click", form_crear_prueba_tecnica)
                for (let i = 0; i < empresa.length; i++) {
                    document.getElementsByClassName("entrar")[i].id_pt = empresa[i].id;
                    document.getElementsByClassName("entrar")[i].addEventListener("click", mostrar_prueba_tecnica_empresa);
                    document.getElementsByClassName("deshabilitar")[i].id_pt = empresa[i].id;
                    document.getElementsByClassName("deshabilitar")[i].addEventListener("click", deshabilitar_prueba_tecnica);

                }
            }
            if (respuesta.hasOwnProperty('trabajador')) {
                var recarga = `<div class="content-user">
                                    <div class="div-crear-pt">
                                        <div class="titulo-ptecnica">
                                            <h1 class="h1-title">Pruebas tecnicas</h1>
                                        </div>
                                        <div class="subtitulo-ptecnica">
                                            <p class="p-subtitle">Las pruebas técnicas son pruebas creadas por las empresas para valorar los conocimientos de los usuarios y así, poder saber que persona se adapta mejor y esta mas preparada para las necesidades de la empresa ¡Crear una ahora!</p>
                                        </div>
                                    </div>
                                    <div class="ver-ptecnica">`;
                var trabajador = respuesta.trabajador;
                var id_trabajador = respuesta.id_trabajador;
                for (let i = 0; i < trabajador.length; i++) {
                    recarga += `
                                    <div class="pruebas">
                                        <div class="prueba-header">
                                            <div class="empresa-ptecnica">
                                                <h1 class="title">${trabajador[i].nom_emp}</h1>
                                            </div>
                                        </div>
                                        <div class="prueba-body">
                                            <div class="enunciado-ptecnica">
                                                <p class="text">${trabajador[i].enunciado}</p>
                                            </div>
                                            <div class="linea-ptecnica">
                                                <hr class="linea">
                                            </div>
                                            <div class="time-ptecnica">
                                                <h3 class="time"><i class="fa-solid fa-clock"></i> ${trabajador[i].duracion} </h3>
                                            </div>
                                        </div>  
                                    </div>`;
                }
                recarga += `</div>  
                        </div>`
                contenidoajax.innerHTML = recarga;
                for (let i = 0; i < trabajador.length; i++) {
                    document.getElementsByClassName("pruebas")[i].id_empresa = trabajador[i].id;
                    document.getElementsByClassName("pruebas")[i].addEventListener("click", mostrar_prueba_tecnica)
                }

            }

        }
    }
    ajax.send(formData);
}

function mostrar_prueba_tecnica(evt) {
    var id = evt.currentTarget.id_empresa;

    var contenidoajax = document.getElementById("contenidoajax");
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    var ajax = objetoAjax();
    ajax.open("POST", "mostrar_ptecnica_trabajador/" + id, true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            var trabajador = respuesta.trabajador;
            var date_p = new Date(trabajador.fecha_publicacion);
            var fecha_publicacion = date_p.getDate() + "/" + (date_p.getMonth() + 1) + "/" + date_p.getFullYear();
            var date_l = new Date(trabajador.fecha_limite);
            var fecha_limite = date_l.getDate() + "/" + (date_l.getMonth() + 1) + "/" + date_l.getFullYear();
            var recarga = ``;
            recarga += `
            <div class="ver-content">
                <div class="div-return">
                    <div class="return">
                        <button class="return-btn" id="volver">
                        <div class="return-icon">
                            <i class="fa-solid fa-angle-left"></i>
                        </div>
                        <p class="return-text">VOLVER</p>
                        </button>
                    </div>
                </div>
                <div class="content-ver-prueba-user">
                    <p><b>Prueba tecnica para:</b></p>
                    <p>${trabajador.enunciado}</p>
                    <div>
                    <div>
                        <p><b>Descripción:</b></p>
                        <p>${trabajador.descripcion}</p>
                    </div>
                        <p><b>Empresa</b></p>
                        <p>${trabajador.nom_emp}</p>
                    </div>
                    <div>
                        <p><b>Duración</b></p>
                        <p>${trabajador.duracion}</p>
                    </div>
                    <div>
                        <p><b>Fecha de publicación</b></p>
                        <p>${fecha_publicacion}</p>
                    </div>
                    <div>
                        <p><b>Fecha limite</b></p>
                        <p>${fecha_limite}</p>
                    </div>
                    <div>
                        <p><b>Habilidades requeridas:</b></p>
                        <p>Lo que sea</p>
                    </div>
                    <div>
                        <button class="zip-prueba" id="zip_prueba"><p class="button-text">Descargar zip</p></button>
                    </div>`;

            if (respuesta.hasOwnProperty('existe')) {
                recarga += `
                    <button class="entrar-prueba" id="entrar_prueba"><p class="button-text">Entrar prueba</p></button>
                    `;
            } else {
                recarga += `
                    <button class="iniciar-prueba" id="iniciar_prueba"><p class="button-text">Iniciar prueba</p></button>
                    `;
            }
            recarga += `</div>
            </div>
            `;
            contenidoajax.innerHTML = recarga;
            document.getElementById("volver").addEventListener("click", leer_contenido)
            document.getElementById("zip_prueba").zip_prueba = trabajador.zip_prueba;
            document.getElementById("zip_prueba").addEventListener("click", descargar_archivo_emp);
            if (respuesta.hasOwnProperty('existe')) {
                document.getElementById("entrar_prueba").id_empresa = trabajador.id;
                document.getElementById("entrar_prueba").addEventListener("click", entrar_ptecnica_trabajador)
            } else {
                document.getElementById("iniciar_prueba").id_empresa = trabajador.id;
                document.getElementById("iniciar_prueba").addEventListener("click", iniciar_ptecnica_trabajador)
            }

        }
    }
    ajax.send(formData);

}

function iniciar_ptecnica_trabajador(evt) {
    var id = evt.currentTarget.id_empresa;

    var contenidoajax = document.getElementById("contenidoajax");
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    var ajax = objetoAjax();
    ajax.open("POST", "iniciar_ptecnica_trabajador/" + id, true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            var recarga = ``;
            if (respuesta.hasOwnProperty('trabajador')) {
                var trabajador = respuesta.trabajador;
                var date_p = new Date(trabajador.fecha_publicacion);
                var fecha_publicacion = date_p.getDate() + "/" + (date_p.getMonth() + 1) + "/" + date_p.getFullYear();
                var date_l = new Date(trabajador.fecha_limite);
                var fecha_limite = date_l.getDate() + "/" + (date_l.getMonth() + 1) + "/" + date_l.getFullYear();
                recarga += `
                <div class="ver-content">
                <div class="div-return">
                    <div class="return">
                        <button class="return-btn" id="volver">
                        <div class="return-icon">
                            <i class="fa-solid fa-angle-left"></i>
                        </div>
                        <p class="return-text">VOLVER</p>
                        </button>
                    </div>
                </div>
                <div class="content-ver-prueba-user">
                <p>Prueba tecnica para:</b></p>
                <p>${trabajador.enunciado}</p>
                <div>
                    <p><b>Empresa</b></p>
                    <p>${trabajador.nom_emp}</p>
                </div>
                <div>
                    <p><b>Duración</b></p>
                    <p>${trabajador.duracion}</p>
                </div>
                <div>
                    <p><b>Fecha de publicación</b></p>
                    <p>${fecha_publicacion}</p>
                </div>
                <div>
                    <p><b>Fecha limite</b></p>
                    <p>${fecha_limite}</p>
                </div>
                <div>
                    <button class="zip-prueba" id="zip_prueba">Descargar zip</button>
                </div>
                <div>
                    <p>Formato de respuesta</p>
                    <p>Texto donde dice zip</p>
                </div>
                <form id="formarchivo" enctype="multipart/form-data">
                <div class="alert alert-danger" id="alert-danger" style="display:none"></div>
                    <input type="file" class="zip-prueba" name="zip_participante" id="zip_participante" accept=".zip,.rar,.7zip">
                    <button type="submit" class="entrar-prueba" id="enviar_respuesta"><p class="button-text">Enviar respuesta</p></button>
                </form>
                </div>
                </div>
                `;
                contenidoajax.innerHTML = recarga;
                document.getElementById("volver").id_empresa = trabajador.id_empresa;
                document.getElementById("volver").addEventListener("click", mostrar_prueba_tecnica)
                document.getElementById("formarchivo").id_pt = trabajador.id;
                document.getElementById("formarchivo").addEventListener("submit", enviar_zip_trabajador);
                document.getElementById("zip_prueba").zip_prueba = trabajador.zip_prueba;
                document.getElementById("zip_prueba").addEventListener("click", descargar_archivo_emp);
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
    var id = evt.currentTarget.id_empresa;

    var contenidoajax = document.getElementById("contenidoajax");
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    var ajax = objetoAjax();
    ajax.open("POST", "entrar_ptecnica_trabajador/" + id, true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            var recarga = ``;
            var trabajador = respuesta.trabajador;
            var date_p = new Date(trabajador.fecha_publicacion);
            var fecha_publicacion = date_p.getDate() + "/" + (date_p.getMonth() + 1) + "/" + date_p.getFullYear();
            var date_l = new Date(trabajador.fecha_limite);
            var fecha_limite = date_l.getDate() + "/" + (date_l.getMonth() + 1) + "/" + date_l.getFullYear();
            recarga += `
            <div class="ver-content">
                <div class="div-return">
                    <div class="return">
                        <button class="return-btn" id="volver">
                        <div class="return-icon">
                            <i class="fa-solid fa-angle-left"></i>
                        </div>
                        <p class="return-text">VOLVER</p>
                        </button>
                    </div>
                </div>
                <div class="content-ver-prueba-user">
                <p><b>Prueba tecnica para: </b></p>
                <p>${trabajador.enunciado}</p>
                <div>
                    <p><b>Empresa </b></p>
                    <p>${trabajador.nom_emp}</p>
                </div>
                <div>
                    <p><b>Duración</b></p>
                    <p>${trabajador.duracion}</p>
                </div>
                <div>
                    <p><b>Fecha de publicación </b></p>
                    <p>${fecha_publicacion}</p>
                </div>
                <div>
                    <p><b>Fecha limite </b></p>
                    <p>${fecha_limite}</p>
                </div>
                <div>
                    <p><b>Formato de respuesta</b></p>
                    <p>Texto donde dice zip</p>
                </div>
                <form id="formarchivo" enctype="multipart/form-data">
                <div class="alert alert-danger" id="alert-danger" style="display:none"></div>
                    <input type="file" class="file-prueba" name="zip_participante" id="zip_participante" accept=".zip,.rar,.7zip">
                    <button type="submit" class="entrar-prueba" id="enviar_respuesta"><p class="button-text">Enviar respuesta</p></button>
                </form>
                </div>
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
    var zip_participante = document.getElementById("zip_participante").files[0];

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

            if (respuesta.resultado == "OK") {
                swal.fire({
                    title: "Exito",
                    text: "zip guardado",
                    icon: "success",
                    confirmButtonText: "OK",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        leer_contenido();
                    }
                });

            } else if (respuesta.resultado == "fuera") {
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
            } else {
                var container_error = document.getElementById('alert-danger');
                container_error.innerHTML = "";
                for (let i = 0; i < respuesta.errors.length; i++) {
                    container_error.style.display = "block";
                    container_error.innerHTML += ('<p>' + respuesta.errors[i] + '</p>');
                }
            }
        }
    }
    ajax.send(formData);
}

function form_crear_prueba_tecnica() {

    var contenidoajax = document.getElementById("contenidoajax");
    var recarga = ``;
    recarga += `
    <div class="edit-profile">
        <div class="return">
            <button class="return-btn" id="volver">
            <div class="return-icon">
                <i class="fa-solid fa-angle-left"></i>
            </div>
                <p class="return-text">VOLVER</p>
            </button>
        </div>
        <div class="edit-inputs">
            <form id="form_crear_prueba_tecnica" enctype="multipart/form-data">
            <div class="alert alert-danger" id="alert-danger" style="display:none"></div>
            <div class="edit-input">
                <div class="input-text">
                    <p class="p-text">Lenguaje de la prueba</p>
                </div>
                <div class="input-edit">
                    <input type="text" class="input" id="lenguaje" name="lenguaje">
                </div>
            </div>
            <div class="edit-input">
                <div class="input-text">
                    <p class="p-text">Fecha límite</p>
                </div>
                <div class="input-edit">
                    <input type="date" class="input" id="fecha_limite" name="fecha_limite">
                </div>
            </div>
            <div class="edit-input">
                <div class="input-text">
                    <p class="p-text">Duración (En horas)</p>
                </div>
                <div class="input-edit">
                    <input type="number" min="1" max="99" class="input" id="duracion" name="duracion">
                </div>
            </div>
            <div class="edit-input">
                <div class="input-text">
                    <p class="p-text">Enunciado</p>
                </div>
                <div class="input-edit">
                    <input type="text" class="input" id="enunciado" name="enunciado">
                </div>
            </div>
            <div class="edit-input">
                <div class="input-text">
                    <p class="p-text">Descripción</p>
                </div>
                <div class="input-edit">
                    <input type="textarea" class="text-area" id="descripcion" name="descripcion">
                </div>
            </div>
            <div class="edit-input">
                <div class="input-text">
                    <p class="p-text">Mas información (.zip)</p>
                </div>
                <div class="input-edit">
                    <label class="input-file">
                    <input type="file" class="input" id="zip_prueba" name="zip_prueba">
                </div>
            </div>
            <div class="aceptar-cuenta-edit">
                <button type="submit" class="aceptar-cuenta-btn"><p class="button-text">Crear</p></button>
            </div>
            </form>
        </div>
    </div>
    `
    contenidoajax.innerHTML = recarga;
    document.getElementById("volver").addEventListener("click", leer_contenido)
    document.getElementById("form_crear_prueba_tecnica").addEventListener("submit", crear_prueba_tecnica);
}

function crear_prueba_tecnica(evt) {
    evt.preventDefault();

    var lenguaje = htmlEncode(document.getElementById("lenguaje").value);
    var fecha_limite = document.getElementById("fecha_limite").value;
    var duracion = document.getElementById("duracion").value;
    var enunciado = htmlEncode(document.getElementById("enunciado").value);
    var descripcion = htmlEncode(document.getElementById("descripcion").value);
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
            if (respuesta.resultado == "OK") {

                swal.fire({
                    title: "Exito",
                    text: "Prueba creada",
                    icon: "success",
                    confirmButtonText: "OK",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        leer_contenido();
                    }
                });

            } else {
                var container_error = document.getElementById('alert-danger');
                container_error.innerHTML = "";
                for (let i = 0; i < respuesta.errors.length; i++) {
                    container_error.style.display = "block";
                    container_error.innerHTML += ('<p>' + respuesta.errors[i] + '</p>');
                }
            }

        }
    }
    ajax.send(formData);

}

function mostrar_prueba_tecnica_empresa(evt) {
    var id_pt = evt.currentTarget.id_pt;
    var contenidoajax = document.getElementById("contenidoajax");

    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');

    var ajax = objetoAjax();
    ajax.open("POST", "mostrar_zip_trabajadores/" + id_pt, true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            var empresa = respuesta.empresa;
            var json_prueba = JSON.parse(empresa.json_prueba);
            var recarga = ``;
            recarga += `
            <div class="ver-content">
                <div class="div-return">
                    <div class="return">
                        <button class="return-btn" id="volver">
                        <div class="return-icon">
                            <i class="fa-solid fa-angle-left"></i>
                        </div>
                        <p class="return-text">VOLVER</p>
                        </button>
                    </div>
                </div>
                <div class="div-content">
                    <div class="div-text">
                        <div class="pt-enunciado">
                            <p class="title">Enunciado: </p>
                            <p class="text">${empresa.enunciado}</p>
                        </div>
                        <div class="pt-desc">
                            <p class="title">Descripción: </p>
                            <p class="text">${empresa.descripcion}</p>
                        </div>
                    </div>
            `;
            if (json_prueba) {
                for (let i = 0; i < json_prueba.length; i++) {
                    recarga += `
                    <div class="div-butons">
                        <div class="pt-participante">
                            <button class="participantes"><p class="button-text">Participante ${i+1}</p></button>
                        </div>`;
                    if (!json_prueba[i].zip_participante) {
                        recarga += `<p>Aun no ha subido el zip</p>`;
                    } else {
                        recarga += `
                        <div class="pt-descargar">
                            <button class="descargas"><p class="button-text">Descargar zip <i class="fa-solid fa-download"></i></p></button>
                        </div>
                    </div>`
                    }
                }
            }
            recarga += `
                </div>
            </div>`;
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
    var contenidoajax = document.getElementById("contenidoajax");

    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');

    var ajax = objetoAjax();
    ajax.open("POST", "mostrar_un_trabajador/" + id_participante, true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            var recarga = ``;
            var trabajador = respuesta.participante;

            function getAge(dateString) {
                var today = new Date();
                var birthDate = new Date(dateString);
                var age = today.getFullYear() - birthDate.getFullYear();
                var m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                return age;
            }
            var edad = getAge(trabajador.edad);
            console.log(trabajador);

            recarga += '<div class="user-vista">';
            //Volver
            recarga += '<div class="return">';
            recarga += '<button class="return-btn" id="volver">';
            recarga += '<i class="fa-solid fa-angle-left"></i>';
            recarga += '</button>';
            recarga += '</div>';
            recarga += '<div class="container-info">';
            // Foto
            recarga += '<div class="user-ver-foto">';
            recarga += '<div class="container-foto">';

            if (trabajador.foto_perfil != null) {

                recarga += '<img class="img--trabajador" src="storage/' + trabajador.foto_perfil + '">';

            } else {

                recarga += '<img class="img--trabajador" src="storage/img/usuario.png" width="100px">';

            }

            recarga += '</div>';
            recarga += '</div>';
            // Inputs para editar el usuario
            recarga += '<div class="user-ver">';
            // Nombre, apellido y edad
            recarga += '<div class="user-div-name">';
            recarga += '<div class="divs-name">';
            recarga += '<span class="p-name">  ' + trabajador.nombre + ' </span>';
            recarga += '<span class="p-surname">  ' + trabajador.apellido + ', </span>';
            recarga += '<span class="p-age"> ' + edad + '</span>';
            recarga += '</div>';
            recarga += '</div>';
            recarga += '<hr>';
            // mail
            recarga += '<div class="user-misc">';
            recarga += '<div class="user-div-house">';
            recarga += '<div class="user-icon-name">';
            recarga += '<i class="fa-solid fa-at"></i>';
            recarga += '</div>';
            recarga += '<div class="divs-house">';
            recarga += '<span class="p-house">' + trabajador.mail + '</span>';
            recarga += '</div>';
            recarga += '</div>';
            // loc_trabajador
            recarga += '<div class="user-div-house">';
            recarga += '<div class="user-icon-name">';
            recarga += '<i class="fa-solid fa-house-chimney"></i>';
            recarga += '</div>';
            recarga += '<div class="divs-house">';
            recarga += '<span class="p-house">' + trabajador.loc_trabajador + '</span>';
            recarga += '</div>';
            recarga += '</div>';
            //si JSON curriculum existe dentro de trabajador 
            if (trabajador.hasOwnProperty('curriculum')) {
                var curriculum = JSON.parse(trabajador.curriculum);
                console.log(curriculum);
                if (curriculum.hasOwnProperty('estudios')) {
                    // Estudios
                    recarga += '<div class="user-div-house">';
                    recarga += '<div class="user-icon-name">';
                    recarga += '<i class="fa-solid fa-book-open"></i>';
                    recarga += '</div>';
                    for (let i = 0; i < curriculum.estudios.length; i++) {
                        recarga += '<div class="divs-house div-formacion">';
                        recarga += '<span class="p-house">' + curriculum.estudios[i].nombre_formación + '</span>';
                        recarga += '<span class="p-house">' + curriculum.estudios[i].lugar_formación + '</span>';
                        recarga += '<div class="duracion-item">';
                        recarga += '<span class="p-house">' + curriculum.estudios[i].año_entrada + '</span>';
                        recarga += '<span class="separador-duracion"> - </span>';
                        recarga += '<span class="p-house">' + curriculum.estudios[i].año_salida + '</span>';
                        recarga += '</div>';
                        recarga += '</div>';
                    }
                    recarga += '</div>';
                }
                if (curriculum.hasOwnProperty('experiencia')) {
                    // Experiencia
                    recarga += '<div class="user-div-house">';
                    recarga += '<div class="user-icon-name">';
                    recarga += '<i class="fa-solid fa-briefcase"></i>';
                    recarga += '</div>';
                    for (let i = 0; i < curriculum.experiencia.length; i++) {
                        recarga += '<div class="divs-house div-experiencia">';
                        recarga += '<span class="p-house">' + curriculum.experiencia[i].nombre_experiencia + '</span>';
                        recarga += '<span class="p-house">' + curriculum.experiencia[i].lugar_experiencia + '</span>';
                        recarga += '<div class="duracion-item">';
                        recarga += '<span class="p-house">' + curriculum.experiencia[i].año_entrada + '</span>';
                        recarga += '<span class="separador-duracion"> - </span>';
                        recarga += '<span class="p-house">' + curriculum.experiencia[i].año_salida + '</span>';
                        recarga += '</div>';
                        recarga += '<span class="p-house">' + curriculum.experiencia[i].funciones + '</span>';
                        recarga += '</div>';
                    }
                    recarga += '</div>';
                }
                recarga += '<div class="niveles">';
                if (curriculum.hasOwnProperty('idiomas')) {
                    // Idioma
                    recarga += '<div class="idiomas">';
                    recarga += '<div class="titulo-niveles">';
                    recarga += '<p>Idiomas</p>';
                    recarga += '</div>';
                    for (let i = 0; i < curriculum.idiomas.length; i++) {
                        recarga += '<div>';
                        recarga += '<span class="nombre-item">' + curriculum.idiomas[i].nombre_idioma + '</span>';
                        recarga += '<span class="percent">';
                        recarga += '<div class="' + curriculum.idiomas[i].nivel_idioma + '"></div>';
                        recarga += '</span>';
                        recarga += '</div>';

                    }
                    recarga += '</div>';
                }
                if (curriculum.hasOwnProperty('habilidades')) {
                    // Habilidades
                    recarga += '<div class="habilidades">';
                    recarga += '<div class="titulo-niveles">';
                    recarga += '<p>Habilidades</p>';
                    recarga += '</div>';
                    for (let i = 0; i < curriculum.habilidades.length; i++) {
                        recarga += '<div class="niveles-item">';
                        recarga += '<span class="nombre-item">' + curriculum.habilidades[i].nombre_habilidad + '</span>';
                        recarga += '<span class="percent">';
                        recarga += '<div class="' + curriculum.habilidades[i].nivel_habilidad + '"></div>';
                        recarga += '</span>';
                        recarga += '</div>';

                    }
                    recarga += '</div>';
                }
            }
            recarga += '</div>';
            // Sector
            recarga += '<div class="user-div-house">';
            recarga += '<div class="user-icon-name">';
            recarga += '<i class="fa-solid fa-building"></i>';
            recarga += '</div>';
            recarga += '<div class="divs-house">';
            recarga += '<span class="p-house">' + trabajador.campo_user + '</span>';
            recarga += '</div>';
            recarga += '</div>';
            // Jornada
            recarga += '<div class="user-div-house">';
            recarga += '<div class="user-icon-name">';
            recarga += '<i class="fa-solid fa-business-time"></i>';
            recarga += '</div>';
            recarga += '<div class="divs-house">';
            recarga += '<span class="p-house disponibilidad">' + trabajador.disponibilidad + '</span>';
            recarga += '</div>';
            recarga += '</div>';
            // Descripcion
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

function deshabilitar_prueba_tecnica(evt) {
    var id_pt = evt.currentTarget.id_pt;

    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');

    var ajax = objetoAjax();
    ajax.open("POST", "deshabilitar_prueba_tecnica/" + id_pt, true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);

            leer_contenido();

        }
    }
    ajax.send(formData);
}

function descargar_archivo_emp(evt) {
    var zip_prueba = evt.currentTarget.zip_prueba;
    window.location.href = "./storage/" + zip_prueba;
}