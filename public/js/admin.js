window.onload = function() {

    leerJS();

    //logica de modal
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {

        var modal = document.getElementById("myModal");

        modal.style.display = "none";

    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
            var modal = document.getElementById("myModal");
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        /*CODIGO MODAL USUARIO*/

    // Get the modal
    modal = document.getElementById("myModalcorreo");

    // Get the button that opens the modal
    btn = document.getElementById("myBtncorreo");

    // Get the <span> element that closes the modal
    span = document.getElementsByClassName("closecorreo")[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        /*FIN CODIGO MODAL USUARIO*/

}

////////////////////////////REDIRECCIONES/////////////////////////////////
var myBtnreportes = document.getElementById("myBtnreportes");
var myBtnstats = document.getElementById("myBtnstats");

myBtnreportes.onclick = function() {

    window.location.href = "./crudreportes";

}

myBtnstats.onclick = function() {

    window.location.href = "./graficas";

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


function leerJS() {

    /* ubicacion de las tablas */
    var tablaemp = document.getElementById("tablaemp");
    var tablatrab = document.getElementById("tablatrab");
    var tablaadmin = document.getElementById("tablaadmin");
    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('filtro', document.getElementById('filtro').value);
    formData.append('filcorreo', document.getElementById('filcorreo').value);
    formData.append('filid', document.getElementById('filid').value);
    formData.append('Empresa', document.getElementById("emp").checked);
    formData.append('Trabajador', document.getElementById("tbjd").checked);
    formData.append('Admin', document.getElementById("adm").checked);

    var ajax = objetoAjax();

    ajax.open("POST", "leer", true);

    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);

            console.log(respuesta);
            console.log(respuesta.trabajador);
            // console.log(respuesta);

            /* si respuesta tiene (respuesta.admin) */
            if (respuesta.hasOwnProperty('admin')) {

                var admin = respuesta.admin;
                var recargaadmin = '';
                recargaadmin += '<br>';
                recargaadmin += '<br>';
                recargaadmin += '<h2>Administradores</h2>';
                recargaadmin += '<table class="table table-striped table-hover">';
                recargaadmin += '<thead>';
                recargaadmin += '<th scope="col">Correo</th>';
                recargaadmin += '<th class="th-estado-admin" scope="col">Estado</th>';
                recargaadmin += '</tr>';
                recargaadmin += '</thead>';
                recargaadmin += '<tbody>';

                for (let i = 0; i < admin.length; i++) {

                    recargaadmin += '<tr>';
                    recargaadmin += '<td>' + admin[i].mail + '</td>';
                    /* if (admin[i].id == respuesta.idadmin) {
                        alert("hola");
                    } */
                    /* Banear o restaurar cuenta */

                    if (admin[i].estado == 1) {
                        recargaadmin += '<td><button type="button" class="btn btn-warning" onclick="estadouserJS(' + admin[i].id + '); return false;">Banear</button></td>';
                    } else {
                        recargaadmin += '<td><button type="button" class="btn btn-warning" onclick="estadouserJS(' + admin[i].id + '); return false;">Reactivar</button></td>';
                    }

                    /* Actualizar */
                    recargaadmin += '<td><button type="button" class="btn btn-info" onclick="actualizarmodal(\'' + admin[i].id + '\',\'' + admin[i].id_perfil + '\'); return false;">Modificar</button></td>';

                    recargaadmin += '</tr>';

                }

                recargaadmin += '</tbody>';
                recargaadmin += '</table>';
            }

            /* si respuesta tiene (respuesta.trabajador) */
            if (respuesta.hasOwnProperty('trabajador')) {

                var trabajador = respuesta.trabajador;
                var recargatrab = '';

                recargatrab += '<h2>Trabajadores</h2>';
                recargatrab += '<table class="table table-striped table-hover">';
                recargatrab += '<thead>';
                recargatrab += '<tr>';
                recargatrab += '<th scope="col">ID</th>';
                recargatrab += '<th scope="col">Correo</th>';
                recargatrab += '<th scope="col">Nombre</th>';
                recargatrab += '<th scope="col">Mostrado</th>';
                recargatrab += '<th scope="col">Foto</th>';
                recargatrab += '<th scope="col">Estado</th>';
                recargatrab += '</tr>';
                recargatrab += '</thead>';
                recargatrab += '<tbody>';

                for (let i = 0; i < trabajador.length; i++) {

                    recargatrab += '<tr>';
                    recargatrab += '<td>' + trabajador[i].id_usuario + '</td>';
                    recargatrab += '<td>' + trabajador[i].mail + '</td>';
                    recargatrab += '<td>' + trabajador[i].nombre + '</td>';
                    recargatrab += '<td>' + trabajador[i].mostrado + '</td>';

                    /* Si hay una foto, que se muestre */
                    if (trabajador[i].foto_perfil != null) {

                        recargatrab += '<td style="word-break: break-all"><img class="imagen" src="storage/' + trabajador[i].foto_perfil + '"></td>';

                    } else {

                        recargatrab += '<td style="word-break: break-all">' + trabajador[i].foto_perfil + '</td>';

                    }

                    /* Banear o restaurar cuenta */
                    if (trabajador[i].estado == 1) {

                        recargatrab += '<td><button type="button" class="btn btn-warning" onclick="estadouserJS(' + trabajador[i].id + '); return false;">Banear</button></td>';

                    } else {

                        recargatrab += '<td><button type="button" class="btn btn-warning" onclick="estadouserJS(' + trabajador[i].id + '); return false;">Reactivar</button></td>';

                    }

                    /* Actualizar */
                    recargatrab += '<td><button type="button" class="btn btn-info" onclick="actualizarmodal(\'' + trabajador[i].id + '\',\'' + trabajador[i].id_perfil + '\'); return false;">Modificar</button></td>';
                    recargatrab += '</tr>';
                }

                recargatrab += '</tbody>';
                recargatrab += '</table>';
            }

            /* si respuesta tiene (respuesta.empresa) */
            if (respuesta.hasOwnProperty('empresa')) {

                var empresa = respuesta.empresa;
                var recargaemp = '';

                recargaemp += '<h2>Empresas</h2>';
                recargaemp += '<table class="table table-striped table-hover">';
                recargaemp += '<thead>';
                recargaemp += '<tr>';
                recargaemp += '<th scope="col">ID</th>';
                recargaemp += '<th scope="col">Correo</th>';
                recargaemp += '<th scope="col">Nombre</th>';
                recargaemp += '<th scope="col">Mostrado</th>';
                recargaemp += '<th scope="col">Logo</th>';
                recargaemp += '<th scope="col">Estado</th>';
                recargaemp += '</tr>';
                recargaemp += '</thead>';
                recargaemp += '<tbody>';

                for (let i = 0; i < empresa.length; i++) {

                    recargaemp += '<tr>';
                    recargaemp += '<td>' + empresa[i].id_usuario + '</td>';
                    recargaemp += '<td>' + empresa[i].mail + '</td>';
                    recargaemp += '<td>' + empresa[i].nom_emp + '</td>';
                    recargaemp += '<td>' + empresa[i].mostrado + '</td>';

                    /* Si hay una foto, que se muestre */
                    if (empresa[i].logo_emp != null) {

                        recargaemp += '<td style="word-break: break-all"><img class="imagen" src="storage/' + empresa[i].logo_emp + '"></td>';

                    } else {

                        recargaemp += '<td style="word-break: break-all">' + empresa[i].logo_emp + '</td>';

                    }

                    /* Banear o restaurar cuenta */
                    if (empresa[i].estado == 1) {

                        recargaemp += '<td><button type="button" class="btn btn-warning" onclick="estadouserJS(' + empresa[i].id + '); return false;">Banear</button></td>';

                    } else {

                        recargaemp += '<td><button type="button" class="btn btn-warning" onclick="estadouserJS(' + empresa[i].id + '); return false;">Reactivar</button></td>';

                    }

                    /* Actualizar */
                    recargaemp += '<td><button type="button" class="btn btn-info" onclick="actualizarmodal(\'' + empresa[i].id + '\',\'' + empresa[i].id_perfil + '\'); return false;">Modificar</button></td>';
                    recargaemp += '</tr>';
                }

                recargaemp += '</tbody>';
                recargaemp += '</table>';
            }

            /* si hay contenido de admin, que se muestre */
            if (recargaadmin == null) {

                tablaadmin.innerHTML = "";

            } else {

                tablaadmin.innerHTML = recargaadmin;

            }

            /* si hay contenido de trabajadores, que se muestre */
            if (recargatrab == null) {

                tablatrab.innerHTML = "";

            } else {

                tablatrab.innerHTML = recargatrab;

            }

            /* si hay contenido de empresas, que se muestre */
            if (recargaemp == null) {

                tablaemp.innerHTML = "";

            } else {

                tablaemp.innerHTML = recargaemp;

            }

        }

    }

    ajax.send(formData);
}


