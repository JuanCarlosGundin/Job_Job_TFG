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
            $table->string('lenguaje',100)->nullable();
            $table->timestamp('fecha_publicacion');
            $table->timestamp('fecha_limite')->nullable();
            $table->time('duracion');
            $table->tinyInteger('estado_prueba');
            $table->string('enunciado',100);
            $table->string('descripcion',500);
            $table->string('zip_prueba',100);
            $table->json('json_prueba')->nullable();
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
