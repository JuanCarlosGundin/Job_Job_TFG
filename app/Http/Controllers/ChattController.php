<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;



class ChattController extends Controller {

    function getchat(Request $request) {
        try {
            $id=session()->get('id_user');
            $idOTRO= $request->input('id_otro');
            $perfil=session()->get('id_perfil');

            $chanel=DB::select('SELECT * FROM tbl_chat 
            where (id_iniciador_chat= ? and id_interactuado_chat = ?) 
            or (id_interactuado_chat= ? and id_iniciador_chat = ?)'
            ,[$id,$idOTRO,$id,$idOTRO]);

            if ($perfil==2) {
                $name=DB::select('SELECT  * FROM tbl_trabajador
                where id_usuario = ?' 
                ,[$id]);

                $other=DB::select('SELECT * FROM tbl_empresa
                where id_usuario = ?' 
                ,[$idOTRO]);

                return response()->json(array('chanel'=>$chanel,'name'=>$name,'other'=>$other,'perfil'=>$perfil,'id'=>$id,'id2'=>$idOTRO));

            } else {
                $name=DB::select('SELECT nom_emp FROM tbl_empresa
                where id_usuario = ?' 
                ,[$id]);

                $other=DB::select('SELECT * FROM tbl_trabajador
                where id_usuario = ?' 
                ,[$idOTRO]);

                return response()->json(array('chanel'=>$chanel,'name'=>$name,'other'=>$other,'perfil'=>$perfil,'id'=>$id,'id2'=>$idOTRO));
            }
        } catch(\Exception $e) {
            return response()->json($e->getMessage());
        }
    }

    function insert(Request $request) {

        try {
            
            $id=session()->get('id_user');
            $idOTRO= $request->input('id_otro');
            $time= $request->input('time');
            $msg= $request->input('msg');
            //$perfil=session()->get('id_perfil');
            $data="json_chat = JSON_ARRAY_APPEND(json_chat, '$.mensajes', JSON_OBJECT('id', '".$id."', 'hora', '".$time."', 'nombre', 'NULL', 'mensaje', '".$msg."'))";

            DB::beginTransaction();
            DB::select("UPDATE tbl_chat set ".$data." where (id_iniciador_chat= ? and id_interactuado_chat = ?) 
            or (id_interactuado_chat= ? and id_iniciador_chat = ?)"
            ,[$id,$idOTRO,$id,$idOTRO]);
            DB::commit();
            return response()->json("SI");


        } catch(\Exception $e) {
            DB::rollback();
            return response()->json($e->getMessage());
        }
    }

        //leernotificaciones
        public function leerChats(Request $req) {
            $id=session()->get('id_user');
            $id_perfil=session()->get('id_perfil');
            
            //si el cliente es empresa, mira ofertas de trabajador
            if($id_perfil==3){
                try {

                    $resultado=DB::select('select * from tbl_usuarios
					inner join tbl_trabajador on (tbl_usuarios.id= tbl_trabajador.id_usuario) or (tbl_usuarios.id = tbl_trabajador.id_usuario)
					inner join tbl_chat on (tbl_chat.id_iniciador_chat= tbl_usuarios.id) or (tbl_chat.id_interactuado_chat = tbl_usuarios.id)
                    where id_iniciador_chat = ? or id_interactuado_chat = ?',[$id,$id]);
                    return response()->json(array('trabajadores'=> $resultado,'id'=> $id));
                } catch (\Exception $e) {
                    return response()->json(array('resultado'=> 'NOK: '.$e->getMessage()));
                }
            }else{
                //si el cliente es trabajador, mira ofertas de empresas
                try {
                    $resultado=DB::select('select * from tbl_usuarios
					inner join tbl_empresa on (tbl_usuarios.id= tbl_empresa.id_usuario) or (tbl_usuarios.id = tbl_empresa.id_usuario)
					inner join tbl_chat on (tbl_chat.id_iniciador_chat= tbl_usuarios.id) or (tbl_chat.id_interactuado_chat = tbl_usuarios.id)
                    where id_iniciador_chat = ? or id_interactuado_chat = ?',[$id,$id]);

                    return response()->json(array('empresas'=> $resultado,'id'=> $id));
                } catch (\Exception $e) {
                    return response()->json(array('resultado'=> 'NOK: '.$e->getMessage()));
                }
            }
        }

        function crearchat(Request $request) {
            try {
            
                $id=session()->get('id_user');
                $idOTRO= $request->input('id_otro');
                //$id=68;
                //$idOTRO=69;
                DB::beginTransaction();
                $comparative=DB::select("SELECT id from tbl_chat where (id_iniciador_chat= ? and id_interactuado_chat = ?) 
                or (id_interactuado_chat= ? and id_iniciador_chat = ?)"
                ,[$id,$idOTRO,$id,$idOTRO]);
                //return response()->json($comparative);
                if($comparative==null){
                    DB::select("INSERT INTO `bd_proyecto_final`.`tbl_chat` (`id_iniciador_chat`, `id_interactuado_chat`, `estado_chat`, `json_chat`) VALUES (".$id.", ".$idOTRO.", '1', '{\"mensajes\": [{\"id\": \"Start\", \"hora\": \"Null\", \"nombre\": \"Start\", \"mensaje\": \"Bienvenido al chat\"}]}')");
                DB::commit();
                return response()->json("SI");
                }else{
                    DB::commit();
                    return response()->json("NO");
                }
            } catch(\Exception $e) {
                DB::rollback();
                return response()->json($e->getMessage());
            }
        

        }
}
