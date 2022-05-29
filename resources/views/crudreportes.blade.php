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
  <link rel="stylesheet" href="../public/css/style-pol.css">
  <title>GESTIONAR REPORTES</title>
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
          {{-- <input type="text" onkeyup="leerreportesJS()" id="filtro"> --}}
          <input class="form-control me-2" type="search" placeholder="Incidencia" onkeyup="leerreportesJS()" id="filtro" aria-label="Search">
        </form>
        
        <div class="navbar-right">
          {{-- MODAL USUARIO --}}
          <li class="div-btn-reportes">
            <button class="btn-reportes" id="myBtnreportes" onClick="window.location.href='cPanelAdmin';"><i class="fa-solid fa-person"></i></button>
          </li>
          <li class="div-btn-stats">
            <button class="btn-stats" id="myBtnstats" onClick="window.location.href='graficas';"><i class="fa-solid fa-chart-column"></i></button>
          </li>
          <li class="div-btn-logout">
            <button type="submit" class="btn-logout" onClick="window.location.href='logout';">LOGOUT <i class="fa-solid fa-right-from-bracket"></i> </button>
          </li>
        </div>
      </ul>
    </div>
    </div>
</nav>
    <hr>
    <table id="main">
    </table>
    <hr>
    <p id="mensaje"></p>
    <hr>
    <script src="js/reportes.js"></script>
</body>
</html>