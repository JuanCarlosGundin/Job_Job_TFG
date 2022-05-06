/* var jsonidiomas = (JSON.parse(idiomas)); */

window.onload = function() {
    leeridiomas();
    login();
    JSONidiomas = {};

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

function login() {

    var tabla = document.getElementById("main");
    var recarga = '';

    recarga += '<div class="botones">'
    recarga += '<button style="background-color: white;" class="btn-signin" id="loginclick">Sign In</button>'
    recarga += '<button style="background-color: #F0F0F0; box-shadow: inset 0px 0px 5px rgb(206, 205, 205);" class="btn-register" id="registrarclick">Registrar</button>'
    recarga += '</div>'
    recarga += '<div class="modal-content">'
    recarga += '<form method="POST" id="loginuser">'
    recarga += '<h2>Bienvenido a JobJob</h2>'
    recarga += '<input class="inputlogin" type="text" name="mail" id="mail_login" placeholder="Introduce tu correo"><br></br>'
    recarga += '<input class="inputlogin" type="password" name="contra" id="contra_login" placeholder="Introduce tu contraseña"><br>'
    recarga += '<button class= "botonlogin" type="submit" value="register">Iniciar Sesión</button>'
    recarga += '<p class="contraseña">¿contraseña olvidada?</p>'
    recarga += '</form>'
    recarga += '</div>'
    tabla.innerHTML = recarga;

    document.getElementById("loginclick").addEventListener("click", login);
    document.getElementById("registrarclick").addEventListener("click", registrar);
    document.getElementById("loginuser").addEventListener("submit", loginuser);

}


function loginuser(evt) {

    evt.preventDefault();

    let mail_login = document.getElementById('mail_login').value;
    let contra_login = document.getElementById('contra_login').value;

    if (mail_login == '' || contra_login == '') {

        swal.fire({
            title: "Error",
            text: "Tienes que rellenar todos los datos",
            icon: "error",
        });
        return false;

    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail_login)) {

        swal.fire({
            title: "Error",
            text: "Introduce un email correcto",
            icon: "error",
        });
        return false;

    } else if (contra_login.length > 50) {

        swal.fire({
            title: "Error",
            text: "La contraseña no puede ser más larga de 50 caracteres",
            icon: "error",
        });
        return false;

    } else if (mail_login.length > 100) {

        swal.fire({
            title: "Error",
            text: "El email no puede ser más largo de 100 caracteres",
            icon: "error",
        });
        return false;

    }

    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');
    formData.append('mail', document.getElementById('mail_login').value);
    formData.append('contra', document.getElementById('contra_login').value);

    var ajax = objetoAjax();

    ajax.open("POST", "loginuser", true);

    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);

            console.log(respuesta);

            if (respuesta.resultado == "noexiste") {

                swal.fire({
                    title: "Error",
                    text: 'No existe un usuario con esas credenciales',
                    icon: "error",
                });
                return false;

            } else if (respuesta.resultado == "noverificado") {

                swal.fire({
                    title: "Error",
                    text: 'No estas verificado porfavor ve a tu correo y comprueba la bandeja de entrada',
                    icon: "error",
                });
                return false;

            } else if (respuesta.resultado == "baneado") {

                swal.fire({
                    title: "Error",
                    text: 'Cuenta inhabilitada',
                    icon: "error",
                });
                return false;

            } else {

                if (respuesta.resultado == "admin") {

                    window.location.href = 'cPanelAdmin';

                } else if (respuesta.resultado == "OK") {

                    window.location.href = 'home';

                }

            }

        }

    }

    ajax.send(formData)

}


