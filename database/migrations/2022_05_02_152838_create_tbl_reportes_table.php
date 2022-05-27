<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblReportesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_reportes', function (Blueprint $table) {
            $table->id();
            $table->string('incidencia',200);
            $table->string('estado_incidencia',45);
            $table->string('desarrollar_incidencia',255);
            $table->timestamp('fecha_incidencia');
            $table->unsignedBigInteger('id_reportador');
            $table->unsignedBigInteger('id_reportado');

            $table->foreign('id_reportador')->references('id')->on('tbl_usuarios');
            $table->foreign('id_reportado')->references('id')->on('tbl_usuarios');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbl_reportes');
    }
}
