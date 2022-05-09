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
            var id_perfil = respuesta.id_perfil;
            var recarga = '';
            if (id_perfil == 2) {
                var trabajador = respuesta.trabajador[0];
                /* Foto */
                recarga += '<div class="user-vista">';
                recarga += '<div class="user-ver-foto">';
                recarga += '<div class="container-foto">';
                if (trabajador.foto_perfil != null) {
                    recarga += '<img class="user-profilefoto" src="storage/' + trabajador.foto_perfil + '">';
                } else {
                    recarga += '<img class="user-profilefoto" src="storage/img/usuario.png">';
                }
                /* boton que cambia la vista a editar */
                recarga += '<div class="user-edit-div">';
                recarga += '<button class="user-edit-btn" onclick="leermodperfilJS(); return false;"><i class="fa-solid fa-pen"></i></button>';
                recarga += '</div>';
                //logout
                recarga += '<div class="logout">';
                recarga += '<button class="logout-btn" onClick="window.location.href=`logout`;"><i class="fa-solid fa-right-from-bracket"></i></button>';
                recarga += '</div>';
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
                recarga += '<span class="p-name">  ' + trabajador.nombre + '  </span>';
                recarga += '<span class="p-surname">  ' + trabajador.apellido + '  </span>';
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
            }
            if (id_perfil == 3) {
                var empresa = respuesta.empresa[0];
                recarga += '<div class="empresa-vista">';
                /* Logo */
                recarga += '<div class="empresa-ver-foto">';
                if (empresa.logo_emp != null) {
                    recarga += '<img class="empresa-profilefoto" src="storage/' + empresa.logo_emp + '">';
                } else {
                    recarga += '<img class="empresa-profilefoto" src="storage/img/usuario.png">';
                }
                /* boton que cambia la vista a editar */
                recarga += '<div class="empresa-edit-div">';
                recarga += '<button class="empresa-edit-btn" onclick="leermodperfilJS(); return false;"><i class="fa-solid fa-pen"></i></button>';
                recarga += '</div>';
                //logout
                recarga += '<div class="logout">';
                recarga += '<button class="logout-btn" onClick="window.location.href=`logout`;"><i class="fa-solid fa-right-from-bracket"></i></button>';
                recarga += '</div>';
                recarga += '</div>';
                /* Ver empresa */
                recarga += '<div class="empresa-ver">';
                /* Nombre */
                recarga += '<div class="empresa-div-name">';
                recarga += '<div class="divs-name">';
                recarga += '<span class="p-name">' + empresa.nom_emp + '</span>';
                recarga += '</div>';
                recarga += '</div>';
                /* Sede */
                recarga += '<hr>';
                recarga += '<div class="empresa-div-house">';
                recarga += '<div class="empresa-icon-name">';
                recarga += '<i class="fa-solid fa-building"></i>';
                recarga += '</div>';
                recarga += '<div class="divs-house">';
                recarga += '<span class="p-house">' + empresa.loc_emp + '</span>';
                recarga += '</div>';
                recarga += '</div>';
                /* Campo */
                recarga += '<div class="empresa-div-house">';
                recarga += '<div class="empresa-icon-name">';
                recarga += '<i class="fa-solid fa-briefcase"></i>';
                recarga += '</div>';
                recarga += '<div class="divs-house">';
                recarga += '<span class="p-house">' + empresa.campo_emp + '</span>';
                recarga += '</div>';
                recarga += '</div>';
                /* Que busca */
                recarga += '<div class="empresa-div-house">';
                recarga += '<div class="empresa-icon-name">';
                recarga += '<i class="fa-solid fa-file-signature"></i>';
                recarga += '</div>';
                recarga += '<div class="divs-house">';
                recarga += '<span class="p-house">' + empresa.searching + '</span>';
                recarga += '</div>';
                recarga += '</div>';
                /* Vacante */
                recarga += '<div class="empresa-div-house">';
                recarga += '<div class="empresa-icon-name">';
                recarga += '<i class="fa-solid fa-handshake"></i>';
                recarga += '</div>';
                recarga += '<div class="divs-house">';
                recarga += '<span class="p-house">' + empresa.vacante + '</span>';
                recarga += '</div>';
                recarga += '</div>';
                /* Descripcion */
                recarga += '<hr>';
                recarga += '<div class="empresa-div-desc">';
                recarga += '<div class="empresa-icon-desc">';
                recarga += '<span class="sobre-mi-desc">Acerca de:</span>';
                recarga += '</div>';
                recarga += '<div class="divs-desc">';
                recarga += '<span class="p-desc">' + empresa.about_emp + '</span>';
                recarga += '</div>';
                recarga += '</div>';
                recarga += '</div>';
                recarga += '</div>';
            }
            contenidoajax.innerHTML = recarga;
        }
    }

    ajax.send(formData);
}

