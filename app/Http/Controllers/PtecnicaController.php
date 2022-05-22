<?php

namespace App\Http\Controllers;

use App\Models\Ptecnica;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
                return response()->json(array('empresa' => $empresa));
            }

            if ($id_perfil==2) {
                //VISTA TRABAJADOR
                $empresa=DB::table('tbl_ptecnica')
                ->join('tbl_empresa', 'tbl_ptecnica.id_empresa', '=', 'tbl_empresa.id_usuario')
                ->where('estado_prueba', '=', '1')->get();
                return response()->json(array('trabajador' => $empresa));

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
}
