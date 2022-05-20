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
                recarga += `<div class="user-fondo">`;
                recarga += `<div class="container-user-poligon">`;
                recarga += `<div class="logout">`;
                recarga += `<button class="logout-btn" onClick="window.location.href='logout';"><i class="fa-solid fa-right-from-bracket"></i></button>`;
                recarga += `</div>`;
                recarga += `<div class="user-poligon">`;
                recarga += `</div>`;
                recarga += `<div class="div-foto">`;
                recarga += `<div class="edit-foto">`;
                recarga += `<label class="input-file">`;
                recarga += `<i class="fa-solid fa-image"></i>`;
                recarga += `<input type="file" class="input" id="foto_perfil" name="foto_perfil">`;
                recarga += `</label>`;
                recarga += `</div>`;
                recarga += `<div class="user-ver-foto">`;
                if (trabajador.foto_perfil != null) {
                    recarga += `<img class="user-profilefoto" src="./storage/${trabajador.foto_perfil}">`;
                } else {
                    recarga += `<img class="user-profilefoto" src="./storage/img/usuario.png">`;
                }

                recarga += `</div>`;

                recarga += `</div>`;
                recarga += `</div>`;
                recarga += `<div class="user-poligon2">`;
                recarga += `<div class="user-vista">`;
                //nombre-apellido-edad
                recarga += `<div class="user-div-name">`;
                recarga += `<div class="divs-name">`;
                recarga += `<span class="p-name">${trabajador.nombre}</span>`;
                recarga += `<span class="p-surname">${trabajador.apellido},</span>`;
                recarga += `<span class="p-age">${edad(trabajador.edad)}</span>`;
                recarga += `</div>`;
                recarga += `<div class="user-edit-div">`;
                recarga += '<button class="user-edit-btn" id="boton_editar_user"><p class="edit-btn-p">EDITAR</p></button>';
                recarga += `</div>`;
                recarga += `</button>`;
                recarga += `</div>`;

                recarga += `<hr class="linea-divisoria">`;

                recarga += `<div class="user-categories">`;
                //sobre mi
                recarga += `<div class="user-div-category">`;
                recarga += `<button class="user-btn-category" id="boton_sobre_mi">`;
                recarga += `<div class="user-category-icon">`;
                recarga += `<i class="fa-solid fa-address-card"></i>`;
                recarga += `</div>`;
                recarga += `<div class="user-category-text">`;
                recarga += `<p class="p-category">Sobre mi</p>`;
                recarga += `</div>`;
                recarga += `</button>`;
                recarga += `</div>`;
                //idiomas
                recarga += `<div class="user-div-category">`;
                recarga += `<button class="user-btn-category" id="boton_idiomas">`;
                recarga += `<div class="user-category-icon">`;
                recarga += `<i class="fa-solid fa-language"></i>`;
                recarga += `</div>`;
                recarga += `<div class="user-category-text">`;
                recarga += `<p class="p-category">Idiomas</p>`;
                recarga += `</div>`;
                recarga += `</button>`;
                recarga += `</div>`;
                //estudios
                recarga += `<div class="user-div-category">`;
                recarga += `<button class="user-btn-category" id="boton_estudios">`;
                recarga += `<div class="user-category-icon">`;
                recarga += `<i class="fa-solid fa-graduation-cap"></i>`;
                recarga += `</div>`;
                recarga += `<div class="user-category-text">`;
                recarga += `<p class="p-category">Estudios</p>`;
                recarga += `</div>`;
                recarga += `</button>`;
                recarga += `</div>`;
                //experiencia
                recarga += `<div class="user-div-category">`;
                recarga += `<button class="user-btn-category" id="boton_experiencia">`;
                recarga += `<div class="user-category-icon">`;
                recarga += `<i class="fa-solid fa-briefcase"></i>`;
                recarga += `</div>`;
                recarga += `<div class="user-category-text">`;
                recarga += `<p class="p-category">Experiencia</p>`;
                recarga += `</div>`;
                recarga += `</button>`;
                recarga += `</div>`;
                //curriculum
                recarga += `<div class="user-div-category">`;
                recarga += `<button class="user-btn-category" id="boton_curriculum">`;
                recarga += `<div class="user-category-icon">`;
                recarga += `<i class="fa-solid fa-file-invoice"></i>`;
                recarga += `</div>`;
                recarga += `<div class="user-category-text">`;
                recarga += `<p class="p-category">Curriculum</p>`;
                recarga += `</div>`;
                recarga += `</button>`;
                recarga += `</div>`;
                //habilidades
                recarga += `<div class="user-div-category">`;
                recarga += `<button class="user-btn-category" id="boton_habilidades">`;
                recarga += `<div class="user-category-icon">`;
                recarga += `<i class="fa-solid fa-brain"></i>`;
                recarga += `</div>`;
                recarga += `<div class="user-category-text">`;
                recarga += `<p class="p-category">Habilidades</p>`;
                recarga += `</div>`;
                recarga += `</button>`;
                recarga += `</div>`;
                //disponibilidad
                recarga += `<div class="user-div-category">`;
                recarga += `<button class="user-btn-category" id="boton_disponibilidad">`;
                recarga += `<div class="user-category-icon">`;
                recarga += `<i class="fa-solid fa-clock"></i>`;
                recarga += `</div>`;
                recarga += `<div class="user-category-text">`;
                recarga += `<p class="p-category">Disponibilidad</p>`;
                recarga += `</div>`;
                recarga += `</button>`;
                recarga += `</div>`;
                //configuracion
                recarga += `<div class="user-div-category">`;
                recarga += `<button class="user-btn-category" id="boton_configuracion">`;
                recarga += `<div class="user-category-icon">`;
                recarga += `<i class="fa-solid fa-gear"></i>`;
                recarga += `</div>`;
                recarga += `<div class="user-category-text">`;
                recarga += `<p class="p-category">Configuración</p>`;
                recarga += `</div>`;
                recarga += `</button>`;
                recarga += `</div>`;

                recarga += `</div>`;

                recarga += `</div>`;
                recarga += `</div>`;
                // recarga += '<div class="wave-div">';
                // recarga += '<img class="wave" src="./storage/uploads/wave.svg">';
                // recarga += '</div>';
                recarga += `</div>`;
                recarga += `</div>`;
                contenidoajax.innerHTML = recarga;

                document.getElementById("foto_perfil").addEventListener("change", editar_foto_perfil)

                var boton_editar_user = document.getElementById("boton_editar_user");
                boton_editar_user.addEventListener("click", leer_editar_user);

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

