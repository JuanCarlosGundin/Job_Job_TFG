<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class tbl_empresaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tbl_empresa')->insert([
            'id_usuario'=>6,
            'nom_emp' => 'Microsoft',
            'searching' => 'Buscamos a un ingeniero web para conectar nuestros servidores',
            'logo_emp' => NULL,
            'campo_emp' => 'Web developement',
            'mostrado' => '1',
            'about_emp' => 'Empresa de IT',
            'loc_emp' => 'Badalona',
            'vacante' => 'Ingeniero Multiplataforma',
        ]);
        DB::table('tbl_empresa')->insert([
            'id_usuario'=>7,
            'nom_emp' => 'Amazon',
            'searching' => 'Buscamos a un ingeniero con conocimientos en Cloud Computing',
            'logo_emp' => NULL,
            'campo_emp' => 'Sistemas informáticos',
            'mostrado' => '1',
            'about_emp' => 'Empresa multinacional de IT y Logística',
            'loc_emp' => 'Barcelona',
            'vacante' => 'Ingeniero de Telecomunicaciones / Informática',
        ]);
        DB::table('tbl_empresa')->insert([
            'id_usuario'=>8,
            'nom_emp' => 'Everis',
            'searching' => 'Buscamos programadores back-end (PHP)',
            'logo_emp' => NULL,
            'campo_emp' => 'Informática',
            'mostrado' => '1',
            'about_emp' => 'Consultora',
            'loc_emp' => 'Barcelona',
            'vacante' => 'Ingeniero Multiplataforma',
        ]);
        DB::table('tbl_empresa')->insert([
            'id_usuario'=>9,
            'nom_emp' => 'Jesuïtes Bellvitge - Joan XXIII',
            'searching' => 'Buscamos a un alguien para que nos arregle la web',
            'logo_emp' => NULL,
            'campo_emp' => 'Web',
            'mostrado' => '1',
            'about_emp' => 'Centro educativo desde primaria hasta CFGS',
            'loc_emp' => 'Hospitalet de Llobregat',
            'vacante' => 'Programador Web (Full-Stack)',
        ]);
    }
}
