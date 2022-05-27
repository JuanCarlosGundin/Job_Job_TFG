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
        $id=session()->get('id_user');
        try {
            $existejson= DB::table('tbl_ptecnica')->select('json_prueba')->where('id_empresa','=',$id_empresa)->first();
            if ($existejson->json_prueba!=null) {
                // si en json_prueba hay alguien inscrito
                $json_prueba=json_decode($existejson->json_prueba);
                $contador=count($json_prueba);
                for ($i=0; $i < $contador; $i++) { 
                    $id_participante=$json_prueba[$i]->id_participante;
                    if ($id_participante==strval($id)){
                        // si el trabajador actual se ha inscrito previamente
                        $empresa=DB::table('tbl_ptecnica')
                        ->join('tbl_empresa', 'tbl_ptecnica.id_empresa', '=', 'tbl_empresa.id_usuario')
                        ->where('id_empresa', '=', $id_empresa)->first();
                        return response()->json(array('trabajador' => $empresa, 'existe' => 'existe'));
                    } else {
                        // si no aparece inscrito
                        $empresa=DB::table('tbl_ptecnica')
                        ->join('tbl_empresa', 'tbl_ptecnica.id_empresa', '=', 'tbl_empresa.id_usuario')
                        ->where('id_empresa', '=', $id_empresa)->first();
                        return response()->json(array('trabajador' => $empresa));
                    }
                }
            } else {
                //si json_prueba es null, es decir que nadie se ha inscrito
                $empresa=DB::table('tbl_ptecnica')
                ->join('tbl_empresa', 'tbl_ptecnica.id_empresa', '=', 'tbl_empresa.id_usuario')
                ->where('id_empresa', '=', $id_empresa)->first();
                return response()->json(array('trabajador' => $empresa));
            }
        } catch (\Exception $e) {
            return response()->json(array('resultado'=> 'NOK: '.$e->getMessage()));
        }
    }

    public function iniciar_ptecnica_trabajador($id_empresa) {
        $id=session()->get('id_user');

        //obtener dia y hora
        $date = Carbon::now('+02:00');

        //formato correcto
        $inicio_participante = $date->toDateTimeString();
        try {
            DB::beginTransaction();
            // inicio_ptecnica
            $existejson= DB::table('tbl_ptecnica')->select('json_prueba')->where('id_empresa','=',$id_empresa)->first();
            if ($existejson->json_prueba==null) {
                $json_prueba='[{
                    "id_participante": "'.$id.'",
                    "inicio_participante": "'.$inicio_participante.'",
                    "zip_participante": null
                }]';
                DB::select("UPDATE tbl_ptecnica SET json_prueba=? WHERE id_empresa=?",[$json_prueba,$id_empresa]);
            } else{
                $json_prueba=json_decode($existejson->json_prueba);
                $contador=count($json_prueba);
                for ($i=0; $i < $contador; $i++) {
                    $id_participante=$json_prueba[$i]->id_participante;
                    if ($id_participante==strval($id)){
                        return response()->json(array('existe' => 'existe'));
                    } else {
                        $json_prueba="JSON_ARRAY_APPEND(json_prueba, '$', JSON_OBJECT('id_participante', '".$id."', 'inicio_participante', '".$inicio_participante."', 'zip_participante', NULL))";
                    }
                }

                //no puedo usar ? en json_prueba por un bug en php
                DB::select("UPDATE tbl_ptecnica SET json_prueba=".$json_prueba." WHERE id_empresa=?",[$id_empresa]);
            }
            // mostrar contenida_ptecnica
            $empresa=DB::table('tbl_ptecnica')
                ->join('tbl_empresa', 'tbl_ptecnica.id_empresa', '=', 'tbl_empresa.id_usuario')
                ->where('id_empresa', '=', $id_empresa)->first();
            DB::commit();
            return response()->json(array('trabajador' => $empresa));
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(array('resultado'=> 'NOK: '.$e->getMessage()));
        }
    }

    public function entrar_ptecnica_trabajador($id_empresa) {
        try {
            $empresa=DB::table('tbl_ptecnica')
                ->join('tbl_empresa', 'tbl_ptecnica.id_empresa', '=', 'tbl_empresa.id_usuario')
                ->where('id_empresa', '=', $id_empresa)->first();
            return response()->json(array('trabajador' => $empresa));
        } catch (\Exception $e) {
            return response()->json(array('resultado'=> 'NOK: '.$e->getMessage()));
        }
    }

    public function insertar_trabajador_ptecnica(Request $req, $id_pt) {
        $id=session()->get('id_user');

        try {
            DB::beginTransaction();
            $json= DB::table('tbl_ptecnica')->where('id','=',$id_pt)->first();
            $duracion=Carbon::parse($json->duracion);
            $horas=$duracion->hour;
            $json_prueba=json_decode($json->json_prueba);
            $contador=count($json_prueba);
            for ($i=0; $i < $contador; $i++) { 
                $id_participante=$json_prueba[$i]->id_participante;
                if ($id_participante==strval($id)){
                    $ini_participante=$json_prueba[$i]->inicio_participante;
                    $inicio_participante=Carbon::parse($ini_participante);
                    // mirar como poner horas empresa, yo me entiendo
                    $inicio_participante_extra=$inicio_participante->addHours($horas);
                    $fecha_actual = Carbon::now('+02:00');
                    if ($fecha_actual < $inicio_participante_extra) {
                        $zip=$json_prueba[$i]->zip_participante;
                        if ($zip != null) {
                            Storage::delete('public/'.$zip);
                        }
                        $zip_participante = $req->file('zip_participante')->store('zip','public');
                        $cambio="json_prueba=JSON_REPLACE(json_prueba, '$[".$i."].zip_participante', '".$zip_participante."')";
                        DB::select("UPDATE tbl_ptecnica SET ".$cambio." WHERE id=?",[$id_pt]);
                    } else {
                        return response()->json(array('resultado'=> 'fuera'));
                    }
                }
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

        $duracion=$req['duracion'].':00:00';

        try {
            DB::beginTransaction();
            $id=DB::table('tbl_ptecnica')->insert(["id_empresa"=>$id,"lenguaje"=>$req['lenguaje'],"fecha_publicacion"=>$fecha_publicacion,"fecha_limite"=>$req['fecha_limite'],"duracion"=>$duracion,"enunciado"=>$req['enunciado'],"descripcion"=>$req['descripcion'],"zip_prueba"=>$zip_prueba,"estado_prueba"=>"1"]);
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

    public function deshabilitar_prueba_tecnica($id_pt) {
        try{

            DB::beginTransaction();
            DB::select("UPDATE tbl_ptecnica SET estado_prueba = '0' WHERE id = ?",[$id_pt]);
            DB::commit();
            return response()->json(array('resultado'=> 'OK'));
        }   catch (\Exception $e) {
            DB::rollback();
            return response()->json(array('resultado'=> 'NOK: '.$e->getMessage()));

        }
    }
}
