<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PAL MODAL</title>
</head>
<body>
    {{-- ESTILOS MODAL --}}
    <style>
                /* The Modal (background) */
        .modal {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
        }

        /* Modal Content/Box */
        .modal-content {
        background-color: #fefefe;
        margin: 15% auto; /* 15% from the top and centered */
        padding: 20px;
        border: 1px solid #888;
        width: 80%; /* Could be more or less, depending on screen size */
        }

        /* The Close Button */
        .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
        }

        .close:hover,
        .close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
        }
        </style>
    {{-- FIN ESTILOS MODAL --}}
    <h1>DIABLO LOQUETE VAMO A ABRIRNO UN MODAL </h1><br>
    <h2>Esta pagina es de prueba pa cuando tenga lo del <br>
    meterselo por sesioneeeee^^^^¨¨¨¨EH</h2>
    <br><br><br>
    <h1>
        ABRETE MODAL!!!
    </h1>
    
    {{-- MODAL --}}
    <!-- Trigger/Open The Modal -->
<button id="myBtn">Open Modal</button>

<!-- The Modal -->
<div id="myModal" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <span class="close">&times;</span>
    <form onsubmit="reportesJS(); return false;">
        <p>Incidencia</p>
        <select name="incidencia" id="incidencia">
            <option value="Es spam">Es spam</option>
            <option value="Esta cuenta se hace pasar por mí u otra persona">Esta cuenta se hace pasar por mí o alguien más</option>
            <option value="Suicidio o autolesión">Suicidio o autolesión</option>
            <option value="Venta de productos ilegales o regulados">Venta de productos ilegales o regulados</option>
            <option value="Desnudos o actividad sexual">Desnudos o actividad sexual</option>
            <option value="Lenguaje o símbolos que incitan al odio">Lenguaje o símbolos que incitan al odio</option>
            <option value="Violencia u organizaciones peligrosas">Violencia u organizaciones peligrosas</option>
            <option value="Bullying o acoso">Bullying o acoso</option>
            <option value="Infracción de la propiedad intelectual">Infracción de la propiedad intelectual</option>
            <option value="Fraude">Fraude</option>
            <option value="Información falsa">Información falsa</option>
        </select>
        <p>Desarrollar incidencia</p>
        <textarea name="desarrollar_incidencia" rows="3" id="desarrollar_incidencia" placeholder="Si es necesario puedes desarrollar aquí tu incidencia"></textarea>
        <br><br>
        <input type="submit" value="Enviar reporte">
    </form>
  </div>

</div>
    {{-- FIN MODAL --}}
    <script src="js/ajaxreportes.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</body>
</html>