@if (!Session::get('id_user'))
    <?php
        //Si la sesion no esta definida te redirige al login.
        return redirect()->to('/')->send();
    ?>
@endif
<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>WebSocker Client</title>

    <meta name="csrf-token" id="token" content="{{ csrf_token() }}">

</head>

<body>
    <input type="hidden" id=Chanel value="none">
    <p id="estado"></p><br/>
    <p>NOMBRE DE USUARIO</p>
    <button onclick=sender()>Enviar</button><button onclick=cerrar()>Cerra</button><button onclick=abrir()>abrir</button><br>
    <input type="text" id="test"><br>

    <div id="chat">

    </div>

</body>
<script src="js/chat.js"></script>
</html>