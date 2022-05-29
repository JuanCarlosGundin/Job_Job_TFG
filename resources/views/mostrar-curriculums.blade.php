<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" href="storage/uploads/logo.png">
    <script src="https://kit.fontawesome.com/15d3106c42.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="{!! asset('css/style-pol.css') !!}">
    <link rel="stylesheet" href="{!! asset('css/style.css') !!}">
    <link rel="stylesheet" href="{!! asset('css/style-curriculum.css') !!}">
    <link rel="stylesheet" href="{!! asset('css/style-nocturno.css') !!}">
    <title>PERFIL</title>
</head>

<body>
    <div class="row principal">
        <div class="column region-navbar">
            <div id='img_logo' class="row barra-navbar-img">
                <img src="storage/uploads/jobjob_logo_black.png">
            </div>
            <div class="row menu">
                <div class="row menu-item">
                    <button id="navbar-PT-icon" class="icon"><i class="fa-solid fa-file-invoice"></i><p class="text">Curriculum</p></button>
                </div>
                <div class="row menu-item">
                    <button id="navbar-alerts-icon" class="icon"><i class="fa-solid fa-bell"></i><p class="text">Notificaciones</p></button>
                </div>
                <div class="row menu-item">
                    <button id="navbar-main-icon" class="icon"><i class="fa-solid fa-briefcase"></i><p class="text">Swiper</p></button>
                </div>
                <div class="row menu-item">
                    <button id="navbar-chat-icon" class="icon" ><i class="fa-solid fa-comment-dots"></i><p class="text">Chat</p></button>
                </div>
                <div class="row menu-item active">
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
            <div class="column ver-perfil">
                <div id="contenidoajax">
                    <!-- {{-- contenido ajax --}} -->
                    <div class="region-plantillas">
                        <div class="row">
                            <div class="column col-sm-3">
                                <a href="{{ url('./curriculum/plantilla1') }}">
                                    <img src="{!! asset('storage/img/plantilla1.png') !!}" alt="plantilla" class="tilt">
                                </a> 
                            </div>
                            <div class="column col-sm-3">
                                <a href="{{ url('./curriculum/plantilla2') }}">
                                    <img src="{!! asset('storage/img/plantilla2.png') !!}" alt="plantilla" class="tilt">
                                </a>
                            </div>
                            <div class="column col-sm-3">
                                <a href="{{ url('./curriculum/plantilla3') }}">
                                    <img src="{!! asset('storage/img/plantilla3.png') !!}" alt="plantilla" class="tilt">
                                </a>
                            </div>
                            <div class="column col-sm-3">
                                <a href="{{ url('./curriculum/plantilla4') }}">
                                    <img src="{!! asset('storage/img/plantilla4.png') !!}" alt="plantilla" class="tilt">
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- {{-- Eliminar cuenta modalbox --}} -->
    <div id="modal-eliminar" class="modal-eliminar-user">
        <div class="modal-content" id="modal_content">
        </div>
    </div>
    <script src="{!! asset('js/hover_plantillas.js') !!}"></script>
    <script src="js/mostrarcurriculum.js"></script>
    <script src="js/modo_nocturno.js"></script>
    <!-- <script src="js/perfil.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script> -->

</body>

</html>