function leermodperfilJS() {
    var contenidoajax = document.getElementById("contenidoajax");
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    var ajax = objetoAjax();
    ajax.open("POST", "leerperfil", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            var id_perfil = respuesta.id_perfil;
            var recarga = '';
            if (id_perfil == 2) {
                var trabajador = respuesta.trabajador[0];
                recarga += '<div class="user-edit">';
                recarga += '<div class="return">';
                recarga += '<button class="return-btn" onclick="mostrarperfilJS(); return false;">';
                recarga += '<i class="fa-solid fa-angle-left"></i>';
                recarga += '</button>';
                recarga += '</div>';
                recarga += '<form method="POST" id="formeditar" enctype="multipart/form-data">';
                /* Inputs para editar el usuario */
                recarga += '<div class="user-input">';
                /* Nombre, apellido y edad */
                recarga += '<div class="user-input-name">';
                recarga += '<div class="user-icon-name">';
                recarga += '<i class="fa-solid fa-user"></i>';
                recarga += '</div>';
                recarga += '<div class="inputs-name">';
                recarga += '<input type="text" class="input-name" id="nombre" name="nombre" value="' + trabajador.nombre + '">';
                recarga += '<input type="text" class="input-surname" id="apellido" name="apellido" value="' + trabajador.apellido + '">';
                recarga += '<i class="fa-solid fa-cake-candles"></i>';
                recarga += '<input type="text" class="input-age" id="edad" name="edad" value="' + trabajador.edad + '">';
                recarga += '</div>';
                recarga += '</div>';
                /* Vivienda */
                recarga += '<div class="user-input-house">';
                recarga += '<div class="user-icon-house">';
                recarga += '<i class="fa-solid fa-house-chimney"></i>';
                recarga += '</div>';
                recarga += '<div class="inputs-house">';
                recarga += '<input type="text" class="input-house" id="loc_trabajador" name="loc_trabajador" value="' + trabajador.loc_trabajador + '">';
                recarga += '</div>';
                recarga += '</div>';
                /* Estudios y cursos */
                recarga += '<div class="contenedor">';
                recarga += '<div class="user-input-studies">';
                recarga += '<div class="user-icon-studies">';
                recarga += '<i class="fa-solid fa-book-open"></i>';
                recarga += '</div>';
                recarga += '<div class="inputs-studies">';
                recarga += '<input type="text" class="input-studies" id="estudios" name="estudios" value="' + trabajador.estudios + '">';
                recarga += '</div>';
                recarga += '</div>';
                recarga += '<div class="user-icon-more">';
                recarga += '<button class="user-icon-more-button">';
                recarga += '<i class="fa-solid fa-plus"></i>';
                recarga += '</button>';
                recarga += '</div>';
                recarga += '</div>';
                /* Modal añadir mas Estudios y cursos */
                /* Experiencia */
                recarga += '<div class="contenedor">';
                recarga += '<div class="user-input-experience">';
                recarga += '<div class="user-icon-experience">';
                recarga += '<i class="fa-solid fa-briefcase"></i>';
                recarga += '</div>';
                recarga += '<div class="inputs-experience">';
                recarga += '<input type="text" class="input-experience" id="experiencia" name="experiencia" value="' + trabajador.experiencia + '">';
                recarga += '</div>';
                recarga += '</div>';
                recarga += '<div class="user-icon-more">';
                recarga += '<button class="user-icon-more-button">';
                recarga += '<i class="fa-solid fa-plus"></i>';
                recarga += '</button>';
                recarga += '</div>';
                recarga += '</div>';
                /* Modal añadir mas experiencia */
                /* Idioma */
                recarga += '<div class="contenedor">';
                recarga += '<div class="user-input-idioma">';
                recarga += '<div class="user-icon-idioma">';
                recarga += '<i class="fa-solid fa-language"></i>';
                recarga += '</div>';
                recarga += '<div class="inputs-idioma">';
                recarga += '<input type="text" class="input-idioma" id="idiomas" name="idiomas" value="' + trabajador.idiomas + '">';
                recarga += '</div>';
                recarga += '</div>';
                recarga += '<div class="user-icon-more">';
                recarga += '<button class="user-icon-more-button">';
                recarga += '<i class="fa-solid fa-plus"></i>';
                recarga += '</button>';
                recarga += '</div>';
                recarga += '</div>';
                /* Correo */
                recarga += '<div class="contenedor">';
                recarga += '<div class="user-input-idioma">';
                recarga += '<div class="user-icon-idioma">';
                recarga += '<i class="fa-solid fa-at"></i>';
                recarga += '</div>';
                recarga += '<div class="inputs-idioma">';
                recarga += '<input type="email" class="input-idioma" id="mail" name="mail" value="' + trabajador.mail + '">';
                recarga += '</div>';
                recarga += '</div>';
                recarga += '<div class="user-icon-more">';
                recarga += '<button class="user-icon-more-button">';
                recarga += '<i class="fa-solid fa-plus"></i>';
                recarga += '</button>';
                recarga += '</div>';
                recarga += '</div>';
                /* Password */
                recarga += '<div class="contenedor">';
                recarga += '<div class="user-input-idioma">';
                recarga += '<div class="user-icon-idioma">';
                recarga += '<i class="fa-solid fa-key"></i>';
                recarga += '</div>';
                recarga += '<div class="inputs-idioma">';
                recarga += '<input type="password" class="input-idioma" id="contra" name="contra" value="' + trabajador.contra + '">';
                recarga += '</div>';
                recarga += '</div>';
                recarga += '<div class="user-icon-more">';
                recarga += '<button class="user-icon-more-button">';
                recarga += '<i class="fa-solid fa-plus"></i>';
                recarga += '</button>';
                recarga += '</div>';
                recarga += '</div>';
                /* Foto */
                recarga += '<div class="contenedor">';
                recarga += '<div class="user-input-idioma">';
                recarga += '<div class="user-icon-idioma">';
                recarga += '<i class="fa-solid fa-image"></i>';
                recarga += '</div>';
                recarga += '<div class="inputs-idioma">';
                recarga += '<input type="file" class="input-idioma" id="foto_perfil" name="foto_perfil">';
                recarga += '</div>';
                recarga += '</div>';
                recarga += '<div class="user-icon-more">';
                recarga += '<button class="user-icon-more-button">';
                recarga += '<i class="fa-solid fa-plus"></i>';
                recarga += '</button>';
                recarga += '</div>';
                recarga += '</div>';
                /* Sector */
                recarga += '<div class="contenedor">';
                recarga += '<div class="user-input-idioma">';
                recarga += '<div class="user-icon-idioma">';
                recarga += '<i class="fa-solid fa-building"></i>';
                recarga += '</div>';
                recarga += '<div class="inputs-idioma">';
                recarga += '<input type="text" class="input-idioma" id="campo_user" name="campo_user" value="' + trabajador.campo_user + '">';
                recarga += '</div>';
                recarga += '</div>';
                recarga += '<div class="user-icon-more">';
                recarga += '<button class="user-icon-more-button">';
                recarga += '<i class="fa-solid fa-plus"></i>';
                recarga += '</button>';
                recarga += '</div>';
                recarga += '</div>';
                /* Jornada */
                recarga += '<div class="contenedor">';
                recarga += '<div class="user-input-idioma">';
                recarga += '<div class="user-icon-idioma">';
                recarga += '<i class="fa-solid fa-business-time"></i>';
                recarga += '</div>';
                recarga += '<div class="inputs-idioma">';
                recarga += '<input type="text" class="input-idioma" id="disponibilidad" name="disponibilidad" value="' + trabajador.disponibilidad + '">';
                recarga += '</div>';
                recarga += '</div>';
                recarga += '<div class="user-icon-more">';
                recarga += '<button class="user-icon-more-button">';
                recarga += '<i class="fa-solid fa-plus"></i>';
                recarga += '</button>';
                recarga += '</div>';
                recarga += '</div>';
                /* Descripcion */
                recarga += '<div class="user-input-desc">';
                recarga += '<div class="user-icon-desc">';
                recarga += '<span class="sobre-mi">Sobre mi</span>';
                recarga += '</div>';
                recarga += '<div class="inputs-desc">';
                recarga += '<input type="text" class="input-desc" id="about_user" name="about_user" value="' + trabajador.about_user + '">';
                recarga += '</div>';
                recarga += '</div>';
                recarga += '</div>';
                recarga += '</form>';
                /* activar/desactivar */
                recarga += '<div class="contenedor">';
                recarga += '<div class="user-input-desactivar">';
                recarga += '<div class="user-icon-desactivar">';
                if (trabajador.mostrado == 1) {
                    recarga += '<p>Mostrarse: <p>';
                    recarga += '</div>';
                    recarga += '<div class="inputs-desactivar">';
                    recarga += '<input type="checkbox" class="input-desactivar" id="mostrado" name="mostrado" value="' + trabajador.mostrado + '" checked>';
                } else {
                    recarga += '<p>Mostrarse: <p>';
                    recarga += '</div>';
                    recarga += '<div class="inputs-desactivar">';
                    recarga += '<input type="checkbox" class="input-desactivar" id="mostrado" name="mostrado" value="' + trabajador.mostrado + '">';
                }
                recarga += '</div>';
                recarga += '</div>';
                recarga += '</div> ';
                /* Realizar cambios */
                recarga += '<div class="aceptar-cuenta-edit">';
                recarga += '<button class="aceptar-cuenta-btn" onclick="editarperfilJS(\'' + trabajador.id + '\',\'' + id_perfil + '\'); return false;">';
                recarga += '<p class="button"><i class="fa-solid fa-check"></i> Realizar cambios</p>';
                recarga += '</button>';
                recarga += '</div>';
                /* Eliminar cuenta */
                recarga += '<div class="eliminar-cuenta-edit">';
                recarga += '<button class="eliminar-cuenta-btn" onclick="modaleliminar(\'' + trabajador.id + '\',\'' + id_perfil + '\'); return false;">';
                recarga += '<p class="button"><i class="fa-solid fa-trash-can"></i> Eliminar cuenta</p>';
                recarga += '</button>';
                recarga += '</div>';
            }
            if (id_perfil == 3) {
                var empresa = respuesta.empresa[0];
                recarga += '<div class="empresa-edit">';
                recarga += '<div class="return">';
                recarga += '<button class="return-btn" onclick="mostrarperfilJS(); return false;">';
                recarga += '<i class="fa-solid fa-angle-left"></i>';
                recarga += '</button>';
                recarga += '</div>';
                recarga += '<form method="POST" onsubmit="editarperfilJS(\'' + empresa.id + '\',\'' + id_perfil + '\'); return false;" id="formeditar" enctype="multipart/form-data">';
                /* Inputs para editar la empresa */
                recarga += '<div class="empresa-input">';
                /* Nombre */
                recarga += '<div class="empresa-input-name">';
                recarga += '<div class="empresa-icon-name">';
                recarga += '<i class="fa-solid fa-user-tie"></i>';
                recarga += '</div>';
                recarga += '<div class="inputs-name">';
                recarga += '<input type="text" class="input-name" id="nom_emp" name="nom_emp" value="' + empresa.nom_emp + '">';
                recarga += '</div>';
                recarga += '</div>';
                /* Sede */
                recarga += '<div class="empresa-input-sede">';
                recarga += '<div class="empresa-icon-sede">';
                recarga += '<i class="fa-solid fa-building"></i>';
                recarga += '</div>';
                recarga += '<div class="inputs-sede">';
                recarga += '<input type="text" class="input-sede" id="loc_emp" name="loc_emp" value="' + empresa.loc_emp + '">';
                recarga += '</div>';
                recarga += '</div>';
                /* Campo */
                recarga += '<div class="contenedor">';
                recarga += '<div class="empresa-input-campo">';
                recarga += '<div class="empresa-icon-campo">';
                recarga += '<i class="fa-solid fa-briefcase"></i>';
                recarga += '</div>';
                recarga += '<div class="inputs-campo">';
                recarga += '<input type="text" class="input-campo" id="campo_emp" name="campo_emp" value="' + empresa.campo_emp + '">';
                recarga += '</div>';
                recarga += '</div>';
                recarga += '</div>';
                /* Buscamos */
                recarga += '<div class="contenedor">';
                recarga += '<div class="empresa-input-buscando">';
                recarga += '<div class="empresa-icon-buscando">';
                recarga += '<i class="fa-solid fa-file-signature"></i>';
                recarga += '</div>';
                recarga += '<div class="inputs-buscando">';
                recarga += '<input type="text" class="input-buscando" id="searching" name="searching" value="' + empresa.searching + '">';
                recarga += '</div>';
                recarga += '</div>';
                recarga += '</div>';
                /* Vacante */
                recarga += '<div class="contenedor">';
                recarga += '<div class="empresa-input-vacante">';
                recarga += '<div class="empresa-icon-vacante">';
                recarga += '<i class="fa-solid fa-handshake"></i>';
                recarga += '</div>';
                recarga += '<div class="inputs-vacante">';
                recarga += '<input type="text" class="input-vacante" id="vacante" name="vacante" value="' + empresa.vacante + '">';
                recarga += '</div>';
                recarga += '</div>';
                recarga += '</div>';
                /* Imagen */
                recarga += '<div class="contenedor">';
                recarga += '<div class="empresa-input-logo">';
                recarga += '<div class="empresa-icon-logo">';
                recarga += '<i class="fa-solid fa-image"></i>';
                recarga += '</div>';
                recarga += '<div class="inputs-logo">';
                recarga += '<input type="file" class="input-logo" id="logo_emp" name="logo_emp">';
                recarga += '</div>';
                recarga += '</div>';
                recarga += '</div>';
                /* email */
                recarga += '<div class="contenedor">';
                recarga += '<div class="empresa-input-email">';
                recarga += '<div class="empresa-icon-email">';
                recarga += '<i class="fa-solid fa-at"></i>';
                recarga += '</div>';
                recarga += '<div class="inputs-email">';
                recarga += '<input type="email" class="input-email" id="mail" name="mail" value="' + empresa.mail + '">';
                recarga += '</div>';
                recarga += '</div>';
                recarga += '</div>';
                /* Contraseña */
                recarga += '<div class="contenedor">';
                recarga += '<div class="empresa-input-passwd">';
                recarga += '<div class="empresa-icon-passwd">';
                recarga += '<i class="fa-solid fa-key"></i>';
                recarga += '</div>';
                recarga += '<div class="inputs-passwd">';
                recarga += '<input type="password" class="input-passwd" id="contra" name="contra" value="' + empresa.contra + '">';
                recarga += '</div>';
                recarga += '</div>';
                recarga += '</div>';
                /* Descripcion */
                recarga += '<div class="empresa-input-desc">';
                recarga += '<div class="empresa-icon-desc">';
                recarga += '<span class="sobre-mi">Información</span>';
                recarga += '</div>';
                recarga += '<div class="inputs-desc">';
                recarga += '<input type="text" class="input-desc" id="about_emp" name="about_emp" value="' + empresa.about_emp + '">';
                recarga += '</div>';
                recarga += '</div>';
                /* activar/desactivar */
                recarga += '<div class="contenedor">';
                recarga += '<div class="empresa-input-desactivar">';
                recarga += '<div class="empresa-icon-desactivar">';
                if (empresa.mostrado == 1) {
                    recarga += '<p>Mostrarse: <p>';
                    recarga += '</div>';
                    recarga += '<div class="inputs-desactivar">';
                    recarga += '<input type="checkbox" class="input-desactivar" id="mostrado" name="mostrado" value="' + empresa.mostrado + '" checked>';
                } else {
                    recarga += '<p>Mostrarse: <p>';
                    recarga += '</div>';
                    recarga += '<div class="inputs-desactivar">';
                    recarga += '<input type="checkbox" class="input-desactivar" id="mostrado" name="mostrado" value="' + empresa.mostrado + '">';
                }
                recarga += '</div>';
                recarga += '</div>';
                recarga += '</div>';
                recarga += '</div>';
                recarga += '</form>';
                /* Realizar cambios */
                recarga += '<div class="aceptar-empresa-edit">';
                recarga += '<button class="aceptar-empresa-btn" onclick="editarperfilJS(\'' + empresa.id + '\',\'' + id_perfil + '\'); return false;">';
                recarga += '<p class="button"><i class="fa-solid fa-check"></i> Realizar cambios</p>';
                recarga += '</button>';
                recarga += '</div>';
                /* Eliminar cuenta */
                recarga += '<div class="eliminar-empresa-edit">';
                recarga += '<button class="eliminar-empresa-btn" onclick="modaleliminar(\'' + empresa.id + '\',\'' + id_perfil + '\'); return false;">';
                recarga += '<p class="button"><i class="fa-solid fa-trash-can"></i> Eliminar cuenta</p>';
                recarga += '</button>';
                recarga += '</div>';
                recarga += '</div>';
            }
            contenidoajax.innerHTML = recarga;
        }
    }

    ajax.send(formData);
}


