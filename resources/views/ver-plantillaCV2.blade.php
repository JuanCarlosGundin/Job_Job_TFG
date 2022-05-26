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
<body class="cv-2 view">
    <?php 
    $curriculum=json_decode($trabajador->curriculum);
    ?>
    <div class="main-page">
        <div class="sub-page">
            <div class="row row-principal">
                <div class="with-region-sidebar col-sm-4">
                    <div class="cv-region-sidebar">
                        <div class="foto-trabajador">
                            <img src="../storage/{{$trabajador->foto_perfil}}" alt="foto-trabajador">
                            {{-- <img src="{{ asset('storage/img/usuario.png') }}" alt="foto-trabajador"> --}}
                        </div>
                        <div class="objetivo-profesional col-sm-12">
                            <div class="header">
                                <h5>SOBRE MI</h5>
                            </div>
                            <p class="sidebar-block">{{ $trabajador->about_user }}</p>
                        </div>
                        @if (isset($curriculum->habilidades))
                        <div class="skills col-sm-12">
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
                    
                        <div class="idiomas col-sm-12">
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
                        <table class="region-personal">
                            <tr>
                                <td class="titulo-trabajador col-sm-5">
                                    <p class="nombre_trabajador">{{ $trabajador->nombre }} {{ $trabajador->apellido }}</p>
                                    <p class="campo_trabajador">{{ $trabajador->campo_user }}</p>
                                </td>
                                <td class="personal-info col-sm-7">
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
                                </td>
                            </tr>
                        </table>
                        <hr>
                        <div class="experiencia-wrapper">
                            <p>Experiencia Profesional</p>
                            <table>
                                @foreach ($curriculum->experiencia as $experiencia)
                                    <tr class="experiencia item">
                                        <td class="col-sm-4">
                                            <p class="lugar">{{ $experiencia->lugar_experiencia }}</p>
                                            <p class="duracion">{{ $experiencia->año_entrada }} - {{ $experiencia->año_salida }}</p>
                                        </td>
                                        <td class="col-sm-8">
                                            <h6 class="nombre">{{ $experiencia->nombre_experiencia }}</h6>
                                            <p class="descripcion">{{ $experiencia->funciones }}</p>
                                        </td>
                                    </tr>
                                @endforeach
                            </table>
                        </div>
                        <hr>
                        <div class="formacion-wrapper">
                            <p>Formación</p>
                            <table>
                                @foreach ($curriculum->estudios as $formacion)
                                    <tr class="formacion item">
                                        <td class="col-sm-4">
                                            <p class="duracion">{{ $formacion->año_entrada }} - {{ $formacion->año_salida }}</p>
                                        </td>
                                        <td class="col-sm-8">
                                            <h6 class="nombre">{{ $formacion->nombre_formación }}</h6>
                                            <p class="lugar">{{ $formacion->lugar_formación }}</p>
                                            {{-- <p class="descripcion">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus a quidem quia optio eum ipsum exercitationem excepturi suscipit aperiam officia beatae dolor cupiditate.</p> --}}
                                        </td>
                                    </tr>
                                @endforeach
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    </div>
    <div class="botones">
        <button id="pdf2" onclick="window.location.href = '{{ url('./curriculum/pdf2') }}';">Descargar CV</button>
        <button onclick="window.location.href = '{{ url('./curriculum') }}';">Volver</button>
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