function editar_foto_perfil() {
    var foto_perfil = document.getElementById("foto_perfil").files[0];

    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');
    formData.append('foto_perfil', foto_perfil);

    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();

    ajax.open("POST", "editarperfil", true);

    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);
            console.log(respuesta);
            mostrarperfilJS();

        }
    }

    ajax.send(formData)
}

function leer_editar_user() {

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
            var recarga = ``;
            recarga += `<button class="" id="volver">Volver</button>`;
            recarga += `<button class="" id="editar">Editar</button>`;
            recarga += `<p class="">${trabajador.mail}</p>`;
            recarga += `<p class="">contraseña</p>`;
            recarga += `<p class="">${trabajador.nombre}</p>`;
            if (!trabajador.apellido) {

                recarga += `<p class="">sin informar</p>`;
            } else {

                recarga += `<p class="">${trabajador.apellido}</p>`;
            }
            contenidoajax.innerHTML = recarga;

            document.getElementById("volver").addEventListener("click", mostrarperfilJS);

            var editar = document.getElementById("editar");
            editar.addEventListener("click", form_editar_user);
        }
    }

    ajax.send(formData)

}

function form_editar_user() {

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
            var recarga = ``;
            recarga += `<button id="volver">Volver</button>`;
            recarga += `<div>`;
            recarga += `<form id=form_editar_user>`;

            recarga += `<input type="email" class="" id="mail" name="mail" value="${trabajador.mail}">`;

            //antigua contraseña
            recarga += `<input type="password" class="" id="contra_old" name="contra_old">`;

            //nueva contra1
            recarga += `<input type="password" class="" id="contra1" name="contra1">`;

            //nueva contra2
            recarga += `<input type="password" class="" id="contra2" name="contra2">`;

            recarga += `<input type="text" class="" id="nombre" name="nombre" value="${trabajador.nombre}">`;

            if (!trabajador.apellido) {

                recarga += `<input type="text" class="" id="apellido" name="apellido" placeholder="sin informar">`;
            } else {

                recarga += `<input type="text" class="" id="apellido" name="apellido" value="${trabajador.apellido}">`;
            }

            recarga += `<button>Realizar cambios</button>`;
            recarga += `</form>`;
            recarga += `</div>`;
            contenidoajax.innerHTML = recarga;

            document.getElementById("volver").addEventListener("click", leer_editar_user);
            document.getElementById("form_editar_user").addEventListener("submit", modificar_editar_user);

        }

    }

    ajax.send(formData)

}

