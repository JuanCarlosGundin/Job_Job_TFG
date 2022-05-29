
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblTrabajadorTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_trabajador', function (Blueprint $table) {
            $table->unsignedBigInteger('id_usuario');
            $table->string('nombre',100);
            $table->string('apellido',300);
            $table->string('foto_perfil',100)->nullable();
            $table->string('campo_user',45)->nullable();
            $table->json('curriculum')->nullable();//JSON
            // $table->json('experiencia');//JSON
            // $table->json('estudios');//JSON
            // $table->json('idiomas');//JSON
            $table->string('disponibilidad',45)->nullable();
            $table->string('about_user',300)->nullable();
            $table->string('mostrado',45);
            $table->string('loc_trabajador',100)->nullable();
            $table->date('edad');//MODIFICAR EN LA APP
            $table->string('carnet_conducir',45)->nullable();
            $table->string('vehiculo_propio',45)->nullable();
            $table->string('linkedin',100)->nullable();
            $table->string('telefono',15)->nullable();
            $table->string('github',100)->nullable();
            $table->string('lenguaje_preferido',50)->nullable();
            

            $table->foreign('id_usuario')->references('id')->on('tbl_usuarios');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbl_trabajador');
    }
}