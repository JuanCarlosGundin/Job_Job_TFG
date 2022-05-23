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

window.onload = function() {
    cargarChats();
}

function cargarChats(){

    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    var ChatContent = document.getElementById('chat')
    var ajax = objetoAjax();
    
    ajax.open("POST", "leerChats", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);
            var recarga = "";
            //si estas iniciado como trabajador te salen empresas
            if (respuesta.hasOwnProperty('empresas')) {

                var empresas = respuesta.empresas;
                for (let i = 0; i < empresas.length; i++) {

                    recarga += '<div class="chats">'
                    recarga += '<button class="chat-foto-btn">'
                    if (empresas[i].logo_emp != null) {

                        recarga +='<div class="chat-foto">'
                        recarga += `<img class="chat-profilefoto" src="storage/${empresas[i].logo_emp}">`;
                        recarga +=  '</div>'
                    } else {

                        recarga +='<div class="chat-foto">'
                        recarga += '<img class="chat-profilefoto" src="storage/img/usuario.png">';
                        recarga +=  '</div>'
                    }   
                    recarga += '</button>'
                    recarga += '<div class="chat-content">'
                    recarga += '<div class="chat-name">'
                    recarga += `<p class="chat-name-text">${empresas[i].nom_emp}</p>`
                    recarga += '</div>'
                    recarga += '<div class="chat-mensaje">'
                    recarga += `<p class="chat-mensaje-text">Chat iniciado pulsa para conversar con ${empresas[i].nom_emp} </p>`
                    recarga += '</div>'
                    recarga += '</div>'
                    recarga += '<div class="chat-alert">'
                    recarga += '<p class="chat-hora">15:46</p>'
                    recarga += '</div>'
                    recarga += '</div>'
                    recarga += '<div class="div-linea">'
                    recarga += '<hr class="chat-linea">'
                    recarga += '</div>'
                }
            }
            //si estas iniciado como empresa te salen trabajadores
            if (respuesta.hasOwnProperty('trabajadores')) {

                var trabajadores = respuesta.trabajadores;
                for (let i = 0; i < trabajadores.length; i++) {
                    recarga += `<div class="chats" onclick="entrar(${trabajadores[i].id_usuario});">`
                    recarga += '<button class="chat-foto-btn">'
                    if (trabajadores[i].foto_perfil != null) {

                        recarga +='<div class="chat-foto">'
                        recarga += `<img class="chat-profilefoto" src="storage/${trabajadores[i].foto_perfil}">`
                        recarga +=  '</div>'
                    } else {

                        recarga +='<div class="chat-foto">'
                        recarga += '<img class="chat-profilefoto" src="storage/img/usuario.png">';
                        recarga +=  '</div>'
                    }   
                    recarga += '</button>'
                    recarga += '<div class="chat-content">'
                    recarga += '<div class="chat-name">'
                    recarga += `<p class="chat-name-text">${trabajadores[i].nombre} ${trabajadores[i].apellido}</p>`
                    recarga += '</div>'
                    recarga += '<div class="chat-mensaje">'
                    recarga += `<p class="chat-mensaje-text">Chat iniciado pulsa para conversar con ${trabajadores[i].nombre} </p>`
                    recarga += '</div>'
                    recarga += '</div>'
                    recarga += '<div class="chat-alert">'
                    recarga += '<p class="chat-hora">15:46</p>'
                    recarga += '</div>'
                    recarga += '</div>'
                    recarga += '<div class="div-linea">'
                    recarga += '<hr class="chat-linea">'
                    recarga += '</div>'
                }
            }
            ChatContent.innerHTML = recarga;
        }
    }
    ajax.send(formData);
}
function entrar(id){
    var recarga = "";
    recarga += `<div class="main-chat">
        <div class="chat-main-sticky">
            <div class="chat-main-user">
                <div class="chat-main-return">
                 <button class="return-btn" onclick="(); return false;">
                        <div class="return-icon">
                            <i class="fa-solid fa-angle-left"></i>
                     </div>
                    </button>
                </div>                
                <div id="foto_usu" class="chat-main-foto">
                    <img class="chat-profilefoto" src="storage/uploads/usuario.png">
                </div>
                <div id='nombre_usu' class="chat-main-name">
                </div>
            </div>
            <div class="chat-main-curve">
            </div>
        </div>
        <div id='chat_principal' class="chat-main-content">  
        </div>
        <div class="chat-main-send">
            <div class="chat-input">
                <input type="text" class="chat-input-mensaje" id="mensaje_input" name="nombre" value="" placeholder="Mensaje...">
            </div>
            <div class="chat-send">
                <button class="boton-send" onclick=sender();>
                    <i class="fa-solid fa-paper-plane"></i>
                </button>
            </div>
        </div>
    </div>`;
    document.getElementById('content').innerHTML= recarga
}

