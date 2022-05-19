window.onload = function() {

    leeridiomas();
    JSONidiomas = {};
    mostrarperfilJS();
    //logica de modal

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {

        var modal = document.getElementById("modal-eliminar");

        if (event.target == modal) {

            modal.style.display = "none";

        }

    }

}

////////////////////////////REDIRECCIONES/////////////////////////////////
var navbarProfile = document.getElementById("navbar-profile-icon");
var navbarMain = document.getElementById("navbar-main-icon");
var navbarAlerts = document.getElementById("navbar-alerts-icon");

navbarProfile.onclick = function() {

    window.location.href = "./perfil";

}

navbarAlerts.onclick = function() {

    window.location.href = "./notificaciones";

}

navbarMain.onclick = function() {

    window.location.href = "./home";

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

function leeridiomas() {

    var ajax = objetoAjax();

    ajax.open("POST", "./js/idiomas.json", true);

    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {

            JSONidiomas = JSON.parse(this.responseText);
        }

    }

    ajax.send(null)

}

function mostrarperfilJS() {
    var contenidoajax = document.getElementById("contenidoajax");
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    var ajax = objetoAjax();
    ajax.open("POST", "leerperfil", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            console.log(respuesta);
            var id_perfil = respuesta.id_perfil;
            var recarga = '';
            if (id_perfil == 2) {
                var trabajador = respuesta.resultado;
                /* Foto */
                recarga += '<div class="user-fondo">';
                recarga += '<div class="container-user-poligon">';
                recarga += '<div class="logout">';
                recarga += '<button class="logout-btn" onClick="window.location.href=`logout`;"><i class="fa-solid fa-right-from-bracket"></i></button>';
                recarga += '</div>';
                recarga += '<div class="user-poligon">';
                recarga += '</div>';
                recarga += '<div class="div-foto">';
                recarga += '<div class="edit-foto">';
                recarga += '<label class="input-file">';
                recarga += '<i class="fa-solid fa-image"></i>';
                recarga += '<input type="file" class="input" id="foto_perfil" name="foto_perfil">';
                recarga += '</label>';
                recarga += '</div>';
                recarga += '<div class="user-ver-foto">';
                if (trabajador.foto_perfil != null) {
                    recarga += '<img class="user-profilefoto" src="./storage/' + trabajador.foto_perfil + '">';
                } else {
                    recarga += '<img class="user-profilefoto" src="./storage/img/usuario.png">';
                }

                recarga += '</div>';

                recarga += '</div>';
                recarga += '</div>';
                recarga += '<div class="user-poligon2">';
                recarga += '<div class="user-vista">';
                //nombre-apellido-edad
                recarga += '<div class="user-div-name">';
                recarga += '<div class="divs-name">';
                recarga += '<span class="p-name">  ' + trabajador.nombre + '  </span>';
                recarga += '<span class="p-surname">  ' + trabajador.apellido + ',' + '  </span>';
                recarga += '<span class="p-age"> ' + edad(trabajador.edad) + '</span>';
                recarga += '</div>';
                recarga += '<div class="user-edit-div">';
                /* recarga += '<button class="user-edit-btn" onclick="leermodperfilJS(); return false;"><p class="edit-btn-p">EDITAR</p></button>'; */
                recarga += '</div>';
                recarga += '</button>';
                recarga += '</div>';

                recarga += '<hr class="linea-divisoria">';

                recarga += '<div class="user-categories">';
                //sobre mi
                recarga += '<div class="user-div-category">';
                recarga += '<button class="user-btn-category" id="boton_sobre_mi">';
                recarga += '<div class="user-category-icon">';
                recarga += '<i class="fa-solid fa-address-card"></i>';
                recarga += '</div>';
                recarga += '<div class="user-category-text">';
                recarga += '<p class="p-category">Sobre mi</p>';
                recarga += '</div>';
                recarga += '</button>';
                recarga += '</div>';
                //idiomas
                recarga += '<div class="user-div-category">';
                recarga += '<button class="user-btn-category" id="boton_idiomas">';
                recarga += '<div class="user-category-icon">';
                recarga += '<i class="fa-solid fa-language"></i>';
                recarga += '</div>';
                recarga += '<div class="user-category-text">';
                recarga += '<p class="p-category">Idiomas</p>';
                recarga += '</div>';
                recarga += '</button>';
                recarga += '</div>';
                //estudios
                recarga += '<div class="user-div-category">';
                recarga += '<button class="user-btn-category" id="boton_estudios">';
                recarga += '<div class="user-category-icon">';
                recarga += '<i class="fa-solid fa-graduation-cap"></i>';
                recarga += '</div>';
                recarga += '<div class="user-category-text">';
                recarga += '<p class="p-category">Estudios</p>';
                recarga += '</div>';
                recarga += '</button>';
                recarga += '</div>';
                //experiencia
                recarga += '<div class="user-div-category">';
                recarga += '<button class="user-btn-category" id="boton_experiencia">';
                recarga += '<div class="user-category-icon">';
                recarga += '<i class="fa-solid fa-briefcase"></i>';
                recarga += '</div>';
                recarga += '<div class="user-category-text">';
                recarga += '<p class="p-category">Experiencia</p>';
                recarga += '</div>';
                recarga += '</button>';
                recarga += '</div>';
                //curriculum
                recarga += '<div class="user-div-category">';
                recarga += '<button class="user-btn-category" id="boton_curriculum">';
                recarga += '<div class="user-category-icon">';
                recarga += '<i class="fa-solid fa-file-invoice"></i>';
                recarga += '</div>';
                recarga += '<div class="user-category-text">';
                recarga += '<p class="p-category">Curriculum</p>';
                recarga += '</div>';
                recarga += '</button>';
                recarga += '</div>';
                //habilidades
                recarga += '<div class="user-div-category">';
                recarga += '<button class="user-btn-category" id="boton_habilidades">';
                recarga += '<div class="user-category-icon">';
                recarga += '<i class="fa-solid fa-brain"></i>';
                recarga += '</div>';
                recarga += '<div class="user-category-text">';
                recarga += '<p class="p-category">Habilidades</p>';
                recarga += '</div>';
                recarga += '</button>';
                recarga += '</div>';
                //disponibilidad
                recarga += '<div class="user-div-category">';
                recarga += '<button class="user-btn-category" id="boton_disponibilidad">';
                recarga += '<div class="user-category-icon">';
                recarga += '<i class="fa-solid fa-clock"></i>';
                recarga += '</div>';
                recarga += '<div class="user-category-text">';
                recarga += '<p class="p-category">Disponibilidad</p>';
                recarga += '</div>';
                recarga += '</button>';
                recarga += '</div>';
                //configuracion
                recarga += '<div class="user-div-category">';
                recarga += '<button class="user-btn-category" id="boton_configuracion">';
                recarga += '<div class="user-category-icon">';
                recarga += '<i class="fa-solid fa-gear"></i>';
                recarga += '</div>';
                recarga += '<div class="user-category-text">';
                recarga += '<p class="p-category">Configuración</p>';
                recarga += '</div>';
                recarga += '</button>';
                recarga += '</div>';

                recarga += '</div>';

                recarga += '</div>';
                recarga += '</div>';
                // recarga += '<div class="wave-div">';
                // recarga += '<img class="wave" src="./storage/uploads/wave.svg">';
                // recarga += '</div>';
                recarga += '</div>';
                recarga += '</div>';
            }
            contenidoajax.innerHTML = recarga;

            var boton_sobre_mi = document.getElementById("boton_sobre_mi");
            boton_sobre_mi.addEventListener("click", leer_sobre_mi);

            var boton_idiomas = document.getElementById("boton_idiomas");
            boton_idiomas.addEventListener("click", leer_idiomas);

            var boton_estudios = document.getElementById("boton_estudios");
            boton_estudios.addEventListener("click", leer_estudios);

            var boton_experiencia = document.getElementById("boton_experiencia");
            boton_experiencia.addEventListener("click", leer_experiencia);

            var boton_curriculum = document.getElementById("boton_curriculum");
            boton_curriculum.addEventListener("click", leer_curriculum);

            var boton_habilidades = document.getElementById("boton_habilidades");
            boton_habilidades.addEventListener("click", leer_habilidades);

            var boton_disponibilidad = document.getElementById("boton_disponibilidad");
            boton_disponibilidad.addEventListener("click", leer_disponibilidad);

            var boton_configuracion = document.getElementById("boton_configuracion");
            boton_configuracion.addEventListener("click", leer_configuracion);

        }
    }

    ajax.send(formData);
}

