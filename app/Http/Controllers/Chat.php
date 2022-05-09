<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;



class Chat extends Controller {

    function getchat(Request $request) {
        try {
            $id=session()->get('id_user');
            $idOTRO= 61;
            $perfil=session()->get('id_perfil');

            $chanel=DB::select('SELECT id FROM tbl_chat 
            where (id_iniciador_chat= ? and id_interactuado_chat = ?) 
            or (id_interactuado_chat= ? and id_iniciador_chat = ?)'
            ,[$id,$idOTRO,$id,$idOTRO]);

            if ($perfil==2) {
                $name=DB::select('SELECT nombre FROM tbl_trabajador
                where id_usuario = ?' 
                ,[$id]);

                $other=DB::select('SELECT nom_emp FROM tbl_empresa
                where id_usuario = ?' 
                ,[$idOTRO]);

                return response()->json(array('chanel'=>$chanel,'name'=>$name,'other'=>$other,'perfil'=>$perfil));

            } else {
                $name=DB::select('SELECT nom_emp FROM tbl_empresa
                where id_usuario = ?' 
                ,[$id]);

                $other=DB::select('SELECT nombre FROM tbl_trabajador
                where id_usuario = ?' 
                ,[$idOTRO]);

                return response()->json(array('chanel'=>$chanel,'name'=>$name,'other'=>$other,'perfil'=>$perfil));
            }
        } catch(\Exception $e) {
            return response()->json($e->getMessage());
        }
    }

}