function crearadmin() {

    var token = document.getElementById('token').getAttribute("content");
    /* Ubicacion del formulario de crear */
    var sitioform = document.getElementById('sitioform');
    var formData = new FormData();

    formData.append('_token', token);

    var ajax = objetoAjax();

    /* Hago una peticion para obtener los tipos de perfiles */
    ajax.open("POST", "perfiles", true);

    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);
            var recargaform = "";

            recargaform += '<form method="POST" onsubmit="opcioncrearJS(); return false;" id="formcrear">';
            recargaform += '<div class="form-group">';
            recargaform += '<label class="col-sm-2 col-form-label">Correo:</label>';
            recargaform += '<input type="email" class="form-control" id="mail" name="mail" placeholder="Introduce el correo">';
            recargaform += '</div>';
            recargaform += '<div class="form-group">';
            recargaform += '<label class="col-sm-2 col-form-label">Contraseña:</label>';
            recargaform += '<input type="password" class="form-control" id="contra" name="contra" placeholder="Introduce una contraseña">';
            recargaform += '</div>';
            recargaform += '<div class="form-group">';
            recargaform += '<label class="col-sm-2 col-form-label">Perfil:</label>';
            recargaform += '<select name="nom_perfil" id="nom_perfil" class="form-control">';

            for (let i = 0; i < respuesta.length; i++) {

                recargaform += '<option class="perf" value="' + respuesta[i].id + '">' + respuesta[i].nom_perfil + '</option>';

            }

            recargaform += '</select>';
            recargaform += '</div>';
            recargaform += '<button type="submit" class="btn btn-primary">Crear</button>';
            recargaform += '</form>';
            sitioform.innerHTML = recargaform;
            document.getElementById('message').innerHTML = "";

        }

    }

    ajax.send(formData)
}


