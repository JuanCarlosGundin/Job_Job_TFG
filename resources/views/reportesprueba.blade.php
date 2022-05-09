<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PAL MODAL</title>
    <meta name="csrf-token" id="token" content="{{ csrf_token() }}">
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
        border-radius: 25px 25px 25px 25px;
        padding: 20px;
        border: 1px solid #888;
        width: 50%; /* Could be more or less, depending on screen size */
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
        /*ESTILOS FORMULARIO*/
        input[type=submit] {
            text-transform: uppercase;
            width: 50%;
            padding: 1em;
            border-radius: 15px;
            background-color: #005EA0;
            border: #92AFD7 solid 1.5px;
            box-shadow: 6px 4px 4px rgba(206, 203, 203, 0.993);
            color: white;
            font-weight: bold;
            height: 7vh;
            margin-top: 1rem;
        }
        h3{
            text-align: center;
        }
        form{
            background-color: hsla(240,100%,50%, 0.2);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-radius: 25px 25px 25px 25px;
        }
        textarea{
            background:rgba(255,255,255, 0.4);
            height: 80px;
            padding: 5px;
            width: 40%;
        }
        select {
            background:rgba(255,255,255, 0.4);
            font-size: 14px;
            height: 30px;
            padding: 5px;
            width: 40%;
        }
        
        /* FIN ESTILOS FORMULARIO */
        /*RESPONSIVE*/
        @media only screen and (max-width: 768px) {
            input[type=submit] {
                width: 80%; /* The width is 100%, when the viewport is 800px or smaller */
            }
            h3{
            text-align: center;
        }
        form{
            background-color: hsla(240,100%,50%, 0.2);
            display: flex;
            width: 100%;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-radius: 25px 25px 25px 25px;
        }
        .modal-content {
        background-color: #fefefe;
        margin: 15% auto; /* 15% from the top and centered */
        border-radius: 25px 25px 25px 25px;
        padding: 20px;
        border: 1px solid #888;
        width: 80%; /* Could be more or less, depending on screen size */
        }
        /* form{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        } */
        select {
            background:rgba(255,255,255, 0.4);
            font-size: 14px;
            height: 30px;
            padding: 5px;
            width: 250px;
        }
        textarea{
            background:rgba(255,255,255, 0.4);
            height: 10%;
            padding: 10%;
            width: 50%;
        }
            }
        /*FIN RESPONSIVE*/
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
<button id="myBtn">Reportar</button>

<!-- The Modal -->
<div id="myModal" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <span class="close">&times;</span>
    
                <form method="POST" onsubmit="reportesJS(); return false;">
                    <br>
                    <h2>Reportar a un usuario</h2>
                    <br>
                    <select name="incidencia" id="incidencia" required>
                        <option value="">Seleccione el motivo del reporte</option>
                        <option value="Es spam">Es spam</option>
                        <option value="Esta cuenta se hace pasar por mi u otra persona">Esta cuenta se hace pasar por mí o alguien más</option>
                        <option value="Suicidio o autolesion">Suicidio o autolesión</option>
                        <option value="Venta de productos ilegales o regulados">Venta de productos ilegales o regulados</option>
                        <option value="Desnudos o actividad sexual">Desnudos o actividad sexual</option>
                        <option value="Lenguaje o simbolos que incitan al odio">Lenguaje o símbolos que incitan al odio</option>
                        <option value="Violencia u organizaciones peligrosas">Violencia u organizaciones peligrosas</option>
                        <option value="Bullying o acoso">Bullying o acoso</option>
                        <option value="Infracción de la propiedad intelectual">Infracción de la propiedad intelectual</option>
                        <option value="Fraude">Fraude</option>
                        <option value="Informacion falsa">Información falsa</option>
                    </select>
                    <br><br>
                    <textarea name="desarrollar_incidencia" rows="3" id="desarrollar_incidencia" placeholder="Si es necesario puedes desarrollar aquí tu incidencia." required></textarea>
                    <br><br>
                    <input type="hidden" name="id_reportado" id="id_reportado" value="60">
                    <input type="hidden" name="id_reportador" id="id_reportador" value="61">
                    <input type="submit" value="Enviar reporte"><br>
                </form>
            
  </div>

</div>
    {{-- FIN MODAL --}}
    <script src="js/ajaxreportes.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</body>
</html>