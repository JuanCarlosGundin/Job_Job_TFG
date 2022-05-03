<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://kit.fontawesome.com/6d5e6cb8fd.js" crossorigin="anonymous"></script>
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
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contact">¡Contactanos!</a></li>
            <li><form style="display:inline;" action="{{url('login')}}" method="GET">
                <button class="btn-register">Iniciar sesión</button>
                </form></li>
            </div>
    </div>
    <div class="column-3">
    <h2>Encuentra trabajo con tan solo deslizar</h2><br>
    <h3>Gracias a JobJob podrás encontrar el trabajo de tus sueños ya que contamos con las mejores empresas del sector tecnológico.</h3>
    <form action="{{url('registrar')}}" method="GET">
        <button class="btn-index">Empezar</button>
    </form>
    </div>
    <div class="column-4">
        <img src="storage/uploads/movil_ordenador.png">
    </div>
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
        <i class="fa-solid fa-user"></i>
        <h1>Perfil</h1>
        <h3>Podrás ver el perfil de las empresas y trabajadores que te interesen</h3>
    </div>
    <div class="video">
        <h1>aqui va el video</h1>
    </div>
        <div class="footer" id="footer-izquierda">
        <h1>JobJob</h1>
        <p>La manera más fácil de encontrar trabajo tecnológico</p>
        </div>
        <div class="footer">
        <h2>Más información</h2>
        <a href="">Home</a><br><br>
        <a href="">FAQ</a><br><br>
        <a href="">Contacto</a>
        </div>
        <div class="footer">
        <h2>¿Tienes alguna duda?</h2>
        <p><i class="fa-solid fa-envelope"></i> jobjob@gmail.com</p>
        <p><i class="fa-solid fa-phone"></i> +34 608 71 28 31</p>
        </div>
</body>
</html>