function modificar_editar_user(evt) {

    evt.preventDefault();

    var mail = document.getElementById("mail").value;
    var contra_old = document.getElementById("contra_old").value;
    var contra1 = document.getElementById("contra1").value;
    var contra2 = document.getElementById("contra2").value;
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;

    if (contra1 !== contra2) {

        swal.fire({
            title: "Error",
            text: "No coinciden las contraseñas",
            icon: "error",
        });
        return false;

    }
    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');
    formData.append('mail', mail);
    if (contra_old && contra1 && contra2) {

        formData.append('contra_old', contra_old);
        formData.append('contra', contra1);
        formData.append('contra2', contra2);
    }
    formData.append('nombre', nombre);
    if (apellido) {

        formData.append('apellido', apellido);
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
            var recarga = ``;
            recarga += `<div class="vista-profile">`;
            recarga += `<div class="categoria-edit">`;
            //volver a la vista anterior
            recarga += `<div class="return">`;
            recarga += `<button class="return-btn" id="volver">`;
            recarga += `<div class="return-icon">`;
            recarga += `<i class="fa-solid fa-angle-left"></i>`;
            recarga += `</div>`;
            recarga += `<p class="return-text">VOLVER</p>`;
            recarga += `</button>`;
            recarga += `</div>`;
            //ir a vista editar
            recarga += `<div class="logout">`;
            recarga += `<button class="logout-btn" id="editar"><i class="fa-solid fa-pen"></i></button>`;
            recarga += `</div>`;
            recarga += `</div>`;
            recarga += `<div class="categoria-profile">`;
            //bloque pequeño
            recarga += `<div class="categoria">`;
            recarga += `<div class="categoria-icon-name">`;
            recarga += `<div class="categoria-icon">`;
            recarga += `<i class="fa-solid fa-address-card"></i>`;
            recarga += `</div>`;
            recarga += `<div class="categoria-name">`;
            //titulo
            recarga += `<p class="categoria-p-name">Sobre mi</p>`;
            recarga += `</div>`;
            recarga += `</div>`;
            recarga += `<div class="categoria-linea">`;
            recarga += `<hr class="linea-divisoria">`;
            recarga += `</div>`;
            recarga += `<div class="categoria-text">`;
            //contenido
            if (!trabajador.campo_user) {

                recarga += `<p class="categoria-p-text">sin informar</p>`;
            } else {

                recarga += `<p class="categoria-p-text">${trabajador.campo_user}</p>`;
            }
            recarga += `</div>`;
            recarga += `</div>`;
            //bloque pequeño
            //bloque grande
            recarga += `<div class="categoria">`;
            recarga += `<div class="categoria-icon-name">`;
            recarga += `<div class="categoria-icon">`;
            recarga += `<i class="fa-solid fa-address-card"></i>`;
            recarga += `</div>`;
            recarga += `<div class="categoria-name">`;
            //titulo
            recarga += `<p class="categoria-p-name">Sobre mi</p>`;
            recarga += `</div>`;
            recarga += `</div>`;
            recarga += `<div class="categoria-linea">`;
            recarga += `<hr class="linea-divisoria">`;
            recarga += `</div>`;
            recarga += `<div class="categoria-text">`;
            //contenido
            if (!trabajador.about_user) {

                recarga += `<p class="categoria-p-text">sin informar</p>`;
            } else {

                recarga += `<p class="categoria-p-text">${trabajador.about_user}</p>`;
            }
            recarga += `</div>`;
            recarga += `</div>`;
            //bloque grande
            //bloque pequeño
            recarga += `<div class="categoria">`;
            recarga += `<div class="categoria-icon-name">`;
            recarga += `<div class="categoria-icon">`;
            recarga += `<i class="fa-solid fa-address-card"></i>`;
            recarga += `</div>`;
            recarga += `<div class="categoria-name">`;
            //titulo
            recarga += `<p class="categoria-p-name">Sobre mi</p>`;
            recarga += `</div>`;
            recarga += `</div>`;
            recarga += `<div class="categoria-linea">`;
            recarga += `<hr class="linea-divisoria">`;
            recarga += `</div>`;
            recarga += `<div class="categoria-text">`;
            //contenido
            if (!trabajador.loc_trabajador) {

                recarga += `<p class="categoria-p-text">sin informar</p>`;
            } else {

                recarga += `<p class="categoria-p-text">${trabajador.loc_trabajador}</p>`;
            }
            recarga += `</div>`;
            recarga += `</div>`;
            //bloque pequeño
            //bloque pequeño
            recarga += `<div class="categoria">`;
            recarga += `<div class="categoria-icon-name">`;
            recarga += `<div class="categoria-icon">`;
            recarga += `<i class="fa-solid fa-address-card"></i>`;
            recarga += `</div>`;
            recarga += `<div class="categoria-name">`;
            //titulo
            recarga += `<p class="categoria-p-name">Sobre mi</p>`;
            recarga += `</div>`;
            recarga += `</div>`;
            recarga += `<div class="categoria-linea">`;
            recarga += `<hr class="linea-divisoria">`;
            recarga += `</div>`;
            recarga += `<div class="categoria-text">`;
            //contenido
            if (!trabajador.lenguaje_preferido) {

                recarga += `<p class="categoria-p-text">sin informar</p>`;
            } else {

                recarga += `<p class="categoria-p-text">${trabajador.lenguaje_preferido}</p>`;
            }
            recarga += `</div>`;
            recarga += `</div>`;
            //bloque pequeño
            //bloque pequeño
            recarga += `<div class="categoria">`;
            recarga += `<div class="categoria-icon-name">`;
            recarga += `<div class="categoria-icon">`;
            recarga += `<i class="fa-solid fa-address-card"></i>`;
            recarga += `</div>`;
            recarga += `<div class="categoria-name">`;
            //titulo
            recarga += `<p class="categoria-p-name">Sobre mi</p>`;
            recarga += `</div>`;
            recarga += `</div>`;
            recarga += `<div class="categoria-linea">`;
            recarga += `<hr class="linea-divisoria">`;
            recarga += `</div>`;
            recarga += `<div class="categoria-text">`;
            //contenido
            if (!trabajador.linkedin) {

                recarga += `<p class="categoria-p-text">sin informar</p>`;
            } else {

                recarga += `<p class="categoria-p-text">${trabajador.linkedin}</p>`;
            }
            recarga += `</div>`;
            recarga += `</div>`;
            //bloque pequeño
            //bloque pequeño
            recarga += `<div class="categoria">`;
            recarga += `<div class="categoria-icon-name">`;
            recarga += `<div class="categoria-icon">`;
            recarga += `<i class="fa-solid fa-address-card"></i>`;
            recarga += `</div>`;
            recarga += `<div class="categoria-name">`;
            //titulo
            recarga += `<p class="categoria-p-name">Sobre mi</p>`;
            recarga += `</div>`;
            recarga += `</div>`;
            recarga += `<div class="categoria-linea">`;
            recarga += `<hr class="linea-divisoria">`;
            recarga += `</div>`;
            recarga += `<div class="categoria-text">`;
            //contenido
            if (!trabajador.telefono) {

                recarga += `<p class="categoria-p-text">sin informar</p>`;
            } else {

                recarga += `<p class="categoria-p-text">${trabajador.telefono}</p>`;
            }
            recarga += `</div>`;
            recarga += `</div>`;
            //bloque pequeño
            //bloque pequeño
            recarga += `<div class="categoria">`;
            recarga += `<div class="categoria-icon-name">`;
            recarga += `<div class="categoria-icon">`;
            recarga += `<i class="fa-solid fa-address-card"></i>`;
            recarga += `</div>`;
            recarga += `<div class="categoria-name">`;
            //titulo
            recarga += `<p class="categoria-p-name">Sobre mi</p>`;
            recarga += `</div>`;
            recarga += `</div>`;
            recarga += `<div class="categoria-linea">`;
            recarga += `<hr class="linea-divisoria">`;
            recarga += `</div>`;
            recarga += `<div class="categoria-text">`;
            //contenido
            if (!trabajador.github) {

                recarga += `<p class="categoria-p-text">sin informar</p>`;
            } else {

                recarga += `<p class="categoria-p-text">${trabajador.github}</p>`;
            }
            recarga += `</div>`;
            recarga += `</div>`;
            //bloque pequeño
            recarga += `</div>`;
            recarga += `</div>`;
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
            var recarga = ``;
            recarga += `<button id="volver">Volver</button>`;
            recarga += `<div>`;
            recarga += `<form id=form_editar_sobre_mi>`;

            if (!trabajador.campo_user) {

                recarga += `<input type="text" class="" id="campo_user" name="campo_user" placeholder="sin informar">`;
            } else {

                recarga += `<input type="text" class="" id="campo_user" name="campo_user" value="${trabajador.campo_user}">`;
            }

            if (!trabajador.about_user) {

                recarga += `<input type="text" class="" id="about_user" name="about_user" placeholder="sin informar">`;
            } else {

                recarga += `<input type="text" class="" id="about_user" name="about_user" value="${trabajador.about_user}">`;
            }

            if (!trabajador.loc_trabajador) {

                recarga += `<input type="text" class="" id="loc_trabajador" name="loc_trabajador" placeholder="sin informar">`;
            } else {

                recarga += `<input type="text" class="" id="loc_trabajador" name="loc_trabajador" value="${trabajador.loc_trabajador}">`;
            }

            if (!trabajador.lenguaje_preferido) {

                recarga += `<input type="text" class="" id="lenguaje_preferido" name="lenguaje_preferido" placeholder="sin informar">`;
            } else {

                recarga += `<input type="text" class="" id="lenguaje_preferido" name="lenguaje_preferido" value="${trabajador.lenguaje_preferido}">`;
            }

            if (!trabajador.linkedin) {

                recarga += `<input type="text" class="" id="linkedin" name="linkedin" placeholder="sin informar">`;
            } else {

                recarga += `<input type="text" class="" id="linkedin" name="linkedin" value="${trabajador.linkedin}">`;
            }

            if (!trabajador.telefono) {

                recarga += `<input type="text" class="" id="telefono" name="telefono" placeholder="sin informar">`;
            } else {

                recarga += `<input type="text" class="" id="telefono" name="telefono" value="${trabajador.telefono}">`;
            }

            if (!trabajador.github) {

                recarga += `<input type="text" class="" id="github" name="github" placeholder="sin informar">`;
            } else {

                recarga += `<input type="text" class="" id="github" name="github" value="${trabajador.github}">`;
            }

            recarga += `<button>Realizar cambios</button>`;
            recarga += `</form>`;
            recarga += `</div>`;
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

    var contenidoajax = document.getElementById("contenidoajax");
    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');

    var ajax = objetoAjax();

    ajax.open("POST", "leerperfil", true);

    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);
            var trabajador = respuesta.resultado;
            console.log(trabajador);
            var recarga = ``;
            recarga += `<button id="volver">Volver</button>`;
            recarga += `<button id="crear">crear</button>`;
            if (trabajador.curriculum != null) {

                var curriculum = JSON.parse(trabajador.curriculum);
                if (curriculum.hasOwnProperty('idiomas')) {

                    if (curriculum.idiomas.length != 0) {

                        for (let i = 0; i < curriculum.idiomas.length; i++) {

                            recarga += `<div>`;
                            recarga += `<p>${curriculum.idiomas[i].nombre_idioma}</p>`;
                            recarga += `<p>${curriculum.idiomas[i].nivel_idioma}</p>`;
                            recarga += `<button class="editar">Editar</button>`;
                            recarga += `</div>`;
                        }
                    } else {

                        recarga += `<p>Aun no has añadido ningun idioma</p>`;
                    }
                } else {

                    recarga += `<p>Aun no has añadido ningun idioma</p>`;
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
    var recarga = ``;
    recarga += `<button id="volver">Volver</button>`;
    recarga += `<div>`;
    recarga += `<form id=form_idiomas>`;
    recarga += `<select class="" name="nombre_idioma" id="nombre_idioma" data-show-subtext="false" data-live-search="true">`;
    recarga += `<option value="" selected>- selecciona -</option>`;
    for (let i = 0; i < JSONidiomas.length; i++) {

        recarga += `<option value="${JSONidiomas[i].nombre_idioma}">${JSONidiomas[i].nombre_idioma}</option>`;
    }
    recarga += `</select>`;
    recarga += `<select class="" name="nivel_idioma" id="nivel_idioma">`;
    recarga += `<option value="" selected>- selecciona -</option>`;
    recarga += `<option value="bajo">bajo</option>`;
    recarga += `<option value="medio">medio</option>`;
    recarga += `<option value="alto">alto</option>`;
    recarga += `<option value="nativo">nativo</option>`;
    recarga += `</select>`;
    recarga += `<button>Realizar cambios</button>`;
    recarga += `</form>`;
    recarga += `</div>`;
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
            var recarga = ``;
            recarga += `<button id="volver">Volver</button>`;
            recarga += `<div>`;
            recarga += `<form id=form_idiomas>`;
            recarga += `<select class="" name="nombre_idioma" id="nombre_idioma" data-show-subtext="false" data-live-search="true">`;
            for (let i = 0; i < JSONidiomas.length; i++) {

                if (idioma.nombre_idioma == JSONidiomas[i].nombre_idioma) {

                    recarga += `<option value="${idioma.nombre_idioma}" selected>${idioma.nombre_idioma}</option>`;
                } else {

                    recarga += `<option value="${JSONidiomas[i].nombre_idioma}">${JSONidiomas[i].nombre_idioma}</option>`;
                }
            }
            recarga += `</select>`;
            recarga += `<select class="" name="nivel_idioma" id="nivel_idioma">`;
            recarga += `<option value="${idioma.nivel_idioma}" selected>${idioma.nivel_idioma}</option>`;
            recarga += `<option value="bajo">bajo</option>`;
            recarga += `<option value="medio">medio</option>`;
            recarga += `<option value="alto">alto</option>`;
            recarga += `<option value="nativo">nativo</option>`;
            recarga += `</select>`;
            recarga += `<button>Realizar cambios</button>`;
            recarga += `</form>`;
            recarga += `<button id="eliminar">Eliminar idioma</button>`;
            recarga += `</div>`;
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

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');
    formData.append('nombre_idioma', nombre_idioma);
    formData.append('nivel_idioma', nivel_idioma);
    formData.append('numero_idioma', i);

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

function leer_estudios() {

    var contenidoajax = document.getElementById("contenidoajax");
    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');

    var ajax = objetoAjax();

    ajax.open("POST", "leerperfil", true);

    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);
            var trabajador = respuesta.resultado;
            console.log(trabajador);
            var recarga = ``;
            recarga += `<button id="volver">Volver</button>`;
            recarga += `<button id="crear">crear</button>`;
            if (trabajador.curriculum != null) {

                var curriculum = JSON.parse(trabajador.curriculum);
                if (curriculum.hasOwnProperty('estudios')) {

                    if (curriculum.estudios.length != 0) {

                        for (let i = 0; i < curriculum.estudios.length; i++) {

                            recarga += `<div>`;
                            recarga += `<p>${curriculum.estudios[i].nombre_formación}</p>`;
                            recarga += `<p>${curriculum.estudios[i].lugar_formación}</p>`;
                            recarga += `<p>${curriculum.estudios[i].año_entrada}</p>`;
                            recarga += `<p>${curriculum.estudios[i].año_salida}</p>`;
                            recarga += `<button class="editar">Editar</button>`;
                            recarga += `</div>`;
                        }
                    } else {

                        recarga += `<p>Aun no has añadido ningun estudio</p>`;
                    }
                } else {

                    recarga += `<p>Aun no has añadido ningun estudio</p>`;
                }
                contenidoajax.innerHTML = recarga;
                if (curriculum.hasOwnProperty('estudios')) {

                    for (let i = 0; i < curriculum.estudios.length; i++) {

                        document.getElementsByClassName("editar")[i].i = i;
                        document.getElementsByClassName("editar")[i].addEventListener("click", form_editar_estudios);
                    }
                }
            } else {

                recarga += `<p>Aun no has añadido ningun estudio</p>`;
                contenidoajax.innerHTML = recarga;
            }
            document.getElementById("volver").addEventListener("click", mostrarperfilJS);
            document.getElementById("crear").addEventListener("click", form_crear_estudios);

        }

    }

    ajax.send(formData)
}

