window.onload = function() {
    leeridiomas();
    JSONidiomas = {};
    k_idiomas = 1;
    k_estudios = 1;
    k_experiencias = 1;
    login();

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
    recarga += '<button class="btn-signin" id="loginclick">Sign In</button>'
    recarga += '<button class="btn-register inicio-activo" id="registrarclick">Register</button>'
    recarga += '</div>'
    recarga += '<div class="modal-content">'
    recarga += '<form method="POST" id="loginuser">'
    recarga += '<h2>Bienvenido a JobJob</h2>'
    recarga += '<input class="inputlogin" type="text" name="mail" id="mail_login" placeholder="Introduce tu correo">'
    recarga += '<input class="inputlogin" type="password" name="contra" id="contra_login" placeholder="Introduce tu contraseña">'
    recarga += '<button class= "botonlogin" type="submit" value="register">Iniciar Sesión</button>'
    recarga += '<a class="contraseña" href="./forget-password">¿Has olvidado tu contraseña?</>'
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
    recarga += '<button class="btn-signin registrar-activo" id="loginclick">Sign In</button>'
    recarga += '<button class="btn-register" id="registrarclick">Register</button>'
    recarga += '</div>'
    recarga += '<div id="main" class="modal-content-register-cuadrados">'
    recarga += '<h3>¿Cómo vas a usar JobJob?</h3>'
    recarga += '<div class="cuadrados">'
    recarga += '<button class="cuadrado" id="formtrabajador"><i class="fa-solid fa-user"></i><p class="user-empresa">Trabajador</p></button>'
    recarga += '</div>'
    recarga += '<div class="cuadrados">'
    recarga += '<button class="cuadrado" id="formempresa"><i class="fa-solid fa-building"></i><p class="user-empresa">Empresa</p></button>'
    recarga += '</div>'
    recarga += '</div>'
    tabla.innerHTML = recarga;

    document.getElementById("loginclick").addEventListener("click", login);
    document.getElementById("registrarclick").addEventListener("click", registrar);
    document.getElementById("formtrabajador").addEventListener("click", formtrabajador0);
    document.getElementById("formempresa").addEventListener("click", formempresa0);

}

//Correo-contraseñas
function formtrabajador0() {

    var tabla = document.getElementById("main");
    var recarga = '';

    //Botones login/registro
    recarga += '<div class="botones">';
    recarga += '<button class="btn-signin registrar-activo" id="loginclick">Sign In</button>'
    recarga += '<button class="btn-register" id="registrarclick">Register</button>'
    recarga += '</div>';
    recarga += '<div class="modal-content-register"><h3>¡Regístrate en JobJob!</h3>';
    recarga += '<form method="POST" id="formtrabajador0" enctype="multipart/form-data">';
    recarga += '<div class="alert alert-danger" id="alert-danger" style="display:none"></div>';
    //Correo
    recarga += '<input type="text" class="inputregister" id="mail" name="mail" placeholder="Introduce el email...">';
    //Contraseña 1
    recarga += '<input type="password" class="inputregister" id="contra" name="contra" placeholder="Introduce la contraseña...">';
    //Contraseña 2
    recarga += '<input type="password" class="inputregister" id="contra2" name="contra2" placeholder="Repite la contraseña...">';
    recarga += '<input type="submit" class="botonregister" value="Continuar">';
    recarga += '</form>';
    recarga += '</div>';
    tabla.innerHTML = recarga;

    document.getElementById("loginclick").addEventListener("click", login);
    document.getElementById("registrarclick").addEventListener("click", registrar);
    document.getElementById("formtrabajador0").addEventListener("submit", sessiontrabajador0);

}

