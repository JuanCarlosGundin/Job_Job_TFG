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
    <style>
        @page { 
            margin: 0; 
            padding: 0;
        }
        /* @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-weight: normal;
          src: url(https://rsms.me/inter/inter.css) format('truetype');
        }
        @font-face {
          font-family: 'Inter-Bold';
          font-style: normal;
          font-weight: 700;
          src: url(../../../../../vendor/dompdf/dompdf/lib/fonts/Inter-Bold.ttf) format('truetype');
        } */
        /* body{
            font-family: 'Helvetica','Sans-serif';
        } */
    </style>
</head>
<body class="cv-1">
    <?php 
    $curriculum=json_decode($trabajador->curriculum);
    ?>
    <div class="row row-principal">
        <div class="with-region-sidebar col-sm-4">
            <div class="cv-region-sidebar">
                <div class="titulo-trabajador">
                    <p class="nombre_trabajador">{{ $trabajador->nombre }} {{ $trabajador->apellido }}</p>
                    <p class="campo_trabajador">{{ $trabajador->campo_user }}</p>
                </div>
                <div class="personal-info">
                    <div class="header">
                        <p>Información Personal</p>
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
                        <p>Habilidades</p>
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
                        <p>Idiomas</p>
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
                    <p class="seccion-titulo">Experiencia Profesional</p>
                    <table>
                        @foreach ($curriculum->experiencia as $experiencia)
                            <tr class="experiencia item">
                                <td class="left">
                                    <p class="duracion">{{ $experiencia->año_entrada }} - {{ $experiencia->año_salida }}</p>
                                </td>
                                <td class="right">
                                    <p class="nombre">{{ $experiencia->nombre_experiencia }}</p>
                                    <p class="lugar">{{ $experiencia->lugar_experiencia }}</p>
                                    <p class="descripcion">{{ $experiencia->funciones }}</p>
                                </td>
                            </tr>
                        @endforeach
                    </table>        
                </div>
                <hr>
                <div class="formacion-wrapper">
                    <p class="seccion-titulo">Formación</p>
                    <table>
                        @foreach ($curriculum->estudios as $formacion)
                            <tr class="formacion item">
                                <td class="left">
                                    <p class="duracion">{{ $formacion->año_entrada }} - {{ $formacion->año_salida }}</p>
                                </td>
                                <td class="right">
                                    <p class="nombre">{{ $formacion->nombre_formación }}</p>
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