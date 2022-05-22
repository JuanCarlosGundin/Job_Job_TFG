<?php

namespace App\Http\Controllers;

use App\Models\Ptecnica;
use Illuminate\Http\Request;

class PtecnicaController extends Controller{
    public function vistaptecnica(){

        return view('pruebatecnica');

    }

    public function leerptecnicaempresa() {
        $id=session()->get('id_user');
        $id_perfil=session()->get('id_perfil');
    }
}
