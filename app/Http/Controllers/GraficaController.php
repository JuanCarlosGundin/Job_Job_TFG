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

    public function localizacionempresas()
    {
        //consulta donde me dice cuantas empresas hay en cada localidad.
        $empresas=DB::select("SELECT IFNULL(tbl_empresa.loc_emp,'Sin especificar') AS localizacion, count(tbl_empresa.id_usuario) AS empresas from tbl_empresa INNER JOIN tbl_usuarios ON tbl_empresa.id_usuario=tbl_usuarios.id GROUP BY tbl_empresa.loc_emp");
        return $empresas;
        return response()->json($empresas);
    }

    public function localizaciontrabajadores()
    {
        //consulta donde me dice cuantas empresas hay en cada localidad.
        $trabajadores=DB::select("SELECT IFNULL(tbl_trabajador.loc_trabajador,'Sin especificar') AS localizacion, count(tbl_trabajador.id_usuario) AS trabajadores from tbl_trabajador INNER JOIN tbl_usuarios ON tbl_trabajador.id_usuario=tbl_usuarios.id 
        GROUP BY tbl_trabajador.loc_trabajador");
        return $trabajadores;
        return response()->json($trabajadores);
    }

    public function usuarioscreados()
    {
        //consulta donde me dice cuantos usuarios se han creado cada mes.
        $usuarios=DB::select("SELECT MONTHNAME(tbl_usuarios.created_at) AS fecha_creacion, count(tbl_usuarios.id) AS usuarios from tbl_usuarios where ((tbl_usuarios.created_at) BETWEEN '2022-04-01' AND '2022-04-30') or ((tbl_usuarios.created_at) BETWEEN '2022-05-01' AND '2022-05-31') or ((tbl_usuarios.created_at) BETWEEN '2022-06-01' AND '2022-06-30') or ((tbl_usuarios.created_at) BETWEEN '2022-07-01' AND '2022-07-31') or ((tbl_usuarios.created_at) BETWEEN '2022-08-01' AND '2022-08-31') or ((tbl_usuarios.created_at) BETWEEN '2022-09-01' AND '2022-09-30') or ((tbl_usuarios.created_at) BETWEEN '2022-10-01' AND '2022-10-31') or ((tbl_usuarios.created_at) BETWEEN '2022-11-01' AND '2022-11-30') or ((tbl_usuarios.created_at) BETWEEN '2022-12-01' AND '2022-12-31') GROUP BY ((tbl_usuarios.created_at ) BETWEEN '2022-05-01' AND '2022-05-31'), ((tbl_usuarios.created_at ) BETWEEN '2022-06-01' AND '2022-06-30'), ((tbl_usuarios.created_at ) BETWEEN '2022-07-01' AND '2022-07-31'), ((tbl_usuarios.created_at ) BETWEEN '2022-08-01' AND '2022-08-31'), ((tbl_usuarios.created_at ) BETWEEN '2022-09-01' AND '2022-09-30'), ((tbl_usuarios.created_at ) BETWEEN '2022-10-01' AND '2022-10-31'), ((tbl_usuarios.created_at ) BETWEEN '2022-11-01' AND '2022-11-30'), ((tbl_usuarios.created_at ) BETWEEN '2022-12-01' AND '2022-12-31') ORDER BY (tbl_usuarios.created_at) ASC;");
        return $usuarios;
        return response()->json($usuarios);
    }
    public function mediaedad()
    {
        //consulta donde me dice cuantas empresas hay en cada localidad.
        $mediaedad=DB::select('SELECT AVG(TIMESTAMPDIFF(YEAR, tbl_trabajador.edad, CURDATE())) AS edad, count(tbl_trabajador.id_usuario) AS trabajadores_totales from tbl_trabajador INNER JOIN tbl_usuarios ON tbl_trabajador.id_usuario=tbl_usuarios.id GROUP BY (tbl_usuarios.id_perfil )');
        return $mediaedad;
        return response()->json($mediaedad);
    }

    public function usuariosmostrados()
    {
        //consulta donde me dice cuantas empresas hay en cada localidad.
        $mostrado=DB::select('SELECT tbl_perfiles.nom_perfil, count(tbl_trabajador.id_usuario) AS total_mostrados  
        FROM tbl_usuarios
        JOIN tbl_perfiles ON tbl_usuarios.id_perfil=tbl_perfiles.id
        JOIN tbl_trabajador ON tbl_trabajador.id_usuario = tbl_usuarios.id 
        WHERE tbl_trabajador.mostrado=1
        UNION ALL
        SELECT tbl_perfiles.nom_perfil, count(tbl_empresa.id_usuario) AS empresa 
        FROM tbl_usuarios
        JOIN tbl_perfiles ON tbl_usuarios.id_perfil=tbl_perfiles.id
        JOIN tbl_empresa ON tbl_empresa.id_usuario = tbl_usuarios.id
        WHERE tbl_empresa.mostrado=1
        GROUP BY tbl_usuarios.id_perfil');
        return $mostrado;
        return response()->json($mostrado);
    }


}

// SELECT tbl_usuarios.created_at AS fecha_creacion, count(tbl_usuarios.id) AS usuarios from tbl_usuarios where ((tbl_usuarios.created_at) BETWEEN '2022-04-01' AND '2022-04-30') or ((tbl_usuarios.created_at) BETWEEN '2022-05-01' AND '2022-05-31') or ((tbl_usuarios.created_at) BETWEEN '2022-06-01' AND '2022-06-30') or ((tbl_usuarios.created_at) BETWEEN '2022-07-01' AND '2022-07-30') or ((tbl_usuarios.created_at) BETWEEN '2022-08-01' AND '2022-08-31') or ((tbl_usuarios.created_at) BETWEEN '2022-09-01' AND '2022-09-30') or ((tbl_usuarios.created_at) BETWEEN '2022-10-01' AND '2022-10-31') or ((tbl_usuarios.created_at) BETWEEN '2022-11-01' AND '2022-11-30') or ((tbl_usuarios.created_at) BETWEEN '2022-12-01' AND '2022-12-31') GROUP BY tbl_usuarios.created_at;


// SELECT tbl_perfiles.nom_perfil, count(tbl_usuarios.id) AS trabajador  
// FROM tbl_usuarios
// JOIN tbl_perfiles ON tbl_usuarios.id_perfil=tbl_perfiles.id
// WHERE id_perfil=2 or id_perfil=3  GROUP BY tbl_usuarios.id_perfil;

// SELECT tbl_perfiles.nom_perfil, tbl_trabajador.id_usuario, tbl_empresa.id_usuario, count(tbl_trabajador.id_usuario) AS trabajador, count(tbl_empresa.id_usuario) AS empresa  
// FROM tbl_usuarios
// JOIN tbl_perfiles ON tbl_usuarios.id_perfil=tbl_perfiles.id
// JOIN tbl_trabajador ON tbl_trabajador.id_usuario = tbl_usuarios.id
// JOIN tbl_empresa ON tbl_empresa.id_usuario = tbl_usuarios.id
// WHERE tbl_trabajador.mostrado=1 or tbl_empresa.mostrado=1 AND id_perfil=2 or id_perfil=3  GROUP BY tbl_usuarios.id_perfil;



// SELECT tbl_perfiles.nom_perfil, count(tbl_trabajador.id_usuario) AS trabajador  
// FROM tbl_usuarios
// JOIN tbl_perfiles ON tbl_usuarios.id_perfil=tbl_perfiles.id
// JOIN tbl_trabajador ON tbl_trabajador.id_usuario = tbl_usuarios.id 
// UNION ALL
// SELECT tbl_perfiles.nom_perfil, count(tbl_empresa.id_usuario) AS empresa 
// FROM tbl_usuarios
// JOIN tbl_perfiles ON tbl_usuarios.id_perfil=tbl_perfiles.id
// JOIN tbl_empresa ON tbl_empresa.id_usuario = tbl_usuarios.id WHERE empresa.mostrado=1 
// GROUP BY tbl_usuarios.id_perfil;