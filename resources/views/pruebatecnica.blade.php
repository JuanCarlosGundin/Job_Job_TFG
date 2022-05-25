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
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" id="token" content="{{ csrf_token() }}">
    <script src="https://kit.fontawesome.com/15d3106c42.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="{!! asset('css/style.css') !!}">
    <title>Prueba Tecnica</title>
</head>
<body>
    <div class="region-navbar">
        <div class="curriculum-navbar">
            <button id="navbar-PT-icon" class="icon"><i class="fa-solid fa-file-invoice"></i></button>
        </div>
        <div class="alerts-navbar">
            <button id="navbar-alerts-icon" class="icon"><i class="fa-solid fa-bell"></i></button>
        </div>
        <div class="main-navbar">
            <button id="navbar-main-icon" class="main-icon"><i class="fa-solid fa-briefcase"></i></button>
        </div>
        <div class="chat-navbar">
           <button id="navbar-chat-icon" class="icon" ><i class="fa-solid fa-comment-dots"></i></button>
        </div>
        <div class="profile-navbar active-right">
            <button id="navbar-profile-icon" class="icon active-icon"><i class="fa-solid fa-user"></i></button>
        </div>
    </div>
    <div id="contenidoajax">
        {{-- Contenido AJAX --}}
    </div>
    <script src="js/pruebatecnica.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</body>
</html>