function opcioncrearJS() {
    var mail = document.getElementById("mail").value;
    var contra = document.getElementById("contra").value;
    if (mail == '' || contra == '') {
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
    } else if (/^ *$/.test(mail)) {
        swal.fire({
            title: "Error",
            text: "Debes añadir un email",
            icon: "error",
        });
        return false;
    } else if (/^ *$/.test(contra)) {
        swal.fire({
            title: "Error",
            text: "Debes añadir una contraseña",
            icon: "error",
        });
        return false;
    } else if (contra.length < 8) {
        swal.fire({
            title: "Error",
            text: "La contraseña debe tener 8 carácteres mínimo",
            icon: "error",
        });
        return false;
    }
    /* Ubicacion del formulario de crear */
    var sitioform = document.getElementById('sitioform');
    /* Variables de usuarios */
    var mail = document.getElementById('mail').value;
    var contra = document.getElementById('contra').value;
    var id_perfil = document.getElementById('nom_perfil').value;

    /* Crear cuenta administrador */
    if (id_perfil == 1) {

        crearJS(mail, contra, id_perfil);

    }

    /* Continuar formulario trabajador */
    if (id_perfil == 2) {

        var recargaform = "";

        recargaform += '<form method="POST" onsubmit="crearJS(\'' + mail + '\',\'' + contra + '\',\'' + id_perfil + '\'); return false;" id="formcrear" enctype="multipart/form-data">';
        recargaform += '<div class="form-group">';
        recargaform += '<label class="col-sm-2 col-form-label">Nombre:</label>';
        recargaform += '<input type="text" class="form-control" id="nombre" name="nombre" placeholder="Introduce el nombre">';
        recargaform += '</div>';
        recargaform += '<div class="form-group">';
        recargaform += '<label class="col-sm-2 col-form-label">Apellido:</label>';
        recargaform += '<input type="text" class="form-control" id="apellido" name="apellido" placeholder="Introduce un apellido">';
        recargaform += '</div>';
        recargaform += '<div class="form-group">';
        recargaform += '<label class="col-sm-2 col-form-label">Edad:</label>';
        recargaform += '<input type="date" class="form-control" id="edad" name="edad" placeholder="Introduce tu edad">';
        recargaform += '</div>';
        recargaform += '<button type="submit" class="btn btn-primary">Enviar</button>';
        recargaform += '</form>';
        sitioform.innerHTML = recargaform;
    }

    /* Continuar formulario empresa */
    if (id_perfil == 3) {

        var recargaform = "";

        recargaform += '<form method="POST" onsubmit="crearJS(\'' + mail + '\',\'' + contra + '\',\'' + id_perfil + '\'); return false;" id="formcrear" enctype="multipart/form-data">';
        recargaform += '<div class="form-group">';
        recargaform += '<label class="col-sm-2 col-form-label">Nombre:</label>';
        recargaform += '<input type="text" class="form-control" id="nom_emp" name="nom_emp" placeholder="Introduce el nombre">';
        recargaform += '</div>';
        recargaform += '<div class="form-group">';
        recargaform += '<label class="col-sm-2 col-form-label">Localizacion:</label>';
        recargaform += '<input type="text" class="form-control" id="loc_emp" name="loc_emp" placeholder="Introduce una localizacion">';
        recargaform += '</div>';
        recargaform += '<div class="form-group">';
        recargaform += '<label class="col-sm-2 col-form-label">Sobre nosotros:</label>';
        recargaform += '<input type="text" class="form-control" id="about_emp" name="about_emp" placeholder="Introduce datos sobre la empresa">';
        recargaform += '</div>';
        recargaform += '<div class="form-group">';
        recargaform += '<label class="col-sm-2 col-form-label">Sector:</label>';
        recargaform += '<input type="text" class="form-control" id="campo_emp" name="campo_emp" placeholder="Introduce un sector">';
        recargaform += '</div>';
        recargaform += '<div class="form-group">';
        recargaform += '<label class="col-sm-2 col-form-label">Que buscas:</label>';
        recargaform += '<input type="text" class="form-control" id="searching" name="searching" placeholder="Introduce que necesitas">';
        recargaform += '</div>';
        recargaform += '<div class="form-group">';
        recargaform += '<label class="col-sm-2 col-form-label">Vacante:</label>';
        recargaform += '<input type="text" class="form-control" id="vacante" name="vacante" placeholder="Introduce el vacante">';
        recargaform += '</div>';
        recargaform += '<div class="form-group">';
        recargaform += '<label class="col-sm-2 col-form-label">Logo:</label>';
        recargaform += '<input type="file" class="form-control" id="logo_emp" name="logo_emp">';
        recargaform += '</div>';
        recargaform += '<button type="submit" class="btn btn-primary">Enviar</button>';
        recargaform += '</form>';
        sitioform.innerHTML = recargaform;

    }

}