function registrar() {

    var tabla = document.getElementById("main");
    var recarga = '';

    recarga += '<div class="botones">'
    recarga += '<button style="background-color: #F0F0F0; box-shadow: inset 0px 0px 5px rgb(206, 205, 205);" class="btn-signin" id="loginclick">Sign In</button>'
    recarga += '<button style="background-color: white;" class="btn-register" id="registrarclick">Register</button>'
    recarga += '</div>'
    recarga += '<div id="main" class="modal-content-register-cuadrados">'
    recarga += '<h3>¿Cómo vas a usar JobJob?</h3>'
    recarga += '<div class="cuadrados">'
    recarga += '<button class="cuadrado" id="formtrabajador"><i class="fa-solid fa-user"></i><br><br><p class="user-empresa">Usuario</p></button>'
    recarga += '</div>'
    recarga += '<div class="cuadrados">'
    recarga += '<button class="cuadrado" id="formempresa"><i class="fa-solid fa-building"></i><br><br><p class="user-empresa">Empresa</p></button>'
    recarga += '</div>'
    recarga += '</div>'
    tabla.innerHTML = recarga;

    document.getElementById("loginclick").addEventListener("click", login);
    document.getElementById("registrarclick").addEventListener("click", registrar);
    document.getElementById("formtrabajador").addEventListener("click", formtrabajador1);
    document.getElementById("formempresa").addEventListener("click", formempresa);

}

//Correo-contraseñas
function formtrabajador1(evt) {

    evt.preventDefault();

    var tabla = document.getElementById("main");
    var recarga = '';

    //Botones login/registro
    recarga += '<div class="botones">';
    recarga += '<button style="background-color: #F0F0F0; box-shadow: inset 0px 0px 5px rgb(206, 205, 205);" class="btn-signin" id="loginclick">Sign In</button>';
    recarga += '<button style="background-color: white;" class="btn-register" id="registrarclick">Register</button>';
    recarga += '</div>';
    recarga += '<div class="modal-content-register"><div class="scrollbar"><h3>¡Regístrate en JobJob!</h3>';
    recarga += '<form method="POST" id="formtrabajador1" enctype="multipart/form-data">';
    //Correo
    recarga += '<div class="column-2">';
    recarga += '<p>Email</p>';
    recarga += '<input type="text" class="inputregister" id="mail" name="mail" placeholder="Introduce el email..."><br><br>';
    recarga += '</div>';
    //Contraseña 1
    recarga += '<div class="column-2">';
    recarga += '<p>Contraseña</p>';
    recarga += '<input type="password" class="inputregister" id="contra" name="contra" placeholder="Introduce la contraseña..."><br><br>';
    recarga += '</div>';
    //Contraseña 2
    recarga += '<div class="column-2">';
    recarga += '<p>Contraseña 2</p>';
    recarga += '<input type="password" class="inputregister" id="contra2" name="contra2" placeholder="repite la contraseña..."><br><br>';
    recarga += '</div>';
    recarga += '<input type="submit" class="botonregister" value="Insertar datos">';
    recarga += '</form>';
    /* recarga += '<button class="botonregister">Registrar</button>'; */
    recarga += '</div>';
    recarga += '</div>';
    tabla.innerHTML = recarga;

    document.getElementById("loginclick").addEventListener("click", login);
    document.getElementById("registrarclick").addEventListener("click", registrar);
    document.getElementById("formtrabajador1").addEventListener("submit", formtrabajador2);

}

