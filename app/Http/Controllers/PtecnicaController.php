<?php

namespace App\Http\Controllers;

use App\Models\Ptecnica;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class PtecnicaController extends Controller{
    public function vistaptecnica(){

        return view('pruebatecnica');

    }

    public function leercontenido() {
        $id=session()->get('id_user');
        $id_perfil=session()->get('id_perfil');

        try {
            if ($id_perfil==3) {
                //VISTA EMPRESA
                $empresa=DB::table('tbl_ptecnica')
                ->where('id_empresa', '=', $id)->get();
                $inscritos=DB::select("SELECT JSON_LENGTH(json_prueba) as inscritos FROM bd_jobjob.tbl_ptecnica where id_empresa=?",[$id]);
                return response()->json(array('empresa' => $empresa, 'inscritos'=> $inscritos));
            }

            if ($id_perfil==2) {
                //VISTA TRABAJADOR
                $empresa=DB::table('tbl_ptecnica')
                ->join('tbl_empresa', 'tbl_ptecnica.id_empresa', '=', 'tbl_empresa.id_usuario')
                ->where('estado_prueba', '=', '1')->get();
                return response()->json(array('trabajador' => $empresa, 'id_trabajador'=>$id));

            }
        } catch (\Exception $e) {
            return response()->json(array('resultado'=> 'NOK: '.$e->getMessage()));
        }
    }

    public function mostrar_ptecnica_trabajador($id_empresa) {
        try {
            $empresa=DB::table('tbl_ptecnica')
                ->join('tbl_empresa', 'tbl_ptecnica.id_empresa', '=', 'tbl_empresa.id_usuario')
                ->where('id_empresa', '=', $id_empresa)->first();
            return response()->json(array('trabajador' => $empresa));
        } catch (\Exception $e) {
            return response()->json(array('resultado'=> 'NOK: '.$e->getMessage()));
        }
    }

    public function insertar_trabajador_ptecnica(Request $req, $id_empresa) {
        $id=session()->get('id_user');
        //obtener dia y hora
        $date = Carbon::now('+02:00');

        //formato correcto
        $inicio_participante = $date->toDateTimeString();

        $zip_participante = $req->file('zip_participante')->store('zip','public');

        try {
            DB::beginTransaction();
            $existejson= DB::table('tbl_ptecnica')->select('json_prueba')->where('id_empresa','=',$id_empresa)->first();
            if ($existejson->json_prueba==null) {
                $json_prueba='[{
                    "id_participante": "'.$id.'",
                    "inicio_participante": "'.$inicio_participante.'",
                    "zip_participante": "'.$zip_participante.'"
                }]';
                DB::select("UPDATE tbl_ptecnica SET json_prueba=? WHERE id_empresa=?",[$json_prueba,$id_empresa]);
            } else{
                $json_prueba="JSON_ARRAY_APPEND(json_prueba, '$', JSON_OBJECT('id_participante', '".$id."', 'inicio_participante', '".$inicio_participante."', 'zip_participante', '".$zip_participante."'))";
                //no puedo usar ? en json_prueba por un bug en php
                DB::select("UPDATE tbl_ptecnica SET json_prueba=".$json_prueba." WHERE id_empresa=?",[$id_empresa]);
            }
            DB::commit();
            return response()->json(array('resultado'=> 'OK'));
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(array('resultado'=> 'NOK: '.$e->getMessage()));
        }
    }

    public function crear_prueba_tecnica(Request $req) {
        $id=session()->get('id_user');
        //obtener dia y hora
        $date = Carbon::now('+02:00');

        //formato correcto
        $fecha_publicacion = $date->toDateTimeString();

        $zip_prueba = $req->file('zip_prueba')->store('zip','public');

        try {
            DB::beginTransaction();
            $id=DB::table('tbl_ptecnica')->insert(["id_empresa"=>$id,"lenguaje"=>$req['lenguaje'],"fecha_publicacion"=>$fecha_publicacion,"fecha_limite"=>$req['fecha_limite'],"duracion"=>$req['duracion'],"enunciado"=>$req['enunciado'],"descripcion"=>$req['descripcion'],"zip_prueba"=>$zip_prueba,"estado_prueba"=>"1"]);
            DB::commit();
            return response()->json(array('resultado'=> 'OK'));
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(array('resultado'=> 'NOK: '.$e->getMessage()));
        }

    }

    public function mostrar_zip_trabajadores($id_pt) {
        try {
            $empresa=DB::table('tbl_ptecnica')
                ->join('tbl_empresa', 'tbl_ptecnica.id_empresa', '=', 'tbl_empresa.id_usuario')
                ->where('id', '=', $id_pt)->first();
            return response()->json(array('empresa' => $empresa));
        } catch (\Exception $e) {
            return response()->json(array('resultado'=> 'NOK: '.$e->getMessage()));
        }
    }

    public function mostrar_un_trabajador($id_participante) {
        try {
            $participante=DB::table('tbl_trabajador')->where('id_usuario', '=', $id_participante)->first();
            return response()->json(array('participante' => $participante));
        } catch (\Exception $e) {
            return response()->json(array('resultado'=> 'NOK: '.$e->getMessage()));
        }
    }
}
