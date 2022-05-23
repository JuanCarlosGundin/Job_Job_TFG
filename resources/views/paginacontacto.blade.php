<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Formulario de contacto</title>
    <link rel="stylesheet" href="{!! asset('css/contacto.css') !!}">
    <link rel="stylesheet" href="{!! asset('css/style-nocturno.css') !!}">
    <!-- FONT AWESOME -->
    <script src="https://kit.fontawesome.com/6d5e6cb8fd.js" crossorigin="anonymous"></script>
    <!-- animacion de rebote formulario -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css">
    {{-- token --}}
    <meta name="csrf-token" id="token" content="{{ csrf_token() }}">
</head>

<body>
    <div class="area-botones horizontal">
        <button type="button" class="darkmodeswitch" id="switch" onclick="cambiarModo()">
            <span><i class="fa fa-sun-o"></i></span>   
            <span><i class="fa fa-moon-o"></i></span>
        </button>
        <a href="{!! asset('./') !!}" class="volver"><i class="fa-solid fa-angle-left"></i></a>    
    </div>
    <div class="content">

        {{--
        <h1 class="logo"><span>Contáctanos </span></h1> --}}
        <br><br><br><br>

        <div class="contact-wrapper animated bounceInUp">
            <div class="contact-form">
                <h3>CONTÁCTANOS </h3>
                <form method="POST" onsubmit="contactoJS(); return false;">
                    <p>
                        <label>Nombre</label>
                        <input type="text" name="nombre" id="nombre">
                    </p>
                    <p>
                        <label>Email</label>
                        <input type="text" name="email" id="email">
                    </p>
                    <p>
                        <label>Teléfono</label>
                        <input type="tel" name="telefono" id="telefono">
                    </p>
                    <p>
                        <label>Asunto</label>
                        <input type="text" name="asunto" id="asunto">
                    </p>
                    <p class="block">
                        <label>Mensaje</label>
                        <textarea name="mensaje" rows="3" id="mensaje"></textarea>
                    </p>
                    <p class="block">
                        <button type="submit" id="myBtn">
                            Enviar
                        </button>
                    </p>
                </form>
            </div>
            <div class="contact-info">
                <h4>Más información </h4>
                <ul>
                    <li><i class="fas fa-map-marker-alt"></i> Av. Mare de Déu de Bellvitge, 100, 110, 08907 L'Hospitalet de Llobregat, Barcelona</li><br>
                    <li><i class="fas fa-phone"></i> 933 35 15 43</li>
                    <li><i class="fas fa-envelope-open-text"></i> jobjobemp@gmail.com</li>
                </ul>
                <p>Al darle clic a enviar confirma en que sus datos sean tratados por JobJob</p>
                <p>JobJob.com</p>
            </div>
        </div>

    </div>
    <script src="js/ajaxcontacto.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="js/modo_nocturno.js"></script>
</body>

</html>