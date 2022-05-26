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
                    <button id="navbar-PT-icon" class="icon"><i class="fa-solid fa-file-invoice"></i><p class="text">Prueba técnica</p></button>
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
            {{-- <div class="chat">
                <div class="chats">
                    <div class="chat-div-flex">
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
                    </div>
                    <div class="chat-div-right">
                        <div class="chat-alert">
                            <p class="chat-hora">15:46</p>
                        </div>
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
                    <div class="mensaje-1">
                        <div class="chat-mensaje-1">
                            <div class="mensaje-text-div">
                                <p class="mensaje-text">Lorem ipsum dolor sit amet</p>
                            </div>
                            <div class="mensaje-hora-div">
                                <p class="mensaje-hora">20:45</p>
                            </div>    
                        </div>
                    </div>
                    <div class="mensaje-2">
                        <div class="chat-mensaje-2">
                            <div class="mensaje-text-div">
                                <p class="mensaje-text">Lorem ipsum dolor sit amet</p>
                            </div>
                            <div class="mensaje-hora-div">
                                <p class="mensaje-hora">20:45</p>
                            </div>    
                        </div>
                    </div>
                    <div class="mensaje-2">
                        <div class="chat-mensaje-2">
                            <div class="mensaje-text-div">
                                <p class="mensaje-text">Al contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente texto aleatorio. Tiene sus raices en una pieza cl´sica de la literatura del Latin, que data del año 45 antes de Cristo, haciendo que este adquiera mas de 2000 años de antiguedad. Richard McClintock, un profesor de Latin de la Universidad de Hampden-Sydney en Virginia, encontró una de las palabras más oscuras de la lengua del latín, "consecteur", en un pasaje de Lorem Ipsum, y al seguir leyendo distintos textos del latín, descubrió la fuente indudable. Lorem Ipsum viene de las secciones 1.10.32 y 1.10.33 de "de Finnibus Bonorum et Malorum" (Los Extremos del Bien y El Mal) por Cicero, escrito en el año 45 antes de Cristo. Este libro es un tratado de teoría de éticas, muy popular durante el Renacimiento. La primera linea del Lorem Ipsum, "Lorem ipsum dolor sit amet..", viene de una linea en la sección 1.10.32</p>
                            </div>
                            <div class="mensaje-hora-div">
                                <p class="mensaje-hora">20:45</p>
                            </div>    
                        </div>
                    </div>
                    <div class="mensaje-1">
                        <div class="chat-mensaje-1">
                            <div class="mensaje-text-div">
                                <p class="mensaje-text">Lorem ipsum dolor sit amet</p>
                            </div>
                            <div class="mensaje-hora-div">
                                <p class="mensaje-hora">20:45</p>
                            </div>    
                        </div>
                    </div>
                    <div class="mensaje-2">
                        <div class="chat-mensaje-2">
                            <div class="mensaje-text-div">
                                <p class="mensaje-text">Lorem ipsum dolor sit amet</p>
                            </div>
                            <div class="mensaje-hora-div">
                                <p class="mensaje-hora">20:45</p>
                            </div>    
                        </div>
                    </div>
                    <div class="mensaje-2">
                        <div class="chat-mensaje-2">
                            <div class="mensaje-text-div">
                                <p class="mensaje-text">Al contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente texto aleatorio. Tiene sus raices en una pieza cl´sica de la literatura del Latin, que data del año 45 antes de Cristo, haciendo que este adquiera mas de 2000 años de antiguedad. Richard McClintock, un profesor de Latin de la Universidad de Hampden-Sydney en Virginia, encontró una de las palabras más oscuras de la lengua del latín, "consecteur", en un pasaje de Lorem Ipsum, y al seguir leyendo distintos textos del latín, descubrió la fuente indudable. Lorem Ipsum viene de las secciones 1.10.32 y 1.10.33 de "de Finnibus Bonorum et Malorum" (Los Extremos del Bien y El Mal) por Cicero, escrito en el año 45 antes de Cristo. Este libro es un tratado de teoría de éticas, muy popular durante el Renacimiento. La primera linea del Lorem Ipsum, "Lorem ipsum dolor sit amet..", viene de una linea en la sección 1.10.32</p>
                            </div>
                            <div class="mensaje-hora-div">
                                <p class="mensaje-hora">20:45</p>
                            </div>    
                        </div>
                    </div>
                    <div class="mensaje-1">
                        <div class="chat-mensaje-1">
                            <div class="mensaje-text-div">
                                <p class="mensaje-text">Al contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente texto aleatorio. Tiene sus raices en una pieza cl´sica de la literatura del Latin, que data del año 45 antes de Cristo, haciendo que este adquiera mas de 2000 años de antiguedad. Richard McClintock, un profesor de Latin de la Universidad de Hampden-Sydney en Virginia, encontró una de las palabras más oscuras de la lengua del latín, "consecteur", en un pasaje de Lorem Ipsum, y al seguir leyendo distintos textos del latín, descubrió la fuente indudable. Lorem Ipsum viene de las secciones 1.10.32 y 1.10.33 de "de Finnibus Bonorum et Malorum" (Los Extremos del Bien y El Mal) por Cicero, escrito en el año 45 antes de Cristo. Este libro es un tratado de teoría de éticas, muy popular durante el Renacimiento. La primera linea del Lorem Ipsum, "Lorem ipsum dolor sit amet..", viene de una linea en la sección 1.10.32</p>
                            </div>
                            <div class="mensaje-hora-div">
                                <p class="mensaje-hora">20:45</p>
                            </div>    
                        </div>
                    </div>
                    <div class="mensaje-1">
                        <div class="chat-mensaje-1">
                            <div class="mensaje-text-div">
                                <p class="mensaje-text">Lorem ipsum dolor sit amet</p>
                            </div>
                            <div class="mensaje-hora-div">
                                <p class="mensaje-hora">20:45</p>
                            </div>    
                        </div>
                    </div>
                    <div class="mensaje-2">
                        <div class="chat-mensaje-2">
                            <div class="mensaje-text-div">
                                <p class="mensaje-text">Lorem ipsum dolor sit amet</p>
                            </div>
                            <div class="mensaje-hora-div">
                                <p class="mensaje-hora">20:45</p>
                            </div>    
                        </div>
                    </div>
                    <div class="mensaje-2">
                        <div class="chat-mensaje-2">
                            <div class="mensaje-text-div">
                                <p class="mensaje-text">Al contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente texto aleatorio. Tiene sus raices en una pieza cl´sica de la literatura del Latin, que data del año 45 antes de Cristo, haciendo que este adquiera mas de 2000 años de antiguedad. Richard McClintock, un profesor de Latin de la Universidad de Hampden-Sydney en Virginia, encontró una de las palabras más oscuras de la lengua del latín, "consecteur", en un pasaje de Lorem Ipsum, y al seguir leyendo distintos textos del latín, descubrió la fuente indudable. Lorem Ipsum viene de las secciones 1.10.32 y 1.10.33 de "de Finnibus Bonorum et Malorum" (Los Extremos del Bien y El Mal) por Cicero, escrito en el año 45 antes de Cristo. Este libro es un tratado de teoría de éticas, muy popular durante el Renacimiento. La primera linea del Lorem Ipsum, "Lorem ipsum dolor sit amet..", viene de una linea en la sección 1.10.32</p>
                            </div>
                            <div class="mensaje-hora-div">
                                <p class="mensaje-hora">20:45</p>
                            </div>    
                        </div>
                    </div>
                    <div class="mensaje-1">
                        <div class="chat-mensaje-1">
                            <div class="mensaje-text-div">
                                <p class="mensaje-text">Al contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente texto aleatorio. Tiene sus raices en una pieza cl´sica de la literatura del Latin, que data del año 45 antes de Cristo, haciendo que este adquiera mas de 2000 años de antiguedad. Richard McClintock, un profesor de Latin de la Universidad de Hampden-Sydney en Virginia, encontró una de las palabras más oscuras de la lengua del latín, "consecteur", en un pasaje de Lorem Ipsum, y al seguir leyendo distintos textos del latín, descubrió la fuente indudable. Lorem Ipsum viene de las secciones 1.10.32 y 1.10.33 de "de Finnibus Bonorum et Malorum" (Los Extremos del Bien y El Mal) por Cicero, escrito en el año 45 antes de Cristo. Este libro es un tratado de teoría de éticas, muy popular durante el Renacimiento. La primera linea del Lorem Ipsum, "Lorem ipsum dolor sit amet..", viene de una linea en la sección 1.10.32</p>
                            </div>
                            <div class="mensaje-hora-div">
                                <p class="mensaje-hora">20:45</p>
                            </div>    
                        </div>
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
        </div>
    </div>


    <script src="js/notificaciones.js"></script>
    <script src="js/modo_nocturno.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</body>

</html>