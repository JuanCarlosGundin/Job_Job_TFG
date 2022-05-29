window.onload = function() {
    // mostrar()
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

function mostrar() {
    var tabla = document.getElementById("mainInfo");
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    var ajax = objetoAjax();
    ajax.open("POST", "mostrar", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            console.log(respuesta)
            var recarga = '';
            if (respuesta[0].id_perfil == 3) {
                recarga += '<input type="hidden" id="userID" value="' + respuesta[0].id_usuario + '">'
                recarga += '<p>' + respuesta[0].id_usuario + '</p></br>'
                recarga += '<p>' + respuesta[0].nom_emp + '</p></br>'
                recarga += '<p>' + respuesta[0].about_emp + '</p></br>'
                recarga += '<p>' + respuesta[0].campo_emp + '</p></br>'
                recarga += '<p>' + respuesta[0].searching + '</p></br>'
            } else {
                recarga += '<input type="hidden" id="userID" value="' + respuesta[0].id_usuario + '">'
                recarga += '<p>' + respuesta[0].id_usuario + '</p></br>'
                recarga += '<p>' + respuesta[0].nombre + '</p></br>'
                recarga += '<p>' + respuesta[0].apellido + '</p></br>'
                recarga += '<p>' + respuesta[0].campo_user + '</p></br>'
                recarga += '<p>' + respuesta[0].experiencia + '</p></br>'
                recarga += '<p>' + respuesta[0].estudios + '</p></br>'
            }
        }
        tabla.innerHTML = recarga;
    }
    ajax.send(formData)
}

function yes() {
    idClient = document.getElementById("userID").value
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('idClient', idClient);
    var ajax = objetoAjax();
    ajax.open("POST", "si", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            console.log(respuesta)
            if (respuesta == 1) {
                alert("Es un match")
            }
            mostrar()
        }
    }
    ajax.send(formData)
}

function nope() {
    idClient = document.getElementById("userID").value
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('idClient', idClient);
    var ajax = objetoAjax();
    ajax.open("POST", "no", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            console.log(respuesta)
            mostrar()
        }
    }
    ajax.send(formData)
}