//nombre-apellido-edad-foto
function formtrabajador2(evt) {

    evt.preventDefault();

    var tabla = document.getElementById("main");
    var recarga = '';

    //Botones login/registro
    recarga += '<div class="botones">';
    recarga += '<button style="background-color: #F0F0F0; box-shadow: inset 0px 0px 5px rgb(206, 205, 205);" class="btn-signin" id="loginclick">Sign In</button>';
    recarga += '<button style="background-color: white;" class="btn-register" id="registrarclick">Register</button>';
    recarga += '</div>';
    recarga += '<div class="modal-content-register"><div class="scrollbar"><h3>¡Regístrate en JobJob!</h3>';
    recarga += '<form method="POST" id="formtrabajador2" enctype="multipart/form-data">';
    //Nombre
    recarga += '<div class="column-2">';
    recarga += '<p>Nombre</p>';
    recarga += '<input type="text" class="inputregister" id="nombre" name="nombre" placeholder="Introduce el nombre..."><br><br>';
    recarga += '</div>';
    //Apellido
    recarga += '<div class="column-2">';
    recarga += '<p>Apellido</p>';
    recarga += '<input type="text" class="inputregister" id="apellido" name="apellido" placeholder="Introduce el apellido..."><br><br>';
    recarga += '</div>';
    //Edad
    recarga += '<div class="column-2">';
    recarga += '<p>Fecha nacimiento</p>';
    recarga += '<input type="date" class="inputregister" id="edad" name="edad"><br><br>';
    recarga += '</div>';
    //Foto
    recarga += '<div class="column-2">';
    recarga += '<p>Foto</p>';
    recarga += '<input type="file" class="foto" name="foto_perfil" id="foto_perfil"><br><br>';
    recarga += '</div>';
    recarga += '<input type="submit" class="botonregister" value="Insertar datos">';
    recarga += '</form>';
    recarga += '</div>';
    recarga += '</div>';
    tabla.innerHTML = recarga;

    document.getElementById("loginclick").addEventListener("click", login);
    document.getElementById("registrarclick").addEventListener("click", registrar);
    document.getElementById("formtrabajador2").addEventListener("submit", formtrabajador3);

}

//campo-about-loc-disponibilidad
function formtrabajador3(evt) {

    evt.preventDefault();

    var tabla = document.getElementById("main");
    var recarga = '';

    //Botones login/registro
    recarga += '<div class="botones">';
    recarga += '<button style="background-color: #F0F0F0; box-shadow: inset 0px 0px 5px rgb(206, 205, 205);" class="btn-signin" id="loginclick">Sign In</button>';
    recarga += '<button style="background-color: white;" class="btn-register" id="registrarclick">Register</button>';
    recarga += '</div>';
    recarga += '<div class="modal-content-register"><div class="scrollbar"><h3>¡Regístrate en JobJob!</h3>';
    recarga += '<form method="POST" id="formtrabajador3" enctype="multipart/form-data">';
    //campo_user
    recarga += '<div class="column-2">';
    recarga += '<p>Sector</p>';
    recarga += '<input type="text" class="inputregister" id="campo_user" name="campo_user" placeholder="Introduce tu sector..."><br><br>';
    recarga += '</div>';
    //about_user
    recarga += '<div class="column-2">';
    recarga += '<p>Introduce más información sobre tí</p><input type="text" class="inputregister" id="about_user" name="about_user" placeholder="Sobre mi..."><br><br>';
    recarga += '</div>';
    //loc_trabajador
    recarga += '<div class="column-2">';
    recarga += '<p>Localización</p>';
    recarga += '<input type="text" class="inputregister" id="loc_trabajador" name="loc_trabajador" placeholder="Introduce tu localizacion..."><br><br>';
    recarga += '</div>';
    //disponibilidad
    recarga += '<div class="column-2">';
    recarga += '<p>Disponibilidad</p>';
    recarga += '<select class="inputregister" name="disponibilidad" id="disponibilidad">';
    recarga += '<option selected>- selecciona -</option>';
    recarga += '<option value="jornada completa">jornada completa (8 horas)</option>';
    recarga += '<option value="jornada parcial">jornada parcial (4 horas)</option>';
    recarga += '<option value="turno mañana">turno mañana</option>';
    recarga += '<option value="turno noche">turno noche</option>';
    recarga += '<option value="turno partida">turno partida</option>';
    recarga += '<option value="fines de semana">fines de semana</option>';
    recarga += '</select><br><br>';
    recarga += '</div>';
    recarga += '<input type="submit" class="botonregister" value="Insertar datos">';
    recarga += '</form>';
    recarga += '</div>';
    recarga += '</div>';
    tabla.innerHTML = recarga;

    document.getElementById("loginclick").addEventListener("click", login);
    document.getElementById("registrarclick").addEventListener("click", registrar);
    document.getElementById("formtrabajador3").addEventListener("submit", formtrabajador4);

}

