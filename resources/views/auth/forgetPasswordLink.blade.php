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
                            <h2 class="card-header">Restablecer contraseña</h2>
                            <div class="card-body">
            
                                <form action="{{ route('reset.password.post') }}" method="POST">
                                    @csrf
                                    <input type="hidden" name="token" value="{{ $token }}">
                                    @if (Session::get('error'))
                                        <span class="alert-danger">{{Session::get('error')}}</span>
                                    @endif
            
                                    <div class="form-group row">
                                        <label for="email_address" class="col-md-4 col-form-label text-md-right">Dirección de correo electrónico</label>
                                        <div class="col-md-6 validacion">
                                            <input type="text" id="email_address" class="form-control" name="mail" placeholder="Correo Electrónico" required autofocus>
                                            @if ($errors->has('mail'))
                                                <span class="text-danger">{{ $errors->first('mail') }}</span>
                                            @endif
                                        </div>
                                    </div>
            
                                    <div class="form-group row">
                                        <label for="password" class="col-md-4 col-form-label text-md-right">Nueva contraseña</label>
                                        <div class="col-md-6 validacion">
                                            <input type="password" id="password" class="form-control" name="password"  placeholder="Contraseña" required autofocus>
                                            @if ($errors->has('password'))
                                                <span class="text-danger">{{ $errors->first('password') }}</span>
                                            @endif
                                        </div>
                                    </div>
            
                                    <div class="form-group row">
                                        <label for="password-confirm" class="col-md-4 col-form-label text-md-right">Confirmar contraseña</label>
                                        <div class="col-md-6 validacion">
                                            <input type="password" id="password-confirm" class="form-control" name="password_confirmation" placeholder="Confirmar contraseña" required autofocus>
                                            @if ($errors->has('password_confirmation'))
                                                <span class="text-danger">{{ $errors->first('password_confirmation') }}</span>
                                            @endif
                                        </div>
                                    </div>
            
                                    <div class="col-md-6 offset-md-4">
                                        <button type="submit" class="btn btn-primary">
                                            Restablecer contraseña
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
    <script src="../js/modo_nocturno.js"></script>
</body>
</html>