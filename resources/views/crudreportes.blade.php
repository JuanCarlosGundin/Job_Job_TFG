@if (!Session::get('id_user'))

    <?php
        //Si la session no esta definida te redirige al login.
        return redirect()->to('/')->send();
    ?>
    
@endif
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>GESTIONAR REPORTES</title>
    <meta name="csrf-token" id="token" content="{{ csrf_token() }}">
</head>
<body>
  <h2>Buscar reporte</h2>
    <input type="text" onkeyup="leerreportesJS()" id="filtro">
    <hr>
    <table id="main">
    </table>
    <hr>
    <p id="mensaje"></p>
    <hr>
    <script src="js/reportes.js"></script>
</body>
</html>