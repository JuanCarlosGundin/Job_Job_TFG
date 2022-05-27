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
    <link rel="stylesheet" href="{{asset('css/style-pol.css')}}">
    <link rel="stylesheet" href="{{asset('css/style-nocturno.css')}}">
    <link rel="stylesheet" href="{!! asset('css/style.css') !!}">
    <title>Chat</title>
</head>

<body>
    <div class="row principal">
        <div class="column region-navbar">
            <div class="row barra-navbar-img">
                <img src="storage/uploads/jobjob_logo_black.png">
            </div>
            <div class="row menu">
                <div class="row menu-item">
                    <button id="navbar-PT-icon" class="icon"><i class="fa-solid fa-file-invoice"></i><p class="text">Prueba tÃ©cnica</p></button>
                </div>
                <div class="row menu-item">
                    <button id="navbar-alerts-icon" class="icon"><i class="fa-solid fa-bell"></i><p class="text">Notificaciones</p></button>
                </div>
                <div class="row menu-item">
                    <button id="navbar-main-icon" class="icon"><i class="fa-solid fa-briefcase"></i><p class="text">Swiper</p></button>
                </div>
                <div class="row menu-item active-center">
                    <button id="navbar-chat-icon" class="icon" ><i class="fa-solid fa-comment-dots"></i><p class="text">Chat</p></button>
                </div>
                <div class="row menu-item">
                    <button id="navbar-profile-icon" class="icon"><i class="fa-solid fa-user"></i><p class="text">Perfil</p></button>
                </div>
            </div>
        </div>
        <div class="column region-content">
            <div class="row barra-navbar">
                <div class="barra-navbar-btn">
                    <div class="darkmode-btn">
                        <button type="button" class="darkmodeswitch" id="switch">
                            <span><i class="fa fa-sun-o"></i></span>   
                            <span><i class="fa fa-moon-o"></i></span>
                        </button>
                    </div>
                </div>
            </div>
            <div id='content'>
                <div id='chat' class="chat">
                    {{-- Contenido de los chats --}}
                </div>
            </div>
        </div>
    </div>


    <script src="js/chat.js"></script>
    <script src="js/modo_nocturno.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</body>
<script src="js/chat.js"></script>
</html>