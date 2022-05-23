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
    <link rel="stylesheet" href="{!! asset('css/style-pol.css') !!}">
    <link rel="stylesheet" href="{{asset('css/style.css')}}">
    <title>PERFIL</title>
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
    <div class="vista-profile">
        <div class="categoria-edit">
            <div class="return">
                <button class="return-btn" onclick="mostrarperfilJS(); return false;">
                    <div class="return-icon">
                        <i class="fa-solid fa-angle-left"></i>
                    </div>
                    <p class="return-text">VOLVER</p>
                </button>
            </div>
            <div class="logout">
                <button class="logout-btn" onClick="window.location.href=`logout`;"><i class="fa-solid fa-pen"></i></button>
            </div>
        </div>
        <div class="categoria-profile">
            <div class="categoria">
                <div class="categoria-icon-name">
                    <div class="categoria-icon">
                        <i class="fa-solid fa-address-card"></i>
                    </div>
                    <div class="categoria-name">
                        <p class="categoria-p-name">Sobre mi</p>
                    </div>
                </div>
                <div class="categoria-linea">
                    <hr class="linea-divisoria">
                </div>
                <div class="categoria-text">
                    <p class="categoria-p-text">bruh momento</p>
                </div>
            </div>
            <div class="categoria">
                <div class="categoria-icon-name">
                    <div class="categoria-icon">
                        <i class="fa-solid fa-address-card"></i>
                    </div>
                    <div class="categoria-name">
                        <p class="categoria-p-name">Sobre mi</p>
                    </div>
                </div>
                <div class="categoria-linea">
                    <hr class="linea-divisoria">
                </div>
                <div class="categoria-text">
                    <p class="categoria-p-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                </div>
            </div>
        </div>
    </div>
    
    {{-- <div id="contenidoajax">
    </div> --}}
    {{-- Eliminar cuenta modalbox --}}
    <div id="modal-eliminar" class="modal-eliminar-user">
        <div class="modal-content" id="modal_content">
        </div>
    </div>
    <script src="js/perfil.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</body>
</html>