function edad(fecha_string) {
    var hoy = new Date();
    var fecha_nacimiento = new Date(fecha_string);
    var edad = hoy.getFullYear() - fecha_nacimiento.getFullYear();
    var m = hoy.getMonth() - fecha_nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < fecha_nacimiento.getDate())) {
        edad--;
    }
    return edad;
}

function leer_sobre_mi() {
    var contenidoajax = document.getElementById("contenidoajax");
    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');

    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();

    ajax.open("POST", "leerperfil", true);

    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);
            var trabajador = respuesta.resultado;
            var recarga = "";


            recarga += '<div class="vista-profile">';
            recarga += '<div class="categoria-edit">';
            //volver a la vista anterior
            recarga += '<div class="return">';
            recarga += '<button class="return-btn" id="volver">';
            recarga += '<div class="return-icon">';
            recarga += '<i class="fa-solid fa-angle-left"></i>';
            recarga += '</div>';
            recarga += '<p class="return-text">VOLVER</p>';
            recarga += '</button>';
            recarga += '</div>';
            //ir a vista editar
            recarga += '<div class="logout">';
            recarga += '<button class="logout-btn" id="editar"><i class="fa-solid fa-pen"></i></button>';
            recarga += '</div>';
            recarga += '</div>';
            recarga += '<div class="categoria-profile">';
            //bloque pequeño
            recarga += '<div class="categoria">';
            recarga += '<div class="categoria-icon-name">';
            recarga += '<div class="categoria-icon">';
            recarga += '<i class="fa-solid fa-address-card"></i>';
            recarga += '</div>';
            recarga += '<div class="categoria-name">';
            //titulo
            recarga += '<p class="categoria-p-name">Sobre mi</p>';
            recarga += '</div>';
            recarga += '</div>';
            recarga += '<div class="categoria-linea">';
            recarga += '<hr class="linea-divisoria">';
            recarga += '</div>';
            recarga += '<div class="categoria-text">';
            //contenido
            recarga += '<p class="categoria-p-text">' + trabajador.campo_user + '</p>';
            recarga += '</div>';
            recarga += '</div>';
            //bloque pequeño
            //bloque grande
            recarga += '<div class="categoria">';
            recarga += '<div class="categoria-icon-name">';
            recarga += '<div class="categoria-icon">';
            recarga += '<i class="fa-solid fa-address-card"></i>';
            recarga += '</div>';
            recarga += '<div class="categoria-name">';
            //titulo
            recarga += '<p class="categoria-p-name">Sobre mi</p>';
            recarga += '</div>';
            recarga += '</div>';
            recarga += '<div class="categoria-linea">';
            recarga += '<hr class="linea-divisoria">';
            recarga += '</div>';
            recarga += '<div class="categoria-text">';
            //contenido
            recarga += '<p class="categoria-p-text">' + trabajador.about_user + '</p>';
            recarga += '</div>';
            recarga += '</div>';
            //bloque grande
            //bloque pequeño
            recarga += '<div class="categoria">';
            recarga += '<div class="categoria-icon-name">';
            recarga += '<div class="categoria-icon">';
            recarga += '<i class="fa-solid fa-address-card"></i>';
            recarga += '</div>';
            recarga += '<div class="categoria-name">';
            //titulo
            recarga += '<p class="categoria-p-name">Sobre mi</p>';
            recarga += '</div>';
            recarga += '</div>';
            recarga += '<div class="categoria-linea">';
            recarga += '<hr class="linea-divisoria">';
            recarga += '</div>';
            recarga += '<div class="categoria-text">';
            //contenido
            recarga += '<p class="categoria-p-text">' + trabajador.loc_trabajador + '</p>';
            recarga += '</div>';
            recarga += '</div>';
            //bloque pequeño
            //bloque pequeño
            recarga += '<div class="categoria">';
            recarga += '<div class="categoria-icon-name">';
            recarga += '<div class="categoria-icon">';
            recarga += '<i class="fa-solid fa-address-card"></i>';
            recarga += '</div>';
            recarga += '<div class="categoria-name">';
            //titulo
            recarga += '<p class="categoria-p-name">Sobre mi</p>';
            recarga += '</div>';
            recarga += '</div>';
            recarga += '<div class="categoria-linea">';
            recarga += '<hr class="linea-divisoria">';
            recarga += '</div>';
            recarga += '<div class="categoria-text">';
            //contenido
            recarga += '<p class="categoria-p-text">' + trabajador.lenguaje_preferido + '</p>';
            recarga += '</div>';
            recarga += '</div>';
            //bloque pequeño
            //bloque pequeño
            recarga += '<div class="categoria">';
            recarga += '<div class="categoria-icon-name">';
            recarga += '<div class="categoria-icon">';
            recarga += '<i class="fa-solid fa-address-card"></i>';
            recarga += '</div>';
            recarga += '<div class="categoria-name">';
            //titulo
            recarga += '<p class="categoria-p-name">Sobre mi</p>';
            recarga += '</div>';
            recarga += '</div>';
            recarga += '<div class="categoria-linea">';
            recarga += '<hr class="linea-divisoria">';
            recarga += '</div>';
            recarga += '<div class="categoria-text">';
            //contenido
            recarga += '<p class="categoria-p-text">' + trabajador.linkedin + '</p>';
            recarga += '</div>';
            recarga += '</div>';
            //bloque pequeño
            //bloque pequeño
            recarga += '<div class="categoria">';
            recarga += '<div class="categoria-icon-name">';
            recarga += '<div class="categoria-icon">';
            recarga += '<i class="fa-solid fa-address-card"></i>';
            recarga += '</div>';
            recarga += '<div class="categoria-name">';
            //titulo
            recarga += '<p class="categoria-p-name">Sobre mi</p>';
            recarga += '</div>';
            recarga += '</div>';
            recarga += '<div class="categoria-linea">';
            recarga += '<hr class="linea-divisoria">';
            recarga += '</div>';
            recarga += '<div class="categoria-text">';
            //contenido
            recarga += '<p class="categoria-p-text">' + trabajador.telefono + '</p>';
            recarga += '</div>';
            recarga += '</div>';
            //bloque pequeño
            //bloque pequeño
            recarga += '<div class="categoria">';
            recarga += '<div class="categoria-icon-name">';
            recarga += '<div class="categoria-icon">';
            recarga += '<i class="fa-solid fa-address-card"></i>';
            recarga += '</div>';
            recarga += '<div class="categoria-name">';
            //titulo
            recarga += '<p class="categoria-p-name">Sobre mi</p>';
            recarga += '</div>';
            recarga += '</div>';
            recarga += '<div class="categoria-linea">';
            recarga += '<hr class="linea-divisoria">';
            recarga += '</div>';
            recarga += '<div class="categoria-text">';
            //contenido
            recarga += '<p class="categoria-p-text">' + trabajador.github + '</p>';
            recarga += '</div>';
            recarga += '</div>';
            //bloque pequeño
            recarga += '</div>';
            recarga += '</div>';
            contenidoajax.innerHTML = recarga;

            document.getElementById("volver").addEventListener("click", mostrarperfilJS);

            var editar = document.getElementById("editar");
            editar.addEventListener("click", form_editar_sobre_mi);

        }

    }

    ajax.send(formData)
}