function form_crear_estudios() {

    var contenidoajax = document.getElementById("contenidoajax");
    var recarga = ``;
    recarga += `<button id="volver">Volver</button>`;
    recarga += `<div>`;
    recarga += `<form id=form_estudios>`;
    recarga += `<input type="text" class="" id="nombre_formación" name="nombre_formación" placeholder="Introduce tu titulo">`;
    recarga += `<input type="text" class="" id="lugar_formación" name="lugar_formación" placeholder="Introduce el centro de estudios">`;
    recarga += `<input type="date" class="" id="año_entrada" name="año_entrada">`;
    recarga += `<input type="date" class="" id="año_salida" name="año_salida">`;
    recarga += `<button>Realizar cambios</button>`;
    recarga += `</form>`;
    recarga += `</div>`;
    contenidoajax.innerHTML = recarga;

    document.getElementById("volver").addEventListener("click", leer_estudios);
    document.getElementById("form_estudios").addEventListener("submit", crear_estudios);

}

function crear_estudios(evt) {

    evt.preventDefault();
    var nombre_formación = document.getElementById("nombre_formación").value;
    var lugar_formación = document.getElementById("lugar_formación").value;
    var año_entrada = document.getElementById("año_entrada").value;
    var año_salida = document.getElementById("año_salida").value;
    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');
    formData.append('nombre_formación', nombre_formación);
    formData.append('lugar_formación', lugar_formación);
    formData.append('año_entrada', año_entrada);
    formData.append('año_salida', año_salida);

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

function form_editar_estudios(evt) {

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
            var estudios = curriculum.estudios[i];
            console.log(estudios);
            var recarga = ``;

            recarga += `<button id="volver">Volver</button>`;
            recarga += `<div>`;
            recarga += `<form id=form_estudios>`;
            recarga += `<input type="text" class="" id="nombre_formación" name="nombre_formación" value="${estudios.nombre_formación}">`;
            recarga += `<input type="text" class="" id="lugar_formación" name="lugar_formación" value="${estudios.lugar_formación}">`;
            recarga += `<input type="date" class="" id="año_entrada" name="año_entrada" value="${estudios.año_entrada}">`;
            recarga += `<input type="date" class="" id="año_salida" name="año_salida" value="${estudios.año_salida}">`;
            recarga += `<button>Realizar cambios</button>`;
            recarga += `</form>`;
            recarga += `<button id="eliminar">Eliminar idioma</button>`;
            recarga += `</div>`;
            contenidoajax.innerHTML = recarga;

            document.getElementById("volver").addEventListener("click", leer_estudios);
            document.getElementById("form_estudios").i = i;
            document.getElementById("form_estudios").addEventListener("submit", editar_estudios);
            document.getElementById("eliminar").i = i;
            document.getElementById("eliminar").addEventListener("click", eliminar_estudios);

        }

    }

    ajax.send(formData)
}

