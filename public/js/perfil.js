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
                recarga += '<div class="ver-profile">';
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
                // recarga += '<img class="user-profilefoto" src="./storage/uploads/usuario.png">';
                if (trabajador.foto_perfil != null) {
                    recarga += '<img class="user-profilefoto" src="./storage/uploads/' + trabajador.foto_perfil + '">';
                } else {
                    recarga += '<img class="user-profilefoto" src="./storage/img/usuario.png">';
                }

                recarga += '</div>';

                recarga += '</div>';
                recarga += '</div>';
                recarga += '<div class="user-poligon2">';
                recarga += '<div class="user-vista">';

                recarga += '<div class="user-div-name">';
                recarga += '<div class="divs-name">';
                recarga += '<span class="p-name">  ' + trabajador.nombre + '  </span>';
                recarga += '<span class="p-surname">  ' + trabajador.apellido + ',' + '  </span>';
                recarga += '<span class="p-age"> ' + trabajador.edad + '</span>';
                recarga += '</div>';
                recarga += '<div class="user-edit-div">';
                recarga += '<button class="user-edit-btn" onclick="leermodperfilJS(); return false;"><p class="edit-btn-p">EDITAR</p></button>';
                recarga += '</div>';
                recarga += '</div>';

                recarga += '<hr class="linea-divisoria">';

                recarga += '<div class="user-categories">';

                recarga += '<div class="user-div-category">';
                recarga += '<button class="user-btn-category">';
                recarga += '<div class="user-category-icon">';
                recarga += '<i class="fa-solid fa-address-card"></i>';
                recarga += '</div>';
                recarga += '<div class="user-category-text">';
                recarga += '<p class="p-category">Sobre mi</p>';
                recarga += '</div>';
                recarga += '</button>';
                recarga += '</div>';

                recarga += '<div class="user-div-category">';
                recarga += '<button class="user-btn-category">';
                recarga += '<div class="user-category-icon">';
                recarga += '<i class="fa-solid fa-language"></i>';
                recarga += '</div>';
                recarga += '<div class="user-category-text">';
                recarga += '<p class="p-category">Idiomas</p>';
                recarga += '</div>';
                recarga += '</button>';
                recarga += '</div>';

                recarga += '<div class="user-div-category">';
                recarga += '<button class="user-btn-category">';
                recarga += '<div class="user-category-icon">';
                recarga += '<i class="fa-solid fa-graduation-cap"></i>';
                recarga += '</div>';
                recarga += '<div class="user-category-text">';
                recarga += '<p class="p-category">Estudios</p>';
                recarga += '</div>';
                recarga += '</button>';
                recarga += '</div>';

                recarga += '<div class="user-div-category">';
                recarga += '<button class="user-btn-category">';
                recarga += '<div class="user-category-icon">';
                recarga += '<i class="fa-solid fa-briefcase"></i>';
                recarga += '</div>';
                recarga += '<div class="user-category-text">';
                recarga += '<p class="p-category">Experiencia</p>';
                recarga += '</div>';
                recarga += '</button>';
                recarga += '</div>';

                recarga += '<div class="user-div-category">';
                recarga += '<button class="user-btn-category">';
                recarga += '<div class="user-category-icon">';
                recarga += '<i class="fa-solid fa-file-invoice"></i>';
                recarga += '</div>';
                recarga += '<div class="user-category-text">';
                recarga += '<p class="p-category">Curriculum</p>';
                recarga += '</div>';
                recarga += '</button>';
                recarga += '</div>';

                recarga += '<div class="user-div-category">';
                recarga += '<button class="user-btn-category">';
                recarga += '<div class="user-category-icon">';
                recarga += '<i class="fa-solid fa-brain"></i>';
                recarga += '</div>';
                recarga += '<div class="user-category-text">';
                recarga += '<p class="p-category">Habilidades</p>';
                recarga += '</div>';
                recarga += '</button>';
                recarga += '</div>';

                recarga += '<div class="user-div-category">';
                recarga += '<button class="user-btn-category">';
                recarga += '<div class="user-category-icon">';
                recarga += '<i class="fa-solid fa-clock"></i>';
                recarga += '</div>';
                recarga += '<div class="user-category-text">';
                recarga += '<p class="p-category">Disponibilidad</p>';
                recarga += '</div>';
                recarga += '</button>';
                recarga += '</div>';

                recarga += '<div class="user-div-category">';
                recarga += '<button class="user-btn-category">';

                recarga += '<div class="user-category-icon">';
                recarga += '<i class="fa-solid fa-gear"></i>';
                recarga += '</div>';

                recarga += '<div class="user-category-text">';
                recarga += '<p class="p-category">Configuracón</p>';
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
            if (id_perfil == 3) {
                var empresa = respuesta.empresa[0];
                recarga += '<div class="ver-profile">';
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
                // recarga += '<img class="user-profilefoto" src="./storage/uploads/usuario.png">';
                if (empresa.logo_emp != null) {
                    recarga += '<img class="user-profilefoto" src="./storage/uploads/' + empresa.logo_emp + '">';
                } else {
                    recarga += '<img class="user-profilefoto" src="./storage/img/usuario.png">';
                }

                recarga += '</div>';

                recarga += '</div>';
                recarga += '</div>';
                recarga += '<div class="user-poligon2">';
                recarga += '<div class="user-vista">';

                recarga += '<div class="user-div-name">';
                recarga += '<div class="divs-name">';
                recarga += '<span class="p-name">  ' + empresa.nom_emp + '  </span>';
                recarga += '</div>';
                recarga += '<div class="user-edit-div">';
                recarga += '<button class="user-edit-btn" onclick="leermodperfilJS(); return false;"><p class="edit-btn-p">EDITAR</p></button>';
                recarga += '</div>';
                recarga += '</div>';

                recarga += '<hr class="linea-divisoria">';

                recarga += '<div class="user-categories">';

                recarga += '<div class="user-div-category">';
                recarga += '<button class="user-btn-category">';
                recarga += '<div class="user-category-icon">';
                recarga += '<i class="fa-solid fa-address-card"></i>';
                recarga += '</div>';
                recarga += '<div class="user-category-text">';
                recarga += '<p class="p-category">Localización</p>';
                recarga += '</div>';
                recarga += '</button>';
                recarga += '</div>';

                recarga += '<div class="user-div-category">';
                recarga += '<button class="user-btn-category">';
                recarga += '<div class="user-category-icon">';
                recarga += '<i class="fa-solid fa-gear"></i>';
                recarga += '</div>';
                recarga += '<div class="user-category-text">';
                recarga += '<p class="p-category">Que buscamos</p>';
                recarga += '</div>';
                recarga += '</button>';
                recarga += '</div>';

                recarga += '<div class="user-div-category">';
                recarga += '<button class="user-btn-category">';
                recarga += '<div class="user-category-icon">';
                recarga += '<i class="fa-solid fa-gear"></i>';
                recarga += '</div>';
                recarga += '<div class="user-category-text">';
                recarga += '<p class="p-category">Sobre nosotros</p>';
                recarga += '</div>';
                recarga += '</button>';
                recarga += '</div>';

                recarga += '<div class="user-div-category">';
                recarga += '<button class="user-btn-category">';
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
                recarga += '<div class="edit-profile">';
                recarga += '<div class="return">';
                recarga += '<button class="return-btn" onclick="mostrarperfilJS(); return false;">';
                recarga += '<div class="return-icon">';
                recarga += '<i class="fa-solid fa-angle-left"></i>';
                recarga += '</div>';
                recarga += '<p class="return-text">VOLVER</p>';
                recarga += '</button>';
                recarga += '</div>';

                /* Inputs para editar el usuario */
                recarga += '<div class="edit-inputs">';
                recarga += '<form method="POST" id="formeditar" enctype="multipart/form-data">';

                /* Nombre */
                recarga += '<div class="edit-input">';
                recarga += '<div class="input-text">';
                recarga += '<p class="p-text">Nombre</p>';
                recarga += '</div>';
                recarga += '<div class="input-edit">';
                recarga += '<input type="text" class="input" id="nombre" name="nombre" value="' + trabajador.nombre + '">';
                recarga += '</div>';
                recarga += '</div>';

                /* Apellido */
                recarga += '<div class="edit-input">';
                recarga += '<div class="input-text">';
                recarga += '<p class="p-text">Apellido</p>';
                recarga += '</div>';
                recarga += '<div class="input-edit">';
                recarga += '<input type="text" class="input" id="nombre" name="nombre" value="' + trabajador.apellido + '">';
                recarga += '</div>';
                recarga += '</div>';

                /* Edad */
                recarga += '<div class="edit-input">';
                recarga += '<div class="input-text">';
                recarga += '<p class="p-text">Edad</p>';
                recarga += '</div>';
                recarga += '<div class="input-edit">';
                recarga += '<input type="date" class="input" id="nombre" name="nombre" value="' + trabajador.edad + '">';
                recarga += '</div>';
                recarga += '</div>';

                /* Password */
                recarga += '<div class="edit-input">';
                recarga += '<div class="input-text">';
                recarga += '<p class="p-text">Contraseña</p>';
                recarga += '</div>';
                recarga += '<div class="input-edit">';
                recarga += '<input type="password" class="input" id="nombre" name="nombre" value="' + trabajador.contra + '">';
                recarga += '</div>';
                recarga += '</div>';

                recarga += '</form>';
                recarga += '</div>';

                /* Realizar cambios */
                recarga += '<div class="aceptar-cuenta-edit">';
                recarga += '<button class="aceptar-cuenta-btn" onclick="editarperfilJS(\'' + trabajador.id + '\',\'' + id_perfil + '\'); return false;">';
                recarga += '<p class="button-text">EDITAR</p>';
                recarga += '</button>';
                recarga += '</div>';
                recarga += '</div>';
                recarga += '</div>';

                recarga += '<div class="boton-mas-div">';
                recarga += '<button class="boton-mas">'
                recarga += '<i class="fa-solid fa-plus"></i>'
                recarga += '</button>'
                recarga += '</div>';

                recarga += '<div class="boton-menos-div">';
                recarga += '<button class="boton-menos">'
                recarga += '<i class="fa-solid fa-minus"></i>'
                recarga += '</button>'
                recarga += '</div>';

            }
            if (id_perfil == 3) {
                var empresa = respuesta.empresa[0];
                recarga += '<div class="edit-profile">';
                recarga += '<div class="return">';
                recarga += '<button class="return-btn" onclick="mostrarperfilJS(); return false;">';
                recarga += '<div class="return-icon">';
                recarga += '<i class="fa-solid fa-angle-left"></i>';
                recarga += '</div>';
                recarga += '<p class="return-text">VOLVER</p>';
                recarga += '</button>';
                recarga += '</div>';

                /* Inputs para editar el usuario */
                recarga += '<div class="edit-inputs">';
                recarga += '<form method="POST" id="formeditar" enctype="multipart/form-data">';

                /* Nombre */
                recarga += '<div class="edit-input">';
                recarga += '<div class="input-text">';
                recarga += '<p class="p-text">Nombre</p>';
                recarga += '</div>';
                recarga += '<div class="input-edit">';
                recarga += '<input type="text" class="input" id="nombre" name="nombre" value="' + empresa.nom_emp + '">';
                recarga += '</div>';
                recarga += '</div>';

                recarga += '</form>';
                recarga += '</div>';

                /* Realizar cambios */
                recarga += '<div class="aceptar-cuenta-edit">';
                recarga += '<button class="aceptar-cuenta-btn" onclick="editarperfilJS(\'' + empresa.id + '\',\'' + id_perfil + '\'); return false;">';
                recarga += '<p class="button-text">EDITAR</p>';
                recarga += '</button>';
                recarga += '</div>';
                recarga += '</div>';
                recarga += '</div>';

                recarga += '<div class="boton-mas-div">';
                recarga += '<button class="boton-mas">'
                recarga += '<i class="fa-solid fa-plus"></i>'
                recarga += '</button>'
                recarga += '</div>';

                recarga += '<div class="boton-menos-div">';
                recarga += '<button class="boton-menos">'
                recarga += '<i class="fa-solid fa-minus"></i>'
                recarga += '</button>'
                recarga += '</div>';
            }
            contenidoajax.innerHTML = recarga;
        }
    }

    ajax.send(formData);
}

// EDITAR //

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