function form_editar_sobre_mi() {
    var contenidoajax = document.getElementById("contenidoajax");
    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');

    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();

    ajax.open("POST", "leerperfil", true);

    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);
            var trabajador = respuesta.resultado;
            var recarga = "";
            recarga += '<button id="volver">Volver</button>';
            recarga += '<div>';
            recarga += '<form id=form_editar_sobre_mi>';

            if (!trabajador.campo_user) {
                recarga += '<input type="text" class="" id="campo_user" name="campo_user" placeholder="sin informar">';
            } else {
                recarga += '<input type="text" class="" id="campo_user" name="campo_user" value="' + trabajador.campo_user + '">';
            }

            if (!trabajador.about_user) {
                recarga += '<input type="text" class="" id="about_user" name="about_user" placeholder="sin informar">';
            } else {
                recarga += '<input type="text" class="" id="about_user" name="about_user" value="' + trabajador.about_user + '">';
            }

            if (!trabajador.loc_trabajador) {
                recarga += '<input type="text" class="" id="loc_trabajador" name="loc_trabajador" placeholder="sin informar">';
            } else {
                recarga += '<input type="text" class="" id="loc_trabajador" name="loc_trabajador" value="' + trabajador.loc_trabajador + '">';
            }

            if (!trabajador.lenguaje_preferido) {
                recarga += '<input type="text" class="" id="lenguaje_preferido" name="lenguaje_preferido" placeholder="sin informar">';
            } else {
                recarga += '<input type="text" class="" id="lenguaje_preferido" name="lenguaje_preferido" value="' + trabajador.lenguaje_preferido + '">';
            }

            if (!trabajador.linkedin) {
                recarga += '<input type="text" class="" id="linkedin" name="linkedin" placeholder="sin informar">';
            } else {
                recarga += '<input type="text" class="" id="linkedin" name="linkedin" value="' + trabajador.linkedin + '">';
            }

            if (!trabajador.telefono) {
                recarga += '<input type="text" class="" id="telefono" name="telefono" placeholder="sin informar">';
            } else {
                recarga += '<input type="text" class="" id="telefono" name="telefono" value="' + trabajador.telefono + '">';
            }

            if (!trabajador.github) {
                recarga += '<input type="text" class="" id="github" name="github" placeholder="sin informar">';
            } else {
                recarga += '<input type="text" class="" id="github" name="github" value="' + trabajador.github + '">';
            }

            recarga += '<button>Realizar cambios</button>';
            recarga += '</form>';
            recarga += '</div>';
            contenidoajax.innerHTML = recarga;

            document.getElementById("volver").addEventListener("click", leer_sobre_mi);
            document.getElementById("form_editar_sobre_mi").addEventListener("submit", editar_sobre_mi);

        }

    }

    ajax.send(formData)

}