function editar_estudios(evt) {

    evt.preventDefault();
    var i = evt.currentTarget.i;

    var nombre_formación = document.getElementById("nombre_formación").value;
    var lugar_formación = document.getElementById("lugar_formación").value;
    var año_entrada = document.getElementById("año_entrada").value;
    var año_salida = document.getElementById("año_salida").value;
    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');
    formData.append('nombre_formación', nombre_formación);
    formData.append('lugar_formación', lugar_formación);
    formData.append('año_entrada', año_entrada);
    formData.append('año_salida', año_salida);
    formData.append('numero_estudio', i);

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

function eliminar_estudios(evt) {

    var i = evt.currentTarget.i;

    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');
    formData.append('numero_estudio', i);

    var ajax = objetoAjax();

    ajax.open("POST", "editarperfil", true);

    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);
            console.log(respuesta);
            leer_estudios();

        }

    }

    ajax.send(formData)

}

function leer_experiencia() {

    var contenidoajax = document.getElementById("contenidoajax");
    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');

    var ajax = objetoAjax();

    ajax.open("POST", "leerperfil", true);

    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);
            var trabajador = respuesta.resultado;
            console.log(trabajador);
            var recarga = ``;
            recarga += `<button id="volver">Volver</button>`;
            recarga += `<button id="crear">crear</button>`;
            if (trabajador.curriculum != null) {

                var curriculum = JSON.parse(trabajador.curriculum);
                if (curriculum.hasOwnProperty('experiencia')) {

                    if (curriculum.experiencia.length != 0) {

                        for (let i = 0; i < curriculum.experiencia.length; i++) {

                            recarga += `<div>`;
                            recarga += `<p>${curriculum.experiencia[i].lugar_experiencia}</p>`;
                            recarga += `<p>${curriculum.experiencia[i].nombre_experiencia}</p>`;
                            recarga += `<p>${curriculum.experiencia[i].año_entrada}</p>`;
                            recarga += `<p>${curriculum.experiencia[i].año_salida}</p>`;
                            recarga += `<p>${curriculum.experiencia[i].funciones}</p>`;
                            recarga += `<button class="editar">Editar</button>`;
                            recarga += `</div>`;
                        }
                    } else {

                        recarga += `<p>Aun no has añadido ninguna experiencia</p>`;
                    }
                } else {

                    recarga += `<p>Aun no has añadido ninguna experiencia</p>`;
                }
                contenidoajax.innerHTML = recarga;
                if (curriculum.hasOwnProperty('experiencia')) {

                    for (let i = 0; i < curriculum.experiencia.length; i++) {

                        document.getElementsByClassName("editar")[i].i = i;
                        document.getElementsByClassName("editar")[i].addEventListener("click", form_editar_experiencias);
                    }
                }
            } else {

                recarga += `<p>Aun no has añadido ninguna experiencia</p>`;
                contenidoajax.innerHTML = recarga;
            }
            document.getElementById("volver").addEventListener("click", mostrarperfilJS);
            document.getElementById("crear").addEventListener("click", form_crear_experiencia);

        }

    }

    ajax.send(formData)

}