//EDITAR
function editarperfilJS(id, id_perfil) {
    /* if (id_perfil == 2) {
        let contra = document.getElementById('contra').value;
        let mail = document.getElementById('mail').value;
        let nombre = document.getElementById('nombre').value;
        let apellido = document.getElementById('apellido').value;
        let campo_user = document.getElementById('campo_user').value;
        let loc_trabajador = document.getElementById('loc_trabajador').value;
        let experiencia = document.getElementById('experiencia').value;
        let edad = document.getElementById('edad').value;
        let estudios = document.getElementById('estudios').value;
        let idiomas = document.getElementById('idiomas').value;
        let disponibilidad = document.getElementById('disponibilidad').value;
        let about_user = document.getElementById('about_user').value;
        let foto_perfil = document.getElementById('foto_perfil').value;
        if (mail == '' || contra == '' || nombre == '' || apellido == '' || campo_user == '' || experiencia == '' || estudios == '' || idiomas == '' || disponibilidad == '' || about_user == '' || foto_perfil == '' || loc_trabajador == '' || edad == '') {
            swal.fire({
                title: "Error",
                text: "Tienes que rellenar todos los datos",
                icon: "error",
            });
            return false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
            swal.fire({
                title: "Error",
                text: "Introduce un email correcto",
                icon: "error",
            });
            return false;
        } else if (contra.length > 50) {
            swal.fire({
                title: "Error",
                text: "La contraseña no puede ser más larga de 50 caracteres",
                icon: "error",
            });
            return false;
        } else if (contra.length < 8) {
            swal.fire({
                title: "Error",
                text: "La contraseña debe tener mas de 8 caracteres",
                icon: "error",
            });
            return false;
        } else if (mail.length > 100) {
            swal.fire({
                title: "Error",
                text: "El email no puede ser más largo de 100 caracteres",
                icon: "error",
            });
            return false;
        }
    } */
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'PUT');
    formData.append('mail', document.getElementById('mail').value);
    formData.append('contra', document.getElementById('contra').value);
    /* modificar trabajador */
    if (id_perfil == 2) {
        formData.append('nombre', document.getElementById('nombre').value);
        formData.append('apellido', document.getElementById('apellido').value);
        formData.append('campo_user', document.getElementById('campo_user').value);
        formData.append('loc_trabajador', document.getElementById('loc_trabajador').value);
        formData.append('experiencia', document.getElementById('experiencia').value);
        formData.append('edad', document.getElementById('edad').value);
        formData.append('estudios', document.getElementById('estudios').value);
        formData.append('idiomas', document.getElementById('idiomas').value);
        formData.append('disponibilidad', document.getElementById('disponibilidad').value);
        formData.append('about_user', document.getElementById('about_user').value);
        formData.append('foto_perfil', document.getElementById('foto_perfil').files[0]);
        if (document.getElementById('mostrado').checked == true) {
            formData.append('mostrado', '1');
        } else {
            formData.append('mostrado', '0');
        }
    }
    /* modificar empresa */
    if (id_perfil == 3) {
        formData.append('nom_emp', document.getElementById('nom_emp').value);
        formData.append('loc_emp', document.getElementById('loc_emp').value);
        formData.append('about_emp', document.getElementById('about_emp').value);
        formData.append('campo_emp', document.getElementById('campo_emp').value);
        formData.append('searching', document.getElementById('searching').value);
        formData.append('vacante', document.getElementById('vacante').value);
        formData.append('logo_emp', document.getElementById('logo_emp').files[0]);
        if (document.getElementById('mostrado').checked == true) {
            formData.append('mostrado', '1');
        } else {
            formData.append('mostrado', '0');
        }
    }
    var ajax = objetoAjax();
    ajax.open("POST", "editarperfil/" + id + "/" + id_perfil, true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            swal.fire({
                title: "Correcto",
                text: "Perfil modificado.",
                showConfirmButton: false,
                icon: "success",
            });
            leermodperfilJS();
        }
    }
    ajax.send(formData);
}

function modaleliminar(id, id_perfil) {
    var modal = document.getElementById("modal-eliminar");
    var modal_content = document.getElementById("modal_content");
    var recarga = "";
    recarga += '<h2 class="modal-title">¿Seguro que quieres eliminar la cuenta?</h2>';
    recarga += '<div class="eliminar-user-butons">';
    recarga += '<button class="cancelar-eliminar" onclick="cerrarmodal();return false;">Cancelar</button>';
    recarga += '<button class="aceptar-eliminar" onclick="estadouserJS(\'' + id + '\');return false;">Eliminar</button>';
    recarga += '</div>';
    modal_content.innerHTML = recarga;
    modal.style.display = "block";
}

function cerrarmodal() {
    var modal = document.getElementById("modal-eliminar");
    var modal_content = document.getElementById("modal_content");
    modal_content.innerHTML = "";
    modal.style.display = "none";
}

function estadouserJS(id) {
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'PUT');

    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();
    ajax.open("POST", "estadouser/" + id, true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            if (respuesta.resultado == "OK") {
                window.location.href = 'logout';
            }
        }
    }
    ajax.send(formData)
}