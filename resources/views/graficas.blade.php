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
    
.divgrande {
    width: 100%;
    border: 1px solid black;
    overflow: hidden; /* add this to contain floated children */
}
.numerousers {
    width: 40%;
    float:left; 
    border: 1px solid red;
}
.usuariosmostrados {
    width: 40%;
    border: 1px solid green;
    float: left;
}
    
</style>
<body>
    <div class="divgrande">
            <div class="numerousers">
                <h2>Trabajadores y empresas registradas</h2>
                <canvas id="numerousers"></canvas>
            </div>
            <div class="usuariosmostrados">
                <h2>Trabajadores y empresas mostrados</h2>
            <canvas id="usuariosmostrados"></canvas>
            </div>
            <h2>Localización empresas</h2>
            <canvas id="locaempresas"></canvas>
            <h2>Localización trabajadores</h2>
            <canvas id="locatrabajadores"></canvas>
            <h2>Usuarios creados por mes</h2>
            <canvas id="usuarioscreados"></canvas>
            <h2>Media de edad de los trabajadores</h2>
            <canvas id="mediaedad"></canvas>
        
    </div>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="js/graficas.js"></script>
</body>
</html>