function crearJS(mail, contra, id_perfil) {
    if (id_perfil == 2) {
        var nombre = document.getElementById("nombre").value;
        var apellido = document.getElementById("apellido").value;
        var edad = document.getElementById("edad").value;
        if (nombre == '' || apellido == '' || edad == '') {
            swal.fire({
                title: "Error",
                text: "Tienes que rellenar todos los datos",
                icon: "error",
            });
            return false;

        }
    }
    if (id_perfil == 3) {
        var nom_emp = document.getElementById("nom_emp").value;
        if (nom_emp == '') {
            swal.fire({
                title: "Error",
                text: "Tienes que rellenar el nombre de la empresa",
                icon: "error",
            });
            return false;

        }
    }
    var message = document.getElementById('message');
    var mail = document.getElementById("mail").value;
    var contra = document.getElementById("contra").value;
    var nom_perfil = document.getElementById("nom_perfil").value;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {

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
    } else if (/^ *$/.test(mail)) {
        swal.fire({
            title: "Error",
            text: "Debes añadir un email",
            icon: "error",
        });
        return false;
    } else if (/^ *$/.test(contra)) {
        swal.fire({
            title: "Error",
            text: "Debes añadir una contraseña",
            icon: "error",
        });
        return false;
    } else if (contra.lenght < 8) {
        swal.fire({
            title: "Error",
            text: "La contraseña debe tener 8 carácteres mínimo",
            icon: "error",
        });
    }
    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');
    /* En los tres casos se envian estos datos */
    formData.append('mail', mail);
    formData.append('contra', contra);
    formData.append('id_perfil', id_perfil);
    /* Si es trabajador ademas se envia lo siguiente */

    if (id_perfil == 2) {


        formData.append('nombre', document.getElementById('nombre').value);
        formData.append('apellido', document.getElementById('apellido').value);
        formData.append('edad', document.getElementById('edad').value);
    }

    /* Si es empresa ademas se envia lo siguiente */
    if (id_perfil == 3) {

        formData.append('nom_emp', document.getElementById('nom_emp').value);
        formData.append('loc_emp', document.getElementById('loc_emp').value);
        formData.append('about_emp', document.getElementById('about_emp').value);
        formData.append('campo_emp', document.getElementById('campo_emp').value);
        formData.append('searching', document.getElementById('searching').value);
        formData.append('vacante', document.getElementById('vacante').value);
        formData.append('logo_emp', document.getElementById('logo_emp').files[0]);

    }

    var ajax = objetoAjax();

    ajax.open("POST", "crearuser", true);

    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);

            if (respuesta.resultado == "OK") {

                message.innerHTML = '<p class="green">Usuario creado correctamente</p>';

            } else {

                message.innerHTML = 'Ha habido un error: ' + respuesta.resultado;

            }

            leerJS();
            document.getElementById('sitioform').innerHTML = "";

        }

    }

    ajax.send(formData)

}


