////////////////////////////GENERAL///////////////////////////////////////
window.onload = function() {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    reload();
    mostrar()
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
            card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
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
                        <img src="img/jobjob_tarjeta.png">
                    </div>
                    <div class="swiper--card no-swipe">
                        <img src="img/jobjob_tarjeta.png">
                    </div>
                    <div class="swiper--card no-swipe">
                        <img src="img/jobjob_tarjeta.png">
                    </div>
                    <div class="swiper--card no-swipe">
                        <img src="img/jobjob_tarjeta.png">
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
                    <img src="./storage/${respuesta[0].logo_emp}">
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
                    recarga += `
                    <input type="hidden" id="userID" value="${respuesta[0].id_usuario}">
                    <div class="content--card content--trabajador">
                        <div class="img--card">
                            <img class="img--trabajador" src="./storage/${respuesta[0].foto_perfil}">
                        </div>
                        <div class="cv--card">
                            <div class="objetivo--card">
                                <h2 class="titulo--objetivo">Objetivo Profesional</h2>
                                <p class="content--objetivo">${respuesta[0].about_user}</p>
                            </div>
                            <div class="formacion--card">
                                <h2 class="titulo--formacion">Formación</h2>
                                <p class="content--formacion">${respuesta[0].estudios}</p>
                            </div>
                            <div class="experiencia--card">
                                <h2 class="titulo--experiencia">Experiencia</h2>
                                <p class="content--experiencia">${respuesta[0].experiencia}</p>
                            </div>
                        </div>
                        <div class="titulo--card">
                            <h2 class="nombreEdad--usuario">${respuesta[0].nombre} ${respuesta[0].apellido}, ${respuesta[0].edad}</h2>
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