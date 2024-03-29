window.onload = function() {
        leernotificacionesJS();
    }
    ////////////////////////////REDIRECCIONES/////////////////////////////////

leernotificacionesJS();
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

navbarPT.onclick = function() {

    window.location.href = "./pruebatecnica";
}

navbarCHAT.onclick = function() {

    window.location.href = "./chat";
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


function leernotificacionesJS() {

    var zonaalerts = document.getElementById("zonaalerts");
    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('filter', document.getElementById('filter').value);

    var ajax = objetoAjax();

    ajax.open("POST", "leernotificaciones", true);

    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);
            console.log(respuesta);
            var recarga = "";

            //si estas iniciado como trabajador te salen empresas
            if (respuesta.hasOwnProperty('empresas')) {

                var id_perfil = 3;
                var empresas = respuesta.empresas;

                for (let i = 0; i < empresas.length; i++) {

                    recarga += '<div class="alert">';
                    recarga += '<div class="alert-foto">';

                    if (empresas[i].logo_emp != null) {

                        recarga += '<img class="alert-profilefoto" src="storage/' + empresas[i].logo_emp + '">';

                    } else {

                        recarga += '<img class="alert-profilefoto" src="storage/img/usuario.png">';

                    }

                    recarga += '</div>';

                    if (empresas[i].coincidencia == 1) {

                        recarga += '<div class="alert-mensaje">';
                        recarga += '<p class="alert-mensaje-text">¡Tienes un match con ' + empresas[i].nom_emp + '!</p>';
                        recarga += '</div>';
                        recarga += '<div class="alert-chat">';
                        recarga += '<button onclick="chat(' + empresas[i].id_iniciador + '); return false;" class="alert-chat-btn">';
                        recarga += '<i class="fa-solid fa-comments"></i>';
                        recarga += '</button>';
                        recarga += '</div>';

                    } else {

                        recarga += '<div class="alert-mensaje">';
                        recarga += '<p class="alert-mensaje-text">¡Le interesas a ' + empresas[i].nom_emp + '!</p>';
                        recarga += '</div>';
                        recarga += '<div class="alert-nada">';
                        recarga += '<i class="fa-solid fa-comments"></i>';
                        recarga += '</div>';

                    }

                    recarga += '<div class="alert-user">';
                    recarga += '<button class="alert-user-btn" onclick="perfilemisor(\'' + empresas[i].id_iniciador + '\',\'' + id_perfil + '\'); return false;">';
                    recarga += '<i class="fa-solid fa-user"></i>';
                    recarga += '</button>';
                    recarga += '</div>';
                    recarga += '</div>';
                    recarga += '<hr class="alert-linea"></hr>';
                    recarga += ''
                }

            }

            //si estas iniciado como empresa te salen trabajadores
            if (respuesta.hasOwnProperty('trabajadores')) {

                var id_perfil = 2;
                var trabajadores = respuesta.trabajadores;

                for (let i = 0; i < trabajadores.length; i++) {

                    recarga += '<div class="alert">';
                    recarga += '<div class="alert-foto">';

                    if (trabajadores[i].foto_perfil != null) {

                        recarga += '<img class="alert-profilefoto" src="storage/' + trabajadores[i].foto_perfil + '">';

                    } else {

                        recarga += '<img class="alert-profilefoto" src="storage/img/usuario.png">';

                    }

                    recarga += '</div>';

                    if (trabajadores[i].coincidencia == 1) {

                        recarga += '<div class="alert-mensaje">';
                        recarga += '<p class="alert-mensaje-text">¡Tienes un match con ' + trabajadores[i].nombre + '!</p>';
                        recarga += '</div>';
                        recarga += '<div class="alert-chat">';
                        recarga += '<button onclick="chat(' + trabajadores[i].id_iniciador + '); return false;" class="alert-chat-btn">';
                        recarga += '<i class="fa-solid fa-comments"></i>';
                        recarga += '</button>';
                        recarga += '</div>';

                    } else {

                        recarga += '<div class="alert-mensaje">';
                        recarga += '<p class="alert-mensaje-text">¡Le interesas a ' + trabajadores[i].nombre + '!</p>';
                        recarga += '</div>';
                        recarga += '<div class="alert-nada">';
                        recarga += '<i class="fa-solid fa-comments"></i>';
                        recarga += '</div>';

                    }

                    recarga += '<div class="alert-user">';
                    recarga += '<button class="alert-user-btn" onclick="perfilemisor(\'' + trabajadores[i].id_iniciador + '\',\'' + id_perfil + '\'); return false;">';
                    recarga += '<i class="fa-solid fa-user"></i>';
                    recarga += '</button>';
                    recarga += '</div>';
                    recarga += '</div>';
                    recarga += '<hr class="alert-linea"></hr>';
                }

            }

            zonaalerts.innerHTML = recarga;

        }

    }

    ajax.send(formData);

}

