<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
    <h2>Encuentra trabajo con tan solo deslizar</h2>
    <h3>Encontrar trabajo nunca ha sido tan sencillo como en JobJob. </h3>
    <form action="{{url('registrar')}}" method="GET">
        <button class="btn-index">Empezar</button>
    </form>
    </div>
    <div class="column-4">
        <h1>prueba</h1>
    </div>
</body>
</html>
