<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblChatTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_chat', function (Blueprint $table) {
            $table->id();
            $table->string('estado_chat',45);
            $table->json('json_chat');
            $table->unsignedBigInteger('id_iniciador_chat');
            $table->unsignedBigInteger('id_interactuado_chat');

            $table->foreign('id_iniciador_chat')->references('id')->on('tbl_usuarios');
            $table->foreign('id_interactuado_chat')->references('id')->on('tbl_usuarios');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbl_chat');
    }
}