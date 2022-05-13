<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class tbl_usuariosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tbl_usuarios')->insert([//ID=1
            'mail' => 'Admin@gmail.com',
            'contra' => hash('sha256', '1234'),
            'estado' => '1',
            'verificado' => '1',
            'id_perfil' => '1'
        ]);
        DB::table('tbl_usuarios')->insert([//ID=2
            'mail' => 'sergio.jimenez@fje.edu',
            'contra' => hash('sha256', '1234'),
            'estado' => '1',
            'verificado' => '1',
            'id_perfil' => '2'
        ]);
        DB::table('tbl_usuarios')->insert([//ID=3
            'mail' => 'agnes.plans@fje.edu',
            'contra' => hash('sha256', '1234'),
            'estado' => '1',
            'verificado' => '1',
            'id_perfil' => '2'
        ]);
        DB::table('tbl_usuarios')->insert([//ID=4
            'mail' => 'danny.larrea@fje.edu',
            'contra' => hash('sha256', '1234'),
            'estado' => '1',
            'verificado' => '1',
            'id_perfil' => '2'
        ]);
        DB::table('tbl_usuarios')->insert([//ID=5
            'mail' => 'ignasi.romero@fje.edu',
            'contra' => hash('sha256', '1234'),
            'estado' => '1',
            'verificado' => '1',
            'id_perfil' => '2'
        ]);
        DB::table('tbl_usuarios')->insert([//ID=6
            'mail' => 'admin@microsoft.com',
            'contra' => hash('sha256', '1234'),
            'estado' => '1',
            'verificado' => '1',
            'id_perfil' => '3'
        ]);
        DB::table('tbl_usuarios')->insert([//ID=7
            'mail' => 'admin@amazon.com',
            'contra' => hash('sha256', '1234'),
            'estado' => '1',
            'verificado' => '1',
            'id_perfil' => '3'
        ]);
        DB::table('tbl_usuarios')->insert([//ID=8
            'mail' => 'admin@everis.com',
            'contra' => hash('sha256', '1234'),
            'estado' => '1',
            'verificado' => '1',
            'id_perfil' => '3'
        ]);
        DB::table('tbl_usuarios')->insert([//ID=9
            'mail' => 'admin@fje.edu',
            'contra' => hash('sha256', '1234'),
            'estado' => '1',
            'verificado' => '1',
            'id_perfil' => '3'
        ]);
    }
}
