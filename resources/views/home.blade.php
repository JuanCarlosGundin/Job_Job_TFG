@if  (!Session::get('id_user'))
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
    <script src="https://kit.fontawesome.com/15d3106c42.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="{{asset('css/style-arnau.css')}}">
    <link rel="stylesheet" href="{{asset('css/style-nocturno.css')}}">
    <link rel="stylesheet" href="{{asset('css/style.css')}}">
    <link rel="stylesheet" href="{{asset('css/stylemodalreportes.css')}}">


    <script src="https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js" integrity="sha512-UXumZrZNiOwnTcZSHLOfcTs0aos2MzBWHXOHOuB0J/R44QB0dwY5JgfbvljXcklVf65Gc4El6RjZ+lnwd2az2g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.js" integrity="sha512-qRj8N7fxOHxPkKjnQ9EJgLJ8Ng1OK7seBn1uk8wkqaXpa7OA13LO6txQ7+ajZonyc9Ts4K/ugXljevkFTUGBcw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <meta name="csrf-token" id="token" content="{{ csrf_token() }}">
    <title>Home</title>
</head>
<body class="page-home">
    <div class="row principal">
        <div class="column region-navbar">
            <div id='img_logo' class="row barra-navbar-img">
                <img src="storage/uploads/jobjob_logo_black.png">
            </div>
            <div class="row menu">
                <div class="row menu-item">
                    <button id="navbar-PT-icon" class="icon"><i class="fa-solid fa-file-invoice"></i><p class="text">Prueba técnica</p></button>
                </div>
                <div class="row menu-item">
                    <button id="navbar-alerts-icon" class="icon"><i class="fa-solid fa-bell"></i><p class="text">Notificaciones</p></button>
                </div>
                <div class="row menu-item active-center">
                    <button id="navbar-main-icon" class="icon"><i class="fa-solid fa-briefcase"></i><p class="text">Swiper</p></button>
                </div>
                <div class="row menu-item">
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
            <div class="region-swiper row">
                <div id="carta">
                </div>
            </div>
        </div>
    </div>

  {{-- <button type="button" class="darkmodeswitch" id="switch"><span><i class="fa fa-sun-o"></i></span>   
    <span><i class="fa fa-moon-o"></i></span>
</button> --}}

    <script src="js/swiper.js"></script>
    <script src="js/modo_nocturno.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
</body>

</html>