function editar_sobre_mi(evt) {

    evt.preventDefault();

    var campo_user = document.getElementById("campo_user").value;
    var about_user = document.getElementById("about_user").value;
    var loc_trabajador = document.getElementById("loc_trabajador").value;
    var lenguaje_preferido = document.getElementById("lenguaje_preferido").value;
    var linkedin = document.getElementById("linkedin").value;
    var telefono = document.getElementById("telefono").value;
    var github = document.getElementById("github").value;
    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');
    if (campo_user) {
        formData.append('campo_user', campo_user);
    }
    if (about_user) {
        formData.append('about_user', about_user);
    }
    if (loc_trabajador) {
        formData.append('loc_trabajador', loc_trabajador);
    }
    if (lenguaje_preferido) {
        formData.append('lenguaje_preferido', lenguaje_preferido);
    }
    if (linkedin) {
        formData.append('linkedin', linkedin);
    }
    if (telefono) {
        formData.append('telefono', telefono);
    }
    if (github) {
        formData.append('github', github);
    }

    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();

    ajax.open("POST", "editarperfil", true);

    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);
            console.log(respuesta);

        }

    }

    ajax.send(formData)

}

function leer_idiomas() {
    //tengo que editar por cada idioma, no por todos a la vez
    var contenidoajax = document.getElementById("contenidoajax");
    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');

    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();

    ajax.open("POST", "leerperfil", true);

    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);
            var trabajador = respuesta.resultado;
            console.log(trabajador);
            var recarga = "";
            recarga += '<button id="volver">Volver</button>';
            recarga += '<button id="crear">crear</button>';
            if (trabajador.curriculum != null) {
                var curriculum = JSON.parse(trabajador.curriculum);
                if (curriculum.hasOwnProperty('idiomas')) {
                    if (curriculum.idiomas.length != 0) {
                        for (let i = 0; i < curriculum.idiomas.length; i++) {
                            recarga += '<div>';
                            recarga += '<p>' + curriculum.idiomas[i].nombre_idioma + '</p>';
                            recarga += '<p>' + curriculum.idiomas[i].nivel_idioma + '</p>';
                            recarga += '<button class="editar">Editar</button>';
                            recarga += '</div>';
                        }
                    } else {
                        recarga += '<p>Aun no has añadido ningun idioma</p>';
                    }
                } else {
                    recarga += '<p>Aun no has añadido ningun idioma</p>';
                }
                contenidoajax.innerHTML = recarga;
                if (curriculum.hasOwnProperty('idiomas')) {
                    for (let i = 0; i < curriculum.idiomas.length; i++) {
                        document.getElementsByClassName("editar")[i].i = i;
                        document.getElementsByClassName("editar")[i].addEventListener("click", form_editar_idiomas);
                    }
                }
            } else {
                recarga += '<p>Aun no has añadido ningun idioma</p>';
                contenidoajax.innerHTML = recarga;
            }
            document.getElementById("volver").addEventListener("click", mostrarperfilJS);
            document.getElementById("crear").addEventListener("click", form_crear_idiomas);

        }

    }

    ajax.send(formData)
}

