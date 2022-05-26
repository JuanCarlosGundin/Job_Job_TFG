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
      .modal {
                        display: none;
                        position: fixed;
                        z-index: 1;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        overflow: auto;
                        background-color: rgb(0, 0, 0);
                        background-color: rgba(0, 0, 0, 0.5);
                        .modal-content {
                            background-color: #fefefe;
                            margin: 10% auto;
                            border-radius: 25px;
                            padding: 20px;
                            border: 1px solid #888;
                            width: 50%;
                            height: 175%;
                            .linea {
                                margin: 0;
                                color: $grey;
                            }
                            .closecorreo {
                                color: #aaa;
                                float: right;
                                font-size: 25px;
                                font-weight: bold;
                                &:hover {
                                    color: black;
                                    text-decoration: none;
                                    cursor: pointer;
                                }
                            }
                            .contactar-usuario {
                                margin-bottom: 5vh;
                                .modal-title {
                                    font-size: x-large;
                                }
                                .input-modal {
                                    margin-top: 2vh;
                                    margin-bottom: 2vh;
                                    border-bottom-width: 2px;
                                    border-top-width: 0;
                                    border-left-width: 0;
                                    border-right-width: 0;
                                    border-color: $black;
                                    width: 100%;
                                    padding: 1vh;
                                    height: 40px;
                                    background-color: transparent;
                                    &:focus {
                                        outline: none;
                                    }
                                }
                                .text-modal {
                                    margin-top: 2vh;
                                    margin-bottom: 2vh;
                                    border-bottom-width: 2px;
                                    border-top-width: 0;
                                    border-left-width: 0;
                                    border-right-width: 0;
                                    border-color: $black;
                                    width: 100%;
                                    padding: 1vh;
                                    height: 80px;
                                    background-color: transparent;
                                    &:focus {
                                        outline: none;
                                    }
                                }
                                .btn-modal-flex {
                                    justify-content: center;
                                    display: flex;
                                    align-items: center;
                                    .btn-modal {
                                        background-color: #FFFFFF;
                                        border: 1px solid rgba(0, 0, 0, 0.5);
                                        border-radius: 15px;
                                        box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
                                        color: rgba(0, 0, 0, 0.85);
                                        cursor: pointer;
                                        padding: calc(.875rem - 1px) calc(1.5rem - 1px);
                                        transition: all 250ms;
                                        touch-action: manipulation;
                                        width: 50%;
                                        &:hover {
                                            transform: translateY(-2.5px);
                                        }
                                        &:focus {
                                            border-color: rgba(0, 0, 0, 0.5);
                                            box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
                                            color: rgba(0, 0, 0, 0.65);
                                        }
                                        &:active {
                                            background-color: #F0F0F1;
                                            border-color: rgba(0, 0, 0, 0.5);
                                            box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
                                            color: rgba(0, 0, 0, 0.65);
                                            transform: translateY(0);
                                        }
                                    }
                                }
                            }
                            .contactar-trabajador {
                                margin-top: 5vh;
                                margin-bottom: 5vh;
                                .modal-title {
                                    font-size: x-large;
                                }
                                .input-modal {
                                    margin-top: 2vh;
                                    margin-bottom: 2vh;
                                    border-bottom-width: 2px;
                                    border-top-width: 0;
                                    border-left-width: 0;
                                    border-right-width: 0;
                                    border-color: $black;
                                    width: 100%;
                                    padding: 1vh;
                                    height: 50px;
                                    background-color: transparent;
                                    &:focus {
                                        outline: none;
                                    }
                                }
                                .text-modal {
                                    margin-top: 2vh;
                                    margin-bottom: 2vh;
                                    border-bottom-width: 2px;
                                    border-top-width: 0;
                                    border-left-width: 0;
                                    border-right-width: 0;
                                    border-color: $black;
                                    width: 100%;
                                    padding: 1vh;
                                    height: 80px;
                                    background-color: transparent;
                                    &:focus {
                                        outline: none;
                                    }
                                }
                                .btn-modal-flex {
                                    justify-content: center;
                                    display: flex;
                                    align-items: center;
                                    .btn-modal {
                                        background-color: #FFFFFF;
                                        border: 1px solid rgba(0, 0, 0, 0.5);
                                        border-radius: 15px;
                                        box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
                                        color: rgba(0, 0, 0, 0.85);
                                        cursor: pointer;
                                        font-size: 16px;
                                        margin: 0;
                                        min-height: 3rem;
                                        padding: calc(.875rem - 1px) calc(1.5rem - 1px);
                                        transition: all 250ms;
                                        touch-action: manipulation;
                                        width: 50%;
                                        &:hover {
                                            transform: translateY(-2.5px);
                                        }
                                        &:focus {
                                            border-color: rgba(0, 0, 0, 0.5);
                                            box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
                                            color: rgba(0, 0, 0, 0.65);
                                        }
                                        &:active {
                                            background-color: #F0F0F1;
                                            border-color: rgba(0, 0, 0, 0.5);
                                            box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
                                            color: rgba(0, 0, 0, 0.65);
                                            transform: translateY(0);
                                        }
                                    }
                                }
                            }
                            .contactar-empresa {
                                margin-top: 5vh;
                                .modal-title {
                                    font-size: x-large;
                                }
                                .input-modal {
                                    margin-top: 2vh;
                                    margin-bottom: 2vh;
                                    border-bottom-width: 2px;
                                    border-top-width: 0;
                                    border-left-width: 0;
                                    border-right-width: 0;
                                    border-color: $black;
                                    width: 100%;
                                    padding: 1vh;
                                    height: 40px;
                                    background-color: transparent;
                                    &:focus {
                                        outline: none;
                                    }
                                }
                                .text-modal {
                                    margin-top: 2vh;
                                    margin-bottom: 2vh;
                                    border-bottom-width: 2px;
                                    border-top-width: 0;
                                    border-left-width: 0;
                                    border-right-width: 0;
                                    border-color: $black;
                                    width: 100%;
                                    padding: 1vh;
                                    height: 80px;
                                    background-color: transparent;
                                    &:focus {
                                        outline: none;
                                    }
                                }
                                .btn-modal-flex {
                                    justify-content: center;
                                    display: flex;
                                    align-items: center;
                                    .btn-modal {
                                        background-color: #FFFFFF;
                                        border: 1px solid rgba(0, 0, 0, 0.5);
                                        border-radius: 15px;
                                        box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
                                        color: rgba(0, 0, 0, 0.85);
                                        cursor: pointer;
                                        font-size: 16px;
                                        margin: 0;
                                        padding: calc(.875rem - 1px) calc(1.5rem - 1px);
                                        transition: all 250ms;
                                        touch-action: manipulation;
                                        width: 50%;
                                        &:hover {
                                            transform: translateY(-2.5px);
                                        }
                                        &:focus {
                                            border-color: rgba(0, 0, 0, 0.5);
                                            box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
                                            color: rgba(0, 0, 0, 0.65);
                                        }
                                        &:active {
                                            background-color: #F0F0F1;
                                            border-color: rgba(0, 0, 0, 0.5);
                                            box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
                                            color: rgba(0, 0, 0, 0.65);
                                            transform: translateY(0);
                                        }
                                    }
                                }
                            }
                        }
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
                    <select name="incidencia" id="incidencia" >
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
                    <textarea name="desarrollar_incidencia" rows="3" id="desarrollar_incidencia" placeholder="Si es necesario puedes desarrollar aquí tu incidencia."></textarea>
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