////////////////////////////GENERAL///////////////////////////////////////
window.onload = function() {
        estructura();
        reload();
        mostrar();
        get_session();
    }
    ////////////////////////////REDIRECCIONES/////////////////////////////////
var navbarProfile = document.getElementById("navbar-profile-icon");
var navbarMain = document.getElementById("navbar-main-icon");
var navbarAlerts = document.getElementById("navbar-alerts-icon");
var navbarCHAT = document.getElementById("navbar-chat-icon");
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
navbarCHAT.onclick = function() {
    window.location.href = "./chat";
}
navbarPT.onclick = function() {
    window.location.href = "./pruebatecnica";
}

function estructura() {
    var carta = document.getElementById("carta");
    var recarga = "";

    //EMPIEZA TINDER
    recarga += '<div class="swiper">';
    recarga += '<div class="swiper--status">';
    recarga += '<i class="fa fa-remove"></i>';
    recarga += '<i class="fa fa-briefcase"></i>';
    recarga += '</div>';
    recarga += '<div class="swiper--cards">';
    recarga += '<div class="swiper--card" id="mainCard">';
    recarga += '</div>';
    recarga += '<div class="swiper--card no-swipe">';
    recarga += '<img src="storage/img/jobjob_tarjeta.png">';
    recarga += '</div>';
    recarga += '<div class="swiper--card no-swipe">';
    recarga += '<img src="storage/img/jobjob_tarjeta.png">';
    recarga += '</div>';
    recarga += '<div class="swiper--card no-swipe">';
    recarga += '<img src="storage/img/jobjob_tarjeta.png">';
    recarga += '</div>';
    recarga += '<div class="swiper--card no-swipe">';
    recarga += '<img src="storage/img/jobjob_tarjeta.png">';
    recarga += '</div>';
    recarga += '</div>';
    recarga += '</div>';
    //ACABA TINDER
    recarga += '<div class="botones-home row swiper--buttons">';
    recarga += '<div class="boton-cruz">';
    recarga += '<button class="icono-cruz" id="nope"><i class="fa-solid fa-remove"></i></button>';
    recarga += '</div>';
    recarga += '<div class="boton-info">';
    recarga += '<button class="icono-info" id="info"><i class="fa-solid fa-info"></i></button>';
    recarga += '</div>';
    recarga += '<div class="boton-maletin">';
    recarga += '<button class="icono-maletin" id="love"><i class="fa-solid fa-briefcase"></i></button>';
    recarga += '</div>';
    recarga += '</div>';
    carta.innerHTML = recarga;
}

////////////////////////////////////////////////////////////////////////