function form_crear_idiomas() {

    var contenidoajax = document.getElementById("contenidoajax");
    var recarga = "";
    recarga += '<button id="volver">Volver</button>';
    recarga += '<div>';
    recarga += '<form id=form_idiomas>';
    recarga += '<select class="" name="nombre_idioma" id="nombre_idioma" data-show-subtext="false" data-live-search="true">';
    recarga += '<option value="" selected>- selecciona -</option>';
    for (let i = 0; i < JSONidiomas.length; i++) {
        recarga += '<option value="' + JSONidiomas[i].nombre_idioma + '">' + JSONidiomas[i].nombre_idioma + '</option>';
    }
    recarga += '</select>';
    recarga += '<select class="" name="nivel_idioma" id="nivel_idioma">';
    recarga += '<option value="" selected>- selecciona -</option>';
    recarga += '<option value="bajo">bajo</option>';
    recarga += '<option value="medio">medio</option>';
    recarga += '<option value="alto">alto</option>';
    recarga += '<option value="nativo">nativo</option>';
    recarga += '</select>';
    recarga += '<button>Realizar cambios</button>';
    recarga += '</form>';
    recarga += '</div>';
    contenidoajax.innerHTML = recarga;

    document.getElementById("volver").addEventListener("click", leer_idiomas);
    document.getElementById("form_idiomas").addEventListener("submit", crear_idiomas);

}

