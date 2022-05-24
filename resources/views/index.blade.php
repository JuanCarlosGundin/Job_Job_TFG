<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://kit.fontawesome.com/6d5e6cb8fd.js" crossorigin="anonymous"></script>
    <link rel="icon" href="storage/uploads/logo.png">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <title>JobJob</title>

    <link rel="stylesheet" href="{{asset('css/style-laura.css')}}">
    <link rel="stylesheet" href="{!! asset('css/style.css') !!}">
</head>
<body class="body-index">
    <div class="navbar-index">
            <div class="column-1">
            <li><img class="logo" src="storage/uploads/jobjob_logo_black.png"></li>
            </div>
            <div class="column-2">
            <li><button class="btn-navbar">FAQ</button></li>
            <li><button class="btn-navbar" onClick="window.location.href='paginacontacto';">Contáctanos</button></li>

            {{-- <li><a href="" class="fa-solid fa-right-to-bracket"></a></li> --}}
            <li><button class="btn-register" onClick="window.location.href='inicio';">Iniciar sesión</button></li>
            </div>
    </div>
    <div class="fila-1">
        <div class="column-3">
        <h2>Encuentra trabajo con tan solo deslizar</h2><br>
        <h3>Gracias a JobJob podrás encontrar el trabajo de tus sueños ya que contamos con las mejores empresas del sector tecnológico.</h3>
        <button class="btn-index" onClick="window.location.href='inicio';">Empezar</button>
        </div>
        <div class="column-4">
            <img src="storage/uploads/movil_ordenador.png">
        </div>
    </div>
    <div class="fila-2">
        <div class="column-5" id="primera-columna">
            <i class="fa-solid fa-arrow-right-arrow-left"></i>
            <h1>Swipe</h1>
            <h3>Desliza a la derecha si te interesa, desliza a la izquierda para descartar</h3>
        </div>
        <div class="column-5">
            <i class="fa-solid fa-file-lines"></i>
            <h1>Curriculum</h1>
            <h3>Te ayudamos a crear tu propio curriculum</h3>
        </div>
        <div class="column-5">
            <i class="fa-solid fa-comments"></i>
            <h1>Chat</h1>
            <h3>La empresa y el trabajador podrán comunicarse con comodidad mediante mensajes</h3>
        </div>
        <div class="column-5" id="ultima-columna">
            <i class="fa-solid fa-circle-check"></i>
            <h1>Pruebas técnicas</h1>
            <h3>Evalúa a los usuarios mediante una prueba para ver si es lo que buscas para tu empresa.</h3>
        </div>
    </div>
    <div class="video">
        <h1>aqui va el video</h1>
    </div>
    <div class="footer">
        <div class="footer-1">
        <h1>JobJob</h1>
        <p>La manera más fácil de encontrar trabajo tecnológico</p>
        </div>
        <div class="footer-2">
        <h2>Más información</h2>
        <a href="">Home</a><br><br>
        <a href="">FAQ</a><br><br>
        <a href="paginacontacto">Contacto</a>
        </div>
        <div class="footer-3">
        <h2>¿Tienes alguna duda?</h2>
        <p><i class="fa-solid fa-envelope"></i> jobjobemp@gmail.com</p><br><br>
        <p><i class="fa-solid fa-phone"></i>933 35 15 43</p>
        </div>
    </div>
</body>
</html>