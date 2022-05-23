<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://kit.fontawesome.com/6d5e6cb8fd.js" crossorigin="anonymous"></script>
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="{{asset('css/style-laura.css')}}">
    <link rel="stylesheet" href="{!! asset('css/style.css') !!}">
    <link rel="stylesheet" href="{!! asset('css/style-nocturno.css') !!}">
    <meta name="csrf-token" id="token" content="{{ csrf_token() }}">
    <title>Document</title>
</head>
<body class="bodylogin">
    <div class="area-botones">
        <button type="button" class="darkmodeswitch" id="switch" onclick="cambiarModo()">
            <span><i class="fa fa-sun-o"></i></span>   
            <span><i class="fa fa-moon-o"></i></span>
        </button>
        <a href="{!! asset('./inicio') !!}" class="volver"><i class="fa-solid fa-angle-left"></i></a>    
    </div>
    <div id="main" class="modal-login">
        <main class="login-form">
            <div class="cotainer">
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="card">
                            <div class="card-header">
                                <h2>Restablecer Contraseña</h2>
                            </div>
                            <div class="card-body">
            
                              @if (Session::has('message'))
                                   <div class="alert alert-success" role="alert">
                                      {{ Session::get('message') }}
                                  </div>
                              @endif
            
                                <form action="{{ route('forget.password.post') }}" method="POST">
                                    @csrf
                                    <div class="form-group row">
                                        <label for="email_address" class="col-md-4 col-form-label text-md-right">Dirección de correo electrónico</label>
                                        <div class="col-md-6 validacion">
                                            <input type="text" placeholder="Correo Electrónico" id="email_address" class="form-control" name="mail" required autofocus>
                                            @if ($errors->has('mail'))
                                                <span class="text-danger">{{ $errors->first('mail') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="col-md-6 offset-md-4">
                                        <button type="submit" class="btn btn-primary">
                                            Enviar enlace para restablecer contraseña
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </main>
    </div>
    <script src="js/modo_nocturno.js"></script>
</body>
</html>