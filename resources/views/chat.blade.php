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
    <link rel="stylesheet" href="{!! asset('css/style.css') !!}">
    <title>Chat</title>
</head>

<body>
    <div class="region-navbar">
        <div class="curriculum-navbar">
            <button class="icon"><i class="fa-solid fa-file-invoice"></i></button>
        </div>
        <div class="alerts-navbar">
            <button id="navbar-alerts-icon" class="icon"><i class="fa-solid fa-bell"></i></button>
        </div>
        <div class="main-navbar">
            <button id="navbar-main-icon" class="main-icon"><i class="fa-solid fa-briefcase"></i></button>
        </div>
        <div class="chat-navbar active">
           <button class="icon active-icon" ><i class="fa-solid fa-comment-dots"></i></button>
        </div>
        <div class="profile-navbar">
            <button id="navbar-profile-icon" class="icon"><i class="fa-solid fa-user"></i></button>
        </div>
    </div>

    {{-- <div class="chat">
        <div class="chats">
            <button class="chat-foto-btn">
                <div class="chat-foto">
                    <img class="chat-profilefoto" src="storage/uploads/usuario.png">
                </div>
            </button>
            <div class="chat-content">
                <div class="chat-name">
                    <p class="chat-name-text">Nombre de muestra</p>
                </div>
                <div class="chat-mensaje">
                    <p class="chat-mensaje-text">Mensaje de muestra</p>
                </div>
            </div>
            <div class="chat-alert">
                <p class="chat-hora">15:46</p>
            </div>
        </div>
        <div class="div-linea">
            <hr class="chat-linea">
        </div>
        <div class="chats">
            <button class="chat-foto-btn">
                <div class="chat-foto">
                    <img class="chat-profilefoto" src="storage/uploads/usuario.png">
                </div>
            </button>
            <div class="chat-content">
                <div class="chat-name">
                    <p class="chat-name-text">Nombre de muestra</p>
                </div>
                <div class="chat-mensaje">
                    <p class="chat-mensaje-text">Mensaje de muestra</p>
                </div>
            </div>
            <div class="chat-alert">
                <p class="chat-hora">15:46</p>
            </div>
        </div>
        <div class="div-linea">
            <hr class="chat-linea">
        </div>
    </div> --}}

    <div class="main-chat">
        <div class="chat-main-sticky">
            <div class="chat-main-user">
                <div class="chat-main-return">
                    <button class="return-btn" onclick="(); return false;">
                        <div class="return-icon">
                            <i class="fa-solid fa-angle-left"></i>
                        </div>
                    </button>
                </div>                
                <div class="chat-main-foto">
                    <img class="chat-profilefoto" src="storage/uploads/usuario.png">
                </div>
                <div class="chat-main-name">
                    <p class="chat-name">Nombre de muestra<p>
                </div>
            </div>
            <div class="chat-main-curve">
            </div>
        </div>
        <div class="chat-main-content">
            <div class="chat-mensaje-inicio">
                <div class="mensaje-inicio">
                    <p class="mensaje-text">Bienvenido al chat</p>
                </div>
            </div>
            <div class="chat-mensaje-1">
                <p class="mensaje-text">nvfnvfnj</p>
                <p class="mensaje-hora">20:45</p>          
            </div>
            <div class="chat-mensaje-2">
                <p class="mensaje-text">nvfnvfn jnvfnvfn nvfnvfnjnv fnvfnjnv fnvfnj</p>
                <p class="mensaje-hora">20:45</p>                    
            </div>
            <div class="chat-mensaje-1">
                <p class="mensaje-text">nvfnvfnj</p>
                <p class="mensaje-hora">20:45</p>          
            </div>
            <div class="chat-mensaje-2">
                <p class="mensaje-text">nvfnvfn jnvfnvfn nvfnvfnjnv fnvfnjnv fnvfnj</p>
                <p class="mensaje-hora">20:45</p>                    
            </div>
            <div class="chat-mensaje-1">
                <p class="mensaje-text">nvfnvfnj</p>
                <p class="mensaje-hora">20:45</p>          
            </div>
            <div class="chat-mensaje-2">
                <p class="mensaje-text">nvfnvfn jnvfnvfn nvfnvfnjnv fnvfnjnv fnvfnj</p>
                <p class="mensaje-hora">20:45</p>                    
            </div>
            <div class="chat-mensaje-1">
                <p class="mensaje-text">nvfnvfnj</p>
                <p class="mensaje-hora">20:45</p>          
            </div>
            <div class="chat-mensaje-2">
                <p class="mensaje-text">nvfnvfn jnvfnvfn nvfnvfnjnv fnvfnjnv fnvfnj</p>
                <p class="mensaje-hora">20:45</p>                    
            </div>
            <div class="chat-mensaje-1">
                <p class="mensaje-text">nvfnvfnj</p>
                <p class="mensaje-hora">20:45</p>          
            </div>
            <div class="chat-mensaje-2">
                <p class="mensaje-text">nvfnvfn jnvfnvfn nvfnvfnjnv fnvfnjnv fnvfnj</p>
                <p class="mensaje-hora">20:45</p>                    
            </div>
            <div class="chat-mensaje-1">
                <p class="mensaje-text">nvfnvfnj</p>
                <p class="mensaje-hora">20:45</p>          
            </div>
            <div class="chat-mensaje-2">
                <p class="mensaje-text">nvfnvfn jnvfnvfn nvfnvfnjnv fnvfnjnv fnvfnj</p>
                <p class="mensaje-hora">20:45</p>                    
            </div>
            <div class="chat-mensaje-1">
                <p class="mensaje-text">nvfnvfnj</p>
                <p class="mensaje-hora">20:45</p>          
            </div>
            <div class="chat-mensaje-2">
                <p class="mensaje-text">nvfnvfn jnvfnvfn nvfnvfnjnv fnvfnjnv fnvfnj</p>
                <p class="mensaje-hora">20:45</p>                    
            </div>
            <div class="chat-mensaje-1">
                <p class="mensaje-text">nvfnvfnj</p>
                <p class="mensaje-hora">20:45</p>          
            </div>
            <div class="chat-mensaje-2">
                <p class="mensaje-text">nvfnvfn jnvfnvfn nvfnvfnjnv fnvfnjnv fnvfnj</p>
                <p class="mensaje-hora">20:45</p>                    
            </div>
            <div class="chat-mensaje-1">
                <p class="mensaje-text">nvfnvfnj</p>
                <p class="mensaje-hora">20:45</p>          
            </div>
            <div class="chat-mensaje-2">
                <p class="mensaje-text">nvfnvfn jnvfnvfn nvfnvfnjnv fnvfnjnv fnvfnj</p>
                <p class="mensaje-hora">20:45</p>                    
            </div>
        </div>
        <div class="chat-main-send">
            <div class="chat-input">
                <input type="text" class="chat-input-mensaje" id="nombre" name="nombre" value="" placeholder="Mensaje...">
            </div>
            <div class="chat-send">
                <button class="boton-send">
                    <i class="fa-solid fa-paper-plane"></i>
                </button>
            </div>
        </div>
    </div>

    {{-- <div class="alerts">
        <div class="filter">
            <div class="buscador">
                <input class="input-buscar" type="search" id="filter" name="filter" onkeyup="leernotificacionesJS()" placeholder="Buscar por nombre">
            </div>
            <div class="buscador-icon">
                <i class="fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
        <div id="zonaalerts">
            {{-- Alertas ajax
        </div>
    </div>
    <script src="js/notificaciones.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script> --}}
</body>

</html>