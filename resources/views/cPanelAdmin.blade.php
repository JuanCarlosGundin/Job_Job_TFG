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
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="../public/css/admin.css">
    <title>Administración</title>
</head>
<body class="mx-2">
    {{-- NAVBAR --}}
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">JobJob</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <button type="submit" class="btn btn-outline-secondary" onClick="window.location.href='logout';">Inicio</button>
            </li>
            <li class="nav-item m-1">
              <button type="button" class="btn btn-outline-secondary" onclick="crearadmin()">Crear</button>
            </li>
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
          </ul>
        </div>
        </div>
    </nav>
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
    <script src="js/admin.js"></script>
</body>
</html>