@if (!Session::get('id_user'))
    <?php
        //Si la sesion no esta definida te redirige al login.
        return redirect()->to('/')->send();
    ?>
@endif
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://kit.fontawesome.com/15d3106c42.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="{{asset('css/style-laura.css')}}">
    <link rel="stylesheet" href="{{asset('css/style.css')}}">


    <script src="https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js" integrity="sha512-UXumZrZNiOwnTcZSHLOfcTs0aos2MzBWHXOHOuB0J/R44QB0dwY5JgfbvljXcklVf65Gc4El6RjZ+lnwd2az2g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.js" integrity="sha512-qRj8N7fxOHxPkKjnQ9EJgLJ8Ng1OK7seBn1uk8wkqaXpa7OA13LO6txQ7+ajZonyc9Ts4K/ugXljevkFTUGBcw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <meta name="csrf-token" id="token" content="{{ csrf_token() }}">
    <title>Home</title>
</head>
<body class="page-home">
  <div class="region-navbar">
    <!-- {{-- <div class="curriculum-navbar active-left">
        <button id="navbar-curriculum-icon" class="icon active-icon"><i class="fa-solid fa-file-invoice"></i></button>
    </div> --}} -->
    <div class="alerts-navbar">
        <button id="navbar-alerts-icon" class="icon"><i class="fa-solid fa-bell"></i></button>
    </div>
    <div class="main-navbar active">
        <button id="navbar-main-icon" class="main-icon active-icon" ><i class="fa-solid fa-briefcase"></i></button>
    </div>
    <!-- {{-- <div class="chat-navbar">
       <button id="navbar-chat-icon" class="icon" onClick="window.location.href='prueba3';"><i class="fa-solid fa-comment-dots"></i></button>
    </div> --}} -->
    <div class="profile-navbar">
        <button id="navbar-profile-icon" class="icon"><i class="fa-solid fa-user"></i></button>
    </div>

    <!-- {{-- <div class="curriculum">
        <h1 class="curriculum-title">COMING SOON...</h1>
    </div> --}} -->
  </div>
    <div class="region-content row" id="carta">
        
    </div>
    <script src="js/swiper.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
</body>

</html>