//idiomas
function formtrabajador4(evt) {

    evt.preventDefault();

    var tabla = document.getElementById("main");
    var recarga = '';

    //Botones login/registro
    recarga += '<div class="botones">';
    recarga += '<button style="background-color: #F0F0F0; box-shadow: inset 0px 0px 5px rgb(206, 205, 205);" class="btn-signin" id="loginclick">Sign In</button>';
    recarga += '<button style="background-color: white;" class="btn-register" id="registrarclick">Register</button>';
    recarga += '</div>';
    recarga += '<div class="modal-content-register"><div class="scrollbar"><h3>¡Regístrate en JobJob!</h3>';
    recarga += '<form method="POST" id="formtrabajador4" enctype="multipart/form-data">';
    //nombre_idioma
    recarga += '<div class="column-2">';
    recarga += '<p>nombre_idioma</p>';
    recarga += '<select class="inputregister" name="nombre_idioma" id="nombre_idioma">';
    recarga += '<option selected>- selecciona -</option>';
    for (let i = 0; i < JSONidiomas.length; i++) {
        recarga += '<option value="' + JSONidiomas[i].nombre_idioma + '">' + JSONidiomas[i].nombre_idioma + '</option>';
    }
    recarga += '</select><br><br>';
    recarga += '</div>';
    //nivel_idioma
    recarga += '<div class="column-2">';
    recarga += '<p>nivel_idioma</p>';
    recarga += '<select class="inputregister" name="nivel_idioma" id="nivel_idioma">';
    recarga += '<option selected>- selecciona -</option>';
    recarga += '<option value="bajo">bajo</option>';
    recarga += '<option value="medio">medio</option>';
    recarga += '<option value="alto">alto</option>';
    recarga += '<option value="nativo">nativo</option>';
    recarga += '</select><br><br>';
    recarga += '</div>';
    recarga += '<input type="submit" class="botonregister" value="Insertar datos">';
    recarga += '</form>';
    recarga += '</div>';
    recarga += '</div>';
    tabla.innerHTML = recarga;

    document.getElementById("loginclick").addEventListener("click", login);
    document.getElementById("registrarclick").addEventListener("click", registrar);
    document.getElementById("formtrabajador4").addEventListener("submit", formtrabajador5);

}

//estudios
function formtrabajador5(evt) {

    evt.preventDefault();

    var tabla = document.getElementById("main");
    var recarga = '';

    //Botones login/registro
    recarga += '<div class="botones">';
    recarga += '<button style="background-color: #F0F0F0; box-shadow: inset 0px 0px 5px rgb(206, 205, 205);" class="btn-signin" id="loginclick">Sign In</button>';
    recarga += '<button style="background-color: white;" class="btn-register" id="registrarclick">Register</button>';
    recarga += '</div>';
    recarga += '<div class="modal-content-register"><div class="scrollbar"><h3>¡Regístrate en JobJob!</h3>';
    recarga += '<form method="POST" id="formtrabajador5" enctype="multipart/form-data">';
    //nombre_formación
    recarga += '<div class="column-2">';
    recarga += '<p>nombre_formación</p>';
    recarga += '<input type="text" class="inputregister" id="nombre_formación" name="nombre_formación" placeholder="Introduce tu titulo"><br><br>';
    recarga += '</div>';
    //lugar_formación
    recarga += '<div class="column-2">';
    recarga += '<p>lugar_formación</p>';
    recarga += '<input type="text" class="inputregister" id="lugar_formación" name="lugar_formación" placeholder="Introduce el centro de estudios"><br><br>';
    recarga += '</div>';
    //año_entrada
    recarga += '<div class="column-2">';
    recarga += '<p>año_entrada</p>';
    recarga += '<input type="date" class="inputregister" id="año_entrada" name="año_entrada"><br><br>';
    recarga += '</div>';
    //año_salida
    recarga += '<div class="column-2">';
    recarga += '<p>año_salida</p>';
    recarga += '<input type="date" class="inputregister" id="año_salida" name="año_salida"><br><br>';
    recarga += '</div>';
    recarga += '<input type="submit" class="botonregister" value="Insertar datos">';
    recarga += '</form>';
    recarga += '</div>';
    recarga += '</div>';
    tabla.innerHTML = recarga;

    document.getElementById("loginclick").addEventListener("click", login);
    document.getElementById("registrarclick").addEventListener("click", registrar);
    document.getElementById("formtrabajador5").addEventListener("submit", formtrabajador6);

}

