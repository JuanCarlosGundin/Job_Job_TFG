<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Curriculum vitae</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
    <script src="https://kit.fontawesome.com/15d3106c42.js" crossorigin="anonymous"></script>
    <link href="{{ asset('css/style-curriculum.css') }}" rel="stylesheet" type="text/css" />
</head>
<body class="cv-3">
    <?php 
    $curriculum=json_decode($trabajador->curriculum);
    ?>
    <div class="main-page">
        <div class="sub-page">
            <div class="row">
                <div class="with-region-content col-sm-12">
                    <div class="cv-region-content">
                        <div class="row region-personal">
                            <div class="titulo-trabajador col-sm-12">
                                <h1>{{ $trabajador->nombre }} {{ $trabajador->apellido }}</h1>
                                <h6>{{ $trabajador->campo_user }}</h6>
                            </div>
                        </div>
                        <hr>
                        <div class="row region-informacion">
                            <div class="left col-sm-6">
                                <div class="row">
                                    <div class="col-sm-12 objetivo-profesional">
                                        <h2 class="title">PERFIL</h2>
                                        <p class="sidebar-block">{{ $trabajador->about_user }}</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12 personal-info">
                                        <h2 class="title">SOBRE MI</h2>
                                        <div class="email">
                                            <i class="fa-solid fa-envelope"></i>
                                            <p class="valor-item">{{ $trabajador->mail }}</p>
                                        </div>
                                        @if (isset($trabajador->telefono))
                                            <div class="telefono">
                                                <i class="fa-solid fa-phone"></i>
                                                <p class="valor-item">{{ $trabajador->telefono }}</p>
                                            </div>
                                        @endif
                                        @if (isset($trabajador->linkedin))
                                            <div class="linkedin">
                                                <i class="fa-brands fa-linkedin"></i>
                                                <a class="valor-item" href="{{ $trabajador->linkedin }}">{{ $trabajador->linkedin }}</a>
                                            </div>
                                        @endif
                                        @if (isset($trabajador->github))
                                        <div class="github">
                                            <i class="fa-brands fa-github"></i>
                                            <a class="valor-item" href="{{ $trabajador->github }}">{{ $trabajador->github }}</a>
                                        </div>
                                        @endif
                                    </div>
                                </div>
                                @if (isset($curriculum->habilidades))
                                    <div class="row">
                                        <div class="skills col-sm-12">
                                            <h2 class="title">HABILIDADES</h2>
                                            <div class="sidebar-block">               
                                            @foreach ($curriculum->habilidades as $habilidad)
                                                <div class="habilidad">
                                                    <p class="nombre-item">{{$habilidad->nombre_habilidad}}</p>
                                                    <span class="percent">
                                                        <div class="{{$habilidad->nivel_habilidad}}"></div>
                                                    </span>
                                                </div>
                                            @endforeach
                                            </div>
                                        </div>
                                    </div>
                                @endif
                            </div>
                            <div class="right col-sm-6">
                                <div class="row">
                                    <div class="col-sm-12 experiencia-wrapper">
                                        <h2 class="title">EXPERIENCIA PROFESIONAL</h2>
                                        @foreach ($curriculum->experiencia as $experiencia)
                                            <div class="row experiencia item">
                                                <div class="col-sm-4">
                                                    <p class="lugar">{{ $experiencia->lugar_experiencia }}</p>
                                                    <p class="duracion">{{ $experiencia->año_entrada }} - {{ $experiencia->año_salida }}</p>
                                                </div>
                                                <div class="col-sm-8">
                                                    <h6 class="nombre">{{ $experiencia->nombre_experiencia }}</h6>
                                                    <p class="descripcion">{{ $experiencia->funciones }}</p>
                                                </div>
                                            </div>
                                        @endforeach
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12 formacion-wrapper">
                                        <h2 class="title">FORMACIÓN</h2>
                                        @foreach ($curriculum->estudios as $formacion)
                                            <div class="row formacion item">
                                                <div class="col-sm-4">
                                                    <p class="duracion">{{ $formacion->año_entrada }} - {{ $formacion->año_salida }}</p>
                                                </div>
                                                <div class="col-sm-8">
                                                    <h6 class="nombre">{{ $formacion->nombre_formación }}</h6>
                                                    <p class="lugar">{{ $formacion->lugar_formación }}</p>
                                                    {{-- <p class="descripcion">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus a quidem quia optio eum ipsum exercitationem excepturi suscipit aperiam officia beatae dolor cupiditate.</p> --}}
                                                </div>
                                            </div>
                                        @endforeach
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12 idiomas">
                                        <h2 class="title">IDIOMAS</h2>
                                        @foreach ($curriculum->idiomas as $idioma)
                                        <div class="idioma">
                                            <p class="nombre-item">{{$idioma->nombre_idioma}}</p>
                                            <span class="percent">
                                                <div class="{{$idioma->nivel_idioma}}"></div>
                                            </span>
                                        </div>
                                    @endforeach
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    </div>
    




{{-- 

                    <th scope="row">{{ $trabajador->id_usuario }}</th>
                    <td>{{ $trabajador->nombre }}</td>
                    <td>{{ $trabajador->apellido }}</td>
                    <td>{{ $trabajador->edad }}</td>
                    <td>{{ $trabajador->about_user }}</td>
                    <td>{{ $trabajador->loc_trabajador }}</td>
                    <td>{{ $trabajador->campo_user }}</td>
                    <td>{{ $curriculum->experiencia->{'0'}->nombre_experiencia }}</td> --}}

</body>
</html>