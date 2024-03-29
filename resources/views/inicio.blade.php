<!DOCTYPE HTML>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://kit.fontawesome.com/6d5e6cb8fd.js" crossorigin="anonymous"></script>
    <link rel="icon" href="storage/uploads/logo.png">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <title>Inicio</title>
    <link rel="stylesheet" href="{!! asset('css/style-laura.css') !!}">
    <link rel="stylesheet" href="{!! asset('css/style-nocturno.css') !!}">
    <meta name="csrf-token" id="token" content="{{ csrf_token() }}">
</head>
    <body class="bodylogin">
        <div class="area-botones">
            <button type="button" class="darkmodeswitch" id="switch" onclick="cambiarModo()"><span><i class="fa fa-sun-o"></i></span>   
                <span><i class="fa fa-moon-o"></i></span>
          </button>
        </div>
        <div class="logo">
            <img src="storage/uploads/jobjob_logo.png">
        </div>
        <div id="main" class="modal-login">
            {{-- Contenido Ajax --}}
        </div>
        <script src="js/inicio.js"></script>
        <script src="js/modo_nocturno.js"></script>
        <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    </body>
</html>