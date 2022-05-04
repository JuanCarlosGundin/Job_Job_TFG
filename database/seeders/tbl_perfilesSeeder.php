<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class tbl_perfilesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tbl_perfiles')->insert([
            'nom_perfil' => 'Admin'
        ]);
        DB::table('tbl_perfiles')->insert([
            'nom_perfil' => 'Trabajador'
        ]);
        DB::table('tbl_perfiles')->insert([
            'nom_perfil' => 'Empresa'
        ]);
    }
}