function actualizarmodal(id, id_perfil) {

    document.getElementById('sitioform').innerHTML = "";
    var modal = document.getElementById("myModal");
    var modalcontent = document.getElementById("modal-content");
    var formData = new FormData();

    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'POST');

    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();

    ajax.open("POST", "mostrarmodaluser/" + id + "/" + id_perfil, true);

    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);
            var usuarios = respuesta.usuarios;

            recargamodal = "";
            recargamodal += '<form method="POST" onsubmit="modificarJS(\'' + id + '\',\'' + id_perfil + '\'); return false;" id="formactualizar" enctype="multipart/form-data">';
            recargamodal += '<div class="form-group">';
            recargamodal += '<label class="col-sm-2 col-form-label">Correo:</label>';
            recargamodal += '<input type="email" class="form-control" id="mail" name="mail" value="' + usuarios.mail + '">';
            recargamodal += '</div>';
            recargamodal += '<div class="form-group">';
            recargamodal += '<label class="col-sm-2 col-form-label">Contraseña:</label>';
            recargamodal += '<input type="password" class="form-control" id="contra" name="contra" value="' + usuarios.contra + '">';
            recargamodal += '</div>';
            recargamodal += '<div class="form-group">';
            recargamodal += '<label class="col-sm-2 col-form-label">Estado:</label>';
            recargamodal += '<input type="number" class="form-control" id="estado" name="estado" value="' + usuarios.estado + '">';
            recargamodal += '</div>';
            /* si quieres modificar trabajador, añades lo siguiente */
            if (id_perfil == 2) {

                var trabajador = respuesta.trabajador;

                recargamodal += '<div class="form-group">';
                recargamodal += '<label class="col-sm-2 col-form-label">Nombre:</label>';
                recargamodal += '<input type="text" class="form-control" id="nombre" name="nombre" value="' + trabajador.nombre + '">';
                recargamodal += '</div>';
                recargamodal += '<div class="form-group">';
                recargamodal += '<label class="col-sm-2 col-form-label">Edad:</label>';
                recargamodal += '<input type="date" class="form-control" id="edad" name="edad" value="' + trabajador.edad + '">';
                recargamodal += '</div>';
                recargamodal += '<div class="form-group">';
                recargamodal += '<label class="col-sm-2 col-form-label">Mostrado:</label>';
                recargamodal += '<input type="number" class="form-control" id="mostrado" name="mostrado" value="' + trabajador.mostrado + '">';
                recargamodal += '</div>';
                recargamodal += '<div class="form-group">';
                recargamodal += '<label class="col-sm-2 col-form-label">Foto:</label>';
                recargamodal += '<input type="file" class="form-control" id="foto_perfil" name="foto_perfil">';
                recargamodal += '</div>';
            }

            /* si quieres modificar empresa, añades lo siguiente */
            if (id_perfil == 3) {

                var empresa = respuesta.empresa;

                recargamodal += '<div class="form-group">';
                recargamodal += '<label class="col-sm-2 col-form-label">Nombre:</label>';
                recargamodal += '<input type="text" class="form-control" id="nom_emp" name="nom_emp" value="' + empresa.nom_emp + '">';
                recargamodal += '</div>';
                recargamodal += '<div class="form-group">';
                recargamodal += '<label class="col-sm-2 col-form-label">Mostrado:</label>';
                recargamodal += '<input type="number" class="form-control" id="mostrado" name="mostrado" value="' + empresa.mostrado + '">';
                recargamodal += '</div>';
                recargamodal += '<div class="form-group">';
                recargamodal += '<label class="col-sm-2 col-form-label">Logo:</label>';
                recargamodal += '<input type="file" class="form-control" id="logo_emp" name="logo_emp">';
                recargamodal += '</div>';

            }

            recargamodal += '<button type="submit" class="btn btn-primary">Modificar</button>';
            recargamodal += '</form>';
            modalcontent.innerHTML = recargamodal;
            modal.style.display = "block";

        }

    }

    ajax.send(formData)

}