function sessiontrabajador0(evt) {

    evt.preventDefault();

    let mail = document.getElementById('mail').value;
    let contra = htmlEncode(document.getElementById('contra').value);
    let contra2 = htmlEncode(document.getElementById('contra2').value);

    if (!mail || !contra || !contra2) {

        swal.fire({
            title: "Error",
            text: "Tienes que rellenar todos los datos",
            icon: "error",
        });
        return false;

        //no poder poner espacios en blanco
    } else if (/^ *$/.test(mail) || /^ *$/.test(contra) || /^ *$/.test(contra2)) {
        swal.fire({
            title: "Error",
            text: "No puedes poner solo campos en blanco",
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

    } else if (contra.length < 8 || contra2.lenght < 8) {

        swal.fire({
            title: "Error",
            text: "La contraseña tiene que tener mínimo 8 carácteres",
            icon: "error",
        });
        return false;


    } else if (contra !== contra2) {

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
    formData.append('contra', contra);
    formData.append('contra2', contra2);


    var ajax = objetoAjax();

    ajax.open("POST", "sesionestrabajador", true);

    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);

            if (respuesta.resultado == "OK") {

                swal.fire({
                    title: "Registro",
                    text: "Datos guardados",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "Continuar",
                    cancelButtonText: "Cancelar",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        formtrabajador1();
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

    ajax.send(formData)

}

//Nombre-apellido-edad
function formtrabajador1() {

    var tabla = document.getElementById("main");
    var recarga = '';

    //Botones login/registro
    recarga += '<div class="botones">';
    recarga += '<button class="btn-signin registrar-activo" id="loginclick">Sign In</button>'
    recarga += '<button class="btn-register" id="registrarclick">Register</button>'
    recarga += '</div>';
    recarga += '<div class="modal-content-register"><h3>¡Regístrate en JobJob!</h3>';
    recarga += '<form method="POST" id="formtrabajador1" enctype="multipart/form-data">';
    recarga += '<div class="alert alert-danger" id="alert-danger" style="display:none"></div>';

    //Nombre
    recarga += '<input type="text" class="inputregister" id="nombre" name="nombre" placeholder="Introduce el nombre...">';
    //Apellido
    recarga += '<input type="text" class="inputregister" id="apellido" name="apellido" placeholder="Introduce el apellido...">';
    //Edad
    recarga += '<input type="date" class="inputregister" id="edad" name="edad">';
    recarga += '<input type="submit" class="botonregister" value="Guardar datos">';
    recarga += '</form>';
    recarga += '</div>';
    tabla.innerHTML = recarga;

    document.getElementById("loginclick").addEventListener("click", login);
    document.getElementById("registrarclick").addEventListener("click", registrar);
    document.getElementById("formtrabajador1").addEventListener("submit", sessiontrabajador1);

}

function sessiontrabajador1(evt) {

    evt.preventDefault();

    let nombre = htmlEncode(document.getElementById('nombre').value);
    let apellido = htmlEncode(document.getElementById('apellido').value);
    let edad = document.getElementById('edad').value;

    if (!nombre || !apellido || !edad) {

        swal.fire({
            title: "Error",
            text: "Tienes que rellenar todos los datos",
            icon: "error",
        });
        return false;

    } else if (/^ *$/.test(nombre) || /^ *$/.test(apellido) || /^ *$/.test(edad)) {
        swal.fire({
            title: "Error",
            text: "No puedes poner solo campos en blanco",
            icon: "error",
        });
        return false;

    } else if (nombre.length < 2 || nombre.length > 60) {

        swal.fire({
            title: "Error",
            text: "Introduce un nombre correcto",
            icon: "error",
        });
        return false;

    } else if (apellido.length < 2 || apellido.length > 60) {

        swal.fire({
            title: "Error",
            text: "Introduce un apellido correcto",
            icon: "error",
        });
        return false;

    }

    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');
    formData.append('nombre', nombre);
    formData.append('apellido', apellido);
    formData.append('edad', edad);


    var ajax = objetoAjax();

    ajax.open("POST", "sesionestrabajador", true);

    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);

            if (respuesta.resultado == "OK") {

                swal.fire({
                    title: "Registro",
                    text: "Datos guardados",
                    icon: "question",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Registrarte",
                    denyButtonText: "Introducir mas datos",
                    cancelButtonText: "Cancelar",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        creartrabajadorJS();
                    } else if (result.isDenied) {
                        formtrabajador2();
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

    ajax.send(formData)

}

//campo-about-loc-lenguaje_preferido
function formtrabajador2() {

    var tabla = document.getElementById("main");
    var recarga = '';

    //Botones login/registro
    recarga += '<div class="botones">';
    recarga += '<button class="btn-signin registrar-activo" id="loginclick">Sign In</button>'
    recarga += '<button class="btn-register" id="registrarclick">Register</button>'
    recarga += '</div>';
    recarga += '<div class="modal-content-register">';
    //Flechas registro
    recarga += '<div class="izquierda-derecha">';
    recarga += '<button class="izquierda" id="izquierda"><i class="fa-solid fa-left-long"></i></button>';
    recarga += '<button class="derecha" id="derecha"><i class="fa-solid fa-right-long"></i></button>';
    recarga += '</div>';
    recarga += '<h3>Introduce más datos sobre ti</h3>';
    recarga += '<form method="POST" id="formtrabajador2" enctype="multipart/form-data">';
    recarga += '<div class="alert alert-danger" id="alert-danger" style="display:none"></div>';

    //campo_user
    recarga += '<input type="text" class="inputregister" id="campo_user" name="campo_user" placeholder="Introduce tu sector...">';
    //about_user
    recarga += '<input type="text" class="inputregister" id="about_user" name="about_user" placeholder="Sobre mi...">';
    //lenguaje_preferido
    recarga += '<input type="text" class="inputregister" id="lenguaje_preferido" name="lenguaje_preferido" placeholder="Lenguaje preferido...">';
    recarga += '<input type="submit" class="botonregister" value="Guardar datos">';
    recarga += '</form>';
    recarga += '</div>';
    tabla.innerHTML = recarga;

    document.getElementById("loginclick").addEventListener("click", login);
    document.getElementById("registrarclick").addEventListener("click", registrar);
    document.getElementById("izquierda").addEventListener("click", formtrabajador1);
    document.getElementById("derecha").addEventListener("click", formtrabajador3);
    document.getElementById("formtrabajador2").addEventListener("submit", sessiontrabajador2);

}

function sessiontrabajador2(evt) {

    evt.preventDefault();

    //al momento de validar hay que tener en cuenta los espacios en blanco

    let campo_user = htmlEncode(document.getElementById('campo_user').value);
    let about_user = htmlEncode(document.getElementById('about_user').value);
    let lenguaje_preferido = htmlEncode(document.getElementById('lenguaje_preferido').value);

    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');
    if (campo_user) {
        formData.append('campo_user', campo_user);
    }
    if (about_user) {
        formData.append('about_user', about_user);
    }
    if (lenguaje_preferido) {
        formData.append('lenguaje_preferido', lenguaje_preferido);
    }
    if (/^\s+$/.test(campo_user) || /^\s+$/.test(about_user) || /^\s+$/.test(lenguaje_preferido)) {

        swal.fire({
            title: "Error",
            text: "No puedes poner espacios en blanco",
            icon: "error",

        });
        return false;
    }


    var ajax = objetoAjax();

    ajax.open("POST", "sesionestrabajador", true);

    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);

            if (respuesta.resultado == "OK") {

                swal.fire({
                    title: "Registro",
                    text: "Datos guardados",
                    icon: "question",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Registrarte",
                    denyButtonText: "Introducir mas datos",
                    cancelButtonText: "Cancelar",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        creartrabajadorJS();
                    } else if (result.isDenied) {
                        formtrabajador3();
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

    ajax.send(formData)

}

//loc_traba-disponibilidad-foto_perfil
function formtrabajador3() {

    var tabla = document.getElementById("main");
    var recarga = '';

    //Botones login/registro
    recarga += '<div class="botones">';
    recarga += '<button class="btn-signin registrar-activo" id="loginclick">Sign In</button>'
    recarga += '<button class="btn-register" id="registrarclick">Register</button>'
    recarga += '</div>';
    recarga += '<div class="modal-content-register">';
    //Flechas registro
    recarga += '<div class="izquierda-derecha">';
    recarga += '<button class="izquierda" id="izquierda"><i class="fa-solid fa-left-long"></i></button>';
    recarga += '<button class="derecha" id="derecha"><i class="fa-solid fa-right-long"></i></button>';
    recarga += '</div>';
    recarga += '<h3>Introduce más datos sobre ti</h3>';
    recarga += '<form method="POST" id="formtrabajador3" enctype="multipart/form-data">';
    recarga += '<div class="alert alert-danger" id="alert-danger" style="display:none"></div>';

    //loc_trabajador
    recarga += '<label for="loc_trabajador">Localización</label>';
    recarga += '<input type="text" class="inputregister" id="loc_trabajador" name="loc_trabajador" placeholder="Introduce tu localizacion...">';
    //disponibilidad
    recarga += '<label for="disponibilidad">Disponibilidad</label>';
    recarga += '<select class="inputregister" name="disponibilidad" id="disponibilidad">';
    recarga += '<option value="" selected>- Selecciona -</option>';
    recarga += '<option value="jornada completa">Jornada completa (8 horas)</option>';
    recarga += '<option value="jornada parcial">Jornada parcial (4 horas)</option>';
    recarga += '<option value="turno mañana">Turno de mañana</option>';
    recarga += '<option value="turno noche">Turno de noche</option>';
    recarga += '<option value="turno partida">turno partido</option>';
    recarga += '<option value="fines de semana">Fines de semana</option>';
    recarga += '</select>';
    //Foto
    recarga += '<label for="foto_perfil">Imagen de Perfil</label>';
    recarga += '<input type="file" class="foto" name="foto_perfil" id="foto_perfil">';
    recarga += '<input type="submit" class="botonregister" value="Guardar datos">';
    recarga += '</form>';
    recarga += '</div>';
    recarga += '</div>';
    tabla.innerHTML = recarga;

    document.getElementById("loginclick").addEventListener("click", login);
    document.getElementById("registrarclick").addEventListener("click", registrar);
    document.getElementById("izquierda").addEventListener("click", formtrabajador2);
    document.getElementById("derecha").addEventListener("click", formtrabajador4);
    document.getElementById("formtrabajador3").addEventListener("submit", sessiontrabajador3);

}

function sessiontrabajador3(evt) {

    evt.preventDefault();

    //al momento de validar hay que tener en cuenta los espacios en blanco
    let loc_trabajador = htmlEncode(document.getElementById('loc_trabajador').value);
    let disponibilidad = document.getElementById('disponibilidad').value;
    let foto_perfil = document.getElementById('foto_perfil').files[0];

    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');
    if (loc_trabajador) {
        formData.append('loc_trabajador', loc_trabajador);
    }
    if (disponibilidad) {
        formData.append('disponibilidad', disponibilidad);
    }
    if (foto_perfil) {
        formData.append('foto_perfil', foto_perfil);
    }
    if (/^\s+$/.test(loc_trabajador)) {

        swal.fire({
            title: "Error",
            text: "No puedes poner espacios en blanco",
            icon: "error",

        });
        return false;
    }


    var ajax = objetoAjax();

    ajax.open("POST", "sesionestrabajador", true);

    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);

            if (respuesta.resultado == "OK") {

                swal.fire({
                    title: "Registro",
                    text: "Datos guardados",
                    icon: "question",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Registrarte",
                    denyButtonText: "Introducir mas datos",
                    cancelButtonText: "Cancelar",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        creartrabajadorJS();
                    } else if (result.isDenied) {
                        formtrabajador4();
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

    ajax.send(formData)

}

//idiomas
function formtrabajador4() {

    var tabla = document.getElementById("main");
    var recarga = '';

    //Botones login/registro
    recarga += '<div class="botones">';
    recarga += '<button class="btn-signin registrar-activo" id="loginclick">Sign In</button>'
    recarga += '<button class="btn-register" id="registrarclick">Register</button>'
    recarga += '</div>';
    recarga += '<div class="modal-content-register"><div class="scrollbar">';
    //Flechas registro
    recarga += '<div class="izquierda-derecha">';
    recarga += '<button class="izquierda" id="izquierda"><i class="fa-solid fa-left-long"></i></button>';
    recarga += '<button class="derecha" id="derecha"><i class="fa-solid fa-right-long"></i></button>';
    recarga += '</div>';
    recarga += '<h3>¿Qué idiomas hablas?</h3>';
    recarga += '<form method="POST" id="formtrabajador4" enctype="multipart/form-data">';
    /* Estructura linea */
    recarga += '<div class="alert alert-danger" id="alert-danger" style="display:none"></div>';

    recarga += '<div id="lineaidioma-0" class="linea-registro">';
    //nombre_idioma
    recarga += '<div class="mas-menos">'
    recarga += '<button class="mas" type="button" id="mas"><i class="fa-solid fa-plus"></i></button>';
    recarga += '</div>'
    recarga += `
                <div class="fila-linea-idioma">
                    <div class="column-2">
                        <p>Idioma</p>
                        <select class="inputregister inputcolumn2" name="nombre_idioma[]" id="nombre_idioma" data-show-subtext="false" data-live-search="true">
                            <option selected>- Selecciona -</option>

    `
    for (let i = 0; i < JSONidiomas.length; i++) {
        recarga += '<option value="' + JSONidiomas[i].nombre_idioma + '">' + JSONidiomas[i].nombre_idioma + '</option>';
    }
    recarga += `
                        </select>
    `
    recarga += '</div>';
    //nivel_idioma
    recarga += '<div class="column-2">';
    recarga += '<p>Nivel</p>';
    recarga += '<select class="inputcolumn2 inputregister" name="nivel_idioma[]" id="nivel_idioma">';
    recarga += '<option value="" selected>- Selecciona -</option>';
    recarga += '<option value="bajo">Bajo</option>';
    recarga += '<option value="medio">Medio</option>';
    recarga += '<option value="alto">Alto</option>';
    recarga += '<option value="nativo">Nativo</option>';
    recarga += '</select>';
    recarga += '</div></div>';
    recarga += '<div>';
    recarga += '</div>';
    // recarga += '<button class="mas" type="button" id="mas"><i class="fa-solid fa-plus"></i></button>';
    recarga += '</div>';
    /* Estructura linea */
    recarga += '<input type="submit" class="botonregister" value="Registrarse">';
    recarga += '</form>';
    recarga += '</div>';
    recarga += '</div>';
    tabla.innerHTML = recarga;

    document.getElementById("loginclick").addEventListener("click", login);
    document.getElementById("registrarclick").addEventListener("click", registrar);
    document.getElementById("izquierda").addEventListener("click", formtrabajador3);
    document.getElementById("derecha").addEventListener("click", formtrabajador5);
    document.getElementById("mas").addEventListener("click", insertaridioma);
    document.getElementById("mas").addEventListener("click", function() {
        k_idiomas++;
    });
    document.getElementById("formtrabajador4").addEventListener("submit", sessiontrabajador4);

}

function insertaridioma() {
    var k = k_idiomas;
    var lidioma = "lineaidioma-" + (k - 1);
    var lineaidioma = document.getElementById(lidioma);
    var recarga = "";
    recarga += '<div id="lineaidioma-' + k + '">';
    //nombre_idioma
    recarga += '<div class="fila-linea-idioma"><div class="column-2">';
    recarga += '<p>Idioma</p>';
    recarga += '<select class="inputcolumn2 inputregister" name="nombre_idioma[]" id="nombre_idioma" data-show-subtext="false" data-live-search="true">';
    recarga += '<option value="" selected>- Selecciona -</option>';
    for (let i = 0; i < JSONidiomas.length; i++) {
        recarga += '<option value="' + JSONidiomas[i].nombre_idioma + '">' + JSONidiomas[i].nombre_idioma + '</option>';
    }
    recarga += '</select>';
    recarga += '</div>';
    //nivel_idioma
    recarga += '<div class="column-2">';
    recarga += '<p>Nivel</p>';
    recarga += '<select class="inputcolumn2 inputregister" name="nivel_idioma[]" id="nivel_idioma">';
    recarga += '<option value="" selected>- Selecciona -</option>';
    recarga += '<option value="bajo">Bajo</option>';
    recarga += '<option value="medio">Medio</option>';
    recarga += '<option value="alto">Alto</option>';
    recarga += '<option value="nativo">Nativo</option>';
    recarga += '</select>';
    recarga += '</div></div>';
    recarga += '<div>';
    recarga += '<button type="button" class="menos" id="menos' + k + '"><i class="fa-solid fa-minus"></i></button>';
    recarga += '</div>';
    recarga += '</div>';
    lineaidioma.insertAdjacentHTML('afterend', recarga);
    var menos = "menos" + k;
    document.getElementById(menos).k = k;
    document.getElementById(menos).addEventListener("click", eliminaridioma);
}

function eliminaridioma(evt) {
    var k = evt.currentTarget.k;
    var lineaidiomak = "lineaidioma-" + k;
    document.getElementById(lineaidiomak).innerHTML = "";

}

function sessiontrabajador4(evt) {

    evt.preventDefault();

    //al momento de validar hay que tener en cuenta los espacios en blanco

    let nombre_idioma = document.getElementsByName('nombre_idioma[]');
    let nivel_idioma = document.getElementsByName('nivel_idioma[]');



    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');
    if (nombre_idioma) {
        for (let i = 0; i < nombre_idioma.length; i++) {
            formData.append('nombre_idioma[]', nombre_idioma[i].value);
        }
    }
    if (nivel_idioma) {
        for (let i = 0; i < nivel_idioma.length; i++) {
            formData.append('nivel_idioma[]', nivel_idioma[i].value);
        }
    }
    if (!nombre_idioma || !nivel_idioma) {

        swal.fire({
            title: "Error",
            text: "Tienes que rellenar todos los datos",
            icon: "error",
        });
        return false;
    }

    var ajax = objetoAjax();

    ajax.open("POST", "sesionestrabajador", true);

    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);

            if (respuesta.resultado == "OK") {

                swal.fire({
                    title: "Registro",
                    text: "Datos guardados",
                    icon: "question",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Registrarte",
                    denyButtonText: "Introducir mas datos",
                    cancelButtonText: "Cancelar",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        creartrabajadorJS();
                    } else if (result.isDenied) {
                        formtrabajador5();
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

    ajax.send(formData)

}

//estudios
function formtrabajador5() {

    var tabla = document.getElementById("main");
    var recarga = '';

    //Botones login/registro
    recarga += '<div class="botones">';
    recarga += '<button class="btn-signin registrar-activo" id="loginclick">Sign In</button>'
    recarga += '<button class="btn-register" id="registrarclick">Register</button>'
    recarga += '</div>';
    recarga += '<div class="modal-content-register"><div class="">';
    //Flechas registro
    recarga += '<div class="izquierda-derecha">';
    recarga += '<button class="izquierda" id="izquierda"><i class="fa-solid fa-left-long"></i></button>';
    recarga += '<button class="derecha" id="derecha"><i class="fa-solid fa-right-long"></i></button>';
    recarga += '</div>';
    recarga += '<h3>¿Dónde has estudiado?</h3>';
    recarga += '<form method="POST" id="formtrabajador5" enctype="multipart/form-data">';
    recarga += '<div class="alert alert-danger" id="alert-danger" style="display:none"></div>';

    /* Estructura linea */
    recarga += '<div id="lineaestudio-0" class="linea-registro">';
    recarga += '<div class="fila-linea-expfor">';


    //nombre_formación
    recarga += '<div class="column-2">';
    recarga += '<p>Nombre de formación</p>';
    recarga += '<input type="text" class="inputregister inputcolumn2" id="nombre_formación" name="nombre_formación[]" placeholder="Introduce tu titulo">';
    recarga += '</div>';
    //lugar_formación
    recarga += '<div class="column-2">';
    recarga += '<p>Lugar de formación</p>';
    recarga += '<input type="text" class="inputregister inputcolumn2" id="lugar_formación" name="lugar_formación[]" placeholder="Introduce el centro de estudios">';
    recarga += '</div>';
    //año_entrada
    recarga += '<div class="column-2">';
    recarga += '<p>Año de entrada</p>';
    recarga += '<input type="date" class="inputregister inputcolumn2" id="año_entrada" name="año_entrada[]">';
    recarga += '</div>';
    //año_salida
    recarga += '<div class="column-2">';
    recarga += '<p>Año de salida</p>';
    recarga += '<input type="date" class="inputregister inputcolumn2" id="año_salida" name="año_salida[]">';
    recarga += '</div></div>';
    recarga += '<div>';
    recarga += '<button type="button" class="mas" id="mas"><i class="fa-solid fa-plus"></i></button>';
    recarga += '</div>';
    recarga += '</div>';
    /* Estructura linea */
    recarga += '<input type="submit" class="botonregister" value="Registrarse">';
    recarga += '</form>';
    recarga += '</div>';
    recarga += '</div>';
    tabla.innerHTML = recarga;

    document.getElementById("loginclick").addEventListener("click", login);
    document.getElementById("registrarclick").addEventListener("click", registrar);
    document.getElementById("izquierda").addEventListener("click", formtrabajador4);
    document.getElementById("derecha").addEventListener("click", formtrabajador6);
    document.getElementById("mas").addEventListener("click", insertarestudio);
    document.getElementById("mas").addEventListener("click", function() {
        k_estudios++;
    });
    document.getElementById("formtrabajador5").addEventListener("submit", sessiontrabajador5);

}

function insertarestudio() {
    var k = k_estudios;
    var lestudio = "lineaestudio-" + (k - 1);
    var lineaestudio = document.getElementById(lestudio);
    var recarga = "";
    recarga += '<div id="lineaestudio-' + k + '" class="linea-registro">';
    recarga += '<div class="fila-linea-expfor">';
    //nombre_formación
    recarga += '<div class="column-2">';
    recarga += '<p>Nombre de formación</p>';
    recarga += '<input type="text" class="inputregister" id="nombre_formación" name="nombre_formación[]" placeholder="Introduce tu titulo">';
    recarga += '</div>';
    //lugar_formación
    recarga += '<div class="column-2">';
    recarga += '<p>Lugar de formación</p>';
    recarga += '<input type="text" class="inputregister" id="lugar_formación" name="lugar_formación[]" placeholder="Introduce el centro de estudios">';
    recarga += '</div>';
    //año_entrada
    recarga += '<div class="column-2">';
    recarga += '<p>Año de entrada</p>';
    recarga += '<input type="date" class="inputregister" id="año_entrada" name="año_entrada[]">';
    recarga += '</div>';
    //año_salida
    recarga += '<div class="column-2">';
    recarga += '<p>Año de salida</p>';
    recarga += '<input type="date" class="inputregister" id="año_salida" name="año_salida[]">';
    recarga += '</div></div>';
    recarga += '<div>';
    recarga += '<button type="button" class="menos" id="menos' + k + '"><i class="fa-solid fa-minus"></i></button>';
    recarga += '</div>';
    recarga += '</div>';
    lineaestudio.insertAdjacentHTML('afterend', recarga);
    var menos = "menos" + k;
    document.getElementById(menos).k = k;
    document.getElementById(menos).addEventListener("click", eliminarestudio);
}

function eliminarestudio(evt) {
    var k = evt.currentTarget.k;
    var lineaestudiok = "lineaestudio-" + k;
    document.getElementById(lineaestudiok).innerHTML = "";

}

function sessiontrabajador5(evt) {

    evt.preventDefault();

    //al momento de validar hay que tener en cuenta los espacios en blanco

    let nombre_formación = htmlEncode(document.getElementsByName('nombre_formación[]'));
    let lugar_formación = htmlEncode(document.getElementsByName('lugar_formación[]'));
    let año_entrada = document.getElementsByName('año_entrada[]');
    let año_salida = document.getElementsByName('año_salida[]');


    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');
    if (nombre_formación) {
        for (let i = 0; i < nombre_formación.length; i++) {
            formData.append('nombre_formación[]', nombre_formación[i].value);
        }
    }
    if (lugar_formación) {
        for (let i = 0; i < lugar_formación.length; i++) {
            formData.append('lugar_formación[]', lugar_formación[i].value);
        }
    }
    if (año_entrada) {
        for (let i = 0; i < año_entrada.length; i++) {
            formData.append('año_entradafor[]', año_entrada[i].value);
        }
    }
    if (año_salida) {
        for (let i = 0; i < año_salida.length; i++) {
            formData.append('año_salidafor[]', año_salida[i].value);
        }
    }
    if (/^\s+$/.test(nombre_formación) || /^\s+$/.test(lugar_formación)) {

        swal.fire({
            title: "Error",
            text: "No puedes poner espacios en blanco",
            icon: "error",

        });
        return false;
    }



    var ajax = objetoAjax();

    ajax.open("POST", "sesionestrabajador", true);

    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);


            if (respuesta.resultado == "OK") {

                swal.fire({
                    title: "Registro",
                    text: "Datos guardados",
                    icon: "question",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Registrarte",
                    denyButtonText: "Introducir mas datos",
                    cancelButtonText: "Cancelar",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        creartrabajadorJS();
                    } else if (result.isDenied) {
                        formtrabajador6();
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

    ajax.send(formData)

}

//experiencias
function formtrabajador6() {

    var tabla = document.getElementById("main");
    var recarga = '';

    //Botones login/registro
    recarga += '<div class="botones">';
    recarga += '<button class="btn-signin registrar-activo" id="loginclick">Sign In</button>'
    recarga += '<button class="btn-register" id="registrarclick">Register</button>'
    recarga += '</div>';
    //Flechas registro
    recarga += '<div class="modal-content-register"><div class="">';
    recarga += '<div class="izquierda-derecha">';
    recarga += '<button class="izquierda" id="izquierda"><i class="fa-solid fa-left-long"></i></button>';
    recarga += '<button class="derecha" id="derecha" style="opacity:0;pointer-events:none;"><i class="fa-solid fa-right-long"></i></button>';
    recarga += '</div>';
    recarga += '<h3>¿Dónde has trabajado?</h3>';
    recarga += '<form method="POST" id="formtrabajador6" enctype="multipart/form-data">';

    recarga += '<div class="alert alert-danger" id="alert-danger" style="display:none"></div>';

    /* Estructura linea */
    recarga += '<div id="lineaexperiencia-0" class="linea-registro">';
    recarga += '<div class="fila-linea-expfor">';

    //nombre_experiencia
    recarga += '<div class="column-2">';
    recarga += '<p>Experiencia</p>';
    recarga += '<input type="text" class="inputcolumn2 inputregister" id="nombre_experiencia" name="nombre_experiencia[]" placeholder="Nombre puesto">';
    recarga += '</div>';
    //lugar_experiencia
    recarga += '<div class="column-2">';
    recarga += '<p>Lugar</p>';
    recarga += '<input type="text" class="inputcolumn2 inputregister" id="lugar_experiencia" name="lugar_experiencia[]" placeholder="Empresa">';
    recarga += '</div>';
    //año_entrada
    recarga += '<div class="column-2">';
    recarga += '<p>Año de entrada</p>';
    recarga += '<input type="date" class="inputcolumn2 inputregister" id="año_entrada" name="año_entrada[]">';
    recarga += '</div>';
    //año_salida
    recarga += '<div class="column-2">';
    recarga += '<p>Año de salida</p>';
    recarga += '<input type="date" class="inputcolumn2 inputregister" id="año_salida" name="año_salida[]">';
    recarga += '</div>';
    //funciones
    recarga += '<div class="column-1">';
    recarga += '<p>funciones</p>';
    recarga += '<input type="textarea" class="inputregister" id="funciones" name="funciones[]" placeholder="Funciones dentro de la empresa">';
    recarga += '</div></div>';
    recarga += '<div>';
    recarga += '<button type="button" class="mas" id="mas"><i class="fa-solid fa-plus"></i></button>';
    recarga += '</div>';
    recarga += '</div>';
    /* Estructura linea */
    recarga += '<input type="submit" class="botonregister" value="Registrarse">';
    recarga += '</form>';
    recarga += '</div>';
    recarga += '</div>';
    tabla.innerHTML = recarga;

    document.getElementById("loginclick").addEventListener("click", login);
    document.getElementById("registrarclick").addEventListener("click", registrar);
    document.getElementById("izquierda").addEventListener("click", formtrabajador5);
    document.getElementById("mas").addEventListener("click", insertarexperiencia);
    document.getElementById("mas").addEventListener("click", function() {
        k_experiencias++;
    });
    document.getElementById("formtrabajador6").addEventListener("submit", sessiontrabajador6);

}

function insertarexperiencia() {
    var k = k_experiencias;
    var lexperiencia = "lineaexperiencia-" + (k - 1);
    var lineaexperiencia = document.getElementById(lexperiencia);
    var recarga = "";
    recarga += '<div id="lineaexperiencia-' + k + '" class="linea-registro">';
    recarga += '<div class="fila-linea-expfor">';
    //nombre_experiencia
    recarga += '<div class="column-2">';
    recarga += '<p>Experiencia</p>';
    recarga += '<input type="text" class="inputregister" id="nombre_experiencia" name="nombre_experiencia[]" placeholder="Nombre puesto">';
    recarga += '</div>';
    //lugar_experiencia
    recarga += '<div class="column-2">';
    recarga += '<p>Lugar experiencia</p>';
    recarga += '<input type="text" class="inputregister" id="lugar_experiencia" name="lugar_experiencia[]" placeholder="Empresa">';
    recarga += '</div>';
    //año_entrada
    recarga += '<div class="column-2">';
    recarga += '<p>Año entrada</p>';
    recarga += '<input type="date" class="inputregister" id="año_entrada" name="año_entrada[]">';
    recarga += '</div>';
    //año_salida
    recarga += '<div class="column-2">';
    recarga += '<p>Año salida</p>';
    recarga += '<input type="date" class="inputregister" id="año_salida" name="año_salida[]">';
    recarga += '</div>';
    //funciones
    recarga += '<div class="column-1">';
    recarga += '<p>Funciones</p>';
    recarga += '<input type="textarea" class="inputregister" id="funciones" name="funciones[]" placeholder="Funciones dentro de la empresa">';
    recarga += '</div>';
    recarga += '</div>';
    recarga += '<div>';
    recarga += '<button type="button" class="menos" id="menos' + k + '"><i class="fa-solid fa-minus"></i></button>';
    recarga += '</div>';
    recarga += '</div>';
    lineaexperiencia.insertAdjacentHTML('afterend', recarga);
    var menos = "menos" + k;
    document.getElementById(menos).k = k;
    document.getElementById(menos).addEventListener("click", eliminarexperiencia);
}

function eliminarexperiencia(evt) {
    var k = evt.currentTarget.k;
    var lineaexperienciak = "lineaexperiencia-" + k;
    document.getElementById(lineaexperienciak).innerHTML = "";

}

function sessiontrabajador6(evt) {

    evt.preventDefault();

    //al momento de validar hay que tener en cuenta los espacios en blanco

    let nombre_experiencia = htmlEncode(document.getElementsByName('nombre_experiencia[]'));
    let lugar_experiencia = htmlEncode(document.getElementsByName('lugar_experiencia[]'));
    let funciones = htmlEncode(document.getElementsByName('funciones[]'));
    let año_entrada = document.getElementsByName('año_entrada[]');
    let año_salida = document.getElementsByName('año_salida[]');
    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');
    if (nombre_experiencia) {
        for (let i = 0; i < nombre_experiencia.length; i++) {
            formData.append('nombre_experiencia[]', nombre_experiencia[i].value);
        }
    }
    if (lugar_experiencia) {
        for (let i = 0; i < lugar_experiencia.length; i++) {
            formData.append('lugar_experiencia[]', lugar_experiencia[i].value);
        }
    }
    if (funciones) {
        for (let i = 0; i < funciones.length; i++) {
            formData.append('funciones[]', funciones[i].value);
        }
    }
    if (año_entrada) {
        for (let i = 0; i < año_entrada.length; i++) {
            formData.append('año_entradaexp[]', año_entrada[i].value);
        }
    }
    if (año_salida) {
        for (let i = 0; i < año_salida.length; i++) {
            formData.append('año_salidaexp[]', año_salida[i].value);
        }
    }
    if (/^\s+$/.test(nombre_experiencia) || /^\s+$/.test(lugar_experiencia) || /^\s+$/.test(funciones)) {

        swal.fire({
            title: "Error",
            text: "No puedes poner espacios en blanco",
            icon: "error",

        });
        return false;
    }

    var ajax = objetoAjax();

    ajax.open("POST", "sesionestrabajador", true);

    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);


            if (respuesta.resultado == "OK") {

                swal.fire({
                    title: "Registro",
                    text: "Datos guardados",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "Registrarte",
                    cancelButtonText: "Cancelar",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        creartrabajadorJS();
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

    ajax.send(formData)

}


function creartrabajadorJS() {

    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');


    var ajax = objetoAjax();

    ajax.open("POST", "registrotrabajador", true);

    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);


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
                setTimeout(() => { window.location.href = './inicio'; }, 2000);

            } else {

                console.log(respuesta)
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


function formempresa0() {

    var tabla = document.getElementById("main");
    var recarga = '';

    recarga += '<div class="botones">';
    recarga += '<button class="btn-signin registrar-activo" id="loginclick">Sign In</button>'
    recarga += '<button class="btn-register" id="registrarclick">Register</button>'
    recarga += '</div>';
    recarga += '<div class="modal-content-register"><div class="scrollbar"><h3>¡Regístrate en JobJob!</h3>';
    recarga += '<form method="POST" id="formempresa0" enctype="multipart/form-data">';
    recarga += '<div class="alert alert-danger" id="alert-danger" style="display:none"></div>';
    //Correo
    recarga += '<div class="column-2">';
    recarga += '<p>Email</p>';
    recarga += '<input type="text" class="inputcolumn2 inputregister" id="mail" name="mail" placeholder="Introduce el email...">';
    recarga += '</div>';
    //Nombre
    recarga += '<div class="column-2">';
    recarga += '<p>Nombre</p>';
    recarga += '<input type="text" class="inputcolumn2 inputregister" id="nom_emp" name="nom_emp" placeholder="Introduce el nombre...">';
    recarga += '</div>';
    //Contra 1
    recarga += '<div class="column-2">';
    recarga += '<p>Contraseña</p>';
    recarga += '<input type="password" class="inputcolumn2 inputregister" id="contra" name="contra" placeholder="Introduce la contraseña...">';
    recarga += '</div>';
    //Contra 2
    recarga += '<div class="column-2">';
    recarga += '<p>Contraseña 2</p>';
    recarga += '<input type="password" class="inputcolumn2 inputregister" id="contra2" name="contra2" placeholder="Introduce la contraseña...">';
    recarga += '</div>';
    recarga += '<input type="submit" class="botonregister" value="Continuar">';
    recarga += '</form>';
    recarga += '</div>';
    recarga += '</div>';
    tabla.innerHTML = recarga;

    document.getElementById("loginclick").addEventListener("click", login);
    document.getElementById("registrarclick").addEventListener("click", registrar);
    document.getElementById("formempresa0").addEventListener("submit", sessionempresa0);

}

function sessionempresa0(evt) {
    evt.preventDefault();

    let mail = document.getElementById('mail').value;
    let nom_emp = htmlEncode(document.getElementById('nom_emp').value);
    let contra = htmlEncode(document.getElementById('contra').value);
    let contra2 = htmlEncode(document.getElementById('contra2').value);

    if (!mail || !nom_emp || !contra || !contra2) {

        swal.fire({
            title: "Error",
            text: "Tienes que rellenar todos los datos",
            icon: "error",
        });
        return false;

    } else if (/^ *$/.test(mail) || /^ *$/.test(nom_emp) || /^ *$/.test(contra) || /^ *$/.test(contra2)) {
        swal.fire({
            title: "Error",
            text: "No puedes poner solo campos en blanco",
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

    } else if (nom_emp.length < 2 || nom_emp.length > 100) {

        swal.fire({
            title: "Error",
            text: "Introduce un nombre correcto",
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
            text: "La contraseña debe tener mínimo 8 carácteres",
            icon: "error",
        });
        return false;


    } else if (contra !== contra2) {

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
    formData.append('nom_emp', nom_emp);
    formData.append('contra', contra);
    formData.append('contra2', contra2);


    var ajax = objetoAjax();

    ajax.open("POST", "sesionesempresa", true);

    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);

            if (respuesta.resultado == "OK") {

                swal.fire({
                    title: "Registro",
                    text: "Datos guardados",
                    icon: "question",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Registrarte",
                    denyButtonText: "Introducir mas datos",
                    cancelButtonText: "Cancelar",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        crearempresaJS();
                    } else if (result.isDenied) {
                        formempresa1();
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

    ajax.send(formData)
}

function formempresa1() {

    var tabla = document.getElementById("main");
    var recarga = '';

    recarga += '<div class="botones">';
    recarga += '<button class="btn-signin registrar-activo" id="loginclick">Sign In</button>'
    recarga += '<button class="btn-register" id="registrarclick">Register</button>'
    recarga += '</div>';
    //Flechas registro
    recarga += '<div class="modal-content-register"><div class="scrollbar">';
    recarga += '<div class="izquierda-derecha">';
    recarga += '<button class="izquierda" id="izquierda"><i class="fa-solid fa-left-long"></i></button>';
    recarga += '<button class="derecha" id="derecha"><i class="fa-solid fa-right-long"></i></button>';
    recarga += '</div>';
    recarga += '<h3>¡Regístrate en JobJob!</h3>';
    recarga += '<form method="POST" id="formempresa1" enctype="multipart/form-data">';
    recarga += '<div class="alert alert-danger" id="alert-danger" style="display:none"></div>';
    //about_emp
    recarga += '<div class="column-2">';
    recarga += '<p>Sobre la empresa</p>';
    recarga += '<input type="text" class="inputcolumn2 inputregister" id="about_emp" name="about_emp" placeholder="Sobre mi empresa...">';
    recarga += '</div>';
    //campo_emp
    recarga += '<div class="column-2">';
    recarga += '<p>Sector</p>';
    recarga += '<input type="text" class="inputcolumn2 inputregister" id="campo_emp" name="campo_emp" placeholder="Introduce tu sector...">';
    recarga += '</div>';
    //searching
    recarga += '<div class="column-2">';
    recarga += '<p>¿Qué buscas para tu empresa?</p>';
    recarga += '<input type="text" class="inputcolumn2 inputregister" id="searching" name="searching" placeholder="Qué buscas para tu empresa?">';
    recarga += '</div>';
    recarga += '<input type="submit" class="botonregister" value="Registrarme">';
    recarga += '</form>';
    recarga += '</div>';
    recarga += '</div>';
    tabla.innerHTML = recarga;

    document.getElementById("loginclick").addEventListener("click", login);
    document.getElementById("registrarclick").addEventListener("click", registrar);
    document.getElementById("izquierda").addEventListener("click", formempresa0);
    document.getElementById("derecha").addEventListener("click", formempresa2);
    document.getElementById("formempresa1").addEventListener("submit", sessionempresa1);

}

function sessionempresa1(evt) {
    evt.preventDefault();

    let about_emp = htmlEncode(document.getElementById('about_emp').value);
    let campo_emp = htmlEncode(document.getElementById('campo_emp').value);
    let searching = htmlEncode(document.getElementById('searching').value);

    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');
    formData.append('about_emp', about_emp);
    formData.append('campo_emp', campo_emp);
    formData.append('searching', searching);

    if (/^\s+$/.test(about_emp) || /^\s+$/.test(campo_emp) || /^\s+$/.test(searching)) {

        swal.fire({
            title: "Error",
            text: "No puedes poner espacios en blanco",
            icon: "error",

        });
        return false;
    }

    var ajax = objetoAjax();

    ajax.open("POST", "sesionesempresa", true);

    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);

            if (respuesta.resultado == "OK") {

                swal.fire({
                    title: "Registro",
                    text: "Datos guardados",
                    icon: "question",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Registrarte",
                    denyButtonText: "Introducir mas datos",
                    cancelButtonText: "Cancelar",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        crearempresaJS();
                    } else if (result.isDenied) {
                        formempresa2();
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

    ajax.send(formData)
}

function formempresa2() {

    var tabla = document.getElementById("main");
    var recarga = '';

    recarga += '<div class="botones">';
    recarga += '<button class="btn-signin registrar-activo" id="loginclick">Sign In</button>'
    recarga += '<button class="btn-register" id="registrarclick">Register</button>'
    recarga += '</div>';
    //Flechas registro
    recarga += '<div class="modal-content-register"><div class="scrollbar">';
    recarga += '<div class="izquierda-derecha">';
    recarga += '<button class="izquierda" id="izquierda"><i class="fa-solid fa-left-long"></i></button>';
    recarga += '</div>';
    recarga += '<h3>¡Regístrate en JobJob!</h3>';
    recarga += '<form method="POST" id="formempresa2" enctype="multipart/form-data">';
    recarga += '<div class="alert alert-danger" id="alert-danger" style="display:none"></div>';
    //loc_emp
    recarga += '<div class="column-2">';
    recarga += '<p>Dirección empresa</p>';
    recarga += '<input type="text" class="inputcolumn2 inputregister" id="loc_emp" name="loc_emp" placeholder="Introduce la localización...">';
    recarga += '</div>';
    //vacante
    recarga += '<div class="column-2">';
    recarga += '<p>Vacante</p>';
    recarga += '<input type="text" class="inputcolumn2 inputregister" id="vacante" name="vacante" placeholder="Qué buscamos...">';
    recarga += '</div>';
    //logo_emp
    recarga += '<div class="column-1">';
    recarga += '<p>Logo empresa</p>';
    recarga += '<input type="file" class="foto" name="logo_emp" id="logo_emp">';
    recarga += '</div>';
    recarga += '<input type="submit" class="botonregister" value="Guardar datos">';
    recarga += '</form>';
    recarga += '</div>';
    tabla.innerHTML = recarga;

    document.getElementById("loginclick").addEventListener("click", login);
    document.getElementById("registrarclick").addEventListener("click", registrar);
    document.getElementById("izquierda").addEventListener("click", formempresa1);
    document.getElementById("formempresa2").addEventListener("submit", sessionempresa2);

}

function sessionempresa2(evt) {
    evt.preventDefault();

    let logo_emp = document.getElementById('logo_emp').files[0];
    let loc_emp = htmlEncode(document.getElementById('loc_emp').value);
    let vacante = htmlEncode(document.getElementById('vacante').value);

    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');
    formData.append('logo_emp', logo_emp);
    formData.append('loc_emp', loc_emp);
    formData.append('vacante', vacante);

    if (/^\s+$/.test(loc_emp) || /^\s+$/.test(vacante)) {

        swal.fire({
            title: "Error",
            text: "No puedes poner espacios en blanco",
            icon: "error",

        });
        return false;
    }


    var ajax = objetoAjax();

    ajax.open("POST", "sesionesempresa", true);

    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);

            if (respuesta.resultado == "OK") {

                swal.fire({
                    title: "Registro",
                    text: "Datos guardados",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "Registrarte",
                    cancelButtonText: "Cancelar",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        crearempresaJS();
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

    ajax.send(formData)
}

function crearempresaJS() {

    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');

    var ajax = objetoAjax();

    ajax.open("POST", "registroempresa", true);

    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);

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
                setTimeout(() => { window.location.href = './inicio'; }, 2000);

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