<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="csrf-token" id="token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="storage/uploads/logo.png">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <script src="https://kit.fontawesome.com/6d5e6cb8fd.js" crossorigin="anonymous"></script>
    <title>JobJob</title>
    <link rel="stylesheet" href="{!! asset('css/style-laura.css') !!}">
    <link rel="stylesheet" href="{!! asset('css/style-nocturno.css') !!}">
</head>
<body class="bodylogin">
    <button type="button" class="darkmodeswitch" id="switch" onclick="cambiarModo()"><span><i class="fa fa-sun-o"></i></span>   
        <span><i class="fa fa-moon-o"></i></span>
  </button>
    <div class="logo">
        <img src="storage/uploads/jobjob_logo.png">
    </div>
    <div id="main" class="modal-login">
        {{-- <div class="botones">
                <button class="btn-signin" onclick="login()">Sign In</button>
                <button class="btn-register" onclick="registrar()">Register</button>
        </div>
            <div id="main" class="modal-content-register-cuadrados">
    </div> --}}
    <script src="js/modo_nocturno.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</body>
</html>
