<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblPtecnicaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_ptecnica', function (Blueprint $table) {
            $table->id();
            $table->string('lenguaje',100);
            $table->dateTime('fecha_limite');
            $table->string('enunciado',500);
            $table->decimal('minutos_duracion', $precision = 5, $scale = 2);
            $table->json('json_prueba');
            $table->unsignedBigInteger('id_empresa');

            $table->foreign('id_empresa')->references('id')->on('tbl_usuarios');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbl_ptecnica');
    }
}
