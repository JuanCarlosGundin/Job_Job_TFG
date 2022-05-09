<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <title>JobJob</title>
    <link rel="stylesheet" href="{!! asset('css/style.css') !!}">
</head>
<body class="body-index">
    <div class="menu-index">
        <form action="{{url('login')}}" method="GET">
            <button class="btn-register">Iniciar sesión</button>
        </form>
    </div>
    <h1>JobJob</h1>
    <h2>Encuentra trabajo con tan solo deslizar</h2>
    <form action="{{url('registrar')}}" method="GET">
        <button class="btn-index">Empezar</button>
    </form>
    <section>
  <svg id="wave" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1366 358.67"><path class="cls-1" d="M0,200s300-140,683,-10,683,0,683,0V400H0Z" transform="translate(0 -41.33)"/></svg>
</section>
<section id="content">
</section>
</body>
</html>
