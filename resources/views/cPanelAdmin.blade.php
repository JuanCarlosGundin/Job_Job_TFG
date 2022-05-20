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
    <meta name="csrf-token" id="token" content="{{ csrf_token() }}">
    <link rel="icon" href="storage/uploads/logo.png">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <script src="https://kit.fontawesome.com/15d3106c42.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="../public/css/admin.css">
    <link rel="stylesheet" href="../public/css/correoadmin.css">
    <link rel="stylesheet" href="../public/css/style-pol.css">
    <title>Administración</title>
</head>
<body class="admin">
    {{-- NAVBAR --}}
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">JobJob</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">  
            <form class="d-flex">
              <input class="form-control me-2" type="search" placeholder="Correo" onkeyup="leerJS()" id="filcorreo" aria-label="Search">
              <input class="form-control me-2" type="search" placeholder="Nombre" onkeyup="leerJS()" id="filtro" aria-label="Search">
            </form>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Categorias
              </a>    
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                      <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="Admin" id="adm" onclick="leerJS()" checked>
                      <label class="form-check-label" for="adm">Administradores</label>
                      </div>
                  </li>
                  <li>
                      <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="Trabajador" id="tbjd" onclick="leerJS()" checked>
                      <label class="form-check-label" for="tbjd">Trabajadores</label>
                      </div>
                  </li>
                  <li>
                      <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="Empresa" id="emp" onclick="leerJS()" checked>
                      <label class="form-check-label" for="emp">Empresas</label>
                      </div>
                  </li>
              </ul>
            </li>
            <div class="navbar-right">
              {{-- MODAL USUARIO --}}
              <li class="div-btn-enviar-correo">
                <button class="btn-enviar-correo" id="myBtncorreo"><i class="fa-solid fa-envelope"></i> ENVIAR CORREO</button>
              </li>
              <div id="myModalcorreo" class="modal">
                  <div class="modal-content">
                    <div class="closecorreo-div">
                      <span class="closecorreo">&times;</span>
                    </div>
                    <div class="contactar-usuario">
                      <form method="POST" onsubmit="enviarcorreoadminJS(); return false;">
                        <h2 class="modal-title">CONTACTAR USUARIO</h2>
                        <input class="input-modal" type="text" name="destinatario" id="destinatario" placeholder="Introduce el destinatario">
                        <input class="input-modal" type="text" name="asunto" id="asunto" placeholder="Introduce el asunto">
                        <textarea class="text-modal" name="mensaje" rows="3" id="mensaje" placeholder="Introduce el mensaje"></textarea>
                        <div class="btn-modal-flex">
                          <button class="btn-modal" type="submit" id="myBtncorreo">
                            ENVIAR
                          </button>
                        </div>   
                      </form>
                    </div>
                    <hr class="linea"> 
                    <div class="contactar-trabajador">
                      <form method="POST" onsubmit="enviarcorreoadmintrabajadoresJS(); return false;">
                        <h2 class="modal-title">CONTACTAR TRABAJADORES</h2>
                        <input class="input-modal" type="text" name="asuntotrabajador" id="asuntotrabajador" placeholder="Introduce el asunto">
                        <textarea class="text-modal" name="mensajetrabajador" rows="3" id="mensajetrabajador" placeholder="Introduce el mensaje"></textarea>
                        <div class="btn-modal-flex">
                          <button class="btn-modal" type="submit" id="myBtncorreo">
                            ENVIAR
                          </button>
                        </div>   
                      </form>
                    </div>
                    <hr class="linea"> 
                    <div class="contactar-empresa">
                      <form method="POST" onsubmit="enviarcorreoadminempresasJS(); return false;">
                        <h2 class="modal-title">CONTACTAR EMPRESAS</h2>
                        <input class="input-modal" type="text" name="asuntoempresa" id="asuntoempresa" placeholder="Introduce el asunto">
                        <textarea class="text-modal" name="mensajeempresa" rows="3" id="mensajeempresa" placeholder="Introduce el mensaje"></textarea>
                        <div class="btn-modal-flex">
                          <button class="btn-modal" type="submit" id="myBtncorreo">
                            ENVIAR
                          </button>
                        </div>   
                      </form>
                    </div>                             
                  </div>
              </div>
              {{-- FIN MODAL USUARIO --}} 
              <li class="div-btn-crear">
                <button type="button" class="btn-crear" onclick="crearadmin()">CREAR</button>
              </li>
              <li class="div-btn-logout">
                <button type="submit" class="btn-logout" onClick="window.location.href='logout';">LOGOUT <i class="fa-solid fa-right-from-bracket"></i> </button>
              </li>
            </div>
          </ul>
        </div>
        </div>
    </nav>
    <div class="content">
      <div id="sitioform">
        {{-- contenido crear --}}
      </div>
      <div id="message">
        {{-- mensaje --}}
      </div>
      <div>
          <div class="table-responsive" id="tablaadmin">
              {{-- contenido ajax administrador --}}
          </div>
          <div class="table-responsive" id="tablatrab">
              {{-- contenido ajax trabajador --}}
          </div>
          <div class="table-responsive" id="tablaemp">
              {{-- contenido ajax empresa --}}
          </div>
      </div>
      {{-- MODAL --}}
      <div id="myModal" class="modal">
          <div>
              <span class="close">&times;</span>
          </div>
          <div id="modal-content" class="modal-content">
          </div>
      </div>
    </div>
    <script src="js/admin.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</body>
</html>