function crear_idiomas(evt) {

    evt.preventDefault();
    var nombre_idioma = document.getElementById("nombre_idioma").value;
    var nivel_idioma = document.getElementById("nivel_idioma").value;
    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');
    formData.append('nombre_idioma', nombre_idioma);
    formData.append('nivel_idioma', nivel_idioma);

    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();

    ajax.open("POST", "editarperfil", true);

    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);
            console.log(respuesta);

        }

    }

    ajax.send(formData)

}

function form_editar_idiomas(evt) {

    var i = evt.currentTarget.i;
    var contenidoajax = document.getElementById("contenidoajax");
    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');

    var ajax = objetoAjax();

    ajax.open("POST", "leerperfil", true);

    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);
            var curriculum = JSON.parse(respuesta.resultado.curriculum);
            var idioma = curriculum.idiomas[i];
            console.log(idioma);
            var recarga = "";
            recarga += '<button id="volver">Volver</button>';
            recarga += '<div>';
            recarga += '<form id=form_idiomas>';
            recarga += '<select class="" name="nombre_idioma" id="nombre_idioma" data-show-subtext="false" data-live-search="true">';
            for (let i = 0; i < JSONidiomas.length; i++) {
                if (idioma.nombre_idioma == JSONidiomas[i].nombre_idioma) {
                    recarga += '<option value="' + idioma.nombre_idioma + '" selected>' + idioma.nombre_idioma + '</option>';
                } else {
                    recarga += '<option value="' + JSONidiomas[i].nombre_idioma + '">' + JSONidiomas[i].nombre_idioma + '</option>';
                }
            }
            recarga += '</select>';
            recarga += '<select class="" name="nivel_idioma" id="nivel_idioma">';
            recarga += '<option value="' + idioma.nivel_idioma + '" selected>' + idioma.nivel_idioma + '</option>';
            recarga += '<option value="bajo">bajo</option>';
            recarga += '<option value="medio">medio</option>';
            recarga += '<option value="alto">alto</option>';
            recarga += '<option value="nativo">nativo</option>';
            recarga += '</select>';
            recarga += '<button>Realizar cambios</button>';
            recarga += '</form>';
            recarga += '<button id="eliminar">Eliminar idioma</button>';
            recarga += '</div>';
            contenidoajax.innerHTML = recarga;

            document.getElementById("volver").addEventListener("click", leer_idiomas);
            document.getElementById("form_idiomas").i = i;
            document.getElementById("form_idiomas").addEventListener("submit", editar_idiomas);
            document.getElementById("eliminar").i = i;
            document.getElementById("eliminar").addEventListener("click", eliminar_idiomas);

        }

    }

    ajax.send(formData)
}

