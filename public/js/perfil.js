window.onload = function() {

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
                var trabajador = respuesta.resultado[0];
                var curriculum = JSON.parse(trabajador.curriculum)
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
                recarga += '<span class="p-age"> ' + trabajador.edad + '</span>';
                recarga += '</div>';
                recarga += '<div class="user-edit-div">';
                /* recarga += '<button class="user-edit-btn" onclick="leermodperfilJS(); return false;"><p class="edit-btn-p">EDITAR</p></button>'; */
                recarga += '</div>';
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
            boton_sobre_mi.campo_user = trabajador.campo_user;
            boton_sobre_mi.about_user = trabajador.about_user;
            boton_sobre_mi.loc_trabajador = trabajador.loc_trabajador;
            boton_sobre_mi.lenguaje_preferido = trabajador.lenguaje_preferido;
            boton_sobre_mi.linkedin = trabajador.linkedin;
            boton_sobre_mi.telefono = trabajador.telefono;
            boton_sobre_mi.github = trabajador.github;
            boton_sobre_mi.addEventListener("click", leer_sobre_mi);

            var boton_idiomas = document.getElementById("boton_idiomas");
            boton_idiomas.idiomas = curriculum.idiomas;
            boton_idiomas.addEventListener("click", leer_idiomas);

            var boton_estudios = document.getElementById("boton_estudios");
            boton_estudios.estudios = curriculum.estudios;
            boton_estudios.addEventListener("click", leer_estudios);

            var boton_experiencia = document.getElementById("boton_experiencia");
            boton_experiencia.experiencia = curriculum.experiencia;
            boton_experiencia.addEventListener("click", leer_experiencia);

            var boton_curriculum = document.getElementById("boton_curriculum");
            boton_curriculum.addEventListener("click", leer_curriculum);

            var boton_habilidades = document.getElementById("boton_habilidades");
            boton_habilidades.habilidades = curriculum.habilidades;
            boton_habilidades.addEventListener("click", leer_habilidades);

            var boton_disponibilidad = document.getElementById("boton_disponibilidad");
            boton_disponibilidad.disponibilidad = trabajador.disponibilidad;
            boton_disponibilidad.mobilidad = trabajador.mobilidad;
            boton_disponibilidad.carnet_conducir = trabajador.carnet_conducir;
            boton_disponibilidad.vehiculo_propio = trabajador.vehiculo_propio;
            boton_disponibilidad.addEventListener("click", leer_disponibilidad);

            var boton_configuracion = document.getElementById("boton_configuracion");
            boton_configuracion.mostrado = trabajador.mostrado;
            boton_configuracion.addEventListener("click", leer_configuracion);

        }
    }

    ajax.send(formData);
}

function leer_sobre_mi(evt) {
    var contenidoajax = document.getElementById("contenidoajax");
    var campo_user = evt.currentTarget.campo_user;
    var about_user = evt.currentTarget.about_user;
    var loc_trabajador = evt.currentTarget.loc_trabajador;
    var lenguaje_preferido = evt.currentTarget.lenguaje_preferido;
    var linkedin = evt.currentTarget.linkedin;
    var telefono = evt.currentTarget.telefono;
    var github = evt.currentTarget.github;
    var recarga = "";
    recarga += '<button onClick="mostrarperfilJS(); return false;">Volver</button>';
    recarga += "<div>";
    recarga += '<p>' + campo_user + '</p>';
    recarga += '<p>' + about_user + '</p>';
    recarga += '<p>' + loc_trabajador + '</p>';
    recarga += '<p>' + lenguaje_preferido + '</p>';
    recarga += '<p>' + linkedin + '</p>';
    recarga += '<p>' + telefono + '</p>';
    recarga += '<p>' + github + '</p>';
    recarga += "</div>";
    contenidoajax.innerHTML = recarga;
}

function leer_idiomas(evt) {
    var contenidoajax = document.getElementById("contenidoajax");
    var idiomas = evt.currentTarget.idiomas;
    var recarga = "";
    recarga += '<button onClick="mostrarperfilJS(); return false;">Volver</button>';
    if (idiomas) {
        recarga += "<div>";
        for (let i = 0; i < idiomas.length; i++) {
            recarga += "<div>";
            recarga += '<p>' + idiomas[i].nombre_idioma + '</p>';
            recarga += '<p>' + idiomas[i].nivel_idioma + '</p>';
            recarga += "</div>";
        }
        recarga += "</div>";
    }
    contenidoajax.innerHTML = recarga;
}

function leer_estudios(evt) {
    var contenidoajax = document.getElementById("contenidoajax");
    var estudios = evt.currentTarget.estudios;
    var recarga = "";
    recarga += '<button onClick="mostrarperfilJS(); return false;">Volver</button>';
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
}

function leer_experiencia(evt) {
    var contenidoajax = document.getElementById("contenidoajax");
    var experiencia = evt.currentTarget.experiencia;
    var recarga = "";
    recarga += '<button onClick="mostrarperfilJS(); return false;">Volver</button>';
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

}

function leer_curriculum(evt) {

}

function leer_habilidades(evt) {
    var contenidoajax = document.getElementById("contenidoajax");
    var habilidades = evt.currentTarget.habilidades;
    var recarga = "";
    recarga += '<button onClick="mostrarperfilJS(); return false;">Volver</button>';
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
}

function leer_disponibilidad(evt) {
    var contenidoajax = document.getElementById("contenidoajax");
    var disponibilidad = evt.currentTarget.disponibilidad;
    var mobilidad = evt.currentTarget.mobilidad;
    var carnet_conducir = evt.currentTarget.carnet_conducir;
    var vehiculo_propio = evt.currentTarget.vehiculo_propio;
    var recarga = "";
    recarga += '<button onClick="mostrarperfilJS(); return false;">Volver</button>';
    recarga += "<div>";
    recarga += '<p>' + disponibilidad + '</p>';
    recarga += '<p>' + mobilidad + '</p>';
    recarga += '<p>' + carnet_conducir + '</p>';
    recarga += '<p>' + vehiculo_propio + '</p>';
    recarga += "</div>";
    contenidoajax.innerHTML = recarga;
}

function leer_configuracion(evt) {
    var contenidoajax = document.getElementById("contenidoajax");
    var mostrado = evt.currentTarget.mostrado;
    var recarga = "";
    recarga += '<button onClick="mostrarperfilJS(); return false;">Volver</button>';
    recarga += "<div>";
    recarga += '<p>' + mostrado + '</p>';
    recarga += "</div>";
    contenidoajax.innerHTML = recarga;
}