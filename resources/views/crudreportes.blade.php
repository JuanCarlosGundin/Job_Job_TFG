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
  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
    <li>
        <div class="form-check">
        <input class="form-check-input" type="checkbox" value="abierta" id="abierta" onclick="leerreportesJS()" checked>
        <label class="form-check-label" for="abierta">Abierta</label>
        </div>
    </li>
    <li>
        <div class="form-check">
        <input class="form-check-input" type="checkbox" value="cerrada" id="cerrada" onclick="leerreportesJS()" checked>
        <label class="form-check-label" for="cerrada">Cerrada</label>
        </div>
    </li>
</ul>
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