function reload() {
    'use strict';

    var swiperContainer = document.querySelector('.swiper');
    var allCards = document.querySelectorAll('.swiper--card:not(.no-swipe)');
    var swiperCards = document.querySelector('.swiper--cards');
    var nope = document.getElementById('nope');
    var love = document.getElementById('love');

    function initCards(card, index) {
        var newCards = document.querySelectorAll('.swiper--card:not(.removed)');

        newCards.forEach(function(card, index) {

            card.style.zIndex = allCards.length - index;
            card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 25 * index + 'px)';
            card.style.opacity = (10 - index) / 10;
        });

        swiperContainer.classList.add('loaded');
    }

    initCards();

    // function restartCards(card, index) {
    //     var cards = document.querySelectorAll('.swiper--card');

    //     cards.forEach(function(card, index) {
    //         card.classList.remove('removed');
    //     });
    // }
    //console.log(document.getElementById('userID').value)
    allCards.forEach(function(el) {
        var hammertime = new Hammer(el);

        hammertime.on('pan', function(event) {
            el.classList.add('moving');
        });

        hammertime.on('pan', function(event) {
            if (event.deltaX === 0) return;
            if (event.center.x === 0 && event.center.y === 0) return;

            swiperContainer.classList.toggle('swiper_love', event.deltaX > 0);
            swiperContainer.classList.toggle('swiper_nope', event.deltaX < 0);

            var xMulti = event.deltaX * 0.03;
            var yMulti = event.deltaY / 80;
            var rotate = xMulti * yMulti;

            event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
        });

        hammertime.on('panend', function(event) {
            el.classList.remove('moving');
            if (swiperContainer.classList.contains('swiper_love')) {
                var lastState = 'swiper_love';
            } else {
                var lastState = 'swiper_nope';
            }
            swiperContainer.classList.remove('swiper_love');
            swiperContainer.classList.remove('swiper_nope');

            var moveOutWidth = document.body.clientWidth;
            var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

            event.target.classList.toggle('removed', !keep);

            if (keep) {
                event.target.style.transform = '';
            } else {
                var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
                var toX = event.deltaX > 0 ? endX : -endX;
                var endY = Math.abs(event.velocityY) * moveOutWidth;
                var toY = event.deltaY > 0 ? endY : -endY;
                var xMulti = event.deltaX * 0.03;
                var yMulti = event.deltaY / 80;
                var rotate = xMulti * yMulti;

                event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
                if (lastState == 'swiper_love') {
                    yes()
                } else {
                    cumNO()
                }
                initCards();

                //console.log("sdgs" + userID)
                // restartCards();
                setTimeout(function() {
                    //var carta = mostrar()
                    //console.log(carta)
                    // alert('primero entra estructura')
                    swiperCards.innerHTML = `
            <div class="swiper--card mainCard" id="mainCard">
            </div>
            <div class="swiper--card no-swipe">
                <img src="storage/img/jobjob_tarjeta.png">
            </div>
            <div class="swiper--card no-swipe">
                <img src="storage/uploads/jobjob_tarjeta.png">
            </div>
            <div class="swiper--card no-swipe">
                <img src="storage/uploads/jobjob_tarjeta.png">
            </div>
            <div class="swiper--card no-swipe">
                <img src="storage/uploads/jobjob_tarjeta.png">
            </div>
            `;
                    mostrar()
                    reload()
                }, 500);

            }
        });
    });

    function createButtonListener(love) {
        return function(event) {
            var cards = document.querySelectorAll('.swiper--card');
            var moveOutWidth = document.body.clientWidth * 1.5;

            if (!cards.length) return false;

            var card = cards[0];

            card.classList.add('removed');

            if (love) {
                card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
                yes();
            } else {
                card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
                cumNO();
            }

            initCards();
            setTimeout(function() {
                swiperCards.innerHTML = `
        <div class="swiper--card mainCard" id="mainCard">
        </div>
        <div class="swiper--card no-swipe">
        </div>
        <div class="swiper--card no-swipe">
        </div>
        <div class="swiper--card no-swipe">
        </div>
        <div class="swiper--card no-swipe">
        </div>
            `;
                mostrar()
                reload()
            }, 500);

            event.preventDefault();
        };
    }

    var nopeListener = createButtonListener(false);
    var loveListener = createButtonListener(true);

    nope.addEventListener('click', nopeListener);
    love.addEventListener('click', loveListener);
}



//////////////////////////////////////////

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

