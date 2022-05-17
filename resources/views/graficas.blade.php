<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Gráficas admin</title>
    <meta name="csrf-token" id="token" content="{{ csrf_token() }}">

</head>
<style>
    div{
        width:30%;
    }
</style>
<body>
    <div>
        <h2>Trabajadores y empresas registradas</h2>
        <canvas id="numerousers"></canvas>
        <h2>Localización empresas</h2>
        <canvas id="locaempresas"></canvas>
        <h2>Localización trabajadores</h2>
        <canvas id="locatrabajadores"></canvas>
        <h2>Usuarios creados por mes</h2>
        <canvas id="usuarioscreados"></canvas>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="js/graficas.js"></script>
</body>
</html>