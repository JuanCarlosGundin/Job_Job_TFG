<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblInteraccionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_interaccion', function (Blueprint $table) {
            $table->id();
            $table->string('tipo_interaccion',100);
            $table->string('estado_interaccion',300);
            $table->string('coincidencia',100);
            $table->unsignedBigInteger('id_iniciador');
            $table->unsignedBigInteger('id_interactuado');
            

            $table->foreign('id_iniciador')->references('id')->on('tbl_usuarios');
            $table->foreign('id_interactuado')->references('id')->on('tbl_usuarios');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbl_interaccion');
    }
}
