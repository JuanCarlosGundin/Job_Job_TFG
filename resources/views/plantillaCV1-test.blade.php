<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Curriculum vitae</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
    <link href="{{ asset('css/style-curriculum.css') }}" rel="stylesheet" type="text/css" />
</head>
<body class="cv-1">
    <div class="main-page">
        <div class="sub-page">
            <div class="row">
                <div class="with-region-sidebar col-sm-4">
                    <div class="cv-region-sidebar">
                        <div class="titulo-trabajador">
                            <h1>Juan Pérez Gómez</h1>
                            <h6>Web Developer</h6>
                        </div>
                        <div class="personal-info">
                            <div class="header">
                                <h5>Información Personal</h5>
                            </div>
                            <div class="sidebar-block">
                                <div class="email">
                                    <p class="nombre-item">Email</p>
                                    <p class="valor-item">juanperez@gmail.com</p>
                                </div>
                                <div class="telefono">
                                    <p class="nombre-item">Teléfono</p>
                                    <p class="valor-item">633382761</p>
                                </div>
                                <div class="linkedin">
                                    <p class="nombre-item">Linkedin</p>
                                    <a class="valor-item" href="linkedin.com/juanperez">linkedin.com/juanperez</a>
                                </div>
                            </div>
                        </div>
                        <div class="skills">
                            <div class="header">
                                <h5>Habilidades</h5>
                            </div>
                            <div class="sidebar-block">
                                <div class="email">
                                    <p class="nombre-item">PHP</p>
                                    <p class="valor-item">Avanzado</p>
                                </div>
                                <div class="telefono">
                                    <p class="nombre-item">JavaScript</p>
                                    <p class="valor-item">Avanzado</p>
                                </div>
                                <div class="linkedin">
                                    <p class="nombre-item">Bases de Datos</p>
                                    <p class="valor-item">Intermedio</p>
                                </div>
                            </div>
                        </div>
                        <div class="idiomas">
                            <div class="header">
                                <h5>Idiomas</h5>
                            </div>
                            <div class="sidebar-block">
                                <div class="email">
                                    <p class="nombre-item">Catalán</p>
                                    <p class="valor-item">Nativo</p>
                                </div>
                                <div class="telefono">
                                    <p class="nombre-item">Español</p>
                                    <p class="valor-item">Nativo</p>
                                </div>
                                <div class="linkedin">
                                    <p class="nombre-item">Inglés</p>
                                    <p class="valor-item">Intermedio</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="with-region-content col-sm-8">
                    <div class="cv-region-content">
                        <div class="objetivo-profesional">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus, saepe, doloremque placeat eum, facilis fuga voluptas dolore nobis laudantium similique reiciendis laborum. Aliquam nihil voluptatem ipsam rerum cumque rem provident?
                        </div>
                        <hr>
                        <div class="experiencia-wrapper">
                            <h3>Experiencia Profesional</h3>
                            <div class="row experiencia item">
                                <div class="col-sm-3">
                                    <p class="duracion">2017-Actualidad</p>
                                </div>
                                <div class="col-sm-9">
                                    <h6 class="nombre">Programador Back-End en Prácticas</h6>
                                    <p class="lugar">Everis</p>
                                    <p class="descripcion">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus a quidem quia optio eum ipsum exercitationem excepturi suscipit aperiam officia beatae dolor cupiditate.</p>
                                </div>
                            </div>
                            <div class="row experiencia item">
                                <div class="col-sm-3">
                                    <p class="duracion">2016-2017</p>
                                </div>
                                <div class="col-sm-9">
                                    <h6 class="nombre">Profesor en escuela de secundario</h6>
                                    <p class="lugar">Jesuïtes Bellvitge Joan XXIII</p>
                                    <p class="descripcion">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus a quidem quia optio eum ipsum exercitationem excepturi suscipit aperiam officia beatae dolor cupiditate.</p>
                                </div>
                            </div>
                
                        </div>
                        <hr>
                        <div class="formacion-wrapper">
                            <h3>Experiencia Profesional</h3>
                            <div class="row formacion item">
                                <div class="col-sm-3">
                                    <p class="duracion">2017-Actualidad</p>
                                </div>
                                <div class="col-sm-9">
                                    <h6 class="nombre">Programador Back-End en Prácticas</h6>
                                    <p class="lugar">Everis</p>
                                    <p class="descripcion">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus a quidem quia optio eum ipsum exercitationem excepturi suscipit aperiam officia beatae dolor cupiditate.</p>
                                </div>
                            </div>
                            <div class="row experiencia item">
                                <div class="col-sm-3">
                                    <p class="duracion">2016-2017</p>
                                </div>
                                <div class="col-sm-9">
                                    <h6 class="nombre">Profesor en escuela de secundario</h6>
                                    <p class="lugar">Jesuïtes Bellvitge Joan XXIII</p>
                                    <p class="descripcion">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus reprehenderit facilis atque ut laudantium tenetur reiciendis veritatis veniam iusto error architecto.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    </div>
    





                    {{-- <?php 
                        // $curriculum=json_decode($trabajador->curriculum);
                        ?>
                    <th scope="row">{{ $trabajador->id_usuario }}</th>
                    <td>{{ $trabajador->nombre }}</td>
                    <td>{{ $trabajador->apellido }}</td>
                    <td>{{ $trabajador->edad }}</td>
                    <td>{{ $curriculum->experiencia->{'0'}->nombre_experiencia }}</td> --}}

</body>
</html>