function form_crear_experiencia() {

    var contenidoajax = document.getElementById("contenidoajax");
    var recarga = ``;
    recarga += `<button id="volver">Volver</button>`;
    recarga += `<div>`;
    recarga += `<form id=form_experiencia>`;
    recarga += `<input type="text" class="" id="nombre_experiencia" name="Nombre de empresa..." placeholder="Nombre puesto">`;
    recarga += `<input type="text" class="" id="lugar_experiencia" name="Lugar..." placeholder="Empresa">`;
    recarga += `<input type="date" class="" id="año_entrada" name="año_entrada">`;
    recarga += `<input type="date" class="" id="año_salida" name="año_salida">`;
    recarga += `<input type="textarea" class="inputregister" id="funciones" name="funciones" placeholder="Funciones dentro de la empresa">`;
    recarga += `<button>Realizar cambios</button>`;
    recarga += `</form>`;
    recarga += `</div>`;
    contenidoajax.innerHTML = recarga;

    document.getElementById("volver").addEventListener("click", leer_experiencia);
    document.getElementById("form_experiencia").addEventListener("submit", crear_experiencia);

}

function crear_experiencia(evt) {

    evt.preventDefault();
    var nombre_experiencia = document.getElementById("nombre_experiencia").value;
    var lugar_experiencia = document.getElementById("lugar_experiencia").value;
    var año_entrada = document.getElementById("año_entrada").value;
    var año_salida = document.getElementById("año_salida").value;
    var funciones = document.getElementById("funciones").value;
    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');
    formData.append('nombre_experiencia', nombre_experiencia);
    formData.append('lugar_experiencia', lugar_experiencia);
    formData.append('año_entrada', año_entrada);
    formData.append('año_salida', año_salida);
    formData.append('funciones', funciones);

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

function form_editar_experiencias(evt) {

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
            var experiencia = curriculum.experiencia[i];
            console.log(experiencia);
            var recarga = ``;

            recarga += `<button id="volver">Volver</button>`;
            recarga += `<div>`;
            recarga += `<form id=form_experiencias>`;
            recarga += `<input type="text" class="" id="nombre_experiencia" name="Nombre de empresa..." value="${experiencia.nombre_experiencia}">`;
            recarga += `<input type="text" class="" id="lugar_experiencia" name="Lugar..." value="${experiencia.lugar_experiencia}">`;
            recarga += `<input type="date" class="" id="año_entrada" name="año_entrada" value="${experiencia.año_entrada}">`;
            recarga += `<input type="date" class="" id="año_salida" name="año_salida" value="${experiencia.año_salida}">`;
            recarga += `<input type="textarea" class="inputregister" id="funciones" name="funciones" value="${experiencia.funciones}">`;
            recarga += `<button>Realizar cambios</button>`;
            recarga += `</form>`;
            recarga += `<button id="eliminar">Eliminar experiencia</button>`;
            recarga += `</div>`;
            contenidoajax.innerHTML = recarga;

            document.getElementById("volver").addEventListener("click", leer_experiencia);
            document.getElementById("form_experiencias").i = i;
            document.getElementById("form_experiencias").addEventListener("submit", editar_experiencias);
            document.getElementById("eliminar").i = i;
            document.getElementById("eliminar").addEventListener("click", eliminar_experiencias);

        }

    }

    ajax.send(formData)
}

function editar_experiencias(evt) {

    evt.preventDefault();
    var i = evt.currentTarget.i;

    var nombre_experiencia = document.getElementById("nombre_experiencia").value;
    var lugar_experiencia = document.getElementById("lugar_experiencia").value;
    var año_entrada = document.getElementById("año_entrada").value;
    var año_salida = document.getElementById("año_salida").value;
    var funciones = document.getElementById("funciones").value;
    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');
    formData.append('nombre_experiencia', nombre_experiencia);
    formData.append('lugar_experiencia', lugar_experiencia);
    formData.append('año_entrada', año_entrada);
    formData.append('año_salida', año_salida);
    formData.append('funciones', funciones);
    formData.append('numero_experiencia', i);

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

function eliminar_experiencias(evt) {

    var i = evt.currentTarget.i;

    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');
    formData.append('numero_experiencia', i);

    var ajax = objetoAjax();

    ajax.open("POST", "editarperfil", true);

    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);
            console.log(respuesta);
            leer_experiencia();

        }

    }

    ajax.send(formData)

}

function leer_curriculum() {

}

