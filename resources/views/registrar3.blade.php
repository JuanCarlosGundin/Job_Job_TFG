<!DOCTYPE HTML>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://kit.fontawesome.com/6d5e6cb8fd.js" crossorigin="anonymous"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <title>Login</title>
    <link rel="stylesheet" href="{!! asset('css/style-laura.css') !!}">
    <link rel="stylesheet" href="{{asset('css/style.css')}}">

    <meta name="csrf-token" id="token" content="{{ csrf_token() }}">
</head>
    <body class="body-login">
        <div class="logo">
            <img src="storage/uploads/jobjob_logo.png">
        </div>
        <div id="main" class="modal-login">
            <div class="botones">
                <button style="background-color: white;" class="btn-signin" onclick="login()">Sign In</button>
                <button style="background-color: #F0F0F0; box-shadow: inset 0px 0px 5px rgb(206, 205, 205);" class="btn-register" onclick="registrar()">Register</button>
                </div>
                <div class="modal-content">
                <form method="POST" onsubmit="loginP(); return false;"  id="loginP">
                <h2>Introduce los datos</h2>
                <p>Nombre</p>
                <input class="inputlogin" type="text" name="mail" id="mail_login" placeholder="Introduce tu nombre"><br><br>
                <p>Apellido</p>
                <input class="inputlogin" type="password" name="contra" id="contra_login" placeholder="Introduce tu apellido"><br><br>
                <p>Fecha de nacimiento</p>
                <input class="inputlogin" type="password" name="contra" id="contra_login" placeholder="Fecha de nacimiento"><br><br>
                <p>Sector</p>
                <input class="inputlogin" type="password" name="contra" id="contra_login" placeholder="Introduce tu sector"><br>
                <button class= "botonlogin" type="submit" value="register">Continuar</button>
                </form>
                </div>
        </div>
    </body>
</html>