<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class tbl_trabajadorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tbl_trabajador')->insert([
            'id_usuario'=>2,
            'nombre' => 'Sergio',
            'apellido' => 'Jiménez',
            'campo_user' => 'Back-end',
            'foto_perfil' => NULL,
            'curriculum' => '{
                "experiencia":{
                    "0": {
                        "nombre_experiencia": "Programador Back-End en Prácticas",
                        "lugar_experiencia": "Everis",
                        "año_entrada": "2015",
                        "año_salida": "2017",
                        "funciones": "Involucrado en proyectos con Laravel y AJAX"
                    },
                    "1": {
                        "nombre_experiencia": "Profesor de CFGS De Informática",
                        "lugar_experiencia": "Jesuïtes Bellvitge Joan XXIII",
                        "año_entrada": "2017",
                        "año_salida": "actualidad",
                        "funciones": "Profesor de programación y sistemas operativos en el CFGS de DAW."
                    }
                },
                "estudios":{
                    "0": {
                        "nombre_formación": "Grado en Matemáticas",
                        "lugar_formación": "Universitat de Barcelona",
                        "año_entrada": "2005",
                        "año_salida": "2009"
                    },
                    "1": {
                        "nombre_formación": "Grado en Ingeniería Informática",
                        "lugar_formación": "Universitat Oberta de Catalunya",
                        "año_entrada": "2010",
                        "año_salida": "2014"
                    }
                },
                "idiomas":{
                    "0": {
                        "nombre_idioma": "Catalán",
                        "nivel_idioma": "Alto"
                    },
                    "1": {
                        "nombre_idioma": "Español",
                        "nivel_idioma": "Nativo"
                    },
                    "2": {
                        "nombre_idioma": "Inglés",
                        "nivel_idioma": "Medio"
                    }
                }
            }',
            'disponibilidad' => '1',
            'about_user' => 'Soy un intrépido programador con ganas de seguir aprendiendo en este maravilloso mundo de la informática',
            'mostrado' => '1',
            'loc_trabajador' => 'Hospitalet de Llobregat',
            'edad' => '1975-10-02',
            'mobilidad' => '1',
            'carnet_conducir' => '1',
            'vehiculo_propio' => '1',
        ]);
        DB::table('tbl_trabajador')->insert([
            'id_usuario'=>3,
            'nombre' => 'Agnes',
            'apellido' => 'Plans',
            'campo_user' => 'Bases de Datos',
            'foto_perfil' => NULL,
            'curriculum' => '{
                "experiencia":{
                    "0": {
                        "nombre_experiencia": "Administrador de bases de datos",
                        "lugar_experiencia": "Oracle",
                        "año_entrada": "2016",
                        "año_salida": "2017",
                        "funciones": "Estuve gestionando diferentes bases de datos, tanto su creación como su edición."
                    },
                    "1": {
                        "nombre_experiencia": "Profesora de CFGS De Informática",
                        "lugar_experiencia": "Jesuïtes Bellvitge Joan XXIII",
                        "año_entrada": "2018",
                        "año_salida": "actualidad",
                        "funciones": "Profesora de bases de datos y CSS en el CFGS de DAW."
                    }
                },
                "estudios":{
                    "0": {
                        "nombre_formación": "CFGS - ASIX",
                        "lugar_formación": "Joan XXIII",
                        "año_entrada": "2005",
                        "año_salida": "2007"
                    },
                    "1": {
                        "nombre_formación": "Grado en Ingeniería de Telecomunicaciones",
                        "lugar_formación": "UPC",
                        "año_entrada": "2010",
                        "año_salida": "2014"
                    }
                },
                "idiomas":{
                    "0": {
                        "nombre_idioma": "Catalán",
                        "nivel_idioma": "Nativo"
                    },
                    "1": {
                        "nombre_idioma": "Español",
                        "nivel_idioma": "Nativo"
                    },
                    "2": {
                        "nombre_idioma": "Inglés",
                        "nivel_idioma": "Medio"
                    },
                    "3": {
                        "nombre_idioma": "Francés",
                        "nivel_idioma": "Alto"
                    }
                }
            }',
            'disponibilidad' => '1',
            'about_user' => 'Me gustan las Bases de datos y el Bootstrap',
            'mostrado' => '1',
            'loc_trabajador' => 'Hospitalet de Llobregat',
            'edad' => '1967-10-02',
            'mobilidad' => '1',
            'carnet_conducir' => '1',
            'vehiculo_propio' => '1',
        ]);
        DB::table('tbl_trabajador')->insert([
            'id_usuario'=>4,
            'nombre' => 'Danny',
            'apellido' => 'Larrea',
            'campo_user' => 'Programador Java y Python',
            'foto_perfil' => NULL,
            'curriculum' => '{
                "experiencia":{
                    "0": {
                        "nombre_experiencia": "Programador Back-end",
                        "lugar_experiencia": "Everis",
                        "año_entrada": "2016",
                        "año_salida": "2017",
                        "funciones": "Llevé proyectos de programación como junior programmer."
                    },
                    "1": {
                        "nombre_experiencia": "Profesor de CFGS De Informática",
                        "lugar_experiencia": "Jesuïtes Bellvitge Joan XXIII",
                        "año_entrada": "2018",
                        "año_salida": "actualidad",
                        "funciones": "Profesor de programación, lenguajes de marcas y Git en el CFGS de DAW."
                    }
                },
                "estudios":{
                    "0": {
                        "nombre_formación": "Grado en Matemáticas",
                        "lugar_formación": "UAB",
                        "año_entrada": "2005",
                        "año_salida": "2009"
                    },
                    "1": {
                        "nombre_formación": "Grado en Ingeniería informática",
                        "lugar_formación": "UPC",
                        "año_entrada": "2010",
                        "año_salida": "2014"
                    }
                },
                "idiomas":{
                    "0": {
                        "nombre_idioma": "Catalán",
                        "nivel_idioma": "Alto"
                    },
                    "1": {
                        "nombre_idioma": "Español",
                        "nivel_idioma": "Nativo"
                    },
                    "2": {
                        "nombre_idioma": "Inglés",
                        "nivel_idioma": "Bajo"
                    }
                }
            }',
            'disponibilidad' => '1',
            'about_user' => 'Me gustan los scripts y Github',
            'mostrado' => '1',
            'loc_trabajador' => 'Martorell',
            'edad' => '1991-06-04',
            'mobilidad' => '1',
            'carnet_conducir' => '1',
            'vehiculo_propio' => '1',
        ]);
        DB::table('tbl_trabajador')->insert([
            'id_usuario'=>5,
            'nombre' => 'Ignasi',
            'apellido' => 'Romero',
            'campo_user' => 'Programador Full-Stack',
            'foto_perfil' => NULL,
            'curriculum' => '{
                "experiencia":{
                    "0": {
                        "nombre_experiencia": "Programador Full-Stack",
                        "lugar_experiencia": "Microsoft",
                        "año_entrada": "2016",
                        "año_salida": "2017",
                        "funciones": "Programador Senior JavaScript"
                    },
                    "1": {
                        "nombre_experiencia": "Profesor de CFGS De Informática",
                        "lugar_experiencia": "Jesuïtes Bellvitge, Jesuïtes Sarrià",
                        "año_entrada": "2018",
                        "año_salida": "actualidad",
                        "funciones": "Profesor de programación en el CFGS de DAW."
                    }
                },
                "estudios":{
                    "0": {
                        "nombre_formación": "CFGS de DAW",
                        "lugar_formación": "Joan XXIII",
                        "año_entrada": "2005",
                        "año_salida": "2009"
                    }
                },
                "idiomas":{
                    "0": {
                        "nombre_idioma": "Catalán",
                        "nivel_idioma": "Nativo"
                    },
                    "1": {
                        "nombre_idioma": "Español",
                        "nivel_idioma": "Nativo"
                    },
                    "2": {
                        "nombre_idioma": "Inglés",
                        "nivel_idioma": "Medio"
                    }
                }
            }',
            'disponibilidad' => '1',
            'about_user' => 'Me gustan las motos, las cryptos y JavaScript',
            'mostrado' => '1',
            'loc_trabajador' => 'Badalona',
            'edad' => '1978-06-04',
            'mobilidad' => '1',
            'carnet_conducir' => '1',
            'vehiculo_propio' => '1',
        ]);
    }
}