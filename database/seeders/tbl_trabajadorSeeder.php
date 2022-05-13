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
                "experiencia":[
                    {
                        "nombre_experiencia": "Programador Back-End en Prácticas",
                        "lugar_experiencia": "Everis",
                        "año_entrada": "2015",
                        "año_salida": "2017",
                        "funciones": "Involucrado en proyectos con Laravel y AJAX"
                    },{
                        "nombre_experiencia": "Profesor de CFGS De Informática",
                        "lugar_experiencia": "Jesuïtes Bellvitge Joan XXIII",
                        "año_entrada": "2017",
                        "año_salida": "actualidad",
                        "funciones": "Profesor de programación y sistemas operativos en el CFGS de DAW."
                    }
                ],
                "estudios":[
                    {
                        "nombre_formación": "Grado en Matemáticas",
                        "lugar_formación": "Universitat de Barcelona",
                        "año_entrada": "2005",
                        "año_salida": "2009"
                    },{
                        "nombre_formación": "Grado en Ingeniería Informática",
                        "lugar_formación": "Universitat Oberta de Catalunya",
                        "año_entrada": "2010",
                        "año_salida": "2014"
                    }
                ],
                "idiomas":[
                    {
                        "nombre_idioma": "Catalán",
                        "nivel_idioma": "Alto"
                    },{
                        "nombre_idioma": "Español",
                        "nivel_idioma": "Nativo"
                    },{
                        "nombre_idioma": "Inglés",
                        "nivel_idioma": "Medio"
                    }
                ],
                "habilidades":[
                    {
                        "nombre_habilidad": "PHP",
                        "nivel_habilidad": "Experto"
                    },{
                        "nombre_habilidad": "Bases de Datos",
                        "nivel_habilidad": "Medio"
                    },{
                        "nombre_habilidad": "JavaScript",
                        "nivel_habilidad": "Avanzado"
                    }
                ]
            }',
            'disponibilidad' => '1',
            'about_user' => 'Soy un intrépido programador con ganas de seguir aprendiendo en este maravilloso mundo de la informática',
            'mostrado' => '1',
            'loc_trabajador' => 'Hospitalet de Llobregat',
            'edad' => '1975-10-02',
            'mobilidad' => '1',
            'carnet_conducir' => '1',
            'vehiculo_propio' => '1',
            'telefono' => '639928467',
            'github' =>'github.com/sergiojimenez',
            'lenguaje_preferido' => 'PHP',
        ]);
        DB::table('tbl_trabajador')->insert([
            'id_usuario'=>3,
            'nombre' => 'Agnes',
            'apellido' => 'Plans',
            'campo_user' => 'Bases de Datos',
            'foto_perfil' => NULL,
            'curriculum' => '{
                "experiencia":[
                    {
                        "nombre_experiencia": "Administrador de bases de datos",
                        "lugar_experiencia": "Oracle",
                        "año_entrada": "2016",
                        "año_salida": "2017",
                        "funciones": "Estuve gestionando diferentes bases de datos, tanto su creación como su edición."
                    },{
                        "nombre_experiencia": "Profesora de CFGS De Informática",
                        "lugar_experiencia": "Jesuïtes Bellvitge Joan XXIII",
                        "año_entrada": "2018",
                        "año_salida": "actualidad",
                        "funciones": "Profesora de bases de datos y CSS en el CFGS de DAW."
                    }
                ],
                "estudios":[
                    {
                        "nombre_formación": "CFGS - ASIX",
                        "lugar_formación": "Joan XXIII",
                        "año_entrada": "2005",
                        "año_salida": "2007"
                    },{
                        "nombre_formación": "Grado en Ingeniería de Telecomunicaciones",
                        "lugar_formación": "UPC",
                        "año_entrada": "2010",
                        "año_salida": "2014"
                    }
                ],
                "idiomas":[
                    {
                        "nombre_idioma": "Catalán",
                        "nivel_idioma": "Nativo"
                    },{
                        "nombre_idioma": "Español",
                        "nivel_idioma": "Nativo"
                    },{
                        "nombre_idioma": "Inglés",
                        "nivel_idioma": "Medio"
                    },{
                        "nombre_idioma": "Francés",
                        "nivel_idioma": "Alto"
                    }
                ],
                "habilidades":[
                    {
                        "nombre_habilidad": "Bases de Datos",
                        "nivel_habilidad": "Experto"
                    },{
                        "nombre_habilidad": "CSS",
                        "nivel_habilidad": "Alto"
                    }
                ]
            }',
            'disponibilidad' => '1',
            'about_user' => 'Me gustan las Bases de datos y el Bootstrap',
            'mostrado' => '1',
            'loc_trabajador' => 'Hospitalet de Llobregat',
            'edad' => '1967-10-02',
            'mobilidad' => '1',
            'carnet_conducir' => '1',
            'vehiculo_propio' => '1',
            'telefono' => '639928560',
            'linkedin' => 'linkedin.com/agnesplans',
            'lenguaje_preferido' => 'SQL',
        ]);
        DB::table('tbl_trabajador')->insert([
            'id_usuario'=>4,
            'nombre' => 'Danny',
            'apellido' => 'Larrea',
            'campo_user' => 'Programador Java y Python',
            'foto_perfil' => NULL,
            'curriculum' => '{
                "experiencia":[
                    {
                        "nombre_experiencia": "Programador Back-end",
                        "lugar_experiencia": "Everis",
                        "año_entrada": "2016",
                        "año_salida": "2017",
                        "funciones": "Llevé proyectos de programación como junior programmer."
                    },{
                        "nombre_experiencia": "Profesor de CFGS De Informática",
                        "lugar_experiencia": "Jesuïtes Bellvitge Joan XXIII",
                        "año_entrada": "2018",
                        "año_salida": "actualidad",
                        "funciones": "Profesor de programación, lenguajes de marcas y Git en el CFGS de DAW."
                    }
                ],
                "estudios":[
                    {
                        "nombre_formación": "Grado en Matemáticas",
                        "lugar_formación": "UAB",
                        "año_entrada": "2005",
                        "año_salida": "2009"
                    },{
                        "nombre_formación": "Grado en Ingeniería informática",
                        "lugar_formación": "UPC",
                        "año_entrada": "2010",
                        "año_salida": "2014"
                    }
                ],
                "idiomas":[
                    {
                        "nombre_idioma": "Catalán",
                        "nivel_idioma": "Alto"
                    },{
                        "nombre_idioma": "Español",
                        "nivel_idioma": "Nativo"
                    },{
                        "nombre_idioma": "Inglés",
                        "nivel_idioma": "Medio"
                    }
                ],
                "habilidades":[
                    {
                        "nombre_habilidad": "Java",
                        "nivel_habilidad": "Experto"
                    },{
                        "nombre_habilidad": "GitHub",
                        "nivel_habilidad": "Experto"
                    },{
                        "nombre_habilidad": "Python",
                        "nivel_habilidad": "Medio"
                    }
                ]
            }',
            'disponibilidad' => '1',
            'about_user' => 'Me gustan los scripts y Github',
            'mostrado' => '1',
            'loc_trabajador' => 'Martorell',
            'edad' => '1991-06-04',
            'mobilidad' => '1',
            'carnet_conducir' => '1',
            'vehiculo_propio' => '1',
            'telefono' => '645928437',
            'linkedin' => 'linkedin.com/dannylarrea',
            'github' =>'github.com/dannylarrea',
            'lenguaje_preferido' => 'Java',
        ]);
        DB::table('tbl_trabajador')->insert([
            'id_usuario'=>5,
            'nombre' => 'Ignasi',
            'apellido' => 'Romero',
            'campo_user' => 'Programador Full-Stack',
            'foto_perfil' => NULL,
            'curriculum' => '{
                "experiencia":[
                    {
                        "nombre_experiencia": "Programador Full-Stack",
                        "lugar_experiencia": "Microsoft",
                        "año_entrada": "2016",
                        "año_salida": "2017",
                        "funciones": "Programador Senior JavaScript"
                    },{
                        "nombre_experiencia": "Profesor de CFGS De Informática",
                        "lugar_experiencia": "Jesuïtes Bellvitge, Jesuïtes Sarrià",
                        "año_entrada": "2018",
                        "año_salida": "actualidad",
                        "funciones": "Profesor de programación en el CFGS de DAW."
                    }
                ],
                "estudios":[
                    {
                        "nombre_formación": "CFGS de DAW",
                        "lugar_formación": "Joan XXIII",
                        "año_entrada": "2005",
                        "año_salida": "2009"
                    }
                ],
                "idiomas":[
                    {
                        "nombre_idioma": "Catalán",
                        "nivel_idioma": "Nativo"
                    },{
                        "nombre_idioma": "Español",
                        "nivel_idioma": "Nativo"
                    },{
                        "nombre_idioma": "Inglés",
                        "nivel_idioma": "Medio"
                    }
                ],
                "habilidades":[
                    {
                        "nombre_habilidad": "JavaScript",
                        "nivel_habilidad": "Experto"
                    },{
                        "nombre_habilidad": "Java",
                        "nivel_habilidad": "Alto"
                    }
                ]
            }',
            'disponibilidad' => '1',
            'about_user' => 'Me gustan las motos, las cryptos y JavaScript',
            'mostrado' => '1',
            'loc_trabajador' => 'Badalona',
            'edad' => '1978-06-04',
            'mobilidad' => '1',
            'carnet_conducir' => '1',
            'vehiculo_propio' => '1',
            'telefono' => '637859201',
            'linkedin' => 'linkedin.com/ignasiromero',
            'github' =>'github.com/ignasiromero',
            'lenguaje_preferido' => 'JavaScript',
        ]);
    }
}