//experiencias
function formtrabajador6(evt) {

    evt.preventDefault();

    var tabla = document.getElementById("main");
    var recarga = '';

    //Botones login/registro
    recarga += '<div class="botones">';
    recarga += '<button style="background-color: #F0F0F0; box-shadow: inset 0px 0px 5px rgb(206, 205, 205);" class="btn-signin" id="loginclick">Sign In</button>';
    recarga += '<button style="background-color: white;" class="btn-register" id="registrarclick">Register</button>';
    recarga += '</div>';
    recarga += '<div class="modal-content-register"><div class="scrollbar"><h3>¡Regístrate en JobJob!</h3>';
    recarga += '<form method="POST" id="formtrabajador6" enctype="multipart/form-data">';
    //nombre_experiencia
    recarga += '<div class="column-2">';
    recarga += '<p>nombre_experiencia</p>';
    recarga += '<input type="text" class="inputregister" id="nombre_experiencia" name="nombre_experiencia" placeholder="Nombre puesto"><br><br>';
    recarga += '</div>';
    //lugar_experiencia
    recarga += '<div class="column-2">';
    recarga += '<p>lugar_experiencia</p>';
    recarga += '<input type="text" class="inputregister" id="lugar_experiencia" name="lugar_experiencia" placeholder="Empresa"><br><br>';
    recarga += '</div>';
    //funciones
    recarga += '<div class="column-1">';
    recarga += '<p>funciones</p>';
    recarga += '<input type="text" class="inputregister" id="funciones" name="funciones" placeholder="Funciones dentro de la empresa"><br><br>';
    recarga += '</div>';
    //año_entrada
    recarga += '<div class="column-2">';
    recarga += '<p>año_entrada</p>';
    recarga += '<input type="date" class="inputregister" id="año_entrada" name="año_entrada"><br><br>';
    recarga += '</div>';
    //año_salida
    recarga += '<div class="column-2">';
    recarga += '<p>año_salida</p>';
    recarga += '<input type="date" class="inputregister" id="año_salida" name="año_salida""><br><br>';
    recarga += '</div>';
    recarga += '<input type="submit" class="botonregister" value="Insertar datos">';
    recarga += '</form>';
    recarga += '</div>';
    recarga += '</div>';
    tabla.innerHTML = recarga;

    document.getElementById("loginclick").addEventListener("click", login);
    document.getElementById("registrarclick").addEventListener("click", registrar);
    /* document.getElementById("creartrabajadorJS").addEventListener("submit", creartrabajadorJS); */

}


