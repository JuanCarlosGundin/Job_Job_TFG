<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblEmpresaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_empresa', function (Blueprint $table) {
            $table->unsignedBigInteger('id_usuario');
            $table->string('nom_emp',100);
            $table->string('searching',200);
            $table->string('logo_emp',200)->nullable();
            $table->string('campo_emp',45);
            $table->string('mostrado',45);
            $table->string('about_emp',300);
            $table->string('loc_emp',100);
            $table->string('vacante',100);            

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
        Schema::dropIfExists('tbl_empresa');
    }
}