function mostrar() {
    var contenedor = document.getElementById("mainCard");
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    var ajax = objetoAjax();
    ajax.open("POST", "mostrar", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            console.log(respuesta)
            var recarga = '';
            if (respuesta.length > 0) {
                if (respuesta[0].id_perfil == 3) {
                    // alert('primero entra empresa')
                    recarga += `
            <input type="hidden" id="userID" value="${respuesta[0].id_usuario}">
            `;
                    if (respuesta[0].logo_emp != null) {
                        recarga += `
                    <img src="./storage/${respuesta[0].logo_emp}">`;
                    } else {
                        recarga += `
                    <img src="./storage/uploads/jobjob_logo_black.png">`;
                    }
                    recarga += `
            <div class="content--card content--empresa">
              <div class="misc--card">
                <h2 class="vacante--empresa">${respuesta[0].vacante}</h2>
                <h5 class="campo--empresa">${respuesta[0].campo_emp}</h5>
              </div>
              <div class="cuerpo--card">
                <p class="searching--empresa">${respuesta[0].searching}</p>
              </div>
              <div class="titulo--card">
                <h3 class="nombre--usuario">${respuesta[0].nom_emp}</h3>
                <h5 class="ubicacion--usuario">${respuesta[0].loc_emp}</h5>
              </div>
            </div>
            `
                } else if (respuesta[0].id_perfil == 2) {
                    // alert('primero entra trabajador')
                    //console.log(JSON.parse(respuesta[0].curriculum));
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
                    var edad = getAge(respuesta[0].edad);
                    curriculum = JSON.parse(respuesta[0].curriculum);
                    recarga += `
            <input type="hidden" id="userID" value="${respuesta[0].id_usuario}">
            <div class="content--card content--trabajador">
                <div class="img--card">
                `;
                    if (respuesta[0].foto_perfil != null) {
                        recarga += `
                    <img class="img--trabajador" src="./storage/${respuesta[0].foto_perfil}">`;
                    } else {
                        recarga += `
                    <img class="img--trabajador" src="./storage/uploads/jobjob_logo_black.png">`;
                    }
                    recarga += `
                </div>
                <div class="cv--card">
                    <div class="objetivo--card">
                        <h2 class="titulo--objetivo">Objetivo Profesional</h2>
                        <p class="content--objetivo">${respuesta[0].about_user}</p>
                    </div>
                    <div class="formacion--card">
                        <h2 class="titulo--formacion">Formación</h2>
                        <p class="content--formacion">${curriculum['estudios'][0].nombre_formación}</p>
                        <h5 class="lugar--formacion">${curriculum['estudios'][0].lugar_formación}</h5>
                    </div>
                    <div class="experiencia--card">
                        <h2 class="titulo--experiencia">Experiencia</h2>
                        <p class="content--experiencia">${curriculum['experiencia'][0].nombre_experiencia}</p>
                        <h5 class="lugar--experiencia">${curriculum['experiencia'][0].lugar_experiencia}</h5>
                    </div>
                </div>
                <div class="titulo--card">
                    <h2 class="nombreEdad--usuario">${respuesta[0].nombre} ${respuesta[0].apellido}, ${edad}</h2>
                    <h5 class="ubicacion--usuario">${respuesta[0].loc_trabajador}</h5>
                </div>
            </div>
            `
                }
            } else {
                recarga += `
        <input type="hidden" id="userID" value="false">
        <div class="content--card content--final">
            <img src='https://acegif.com/wp-content/uploads/2022/4hv9xm/crying-emoji-9.gif'></img>
            <h2>¡OH! Has agotado los usuarios, ¡Vuelve más tarde!</h2>
        </div>
        `
                contenedor.classList.add('no-swipe');
                contenedor.style.pointerEvents = "none";
            }
            var info = document.getElementById("info");
            if (!respuesta.length == 0) {
                info.id_usuario = respuesta[0].id_usuario;
                info.id_perfil = respuesta[0].id_perfil;
                info.addEventListener("click", perfilcarta);
            }
        }
        contenedor.innerHTML = recarga;
    }
    ajax.send(formData)
}

function yes() {
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    userID = document.getElementById("userID").value
    formData.append('idClient', userID);
    var ajax = objetoAjax();
    ajax.open("POST", "si", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            console.log(respuesta)
            if (respuesta == 1) {
                swal("¡MATCH! ¿Qué quieres hacer ahora?", {
                    icon: "success",
                    buttons: {
                        cancel: "Seguir swipeando",
                        catch: {
                            text: "Revisar matches",
                            value: "chat",
                        }
                    },
                })
                .then((value) => {
                    switch (value) {

                        case "chat":
                            window.location.href = "./notificaciones";
                            break;

                        default:
                    }
                });
            }

        }
    }
    ajax.send(formData)
}