function chat(id_otro) {
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('id_otro', id_otro);
    var ajax = objetoAjax();
    ajax.open("POST", "crearchat", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText)
            console.log(respuesta)
            window.location.href = "./chat";

        }
    }
    ajax.send(formData);
}


function perfilemisor(id_iniciador, id_perfil) {

    var zonaalerts = document.getElementById("zonaalerts");
    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));

    var ajax = objetoAjax();

    ajax.open("POST", "leerperfiluser/" + id_iniciador + "/" + id_perfil, true);

    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);
            console.log(respuesta);
            var id_perfil = respuesta.id_perfil;
            var recarga = '';

            if (id_perfil == 2) {

                var trabajador = respuesta.trabajador[0];

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
                recarga += '<button class="return-btn" id="volver" onclick="leernotificacionesJS(); return false;">';
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
                // zonaalerts.innerHTML = recarga;


            }

            if (id_perfil == 3) {
                var empresa = respuesta.empresa[0];
                recarga += '<div class="empresa-vista">';
                //Volver
                recarga += '<div class="return">';
                recarga += '<button class="return-btn" id="volver" onclick="leernotificacionesJS(); return false;">';
                recarga += '<i class="fa-solid fa-angle-left"></i>';
                recarga += '</button>';
                recarga += '</div>';
                //INFO
                recarga += '<div class="container-info">';
                // Logo
                recarga += '<div class="empresa-ver-foto">';

                if (empresa.logo_emp != null) {

                    recarga += '<img class="img--trabajador" src="storage/' + empresa.logo_emp + '">';

                } else {

                    recarga += '<img class="img--trabajador" src="storage/img/usuario.png" width="100px">';

                }

                recarga += '</div>';
                // Ver empresa
                recarga += '<div class="empresa-ver">';
                // Nombre
                recarga += '<div class="empresa-div-name">';
                recarga += '<div class="divs-name">';
                recarga += '<span class="p-name">' + empresa.nom_emp + '</span>';
                recarga += '</div>';
                recarga += '</div>';
                // Sede
                recarga += '<hr>';
                recarga += '<div class="empresa-misc">';
                recarga += '<div class="empresa-div-house">';
                recarga += '<div class="empresa-icon-name">';
                recarga += '<i class="fa-solid fa-building"></i>';
                recarga += '</div>';
                recarga += '<div class="divs-house">';
                recarga += '<span class="p-house">' + empresa.loc_emp + '</span>';
                recarga += '</div>';
                recarga += '</div>';
                // Campo
                recarga += '<div class="empresa-div-house">';
                recarga += '<div class="empresa-icon-name">';
                recarga += '<i class="fa-solid fa-briefcase"></i>';
                recarga += '</div>';
                recarga += '<div class="divs-house">';
                recarga += '<span class="p-house">' + empresa.campo_emp + '</span>';
                recarga += '</div>';
                recarga += '</div>';
                // Que busca
                recarga += '<div class="empresa-div-house">';
                recarga += '<div class="empresa-icon-name">';
                recarga += '<i class="fa-solid fa-file-signature"></i>';
                recarga += '</div>';
                recarga += '<div class="divs-house">';
                recarga += '<span class="p-house">' + empresa.searching + '</span>';
                recarga += '</div>';
                recarga += '</div>';
                // Vacante
                recarga += '<div class="empresa-div-house">';
                recarga += '<div class="empresa-icon-name">';
                recarga += '<i class="fa-solid fa-handshake"></i>';
                recarga += '</div>';
                recarga += '<div class="divs-house">';
                recarga += '<span class="p-house">' + empresa.vacante + '</span>';
                recarga += '</div>';
                recarga += '</div>';
                recarga += '</div>';
                // Descripcion
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
                recarga += '</div>';

            }

            zonaalerts.innerHTML = recarga;

        }

    }

    ajax.send(formData);

}


function enviar(id_receptor) {

    mail = document.getElementById("mensajecorreo").value

    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('mail', mail);
    formData.append('id_receptor', id_receptor);

    var ajax = objetoAjax();

    ajax.open("POST", "mandar", true);

    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);
            console.log(respuesta)

            if (respuesta == "OK") {

                swal.fire({
                    title: "Correcto",
                    text: "Mail enviado con exito!.",
                    showConfirmButton: false,
                    icon: "success",
                });

            } else {

                alert("Error al enviar el mail")

            }

        }

    }

    ajax.send(formData)

}