function modificarJS(id, id_perfil) {
    var mail = document.getElementById("mail").value;
    var contra = document.getElementById("contra").value;
    if (mail == '' || contra == '') {
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
    } else if (/^ *$/.test(mail)) {
        swal.fire({
            title: "Error",
            text: "Debes añadir un email",
            icon: "error",
        });
        return false;
    } else if (/^ *$/.test(contra)) {
        swal.fire({
            title: "Error",
            text: "Debes añadir una contraseña",
            icon: "error",
        });
        return false;
    } else if (contra.length < 8) {
        swal.fire({
            title: "Error",
            text: "La contraseña debe tener 8 carácteres mínimo",
            icon: "error",
        });
        return false;
    }
    if (id_perfil == 2) {
        var nombre = document.getElementById("nombre").value;
        var edad = document.getElementById("edad").value;
        var mostrado = document.getElementById("mostrado").value;
        var estado = document.getElementById("estado").value;

        if (edad == '' || mostrado == '' || estado == '' || nombre == '') {
            swal.fire({
                title: "Error",
                text: "Tienes que rellenar todos los datos",
                icon: "error",
            });
            return false;

        }
    }
    if (id_perfil == 3) {
        var nom_emp = document.getElementById("nom_emp").value;
        var mostrado = document.getElementById("mostrado").value;
        var estado = document.getElementById("estado").value;

        if (mostrado == '' || estado == '' || nom_emp == '') {
            swal.fire({
                title: "Error",
                text: "Tienes que rellenar todos los datos",
                icon: "error",
            });
            return false;
        }
    }
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', 'PUT');
    formData.append('mail', document.getElementById('mail').value);
    formData.append('estado', document.getElementById('estado').value);
    formData.append('contra', document.getElementById('contra').value);

    /* modificar trabajador */
    if (id_perfil == 2) {

        formData.append('nombre', document.getElementById('nombre').value);
        formData.append('edad', document.getElementById('edad').value);
        formData.append('foto_perfil', document.getElementById('foto_perfil').files[0]);
        formData.append('mostrado', document.getElementById('mostrado').value);

    }

    /* modificar empresa */
    if (id_perfil == 3) {

        formData.append('nom_emp', document.getElementById('nom_emp').value);
        formData.append('logo_emp', document.getElementById('logo_emp').files[0]);
        formData.append('mostrado', document.getElementById('mostrado').value);

    }

    var ajax = objetoAjax();

    ajax.open("POST", "modificaruser/" + id + "/" + id_perfil, true);

    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var respuesta = JSON.parse(this.responseText);

            leerJS();

        }

    }

    ajax.send(formData)
    var modal = document.getElementById("myModal");
    modal.style.display = "none";

}


