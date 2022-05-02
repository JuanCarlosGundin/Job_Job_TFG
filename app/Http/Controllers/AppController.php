<?php

namespace App\Http\Controllers;

use App\Models\App;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\storage;

class AppController extends Controller
{
    function mostrar(Request $request){
        try{
        $id=session()->get('id_user');
        $perfil=session()->get('id_perfil');
        //return response()->json($perfil);
        if($perfil==2){
            $datos=DB::select('select * from tbl_usuarios 
            left join tbl_empresa on tbl_usuarios.id=tbl_empresa.id_usuario
            left join tbl_interaccion on tbl_usuarios.id=tbl_interaccion.id_interactuado
            where tbl_usuarios.id not in
            (select id_interactuado from tbl_interaccion where id_iniciador = ?)
            and tbl_usuarios.id_perfil=3 ',[$id]);
            return response()->json($datos);
        }else{
            $datos=DB::select('select * from tbl_usuarios 
            left join tbl_trabajador on tbl_usuarios.id=tbl_trabajador.id_usuario
            left join tbl_interaccion on tbl_usuarios.id=tbl_interaccion.id_interactuado
            where tbl_usuarios.id not in
            (select id_interactuado from tbl_interaccion where id_iniciador = ?)
            and tbl_usuarios.id_perfil=2 ',[$id]);
            return response()->json($datos);
        }   
    }catch(\Exception $e){
        return response()->json($e->getMessage());
    }   
    }

    function si(Request $request){
        $id=session()->get('id_user');
        $idClient = $request->input('idClient');
        $datos=DB::select('select count(*) from tbl_interaccion
        where id_iniciador=? and id_interactuado=?',[$idClient,$id]);
        try{
        if($datos[0]->{'count(*)'}==1){
            $datos=DB::select('select * from tbl_interaccion
            where id_iniciador=? and id_interactuado=?',[$idClient,$id]);
            if($datos[0]->{'tipo_interaccion'}==1){
                DB::update('update tbl_interaccion set coincidencia = 1 where id_iniciador=? and id_interactuado=?',
                [$idClient,$id]);
                DB::insert('insert into tbl_interaccion (id_iniciador,id_interactuado,tipo_interaccion,estado_interaccion,coincidencia) 
                values (?,?,1,1,1)',[$id,$idClient]);
                }else{DB::insert('insert into tbl_interaccion (id_iniciador,id_interactuado,tipo_interaccion,estado_interaccion,coincidencia) 
                    values (?,?,1,1,0)',[$id,$idClient]);
                    return response()->json(2);
                }
           return response()->json(1); 
        }else{
            DB::insert('insert into tbl_interaccion (id_iniciador,id_interactuado,tipo_interaccion,estado_interaccion,coincidencia) 
            values (?,?,1,1,0)',[$id,$idClient]);
            return response()->json(2);  
        }
        }catch (\Throwable $th) {
            return response()->json(array('resultado'=> 'NOK: '.$th->getMessage()));
        }
     }

    function no(Request $request){
        $id=session()->get('id_user');
        $idClient = $request->input('idClient');
        try{
            DB::insert('insert into tbl_interaccion (id_iniciador,id_interactuado,tipo_interaccion,estado_interaccion,coincidencia) 
            values (?,?,2,1,0)',[$id,$idClient]);
            return response()->json(2);  
    }catch (\Throwable $th) {
        return response()->json(array('resultado'=> 'NOK: '.$th->getMessage()));
    }
           
    }
}