function leer_habilidades() {

    var contenidoajax = document.getElementById("contenidoajax");
    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');

    var ajax = objetoAjax();

    ajax.open("POST", "leerperfil", true);

    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);
            var trabajador = respuesta.resultado;
            console.log(trabajador);
            var recarga = ``;
            recarga += `<button id="volver">Volver</button>`;
            recarga += `<button id="crear">crear</button>`;
            if (trabajador.curriculum != null) {

                var curriculum = JSON.parse(trabajador.curriculum);
                if (curriculum.hasOwnProperty('habilidades')) {

                    if (curriculum.habilidades.length != 0) {

                        for (let i = 0; i < curriculum.habilidades.length; i++) {

                            recarga += `<div>`;
                            recarga += `<p>${curriculum.habilidades[i].nombre_habilidad}</p>`;
                            recarga += `<p>${curriculum.habilidades[i].nivel_habilidad}</p>`;
                            recarga += `<button class="editar">Editar</button>`;
                            recarga += `</div>`;
                        }
                    } else {

                        recarga += `<p>Aun no has añadido ninguna habilidad</p>`;
                    }
                } else {

                    recarga += `<p>Aun no has añadido ninguna habilidad</p>`;
                }
                contenidoajax.innerHTML = recarga;
                if (curriculum.hasOwnProperty('habilidades')) {

                    for (let i = 0; i < curriculum.habilidades.length; i++) {

                        document.getElementsByClassName("editar")[i].i = i;
                        document.getElementsByClassName("editar")[i].addEventListener("click", form_editar_habilidades);
                    }
                }
            } else {

                recarga += `<p>Aun no has añadido ninguna habilidad</p>`;
                contenidoajax.innerHTML = recarga;
            }
            document.getElementById("volver").addEventListener("click", mostrarperfilJS);
            document.getElementById("crear").addEventListener("click", form_crear_habilidades);

        }

    }

    ajax.send(formData)

}

function form_crear_habilidades() {

    var contenidoajax = document.getElementById("contenidoajax");
    var recarga = ``;
    recarga += `<button id="volver">Volver</button>`;
    recarga += `<div>`;
    recarga += `<form id=form_habilidades>`;
    recarga += `<input type="text" class="" id="nombre_habilidad" name="nombre_habilidad" placeholder="Introduce tu habilidad">`;
    recarga += `<select class="" name="nivel_habilidad" id="nivel_habilidad">`;
    recarga += `<option value="" selected>- selecciona -</option>`;
    recarga += `<option value="medio">medio</option>`;
    recarga += `<option value="alto">alto</option>`;
    recarga += `<option value="experto">experto</option>`;
    recarga += `</select>`;
    recarga += `<button>Realizar cambios</button>`;
    recarga += `</form>`;
    recarga += `</div>`;
    contenidoajax.innerHTML = recarga;

    document.getElementById("volver").addEventListener("click", leer_habilidades);
    document.getElementById("form_habilidades").addEventListener("submit", crear_habilidades);

}

function crear_habilidades(evt) {

    evt.preventDefault();
    var nombre_habilidad = document.getElementById("nombre_habilidad").value;
    var nivel_habilidad = document.getElementById("nivel_habilidad").value;
    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');
    formData.append('nombre_habilidad', nombre_habilidad);
    formData.append('nivel_habilidad', nivel_habilidad);

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

function form_editar_habilidades(evt) {

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
            var habilidades = curriculum.habilidades[i];
            console.log(habilidades);
            var recarga = ``;

            recarga += `<button id="volver">Volver</button>`;
            recarga += `<div>`;
            recarga += `<form id=form_habilidades>`;
            recarga += `<input type="text" class="" id="nombre_habilidad" name="nombre_habilidad" value="${habilidades.nombre_habilidad}">`;
            recarga += `<select class="" name="nivel_habilidad" id="nivel_habilidad">`;
            recarga += `<option value="${habilidades.nivel_habilidad}" selected>${habilidades.nivel_habilidad}</option>`;
            recarga += `<option value="medio">medio</option>`;
            recarga += `<option value="alto">alto</option>`;
            recarga += `<option value="experto">experto</option>`;
            recarga += `</select>`;
            recarga += `<button>Realizar cambios</button>`;
            recarga += `</form>`;
            recarga += `<button id="eliminar">Eliminar idioma</button>`;
            recarga += `</div>`;
            contenidoajax.innerHTML = recarga;

            document.getElementById("volver").addEventListener("click", leer_habilidades);
            document.getElementById("form_habilidades").i = i;
            document.getElementById("form_habilidades").addEventListener("submit", editar_habilidades);
            document.getElementById("eliminar").i = i;
            document.getElementById("eliminar").addEventListener("click", eliminar_habilidades);

        }

    }

    ajax.send(formData)
}

function editar_habilidades(evt) {

    evt.preventDefault();
    var i = evt.currentTarget.i;

    var nombre_habilidad = document.getElementById("nombre_habilidad").value;
    var nivel_habilidad = document.getElementById("nivel_habilidad").value;
    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');
    formData.append('nombre_habilidad', nombre_habilidad);
    formData.append('nivel_habilidad', nivel_habilidad);
    formData.append('numero_habilidad', i);

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

function eliminar_habilidades(evt) {

    var i = evt.currentTarget.i;

    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');
    formData.append('numero_habilidad', i);

    var ajax = objetoAjax();

    ajax.open("POST", "editarperfil", true);

    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);
            console.log(respuesta);
            leer_habilidades();

        }

    }

    ajax.send(formData)

}

function leer_disponibilidad() {
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
            var recarga = ``;
            recarga += `<button class="" id="volver">Volver</button>`;
            recarga += `<button class="" id="editar">Editar</button>`;
            if (!trabajador.disponibilidad) {

                recarga += `<p class="">sin informar</p>`;
            } else {

                recarga += `<p class="">${trabajador.disponibilidad}</p>`;
            }
            if (!trabajador.carnet_conducir) {

                recarga += `<p class="">sin informar</p>`;
            } else {

                recarga += `<p class="">${trabajador.carnet_conducir}</p>`;
            }
            if (!trabajador.vehiculo_propio) {

                recarga += `<p class="">sin informar</p>`;
            } else {

                recarga += `<p class="">${trabajador.vehiculo_propio}</p>`;
            }
            contenidoajax.innerHTML = recarga;

            document.getElementById("volver").addEventListener("click", mostrarperfilJS);

            var editar = document.getElementById("editar");
            editar.addEventListener("click", form_disponibilidad);
        }
    }

    ajax.send(formData)

}

