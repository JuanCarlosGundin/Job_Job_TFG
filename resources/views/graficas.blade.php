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
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
.divgrande {
    width: 100%;
    *border: 1px solid black;
    overflow: hidden; /* add this to contain floated children */
}
.numerousers {
    padding-left: 8%;
    padding-right: 5%;
    padding-top: 4%;
    width: 40%;
    float:left; 
}
.usuariosmostrados {
    padding-top: 4%;
    width: 40%;
    float: left;
}
.locatrabajadores {
    padding-top: 4%;
    width: 35%;
    float:left; 
}
.locaempresas {
    padding-left: 10%;
    padding-right: 10%;
    padding-top: 4%;
    width: 35%;
    float: left;
}
.usuarioscreados {
    padding-left: 8%;
    padding-right: 5%;
    padding-top: 4%;
    width: 40%;
    float:left; 
}
.mediaedad {
    width: 40%;
    padding-top: 4%;
    float: left;
}
h2{
    text-align: center;
    font-family: 'Inter', sans-serif;
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
            <div class="locaempresas">
                <h2>Localización empresas</h2>
                <canvas id="locaempresas"></canvas>
            </div>
            <div class="locatrabajadores">
                <h2>Localización trabajadores</h2>
                <canvas id="locatrabajadores"></canvas>
            </div>
            <div class="usuarioscreados">
                <h2>Usuarios creados por mes</h2>
                <canvas id="usuarioscreados"></canvas>
            </div>
            <div class="mediaedad">
                <h2>Media de edad de los trabajadores</h2>
                <canvas id="mediaedad"></canvas>
            </div>
            
        
    </div>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="js/graficas.js"></script>
</body>
</html>