function editar_idiomas(evt) {

    evt.preventDefault();
    var i = evt.currentTarget.i;

    var nombre_idioma = document.getElementById("nombre_idioma").value;
    var nivel_idioma = document.getElementById("nivel_idioma").value;
    var formData = new FormData();
    console.log(nombre_idioma);
    console.log(nivel_idioma);
    console.log(i);

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');
    formData.append('nombre_idioma', nombre_idioma);
    formData.append('nivel_idioma', nivel_idioma);
    formData.append('numero_idioma', i);

    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();

    ajax.open("POST", "editarperfil", true);

    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);
            console.log(respuesta);

        }

    }

    ajax.send(formData)

}

function eliminar_idiomas(evt) {

    var i = evt.currentTarget.i;

    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');
    formData.append('numero_idioma', i);

    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();

    ajax.open("POST", "editarperfil", true);

    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);
            console.log(respuesta);
            leer_idiomas();

        }

    }

    ajax.send(formData)

}

function leer_estudios(evt) {
    /* var contenidoajax = document.getElementById("contenidoajax");
    var recarga = "";
    recarga += '<button id="volver">Volver</button>';
    if (estudios) {
        recarga += "<div>";
        for (let i = 0; i < estudios.length; i++) {
            recarga += "<div>";
            recarga += '<p>' + estudios[i].nombre_formación + '</p>';
            recarga += '<p>' + estudios[i].lugar_formación + '</p>';
            recarga += '<p>' + estudios[i].año_entrada + '</p>';
            recarga += '<p>' + estudios[i].año_salida + '</p>';
            recarga += "</div>";
        }
        recarga += "</div>";
    }
    contenidoajax.innerHTML = recarga;

    document.getElementById("volver").addEventListener("click", mostrarperfilJS);

    var editar_estudios = document.getElementById("editar_estudios");
    editar_estudios.addEventListener("click", feditar_estudios); */
}

function feditar_estudios(evt) {

}

