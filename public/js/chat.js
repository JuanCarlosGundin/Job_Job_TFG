// MIT License:
//
// Copyright (c) 2010-2012, Joe Walnes
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

/**
 * This behaves like a WebSocket in every way, except if it fails to connect,
 * or it gets disconnected, it will repeatedly poll until it successfully connects
 * again.
 *
 * It is API compatible, so when you have:
 *   ws = new WebSocket('ws://....');
 * you can replace with:
 *   ws = new ReconnectingWebSocket('ws://....');
 *
 * The event stream will typically look like:
 *  onconnecting
 *  onopen
 *  onmessage
 *  onmessage
 *  onclose // lost connection
 *  onconnecting
 *  onopen  // sometime later...
 *  onmessage
 *  onmessage
 *  etc...
 *
 * It is API compatible with the standard WebSocket API, apart from the following members:
 *
 * - `bufferedAmount`
 * - `extensions`
 * - `binaryType`
 *
 * Latest version: https://github.com/joewalnes/reconnecting-websocket/
 * - Joe Walnes
 *
 * Syntax
 * ======
 * var socket = new ReconnectingWebSocket(url, protocols, options);
 *
 * Parameters
 * ==========
 * url - The url you are connecting to.
 * protocols - Optional string or array of protocols.
 * options - See below
 *
 * Options
 * =======
 * Options can either be passed upon instantiation or set after instantiation:
 *
 * var socket = new ReconnectingWebSocket(url, null, { debug: true, reconnectInterval: 4000 });
 *
 * or
 *
 * var socket = new ReconnectingWebSocket(url);
 * socket.debug = true;
 * socket.reconnectInterval = 4000;
 *
 * debug
 * - Whether this instance should log debug messages. Accepts true or false. Default: false.
 *
 * automaticOpen
 * - Whether or not the websocket should attempt to connect immediately upon instantiation. The socket can be manually opened or closed at any time using ws.open() and ws.close().
 *
 * reconnectInterval
 * - The number of milliseconds to delay before attempting to reconnect. Accepts integer. Default: 1000.
 *
 * maxReconnectInterval
 * - The maximum number of milliseconds to delay a reconnection attempt. Accepts integer. Default: 30000.
 *
 * reconnectDecay
 * - The rate of increase of the reconnect delay. Allows reconnect attempts to back off when problems persist. Accepts integer or float. Default: 1.5.
 *
 * timeoutInterval
 * - The maximum time in milliseconds to wait for a connection to succeed before closing and retrying. Accepts integer. Default: 2000.
 *
 */
 (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module !== 'undefined' && module.exports){
        module.exports = factory();
    } else {
        global.ReconnectingWebSocket = factory();
    }
})(this, function () {

    if (!('WebSocket' in window)) {
        return;
    }

    function ReconnectingWebSocket(url, protocols, options) {

        // Default settings
        var settings = {

            /** Whether this instance should log debug messages. */
            debug: false,

            /** Whether or not the websocket should attempt to connect immediately upon instantiation. */
            automaticOpen: true,

            /** The number of milliseconds to delay before attempting to reconnect. */
            reconnectInterval: 1000,
            /** The maximum number of milliseconds to delay a reconnection attempt. */
            maxReconnectInterval: 30000,
            /** The rate of increase of the reconnect delay. Allows reconnect attempts to back off when problems persist. */
            reconnectDecay: 1.5,

            /** The maximum time in milliseconds to wait for a connection to succeed before closing and retrying. */
            timeoutInterval: 2000,

            /** The maximum number of reconnection attempts to make. Unlimited if null. */
            maxReconnectAttempts: null,

            /** The binary type, possible values 'blob' or 'arraybuffer', default 'blob'. */
            binaryType: 'blob'
        }
        if (!options) { options = {}; }

        // Overwrite and define settings with options if they exist.
        for (var key in settings) {
            if (typeof options[key] !== 'undefined') {
                this[key] = options[key];
            } else {
                this[key] = settings[key];
            }
        }

        // These should be treated as read-only properties

        /** The URL as resolved by the constructor. This is always an absolute URL. Read only. */
        this.url = url;

        /** The number of attempted reconnects since starting, or the last successful connection. Read only. */
        this.reconnectAttempts = 0;

        /**
         * The current state of the connection.
         * Can be one of: WebSocket.CONNECTING, WebSocket.OPEN, WebSocket.CLOSING, WebSocket.CLOSED
         * Read only.
         */
        this.readyState = WebSocket.CONNECTING;

        /**
         * A string indicating the name of the sub-protocol the server selected; this will be one of
         * the strings specified in the protocols parameter when creating the WebSocket object.
         * Read only.
         */
        this.protocol = null;

        // Private state variables

        var self = this;
        var ws;
        var forcedClose = false;
        var timedOut = false;
        var eventTarget = document.createElement('div');

        // Wire up "on*" properties as event handlers

        eventTarget.addEventListener('open',       function(event) { self.onopen(event); });
        eventTarget.addEventListener('close',      function(event) { self.onclose(event); });
        eventTarget.addEventListener('connecting', function(event) { self.onconnecting(event); });
        eventTarget.addEventListener('message',    function(event) { self.onmessage(event); });
        eventTarget.addEventListener('error',      function(event) { self.onerror(event); });

        // Expose the API required by EventTarget

        this.addEventListener = eventTarget.addEventListener.bind(eventTarget);
        this.removeEventListener = eventTarget.removeEventListener.bind(eventTarget);
        this.dispatchEvent = eventTarget.dispatchEvent.bind(eventTarget);

        /**
         * This function generates an event that is compatible with standard
         * compliant browsers and IE9 - IE11
         *
         * This will prevent the error:
         * Object doesn't support this action
         *
         * http://stackoverflow.com/questions/19345392/why-arent-my-parameters-getting-passed-through-to-a-dispatched-event/19345563#19345563
         * @param s String The name that the event should use
         * @param args Object an optional object that the event will use
         */
        function generateEvent(s, args) {
        	var evt = document.createEvent("CustomEvent");
        	evt.initCustomEvent(s, false, false, args);
        	return evt;
        };

        this.open = function (reconnectAttempt) {
            ws = new WebSocket(self.url, protocols || []);
            ws.binaryType = this.binaryType;

            if (reconnectAttempt) {
                if (this.maxReconnectAttempts && this.reconnectAttempts > this.maxReconnectAttempts) {
                    return;
                }
            } else {
                eventTarget.dispatchEvent(generateEvent('connecting'));
                this.reconnectAttempts = 0;
            }

            if (self.debug || ReconnectingWebSocket.debugAll) {
                console.debug('ReconnectingWebSocket', 'attempt-connect', self.url);
            }

            var localWs = ws;
            var timeout = setTimeout(function() {
                if (self.debug || ReconnectingWebSocket.debugAll) {
                    console.debug('ReconnectingWebSocket', 'connection-timeout', self.url);
                }
                timedOut = true;
                localWs.close();
                timedOut = false;
            }, self.timeoutInterval);

            ws.onopen = function(event) {
                clearTimeout(timeout);
                if (self.debug || ReconnectingWebSocket.debugAll) {
                    console.debug('ReconnectingWebSocket', 'onopen', self.url);
                }
                self.protocol = ws.protocol;
                self.readyState = WebSocket.OPEN;
                self.reconnectAttempts = 0;
                var e = generateEvent('open');
                e.isReconnect = reconnectAttempt;
                reconnectAttempt = false;
                eventTarget.dispatchEvent(e);
            };

            ws.onclose = function(event) {
                clearTimeout(timeout);
                ws = null;
                if (forcedClose) {
                    self.readyState = WebSocket.CLOSED;
                    eventTarget.dispatchEvent(generateEvent('close'));
                } else {
                    self.readyState = WebSocket.CONNECTING;
                    var e = generateEvent('connecting');
                    e.code = event.code;
                    e.reason = event.reason;
                    e.wasClean = event.wasClean;
                    eventTarget.dispatchEvent(e);
                    if (!reconnectAttempt && !timedOut) {
                        if (self.debug || ReconnectingWebSocket.debugAll) {
                            console.debug('ReconnectingWebSocket', 'onclose', self.url);
                        }
                        eventTarget.dispatchEvent(generateEvent('close'));
                    }

                    var timeout = self.reconnectInterval * Math.pow(self.reconnectDecay, self.reconnectAttempts);
                    setTimeout(function() {
                        self.reconnectAttempts++;
                        self.open(true);
                    }, timeout > self.maxReconnectInterval ? self.maxReconnectInterval : timeout);
                }
            };
            ws.onmessage = function(event) {
                if (self.debug || ReconnectingWebSocket.debugAll) {
                    console.debug('ReconnectingWebSocket', 'onmessage', self.url, event.data);
                }
                var e = generateEvent('message');
                e.data = event.data;
                eventTarget.dispatchEvent(e);
            };
            ws.onerror = function(event) {
                if (self.debug || ReconnectingWebSocket.debugAll) {
                    console.debug('ReconnectingWebSocket', 'onerror', self.url, event);
                }
                eventTarget.dispatchEvent(generateEvent('error'));
            };
        }

        // Whether or not to create a websocket upon instantiation
        if (this.automaticOpen == true) {
            this.open(false);
        }

        /**
         * Transmits data to the server over the WebSocket connection.
         *
         * @param data a text string, ArrayBuffer or Blob to send to the server.
         */
        this.send = function(data) {
            if (ws) {
                if (self.debug || ReconnectingWebSocket.debugAll) {
                    console.debug('ReconnectingWebSocket', 'send', self.url, data);
                }
                return ws.send(data);
            } else {
                throw 'INVALID_STATE_ERR : Pausing to reconnect websocket';
            }
        };

        /**
         * Closes the WebSocket connection or connection attempt, if any.
         * If the connection is already CLOSED, this method does nothing.
         */
        this.close = function(code, reason) {
            // Default CLOSE_NORMAL code
            if (typeof code == 'undefined') {
                code = 1000;
            }
            forcedClose = true;
            if (ws) {
                ws.close(code, reason);
            }
        };

        /**
         * Additional public API method to refresh the connection if still open (close, re-open).
         * For example, if the app suspects bad data / missed heart beats, it can try to refresh.
         */
        this.refresh = function() {
            if (ws) {
                ws.close();
            }
        };
    }

    /**
     * An event listener to be called when the WebSocket connection's readyState changes to OPEN;
     * this indicates that the connection is ready to send and receive data.
     */
    ReconnectingWebSocket.prototype.onopen = function(event) {};
    /** An event listener to be called when the WebSocket connection's readyState changes to CLOSED. */
    ReconnectingWebSocket.prototype.onclose = function(event) {};
    /** An event listener to be called when a connection begins being attempted. */
    ReconnectingWebSocket.prototype.onconnecting = function(event) {};
    /** An event listener to be called when a message is received from the server. */
    ReconnectingWebSocket.prototype.onmessage = function(event) {};
    /** An event listener to be called when an error occurs. */
    ReconnectingWebSocket.prototype.onerror = function(event) {};

    /**
     * Whether all instances of ReconnectingWebSocket should log debug messages.
     * Setting this to true is the equivalent of setting all instances of ReconnectingWebSocket.debug to true.
     */
    ReconnectingWebSocket.debugAll = false;

    ReconnectingWebSocket.CONNECTING = WebSocket.CONNECTING;
    ReconnectingWebSocket.OPEN = WebSocket.OPEN;
    ReconnectingWebSocket.CLOSING = WebSocket.CLOSING;
    ReconnectingWebSocket.CLOSED = WebSocket.CLOSED;

    return ReconnectingWebSocket;
});