//si solo quieres banear o restaurar una cuenta
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
            console.log(respuesta);
            mailusuario = respuesta.id_usuario[0].mail
            if (respuesta.hasOwnProperty('baneo')) {
                enviarcorreobaneo();
            }
            leerJS();

        }

    }

    ajax.send(formData)

}

// ------------------------------------------CORREOS ADMIN---------------------------------------------------------

function enviarcorreoadminJS() {
    console.log("hola");
    let destinatario = document.getElementById('destinatario').value;
    let asunto = document.getElementById('asunto').value;
    let mensaje = document.getElementById('mensaje').value;

    if (destinatario == '' || asunto == '' || mensaje == '') {
        swal.fire({
            title: "Error",
            text: "Tienes que rellenar todos los datos",
            icon: "error",
        });
        return false;

    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(destinatario)) { //mirar lo de poner solo por gmail
        document.getElementById("email").focus();
        document.getElementById("email").style.borderColor = "red";
        swal.fire({
            title: "Error",
            text: "Introduce un email correcto",
            icon: "error",
        });
        return false;
    } else if (destinatario.length > 100) {
        document.getElementById("mail").focus();
        document.getElementById("mail").style.borderColor = "red";
        swal.fire({
            title: "Error",
            text: "El email no puede ser más largo de 100 carácteres",
            icon: "error",
        });
        return false;
    }
    document.getElementById("myBtnadmin").disabled = true;
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', "POST");
    formData.append('destinatario', destinatario);
    formData.append('asunto', asunto);
    formData.append('mensaje', mensaje);
    var ajax = objetoAjax();
    ajax.open("POST", "enviarcorreoadmin", true);
    ajax.onreadystatechange = function() {
        console.log(ajax.responseText)
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            if (respuesta == "OK") {
                swal.fire({
                    title: "Mensaje Enviado",
                    text: "El destinatario recibirá tu mensaje en breves.",
                    showConfirmButton: false,
                    icon: "success",
                    allowOutsideClick: false,
                });
                setTimeout(() => { window.location.href = 'cPanelAdmin'; }, 5000);
            } else {
                swal.fire({
                    title: "Oops",
                    text: "Parece que ha habido un error, ponte en contacto con el administrador...Mierda si soy yo.",
                    icon: "error",
                });
                document.getElementById("myBtnadmin").disabled = false;
            }
        }
    }
    ajax.send(formData)
}

