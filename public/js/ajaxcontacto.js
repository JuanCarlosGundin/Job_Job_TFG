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

function contactoJS() {
    let nombre = document.getElementById('nombre').value;
    let email = document.getElementById('email').value;
    let telefono = document.getElementById('telefono').value;
    let asunto = document.getElementById('asunto').value;
    let mensaje = document.getElementById('mensaje').value;

    if (nombre == '' || email == '' || telefono == '' || asunto == '' || mensaje == '') {
        swal.fire({
            title: "Error",
            text: "Tienes que rellenar todos los datos",
            icon: "error",
        });
        return false;

    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { //mirar lo de poner solo por gmail
        document.getElementById("email").focus();
        document.getElementById("email").style.borderColor = "red";
        swal.fire({
            title: "Error",
            text: "Introduce un email correcto",
            icon: "error",
        });
        return false;
    } else if (telefono.length > 9 || telefono.length < 9) { //mirar de cambiar porque hay empresas con numeros muy largos como mercadona xd
        document.getElementById("telefono").focus();
        document.getElementById("telefono").style.borderColor = "red";
        swal.fire({
            title: "Error",
            text: "Revisa que el número de teléfono esté bien escrito",
            icon: "error",
        });
        return false;
    } else if (email.length > 100) {
        document.getElementById("mail").focus();
        document.getElementById("mail").style.borderColor = "red";
        swal.fire({
            title: "Error",
            text: "El email no puede ser más largo de 100 caracteres",
            icon: "error",
        });
        return false;
    }
    document.getElementById("myBtn").disabled = true;
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', "POST");
    formData.append('nombre', nombre);
    formData.append('email', email);
    formData.append('telefono', telefono);
    formData.append('asunto', asunto);
    formData.append('mensaje', mensaje);
    var ajax = objetoAjax();
    ajax.open("POST", "mandarcontacto", true);
    ajax.onreadystatechange = function() {
        console.log(ajax.responseText)
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            if (respuesta == "OK") {
                swal.fire({
                    title: "Mensaje Enviado",
                    text: "En breves nos pondremos en contacto contigo via email.",
                    showConfirmButton: false,
                    icon: "success",

                });
                document.getElementById("myBtn").disabled = false;
                setTimeout(() => { window.location.href = 'login'; }, 5000);
            } else {
                swal.fire({
                    title: "Oops",
                    text: "Parece que ha habido un error, inténtalo de nuevo.",
                    icon: "error",
                });
                document.getElementById("myBtn").disabled = false;
            }
        }
    }
    ajax.send(formData)
}