//LOGICA CHAT

//hace referencia a el id de la conversación
function htmlEncode(str){
    return String(str).replace(/[^\w. ]/gi, function(c){
        return '&#'+c.charCodeAt(0)+';';
    });
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

function getchanel(id_otro){

    var formData = new FormData();
    var ajax = objetoAjax();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('id_otro',id_otro)
    //formData.append('filter', document.getElementById('filter').value);

    ajax.open("POST", "getchat", false);
    ajax.onreadystatechange = function() {
        //console.log(ajax.responseText)
        if (ajax.readyState == 4 && ajax.status == 200) {
            chatInfo = JSON.parse(this.responseText);
            console.log(chatInfo)
        }
    }
    ajax.send(formData);
}

//ZONA VARIABLES
//var chanel= '3';

function start(){
    try{
        socket.close()
    }catch{
            
    }

    getchanel(otro)
    //socket = new ReconnectingWebSocket('ws://192.168.40.228:8000/'+document.getElementById('canal').value); //new WebSocket('ws://172.24.16.41:8000');
    socket = new ReconnectingWebSocket('ws://192.168.167.228:8000/'+chatInfo.chanel[0].id); //new WebSocket('ws://172.24.16.41:8000');


    socket.onopen = function(event) {

        //document.getElementById('estado').innerText = "Conectado"
            //socket.send();
    };
    socket.onclose = function(event) {

        //document.getElementById('estado').innerText = "Desconectado"
                //socket.send();
    };

        // Escucha por mensajes
    socket.onmessage = function(event) {
        const { payload } = JSON.parse(event.data);
        console.log(payload)
        console.log(chatInfo.id)
        if(payload.currentid==chatInfo.id) {
            document.getElementById('chat_principal').innerHTML += '<div class="mensaje-2"><div class="chat-mensaje-2"><div class="mensaje-text-div"><p class="mensaje-text">'+htmlEncode(payload.message) +'</p></div><div class="mensaje-hora-div"><p class="mensaje-hora">'+payload.time+'</p></div></div></div>'
        } else { document.getElementById('chat_principal').innerHTML += '<div class="mensaje-1"><div class="chat-mensaje-1"><div class="mensaje-text-div"><p class="mensaje-text">'+htmlEncode(payload.message) +'</p></div><div class="mensaje-hora-div"><p class="mensaje-hora">'+payload.time+'</p></div></div></div>'}
        //document.getElementById('chat_principal').innerHTML += event.data 
    }
}


//function abrir() {

//    start()
    //socket = new ReconnectingWebSocket('ws://192.168.1.42:8000/'+document.getElementById('canal').value);
//}

//function cerrar() {

//    socket.close()

//}
function insert(id_otro,time,msg) {

    var formData = new FormData();
    var ajax = objetoAjax();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('id_otro', id_otro);
    formData.append('time', time);
    formData.append('msg', msg);
    //formData.append('filter', document.getElementById('filter').value);

    ajax.open("POST", "insert", false);
    ajax.onreadystatechange = function() {
        //console.log(ajax.responseText)
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            console.log(respuesta)
        }
    }
    ajax.send(formData);
}


