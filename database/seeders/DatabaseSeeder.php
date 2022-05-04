<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            tbl_perfilesSeeder::class,
            tbl_usuariosSeeder::class,
            tbl_trabajadorSeeder::class,
            tbl_empresaSeeder::class,
        ]);
    }
}