function leer_experiencia(evt) {
    /* var contenidoajax = document.getElementById("contenidoajax");
    var recarga = "";
    recarga += '<button id="volver">Volver</button>';
    recarga += '<button id="editar_experiencia">Editar</button>';
    if (experiencia) {
        recarga += "<div>";
        for (let i = 0; i < experiencia.length; i++) {
            recarga += "<div>";
            recarga += '<p>' + experiencia[i].lugar_experiencia + '</p>';
            recarga += '<p>' + experiencia[i].nombre_experiencia + '</p>';
            recarga += '<p>' + experiencia[i].año_entrada + '</p>';
            recarga += '<p>' + experiencia[i].año_salida + '</p>';
            recarga += '<p>' + experiencia[i].funciones + '</p>';
            recarga += "</div>";
        }
        recarga += "</div>";
    }
    contenidoajax.innerHTML = recarga;

    document.getElementById("volver").addEventListener("click", mostrarperfilJS);

    var editar_experiencia = document.getElementById("editar_experiencia");
    editar_experiencia.experiencia = experiencia;
    editar_experiencia.addEventListener("click", feditar_experiencia); */
}

function feditar_experiencia(evt) {

}

function leer_curriculum(evt) {

}

function leer_habilidades(evt) {
    /* var contenidoajax = document.getElementById("contenidoajax");
    var habilidades = evt.currentTarget.habilidades;
    var recarga = "";
    recarga += '<button id="volver">Volver</button>';
    recarga += '<button id="editar_habilidades">Editar</button>';
    if (habilidades) {
        recarga += "<div>";
        for (let i = 0; i < habilidades.length; i++) {
            recarga += "<div>";
            recarga += '<p>' + habilidades[i].nombre_habilidad + '</p>';
            recarga += '<p>' + habilidades[i].nivel_habilidad + '</p>';
            recarga += "</div>";
        }
        recarga += "</div>";
    }
    contenidoajax.innerHTML = recarga;

    document.getElementById("volver").addEventListener("click", mostrarperfilJS);

    var editar_habilidades = document.getElementById("editar_habilidades");
    editar_habilidades.habilidades = habilidades;
    editar_habilidades.addEventListener("click", feditar_habilidades); */
}

function feditar_habilidades(evt) {

}

function leer_disponibilidad(evt) {
    /* var contenidoajax = document.getElementById("contenidoajax");
    var disponibilidad = evt.currentTarget.disponibilidad;
    var mobilidad = evt.currentTarget.mobilidad;
    var carnet_conducir = evt.currentTarget.carnet_conducir;
    var vehiculo_propio = evt.currentTarget.vehiculo_propio;
    var recarga = "";
    recarga += '<button id="volver">Volver</button>';
    recarga += '<button id="editar_disponibilidad">Editar</button>';
    recarga += "<div>";
    recarga += '<p>' + disponibilidad + '</p>';
    recarga += '<p>' + mobilidad + '</p>';
    recarga += '<p>' + carnet_conducir + '</p>';
    recarga += '<p>' + vehiculo_propio + '</p>';
    recarga += "</div>";
    contenidoajax.innerHTML = recarga;

    document.getElementById("volver").addEventListener("click", mostrarperfilJS);

    var editar_disponibilidad = document.getElementById("editar_disponibilidad");
    editar_disponibilidad.addEventListener("click", feditar_disponibilidad); */
}

function feditar_disponibilidad(evt) {

}

function leer_configuracion(evt) {
    /* var contenidoajax = document.getElementById("contenidoajax");
    var mostrado = evt.currentTarget.mostrado;
    var recarga = "";
    recarga += '<button id="volver">Volver</button>';
    recarga += '<button id="editar_configuracion">Editar</button>';
    recarga += "<div>";
    recarga += '<p>' + mostrado + '</p>';
    recarga += "</div>";
    contenidoajax.innerHTML = recarga;

    document.getElementById("volver").addEventListener("click", mostrarperfilJS);

    var editar_configuracion = document.getElementById("editar_configuracion");
    editar_configuracion.mostrado = mostrado;
    editar_configuracion.addEventListener("click", feditar_configuracion); */
}

function feditar_configuracion(evt) {

}