function creartrabajadorJS(evt) {

    evt.preventDefault();

    let mail = document.getElementById('mail').value;
    let contra = document.getElementById('contra').value;
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let campo_user = document.getElementById('campo_user').value;
    let experiencia = document.getElementById('experiencia').value;
    let estudios = document.getElementById('estudios').value;
    let mostrado = document.getElementById('mostrado').value;
    let idiomas = document.getElementById('idiomas').value;
    let disponibilidad = document.getElementById('disponibilidad').value;
    let about_user = document.getElementById('about_user').value;
    let foto_perfil = document.getElementById('foto_perfil').value;

    if (mail == '' || contra == '' || nombre == '' || apellido == '' || campo_user == '' || experiencia == '' || estudios == '' || mostrado == '' || idiomas == '' || disponibilidad == '' || about_user == '' || foto_perfil == '') {

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

    } else if (mail.length > 100) {

        swal.fire({
            title: "Error",
            text: "El email no puede ser más largo de 100 caracteres",
            icon: "error",
        });
        return false;

    }

    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');
    formData.append('mail', document.getElementById('mail').value);
    formData.append('contra', document.getElementById('contra').value);
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
    formData.append('mostrado', document.getElementById('mostrado').value);


    var ajax = objetoAjax();

    ajax.open("POST", "registrotrabajador", true);

    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);

            console.log(respuesta);

            if (respuesta.resultado == "correoexiste") {

                swal.fire({
                    title: "Error",
                    text: "Este correo ya está en uso",
                    icon: "error",
                });

            } else if (respuesta.resultado == "OK") {

                swal.fire({
                    title: "Registrado",
                    text: "Comprueba tu correo para verificarte.",
                    showConfirmButton: false,
                    icon: "success",
                });
                setTimeout(() => { window.location.href = './'; }, 2000);

            } else {

                swal.fire({
                    title: "Error",
                    text: "No se ha podido registrar la cuenta",
                    icon: "error",
                });

            }
        }
    }
    ajax.send(formData)
}


function formempresa() {

    var tabla = document.getElementById("main");
    var recarga = '';

    recarga += '<div class="botones">';
    recarga += '<button style="background-color: #F0F0F0; box-shadow: inset 0px 0px 5px rgb(206, 205, 205);" class="btn-signin" id="loginclick">Sign In</button>';
    recarga += '<button style="background-color: white;" class="btn-register" id="registrarclick">Register</button>';
    recarga += '</div>';
    recarga += '<div class="modal-content-register"><div class="scrollbar"><h3>¡Regístrate en JobJob!</h3>';
    recarga += '<form method="POST" id="crearempresaJS" enctype="multipart/form-data">';
    recarga += '<div class="column-2">';
    recarga += '<p>Email</p>';
    recarga += '<input type="text" class="inputregister" id="mail" name="mail" placeholder="Introduce el email..."><br><br>';
    recarga += '</div>';
    recarga += '<div class="column-2">';
    recarga += '<p>Contraseña</p>';
    recarga += '<input type="password" class="inputregister" id="contra" name="contra" placeholder="Introduce la contraseña..."><br><br>';
    recarga += '</div>';
    recarga += '<div class="column-2">';
    recarga += '<p>Nombre empresa</p>';
    recarga += '<input type="text" class="inputregister" id="nom_emp" name="nom_emp" placeholder="Introduce el nombre de empresa..."><br><br>';
    recarga += '</div>';
    recarga += '<div class="column-2">';
    recarga += '<p>Dirección empresa</p>';
    recarga += '<input type="text" class="inputregister" id="loc_emp" name="loc_emp" placeholder="Introduce la localización..."><br><br>';
    recarga += '</div>';
    recarga += '<div class="column-2">';
    recarga += '<p>Logo empresa</p>';
    recarga += '<input type="file" class="foto" name="logo_emp" id="logo_emp"><br><br>';
    recarga += '</div>';
    recarga += '<div class="column-2">';
    recarga += '<p>Sector</p>';
    recarga += '<input type="text" class="inputregister" id="campo_emp" name="campo_emp" placeholder="Introduce tu sector..."><br><br>';
    recarga += '</div>';
    recarga += '<div class="column-2">';
    recarga += '<p>¿Qué buscas para tu empresa?</p>';
    recarga += '<input type="text" class="inputregister" id="searching" name="searching" placeholder="Qué buscas para tu empresa?"><br><br>';
    recarga += '</div>';
    recarga += '<div class="column-2">';
    recarga += '<p>Quieres que se te muestre a los trabajadores?</p>';
    recarga += '<select name="mostrado" id="mostrado">';
    recarga += '<option value="1" selected>Sí</option>';
    recarga += '<option value="0">No</option>';
    recarga += '</select><br><br>';
    recarga += '</div>';
    recarga += '<div class="column-2">';
    recarga += '<p>Sobre la empresa</p>';
    recarga += '<input type="text" class="inputregister" id="about_emp" name="about_emp" placeholder="Sobre mi empresa..."><br><br>';
    recarga += '</div>';
    recarga += '<div class="column-2">';
    recarga += '<p>Vacante</p>';
    recarga += '<input type="text" class="inputregister" id="vacante" name="vacante" placeholder="Qué buscamos..."><br><br>';
    recarga += '</div>';
    recarga += '<input type="submit" class="botonregister" value="Registrarme">';
    recarga += '</form>';
    recarga += '</div>';
    recarga += '</div>';
    tabla.innerHTML = recarga;

    document.getElementById("loginclick").addEventListener("click", login);
    document.getElementById("registrarclick").addEventListener("click", registrar);
    document.getElementById("crearempresaJS").addEventListener("submit", crearempresaJS);

}