function enviarcorreoadmintrabajadoresJS() {
    let asuntotrabajador = document.getElementById('asuntotrabajador').value;
    let mensajetrabajador = document.getElementById('mensajetrabajador').value;

    if (asuntotrabajador == '' || mensajetrabajador == '') {
        swal.fire({
            title: "Error",
            text: "Tienes que rellenar todos los datos",
            icon: "error",
        });
        return false;

    }
    document.getElementById("myBtntrabajador").disabled = true;
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', "POST");
    formData.append('asuntotrabajador', asuntotrabajador);
    formData.append('mensajetrabajador', mensajetrabajador);
    var ajax = objetoAjax();
    ajax.open("POST", "enviarcorreoadmintrabajadores", true);
    ajax.onreadystatechange = function() {
        console.log(ajax.responseText)
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            if (respuesta == "OK") {
                swal.fire({
                    title: "Mensaje Enviado",
                    text: "Los destinatarios recibirán tu mensaje en breves.",
                    showConfirmButton: false,
                    icon: "success",
                    allowOutsideClick: false,
                });
                setTimeout(() => { window.location.href = 'cPanelAdmin'; }, 5000);
            } else {
                swal.fire({
                    title: "Oops",
                    text: "Parece que ha habido un error, ponte en contacto con el administrador...Mierda si soy yo.",
                    icon: "error",
                });
                document.getElementById("myBtntrabajador").disabled = false;
            }
        }
    }
    ajax.send(formData)
}

function enviarcorreoadminempresasJS() {
    let asuntoempresa = document.getElementById('asuntoempresa').value;
    let mensajeempresa = document.getElementById('mensajeempresa').value;

    if (asuntoempresa == '' || mensajeempresa == '') {
        swal.fire({
            title: "Error",
            text: "Tienes que rellenar todos los datos",
            icon: "error",
        });
        return false;

    }
    document.getElementById("myBtnempresa").disabled = true;
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', "POST");
    formData.append('asuntoempresa', asuntoempresa);
    formData.append('mensajeempresa', mensajeempresa);
    var ajax = objetoAjax();
    ajax.open("POST", "enviarcorreoadminempresas", true);
    ajax.onreadystatechange = function() {
        console.log(ajax.responseText)
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            if (respuesta == "OK") {
                swal.fire({
                    title: "Mensaje Enviado",
                    text: "Los destinatarios recibirán tu mensaje en breves.",
                    showConfirmButton: false,
                    icon: "success",
                    allowOutsideClick: false,
                });
                setTimeout(() => { window.location.href = 'cPanelAdmin'; }, 5000);
            } else {
                swal.fire({
                    title: "Oops",
                    text: "Parece que ha habido un error, ponte en contacto con el administrador...Mierda si soy yo.",
                    icon: "error",
                });
                document.getElementById("myBtnempresa").disabled = false;
            }
        }
    }
    ajax.send(formData)
}

function enviarcorreobaneo() {
    var formData = new FormData();
    formData.append('_token', document.getElementById('token').getAttribute("content"));
    formData.append('_method', "get");
    var ajax = objetoAjax();
    ajax.open("POST", "enviarcorreobaneo/" + mailusuario, true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            console.log(respuesta)
            if (respuesta == "OK") {
                swal.fire({
                    title: "Este usuario ha sido baneado",
                    text: "Se le mandará un correo al usuario para que este lo sepa.",
                    showConfirmButton: true,
                    icon: "success",
                });
            } else {
                alert("algo ha fallado al enviar el correo")
            }
        }
    }
    ajax.send(formData)
}


// ----------------------------------------FIN CORREOS ADMIN-------------------------------------------------------

//-----------------------------------------Pillar id para banear---------------------------