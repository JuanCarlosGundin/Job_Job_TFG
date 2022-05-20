<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" href="storage/uploads/logo.png">
    <title>Curriculum vitae</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
    <link href="{{ asset('css/style-curriculum.css') }}" rel="stylesheet" type="text/css" />
</head>
<body class="cv-1 view">
    <?php 
    $curriculum=json_decode($trabajador->curriculum);
    ?>
    <div class="main-page">
        <div class="sub-page">
            <div class="row row-principal">
                <div class="with-region-sidebar col-sm-4">
                    <div class="cv-region-sidebar">
                        <div class="titulo-trabajador">
                            <h1>{{ $trabajador->nombre }} {{ $trabajador->apellido }}</h1>
                            <h6>{{ $trabajador->campo_user }}</h6>
                        </div>
                        <div class="personal-info">
                            <div class="header">
                                <h5>Información Personal</h5>
                            </div>
                            <div class="sidebar-block">
                                <div class="email">
                                    <p class="nombre-item">Email</p>
                                    <p class="valor-item">{{ $trabajador->mail }}</p>
                                </div>
                                @if (isset($trabajador->telefono))
                                    <div class="telefono">
                                        <p class="nombre-item">Teléfono</p>
                                        <p class="valor-item">{{ $trabajador->telefono }}</p>
                                    </div>
                                @endif
                                @if (isset($trabajador->linkedin))
                                    <div class="linkedin">
                                        <p class="nombre-item">Linkedin</p>
                                        <a class="valor-item" href="{{ $trabajador->linkedin }}">{{ $trabajador->linkedin }}</a>
                                    </div>
                                @endif
                                @if (isset($trabajador->github))
                                <div class="github">
                                    <p class="nombre-item">Github</p>
                                    <a class="valor-item" href="{{ $trabajador->github }}">{{ $trabajador->github }}</a>
                                </div>
                            @endif
                            </div>
                        </div>
                        @if (isset($curriculum->habilidades))
                        <div class="skills">
                            <div class="header">
                                <h5>Habilidades</h5>
                            </div>
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
                        @endif
                    
                        <div class="idiomas">
                            <div class="header">
                                <h5>Idiomas</h5>
                            </div>
                            <div class="sidebar-block">
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
                <div class="with-region-content col-sm-8">
                    <div class="cv-region-content">
                        <div class="objetivo-profesional">
                            {{ $trabajador->about_user }}
                        </div>
                        <hr>
                        <div class="experiencia-wrapper">
                            <h3>Experiencia Profesional</h3>
                            @foreach ($curriculum->experiencia as $experiencia)
                                <div class="row experiencia item">
                                    <div class="col-sm-3">
                                        <p class="duracion">{{ $experiencia->año_entrada }} - {{ $experiencia->año_salida }}</p>
                                    </div>
                                    <div class="col-sm-9">
                                        <h6 class="nombre">{{ $experiencia->nombre_experiencia }}</h6>
                                        <p class="lugar">{{ $experiencia->lugar_experiencia }}</p>
                                        <p class="descripcion">{{ $experiencia->funciones }}</p>
                                    </div>
                                </div>
                            @endforeach
                
                        </div>
                        <hr>
                        <div class="formacion-wrapper">
                            <h3>Formación</h3>
                            @foreach ($curriculum->estudios as $formacion)
                                <div class="row formacion item">
                                    <div class="col-sm-3">
                                        <p class="duracion">{{ $formacion->año_entrada }} - {{ $formacion->año_salida }}</p>
                                    </div>
                                    <div class="col-sm-9">
                                        <h6 class="nombre">{{ $formacion->nombre_formación }}</h6>
                                        <p class="lugar">{{ $formacion->lugar_formación }}</p>
                                        {{-- <p class="descripcion">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus a quidem quia optio eum ipsum exercitationem excepturi suscipit aperiam officia beatae dolor cupiditate.</p> --}}
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    </div>
    <div class="botones">
        <button id="pdf1">Descargar CV</button>
        <button>Volver</button>
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