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
<body class="cv-3 view">
    <?php 
    $curriculum=json_decode($trabajador->curriculum);
    ?>
    <div class="main-page">
        <div class="sub-page">
            <div class="row-principal">
                <div class="with-region-content">
                    <div class="cv-region-content">
                        <div class="region-personal">
                            <div class="titulo-trabajador">
                                <p class="nombre_trabajador">{{ $trabajador->nombre }} {{ $trabajador->apellido }}</p>
                                <p class="campo_trabajador">{{ $trabajador->campo_user }}</p>
                            </div>
                        </div>
                        <hr>
                        <div class="region-informacion">
                            <table class="">
                                <tr class="fila fila1">
                                    <td class="">
                                        <div class="col-sm-12 objetivo-profesional">
                                            <p class="title">PERFIL</p>
                                            <p class="sidebar-block">{{ $trabajador->about_user }}</p>
                                        </div>
                                    </td>
                                    <td class="">
                                        <div class="col-sm-12 experiencia-wrapper">
                                            <p class="title">EXPERIENCIA PROFESIONAL</p>
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
                                    </td>
                                </tr>
                                <tr class="fila fila2">
                                    <td class="">
                                        <div class="col-sm-12 personal-info">
                                            <p class="title">SOBRE MI</p>
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
                                    </td>
                                    <td class="">
                                        <div class="col-sm-12 formacion-wrapper">
                                            <p class="title">FORMACIÓN</p>
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
                                    </td>

                                </tr>
                                <tr class="fila fila3">
                                    @if (isset($curriculum->habilidades))
                                        <td class="">
                                            <div class="skills col-sm-12">
                                                <p class="title">HABILIDADES</p>
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
                                        </td>
                                    @endif
                                    <td class="">
                                        <div class="col-sm-12 idiomas">
                                            <p class="title">IDIOMAS</p>
                                            @foreach ($curriculum->idiomas as $idioma)
                                            <div class="idioma">
                                                <p class="nombre-item">{{$idioma->nombre_idioma}}</p>
                                                <span class="percent">
                                                    <div class="{{$idioma->nivel_idioma}}"></div>
                                                </span>
                                            </div>
                                        @endforeach
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    </div>
    <div class="botones">
        <button id="pdf3" onclick="window.location.href = '{{ url('./curriculum/pdf3') }}';">Descargar CV</button>
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