function sender (id_otro) {

    if(document.getElementById('mensaje_input').value=='') { console.log('vacio'); return false }
    var today = new Date();
    if(today.getMinutes()<10){ var time = today.getHours() + ":0"+ today.getMinutes(); } else { var time = today.getHours() + ":"+ today.getMinutes();}
    var jsondata = JSON.stringify({
        payload: {
            message: document.getElementById('mensaje_input').value,
            time: time,
            currentid: chatInfo.id
        }
    });

    

    //getchanel()
    //console.log(chatInfo)
        

        socket.send(jsondata)
        var msg = document.getElementById('mensaje_input').value
        insert(id_otro,time,msg)
        //socket.send([document.getElementById('mensaje_input').value,time,chatInfo.id])
        //socket.send('<div class="chat-mensaje-2"><p class="mensaje-text">'+htmlEncode(document.getElementById('mensaje_input').value) +'</p><p class="mensaje-hora">'+time+'</p></div>');

    document.getElementById('mensaje_input').value=''

}



//LOGICA DE PRE CHAT
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
            console.log(respuesta)
            var recarga = "";
            //si estas iniciado como trabajador te salen empresas
            if (respuesta.hasOwnProperty('empresas')) {
                console.log('llega')
                var empresas = respuesta.empresas;
                for (let i = 0; i < empresas.length; i++) {

                    recarga += `<div class="chats" onclick="entrar(${empresas[i].id_usuario});" style='cursor:pointer;'>`
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
                    recarga += `<div class="chats" onclick="entrar(${trabajadores[i].id_usuario});" style='cursor:pointer;'>`
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
function entrar(id_otro){
    otro=id_otro
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
                <input type="text" class="chat-input-mensaje" id="mensaje_input" name="nombre" value="" placeholder="Mensaje..." maxlength="200">
            </div>
            <div class="chat-send">
                <button class="boton-send" onclick=sender(${id_otro});>
                    <i class="fa-solid fa-paper-plane"></i>
                </button>
            </div>
        </div>
    </div>`;
    document.getElementById('content').innerHTML= recarga

    //Injectamos mensajes
    getchanel(id_otro)
    console.log(chatInfo)
    if(chatInfo.perfil==3) { 
        document.getElementById('nombre_usu').innerHTML='<p class="chat-name">'+chatInfo.other[0].nombre+'&nbsp;'+chatInfo.other[0].apellido+'<p>'
    } else {
        document.getElementById('nombre_usu').innerHTML='<p class="chat-name">'+chatInfo.other[0].nom_emp+'<p>'
    }

    start()
    var mensajes=JSON.parse(chatInfo.chanel[0].json_chat)
    var mensajes=mensajes.mensajes

    var recarga = "";
    if(chatInfo.perfil==2){
      document.getElementById('foto_usu').innerHTML= `<img class="chat-profilefoto" src="storage/${chatInfo.other[0].logo_emp}"></img>`
    }else{
        document.getElementById('foto_usu').innerHTML= `<img class="chat-profilefoto" src="storage/${chatInfo.other[0].foto_perfil}"></img>`
    }
    for (var i = 0; i < mensajes.length; i+=1) {
        console.log(chatInfo.id)
        if(chatInfo.id==mensajes[i].id){
            recarga +='<div class="mensaje-2"><div class="chat-mensaje-2"><div class="mensaje-text-div"><p class="mensaje-text">'+htmlEncode(mensajes[i].mensaje) +'</p></div><div class="mensaje-hora-div"><p class="mensaje-hora">'+mensajes[i].hora+'</p></div></div></div>'
        }
        if(chatInfo.id2==mensajes[i].id){
            recarga +='<div class="mensaje-1"><div class="chat-mensaje-1"><div class="mensaje-text-div"><p class="mensaje-text">'+htmlEncode(mensajes[i].mensaje) +'</p></div><div class="mensaje-hora-div"><p class="mensaje-hora">'+mensajes[i].hora+'</p></div></div></div>';
        }
        if(mensajes[i].id=='Start'){
            recarga += '<div class="chat-mensaje-inicio"><div class="mensaje-inicio"><p class="mensaje-text">Bienvenido al chat</p></div></div>';
        }
      }

      document.getElementById('chat_principal').innerHTML += recarga
}