function crearempresaJS(evt) {

    evt.preventDefault();

    let mail = document.getElementById('mail').value;
    let contra = document.getElementById('contra').value;
    let nom_emp = document.getElementById('nom_emp').value;
    let loc_emp = document.getElementById('loc_emp').value;
    let campo_emp = document.getElementById('campo_emp').value;
    let mostrado = document.getElementById('mostrado').value;
    let about_emp = document.getElementById('about_emp').value;
    let logo_emp = document.getElementById('logo_emp').value;

    //VALIDACIONES EMPRESA
    if (mail == '' || contra == '' || nom_emp == '' || loc_emp == '' || campo_emp == '' || mostrado == '' || about_emp == '' || logo_emp == '') {

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

    } else if (mail.length > 100) {

        swal.fire({
            title: "Error",
            text: "El email no puede ser más largo de 100 caracteres",
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

    } else if (contra.length > 100) {

        swal.fire({
            title: "Error",
            text: "La contraseña debe tener menos de 100 caracteres",
            icon: "error",
        });
        return false;

    }

    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');
    formData.append('mail', document.getElementById('mail').value);
    formData.append('contra', document.getElementById('contra').value);
    formData.append('nom_emp', document.getElementById('nom_emp').value);
    formData.append('loc_emp', document.getElementById('loc_emp').value);
    formData.append('campo_emp', document.getElementById('campo_emp').value);
    formData.append('searching', document.getElementById('searching').value);
    formData.append('mostrado', document.getElementById('mostrado').value);
    formData.append('about_emp', document.getElementById('about_emp').value);
    formData.append('vacante', document.getElementById('vacante').value);
    formData.append('logo_emp', document.getElementById('logo_emp').files[0]);

    var ajax = objetoAjax();

    ajax.open("POST", "registroempresa", true);

    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);

            console.log(respuesta);

            if (respuesta.resultado == "correoexiste") {

                swal.fire({
                    title: "Error",
                    text: "Este correo ya está en uso",
                    icon: "error",
                });

            } else if (respuesta.resultado == "OK") {

                swal.fire({
                    title: "Registrado",
                    text: "Comprueba tu correo para verificarte.",
                    showConfirmButton: false,
                    icon: "success",
                });
                setTimeout(() => { window.location.href = './'; }, 2000);

            } else {

                swal.fire({
                    title: "Error",
                    text: "No se ha podido registrar la cuenta",
                    icon: "error",
                });

            }

        }

    }

    ajax.send(formData)

}