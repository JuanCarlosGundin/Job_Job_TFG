<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\storage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class GraficaController extends Controller
{
    public function numerousers()
    {
        //consulta donde me cuenta el numero que hay de administradores, trabajadores y empresas.
        $usuarios=DB::select('SELECT tbl_perfiles.nom_perfil, count(tbl_usuarios.id) AS num from tbl_usuarios INNER JOIN tbl_perfiles ON tbl_usuarios.id_perfil=tbl_perfiles.id WHERE id_perfil=2 or id_perfil=3 GROUP BY tbl_usuarios.id_perfil');
        return $usuarios;
        return response()->json($usuarios);
    }
}