function form_disponibilidad() {
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
            var recarga = ``;
            recarga += `<button id="volver">Volver</button>`;
            recarga += `<div>`;
            recarga += `<form id=form_disponibilidad>`;

            if (!trabajador.disponibilidad) {

                recarga += `<select class="" name="disponibilidad" id="disponibilidad">`;
                recarga += `<option value="" selected>- selecciona -</option>`;
                recarga += `<option value="jornada completa">jornada completa (8 horas)</option>`;
                recarga += `<option value="jornada parcial">jornada parcial (4 horas)</option>`;
                recarga += `<option value="turno mañana">turno mañana</option>`;
                recarga += `<option value="turno noche">turno noche</option>`;
                recarga += `<option value="turno partida">turno partida</option>`;
                recarga += `<option value="fines de semana">fines de semana</option>`;
                recarga += `</select>`;
            } else {

                recarga += `<select class="" name="disponibilidad" id="disponibilidad">`;
                recarga += `<option value="${trabajador.disponibilidad}" selected>${trabajador.disponibilidad}</option>`;
                recarga += `<option value="jornada completa">jornada completa (8 horas)</option>`;
                recarga += `<option value="jornada parcial">jornada parcial (4 horas)</option>`;
                recarga += `<option value="turno mañana">turno mañana</option>`;
                recarga += `<option value="turno noche">turno noche</option>`;
                recarga += `<option value="turno partida">turno partida</option>`;
                recarga += `<option value="fines de semana">fines de semana</option>`;
                recarga += `</select>`;
            }

            if (!trabajador.carnet_conducir) {

                recarga += `<select class="" name="carnet_conducir" id="carnet_conducir">`;
                recarga += `<option value="" selected>- selecciona -</option>`;
                recarga += `<option value="si">si</option>`;
                recarga += `<option value="no">no</option>`;
                recarga += `</select>`;
            } else {

                recarga += `<select class="" name="carnet_conducir" id="carnet_conducir">`;
                recarga += `<option value="${trabajador.carnet_conducir}" selected>${trabajador.carnet_conducir}</option>`;
                recarga += `<option value="si">si</option>`;
                recarga += `<option value="no">no</option>`;
                recarga += `</select>`;
            }

            if (!trabajador.vehiculo_propio) {

                recarga += `<select class="" name="vehiculo_propio" id="vehiculo_propio">`;
                recarga += `<option value="" selected>- selecciona -</option>`;
                recarga += `<option value="si">si</option>`;
                recarga += `<option value="no">no</option>`;
                recarga += `</select>`;

            } else {

                recarga += `<select class="" name="vehiculo_propio" id="vehiculo_propio">`;
                recarga += `<option value="${trabajador.vehiculo_propio}" selected>${trabajador.vehiculo_propio}</option>`;
                recarga += `<option value="si">si</option>`;
                recarga += `<option value="no">no</option>`;
                recarga += `</select>`;
            }

            recarga += `<button>Realizar cambios</button>`;
            recarga += `</form>`;
            recarga += `</div>`;
            contenidoajax.innerHTML = recarga;

            document.getElementById("volver").addEventListener("click", leer_disponibilidad);
            document.getElementById("form_disponibilidad").addEventListener("submit", editar_disponibilidad);

        }

    }

    ajax.send(formData)

}

function editar_disponibilidad(evt) {
    evt.preventDefault();

    var disponibilidad = document.getElementById("disponibilidad").value;
    var carnet_conducir = document.getElementById("carnet_conducir").value;
    var vehiculo_propio = document.getElementById("vehiculo_propio").value;
    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');
    if (disponibilidad) {

        formData.append('disponibilidad', disponibilidad);
    }
    if (carnet_conducir) {

        formData.append('carnet_conducir', carnet_conducir);
    }
    if (vehiculo_propio) {

        formData.append('vehiculo_propio', vehiculo_propio);
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

function leer_configuracion() {
    //desactivar cuenta
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
            var recarga = ``;
            recarga += `<button class="" id="volver">Volver</button>`;
            recarga += `<button class="" id="editar">Editar</button>`;
            recarga += `<button id="desactivar">Desactivar</button>`;
            if (trabajador.mostrado == "1") {
                recarga += `<p class="">SI</p>`;
            } else {
                recarga += `<p class="">NO</p>`;
            }
            contenidoajax.innerHTML = recarga;

            document.getElementById("volver").addEventListener("click", mostrarperfilJS);

            var editar = document.getElementById("editar");
            editar.addEventListener("click", form_configuracion);
            var desactivar = document.getElementById("desactivar");
            desactivar.id = trabajador.id;
            desactivar.addEventListener("click", desactivar_cuenta)
        }
    }

    ajax.send(formData)

}

function form_configuracion() {

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
            var recarga = ``;
            recarga += `<button id="volver">Volver</button>`;
            recarga += `<div>`;
            recarga += `<form id=form_configuracion>`;
            if (trabajador.mostrado == 1) {
                recarga += '<input type="checkbox" class="" id="mostrado" name="mostrado" value="' + trabajador.mostrado + '" checked>';

            } else {
                recarga += '<input type="checkbox" class="" id="mostrado" name="mostrado" value="' + trabajador.mostrado + '">';

            }
            recarga += `<button>Realizar cambios</button>`;
            recarga += `</form>`;
            recarga += `</div>`;
            contenidoajax.innerHTML = recarga;

            document.getElementById("volver").addEventListener("click", leer_configuracion);
            document.getElementById("form_configuracion").addEventListener("submit", editar_configuracion);

        }

    }

    ajax.send(formData)

}

function editar_configuracion(evt) {

    evt.preventDefault();

    var mostrado = document.getElementById("mostrado").checked;
    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');
    if (mostrado == true) {

        formData.append('mostrado', '1');

    } else {

        formData.append('mostrado', '0');

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

function desactivar_cuenta(evt) {
    var id = evt.currentTarget.id;

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