function cumNO() {
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    userID = document.getElementById("userID").value
    formData.append('idClient', userID);
    var ajax = objetoAjax();
    ajax.open("POST", "no", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            console.log(respuesta)

        }
    }
    ajax.send(formData)
}

function perfilcarta(evt) {


    var carta = document.getElementById("carta");
    var id_usuario = evt.currentTarget.id_usuario;
    var id_perfil = evt.currentTarget.id_perfil;
    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));

    var ajax = objetoAjax();

    ajax.open("POST", "leerperfiluser/" + id_usuario + "/" + id_perfil, true);

    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);
            console.log(respuesta);
            // var idreportado = respuesta.empresa[0].id
            // console.log(idreportado);
            var id_perfil = respuesta.id_perfil;
            var recarga = '';

            if (id_perfil == 2) {
                var idtrabajador = respuesta.trabajador[0].id;
                console.log(idtrabajador);
                var trabajador = respuesta.trabajador[0];
                console.log(trabajador);

                // Foto
                recarga += '<div class="user-vista">';
                //Volver
                recarga += '<div class="return">';
                recarga += '<button class="return-btn" id="volver">';
                recarga += '<i class="fa-solid fa-angle-left"></i>';
                recarga += '</button>';
                recarga += '</div>';
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
                // mail
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
                            recarga += '<div class="divs-house">';
                            recarga += '<span class="p-house">' + curriculum.estudios[i].nombre_formación + '</span>';
                            recarga += '<span class="p-house">' + curriculum.estudios[i].lugar_formación + '</span>';
                            recarga += '<span class="p-house">' + curriculum.estudios[i].año_entrada + '</span>';
                            recarga += '<span class="p-house">' + curriculum.estudios[i].año_salida + '</span>';
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
                            recarga += '<div class="divs-house">';
                            recarga += '<span class="p-house">' + curriculum.experiencia[i].nombre_experiencia + '</span>';
                            recarga += '<span class="p-house">' + curriculum.experiencia[i].lugar_experiencia + '</span>';
                            recarga += '<span class="p-house">' + curriculum.experiencia[i].año_entrada + '</span>';
                            recarga += '<span class="p-house">' + curriculum.experiencia[i].año_salida + '</span>';
                            recarga += '<span class="p-house">' + curriculum.experiencia[i].funciones + '</span>';
                            recarga += '</div>';
                        }
                        recarga += '</div>';
                    }
                    if (curriculum.hasOwnProperty('idiomas')) {
                        // Idioma
                        recarga += '<div>';
                        recarga += '<div>';
                        recarga += '<i class="fa-solid fa-language"></i>';
                        recarga += '</div>';
                        for (let i = 0; i < curriculum.idiomas.length; i++) {
                            recarga += '<div>';
                            recarga += '<span>' + curriculum.idiomas[i].nombre_idioma + '</span>';
                            recarga += '<span>' + curriculum.idiomas[i].nivel_idioma + '</span>';
                            recarga += '</div>';

                        }
                        recarga += '</div>';
                    }
                    if (curriculum.hasOwnProperty('habilidades')) {
                        // Habilidades
                        recarga += '<div>';
                        recarga += '<div>';
                        recarga += '<i class="fa-solid fa-language"></i>';
                        recarga += '</div>';
                        for (let i = 0; i < curriculum.habilidades.length; i++) {
                            recarga += '<div>';
                            recarga += '<span>' + curriculum.habilidades[i].nombre_habilidad + '</span>';
                            recarga += '<span>' + curriculum.habilidades[i].nivel_habilidad + '</span>';
                            recarga += '</div>';

                        }
                        recarga += '</div>';
                    }
                }
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
                recarga += '<span class="p-house">' + trabajador.disponibilidad + '</span>';
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
                recarga += `
            <button id="myBtntra" onclick=abrirtrabajador();>Reportar trabajador</button>
            
            <div id="myModaltra" class="modal">
            
              <div class="modal-content">
                <span class="closetra" onclick=cerrartrabajador()>&times;</span>
                
                            <form method="POST" onsubmit="reportesJS(); return false;">
                                <br>
                                <h2>Reportar a trabajador</h2>
                                <br>
                                <select name="incidencia" id="incidencia" >
                                    <option value="">Seleccione el motivo del reporte</option>
                                    <option value="Es spam">Es spam</option>
                                    <option value="Esta cuenta se hace pasar por mi u otra persona">Esta cuenta se hace pasar por mí o alguien más</option>
                                    <option value="Suicidio o autolesion">Suicidio o autolesión</option>
                                    <option value="Venta de productos ilegales o regulados">Venta de productos ilegales o regulados</option>
                                    <option value="Desnudos o actividad sexual">Desnudos o actividad sexual</option>
                                    <option value="Lenguaje o simbolos que incitan al odio">Lenguaje o símbolos que incitan al odio</option>
                                    <option value="Violencia u organizaciones peligrosas">Violencia u organizaciones peligrosas</option>
                                    <option value="Bullying o acoso">Bullying o acoso</option>
                                    <option value="Infracción de la propiedad intelectual">Infracción de la propiedad intelectual</option>
                                    <option value="Fraude">Fraude</option>
                                    <option value="Informacion falsa">Información falsa</option>
                                </select>
                                <br><br>
                                <textarea name="desarrollar_incidencia" rows="3" id="desarrollar_incidencia" placeholder="Desarrolla el reporte"></textarea>
                                <br><br>
                                <input type="hidden" id="id_reportador" name="id_reportador" value=${sesion}>
                                <input type="hidden" id="id_reportado" name="id_reportado" value=${idtrabajador}>
                                <input type="submit" value="Enviar reporte"><br>
                            </form>
              </div>
            </div>`;
                carta.innerHTML = recarga;
                var volver = document.getElementById("volver");
                volver.addEventListener("click", estructura);
                volver.addEventListener("click", mostrar);
                volver.addEventListener("click", reload);

            }

            if (id_perfil == 3) {
                var idempresa = respuesta.empresa[0].id;
                console.log(idempresa);
                var empresa = respuesta.empresa[0];

                recarga += '<div class="empresa-vista">';
                //Volver
                recarga += '<div class="return">';
                recarga += '<button class="return-btn" id="volver">';
                recarga += '<i class="fa-solid fa-angle-left"></i>';
                recarga += '</button>';
                recarga += '</div>';
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
                recarga += `
            <button id="myBtnemp" onclick=abrirempresa();>Reportar empresa</button>
            
            <div id="myModalemp" class="modal">
            
              <div class="modal-content">
                <span class="closeemp" onclick=cerrarempresa();>&times;</span>
                
                            <form method="POST" onsubmit="reportesJS(); return false;">
                                <br>
                                <h2>Reportar a empresa</h2>
                                <br>
                                <select name="incidencia" id="incidencia" >
                                    <option value="">Seleccione el motivo del reporte</option>
                                    <option value="Es spam">Es spam</option>
                                    <option value="Esta cuenta se hace pasar por mi u otra persona">Esta cuenta se hace pasar por mí o alguien más</option>
                                    <option value="Suicidio o autolesion">Suicidio o autolesión</option>
                                    <option value="Venta de productos ilegales o regulados">Venta de productos ilegales o regulados</option>
                                    <option value="Desnudos o actividad sexual">Desnudos o actividad sexual</option>
                                    <option value="Lenguaje o simbolos que incitan al odio">Lenguaje o símbolos que incitan al odio</option>
                                    <option value="Violencia u organizaciones peligrosas">Violencia u organizaciones peligrosas</option>
                                    <option value="Bullying o acoso">Bullying o acoso</option>
                                    <option value="Infracción de la propiedad intelectual">Infracción de la propiedad intelectual</option>
                                    <option value="Fraude">Fraude</option>
                                    <option value="Informacion falsa">Información falsa</option>
                                </select>
                                <br><br>
                                <textarea name="desarrollar_incidencia" rows="3" id="desarrollar_incidencia" placeholder="Desarrolla el reporte"></textarea>
                                <br><br>
                                <input type="hidden" id="id_reportador" name="id_reportador" value=${sesion}>
                                <input type="hidden" id="id_reportado" name="id_reportado" value=${idempresa}>
                                <input type="submit" value="Enviar reporte"><br>
                            </form>
              </div>
            </div>`;
                carta.innerHTML = recarga;
                var volver = document.getElementById("volver");
                volver.addEventListener("click", estructura);
                volver.addEventListener("click", mostrar);
                volver.addEventListener("click", reload);

            }

        }

    }

    ajax.send(formData);

}
//PARA ABRIR MODALES SOLUCION--------
function abrirtrabajador() {
    // alert("hola")
    // Get the modal
    modal = document.getElementById("myModaltra");
    modal.style.display = "block";
}
// Get the <span> element that closes the modal
function cerrartrabajador() {
    modal = document.getElementById("myModaltra");
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    modal = document.getElementById("myModaltra");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function abrirempresa() {
    // alert("hola")
    // Get the modal
    modal = document.getElementById("myModalemp");
    modal.style.display = "block";
}
// Get the <span> element that closes the modal
function cerrarempresa() {
    modal = document.getElementById("myModalemp");
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    modal = document.getElementById("myModalemp");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function reportesJS() {
    let incidencia = document.getElementById('incidencia').value;
    let desarrollar_incidencia = document.getElementById('desarrollar_incidencia').value;

    if (incidencia == '' || desarrollar_incidencia == '') {
        swal.fire({
            title: "Error",
            text: "Tienes que rellenar todos los datos",
            icon: "error",
        });
        return false;

    }
    /* Si hace falta obtenemos el elemento HTML donde introduciremos la recarga (datos o mensajes) */
    /* Usar el objeto FormData para guardar los parámetros que se enviarán:
       formData.append('clave', valor);
       valor = elemento/s que se pasarán como parámetros: token, method, inputs... */
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');
    formData.append('id_reportador', document.getElementById('id_reportador').value);
    formData.append('id_reportado', document.getElementById('id_reportado').value);
    formData.append('incidencia', document.getElementById('incidencia').value);
    formData.append('desarrollar_incidencia', document.getElementById('desarrollar_incidencia').value);

    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();

    ajax.open("POST", "crearreporte", true);
    ajax.onreadystatechange = function() {
        console.log(ajax.responseText);
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            // /* Leerá la respuesta que es devuelta por el controlador: */
            console.log(respuesta);
            if (respuesta.resultado == 'OK') {
                swal.fire({
                    title: "Reporte enviado",
                    text: "Hemos recibido tu reporte, enseguida nos pondremos a revisarlo.",
                    showConfirmButton: true,
                    icon: "success",

                });
            } else {
                swal.fire({
                    title: "Oops",
                    text: "Parece que ha habido un error, inténtalo de nuevo.",
                    icon: "error",
                });
            }

        }
    }

    ajax.send(formData);
}

function get_session() {
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');

    var ajax = objetoAjax();

    ajax.open("POST", "pillarsesion", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            console.log(respuesta);
            sesion = respuesta.resultado
        }

    }
    ajax.send(formData);
}

// function openmodal() {
//     /*CODIGO MODAL*/

//     // Get the modal
//     myModalemp = document.getElementById("myModalemp");

//     // Get the button that opens the modal
//     myBtnemp = document.getElementById("myBtnemp");

//     // Get the <span> element that closes the modal
//     closeemp = document.getElementsByClassName("closeemp")[0];

//     // When the user clicks on the button, open the modal
//     myBtnemp.onclick = function() {
//         alert("hola")
//         myModalemp.style.display = "block";
//     }

//     // When the user clicks on <span> (x), close the modal
//     closeemp.onclick = function() {
//         myModalemp.style.display = "none";
//     }

//     // When the user clicks anywhere outside of the modal, close it
//     window.onclick = function(event) {
//         if (event.target == modal) {
//             myModalemp.style.display = "none";
//         }
//     }
// }