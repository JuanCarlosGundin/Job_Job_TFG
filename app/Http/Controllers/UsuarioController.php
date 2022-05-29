<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\storage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;
use App\Http\Controllers\Session;

class UsuarioController extends Controller{

public function logout(Request $req){
    /* $req->session()->forget('id_user');
    $req->session()->forget('id_perfil'); */
    $req->session()->flush();
    return redirect('/');
}


//

    ///ZONA ADMINISTRADOR
    public function vistaAdmin() {

        return view('cPanelAdmin');

    }


    public function leer(Request $req) {

        $filcorreo = $req->input('filcorreo');
        $filtro = $req->input('filtro');
        $filid = $req->input('filid');
        $Empresa = $req->input('Empresa');
        $Trabajador = $req->input('Trabajador');
        $Admin = $req->input('Admin');

        /* $query.=" WHERE nom_emp like '{$filtro}%'"; */
        $datos=array('res' => 'OK');

        /* si se ha seleccionado admin en el checkbox */
        if ($Admin == 'true'){

            $adminquery="SELECT * FROM tbl_usuarios WHERE mail like '{$filcorreo}%' and id_perfil='1'";
            $admin=DB::select($adminquery);
            $datos+=array('admin' => $admin);
            /* $idadmin = session()->get('id_user');
            $datos+=array('idadmin' => $idadmin); */

        }

        /* si se ha seleccionado trabajador en el checkbox */
        if ($Trabajador == 'true'){

            $trabajadorquery="SELECT * FROM tbl_usuarios
            INNER JOIN tbl_trabajador on tbl_trabajador.id_usuario=tbl_usuarios.id WHERE mail like '{$filcorreo}%' and nombre like '{$filtro}%' and id like '{$filid}%'";
            $trabajador=DB::select($trabajadorquery);
            $datos+=array('trabajador' => $trabajador);

        }

        /* si se ha seleccionado empresa en el checkbox */
        if ($Empresa == 'true'){

            $empresaquery="SELECT * FROM tbl_usuarios
            INNER JOIN tbl_empresa on tbl_empresa.id_usuario=tbl_usuarios.id WHERE mail like '{$filcorreo}%' and nom_emp like '{$filtro}%' and id like '{$filid}%'";   
            $empresa=DB::select($empresaquery);
            $datos+=array('empresa' => $empresa);

        }

        return response()->json($datos);

    }


    //obtener perfiles
    public function perfiles() {

        $datos=DB::select("SELECT * FROM tbl_perfiles");
        return response()->json($datos);

    }


    public function crearuser(Request $req) {

        //añadir logo empresa si existe

        if($req->hasFile('logo_emp')){

            $logo_emp = $req->file('logo_emp')->store('uploads','public');

        }else{

            $logo_emp = NULL;

        }

        try {
            
            DB::beginTransaction();
            /* insertar usuarios */
            //obtener dia y hora
            $date = Carbon::now('+02:00');

            //formato correcto
            $fechaactual = $date->toDateTimeString();
            $id=DB::table('tbl_usuarios')->insertGetId(["mail"=>$req['mail'],"contra"=>hash('sha256',$req['contra']),"id_perfil"=>$req['id_perfil'],"estado"=>'1',"created_at"=>$fechaactual,"verificado"=>'1']);

            /* ademas que sean trabajadores */
            if ($req['id_perfil'] == 2) {
                $id=DB::table('tbl_trabajador')->insert(["id_usuario"=>$id,"nombre"=>$req['nombre'],"apellido"=>$req['apellido'],"edad"=>$req['edad'],"mostrado"=>'1']);
            }

            /* o que sean empresas */
            if ($req['id_perfil'] == 3) {
                $id=DB::table('tbl_empresa')->insert(["id_usuario"=>$id,"nom_emp"=>$req['nom_emp'],"loc_emp"=>$req['loc_emp'],"about_emp"=>$req['about_emp'],"campo_emp"=>$req['campo_emp'],"searching"=>$req['searching'],"vacante"=>$req['vacante'],"mostrado"=>'1',"logo_emp"=>$logo_emp]);
                
            }

            DB::commit();
            return response()->json(array('resultado'=> 'OK'));

        }   catch (\Exception $e) {

            DB::rollback();
            return response()->json(array('resultado'=> $e->getMessage()));

        }

    }


    //cambiamos el estado del usuario si queremos banearlo o restaurarlo
    public function estadouser($id) {

        $datos=DB::select("SELECT estado FROM tbl_usuarios
        WHERE id = ?",[$id]);
        DB::beginTransaction();

        try{

            if ($datos[0]->estado == 1){
                $idusuario=DB::select("SELECT mail FROM tbl_usuarios
                WHERE id = ?",[$id]);
                DB::select("UPDATE tbl_usuarios SET estado = '0'
                WHERE id = ?",[$id]);

            }else{

                DB::select("UPDATE tbl_usuarios SET estado = '1'
                WHERE id = ?",[$id]);

            }

            DB::commit();
            return response()->json(array('resultado'=> 'OK'));

        }   catch (\Exception $e) {

            DB::rollback();
            return response()->json(array('resultado'=> 'NOK: '.$e->getMessage()));

        }

    }

    //mostrar el contenido del modal al querer modificar un registro
    public function mostrarmodaluser($id, $id_perfil) {

        DB::beginTransaction();

        try{

            $datos=array('res' => 'OK');
            $usuarios = DB::table('tbl_usuarios')->where('id','=',$id)->first();
            $datos+=array('usuarios' => $usuarios);

            if ($id_perfil == 2){

                $trabajador = DB::table('tbl_trabajador')->where('id_usuario','=',$id)->first();
                $datos+=array('trabajador' => $trabajador);

            }

            if ($id_perfil == 3){

                $empresa = DB::table('tbl_empresa')->where('id_usuario','=',$id)->first();
                $datos+=array('empresa' => $empresa);

            }

            DB::commit();
            return response()->json($datos);

        }   catch (\Exception $e) {

            DB::rollback();
            return response()->json(array('resultado'=> 'NOK: '.$e->getMessage()));

        }

    }


    public function modificaruser(Request $req, $id, $id_perfil) {

        DB::beginTransaction();

        try{

            /* si es trabajador */
            if ($id_perfil == 2){

                /* si existe una foto */
                if ($req->hasFile('foto_perfil')) {

                    $foto = DB::table('tbl_trabajador')->select('foto_perfil')->where('id_usuario','=',$id)->first();

                    if ($foto->foto_perfil != null) {

                        Storage::delete('public/'.$foto->foto_perfil);

                    }

                    $foto_perfil = $req->file('foto_perfil')->store('uploads','public');

                }else{

                    $foto = DB::table('tbl_trabajador')->select('foto_perfil')->where('id_usuario','=',$id)->first();
                    $foto_perfil = $foto->foto_perfil;

                }

                DB::table('tbl_trabajador')->where('id_usuario','=',$id)->update(["nombre"=>$req['nombre'],"foto_perfil"=>$foto_perfil,"edad"=>$req['edad'],"mostrado"=>$req['mostrado']]);

            }

            /* si es empresa */
            if ($id_perfil == 3){

                /* si existe un logo */
                if ($req->hasFile('logo_emp')) {

                    $logo = DB::table('tbl_empresa')->select('logo_emp')->where('id_usuario','=',$id)->first();

                    if ($logo->logo_emp != null) {

                        Storage::delete('public/'.$logo->logo_emp);

                    }

                    $logo_emp = $req->file('logo_emp')->store('uploads','public');

                }else{

                    $logo = DB::table('tbl_empresa')->select('logo_emp')->where('id_usuario','=',$id)->first();
                    $logo_emp = $logo->logo_emp;

                }

                DB::table('tbl_empresa')->where('id_usuario','=',$id)->update(["nom_emp"=>$req['nom_emp'],"mostrado"=>$req['mostrado'],"logo_emp"=>$logo_emp]);
                
            }
            /* si la contraseña la modificas, que tenga sha256, si no que conserve valor */
            $uscontra = DB::table('tbl_usuarios')->where('id','=',$id)->select('contra')->first();

            if ($req['contra'] == $uscontra->contra){

                DB::table('tbl_usuarios')->where('id','=',$id)->update(["mail"=>$req['mail'],"contra"=>$req['contra'],"estado"=>$req['estado']]);

            } else{

                DB::table('tbl_usuarios')->where('id','=',$id)->update(["mail"=>$req['mail'],"contra"=>hash('sha256',$req['contra']),"estado"=>$req['estado']]);

            }

            DB::commit();
            return response()->json(array('resultado'=> 'OK'));

        }   catch (\Exception $e) {

            DB::rollback();
            return response()->json(array('resultado'=> 'NOK: '.$e->getMessage()));

        }

    }



    ///ZONA ADMINISTRADOR

    ///ZONA NOTIFICACIONES
    public function vistaNotificaciones() {

        return view("notificaciones");

    }


    //leernotificaciones
    public function leernotificaciones(Request $req) {

        $id=session()->get('id_user');
        $id_perfil=session()->get('id_perfil');

        //si el cliente es trabajador, mira ofertas de empresas
        if($id_perfil==2){

            try {

                DB::beginTransaction();
                $empresas=DB::select('select * from tbl_usuarios
                inner join tbl_interaccion on tbl_usuarios.id=tbl_interaccion.id_interactuado
                inner join tbl_empresa on tbl_interaccion.id_iniciador=tbl_empresa.id_usuario
                where tbl_empresa.nom_emp like ? and tbl_interaccion.id_interactuado = ? and tbl_interaccion.tipo_interaccion <> 2',[$req['filter']."%",$id]);
                DB::commit();
                return response()->json(array('empresas'=> $empresas));

            } catch (\Exception $e) {

                return response()->json(array('resultado'=> 'NOK: '.$e->getMessage()));

            }

        }else{

            //si el cliente es empresa, mira ofertas de trabajador
            try {

                DB::beginTransaction();
                $trabajadores=DB::select('select * from tbl_usuarios
                inner join tbl_interaccion on tbl_usuarios.id=tbl_interaccion.id_interactuado
                inner join tbl_trabajador on tbl_interaccion.id_iniciador=tbl_trabajador.id_usuario
                where tbl_trabajador.nombre like ?  and tbl_interaccion.id_interactuado = ? and tbl_interaccion.tipo_interaccion <> 2',[$req['filter']."%",$id]);
                DB::commit();
                return response()->json(array('trabajadores'=> $trabajadores));

            } catch (\Exception $e) {

                return response()->json(array('resultado'=> 'NOK: '.$e->getMessage()));

            }

        }

    }


    public function leerperfiloneuser($id, $id_perfil) {
        // si eres trabajador
        if ($id_perfil == 2){

            $trabajador = DB::select('select * from tbl_usuarios
            INNER JOIN tbl_trabajador on tbl_trabajador.id_usuario=tbl_usuarios.id where id=?',[$id]);
            return response()->json(array('trabajador' => $trabajador, 'id_perfil' =>$id_perfil));

        }
        //si eres empresa
        if ($id_perfil == 3) {

            $empresa = DB::select('select * from tbl_usuarios
            INNER JOIN tbl_empresa on tbl_empresa.id_usuario=tbl_usuarios.id where id=?',[$id]);
            return response()->json(array('empresa' => $empresa, 'id_perfil' =>$id_perfil));

        }

    }

    ///ZONA NOTIFICACIONES


    //----------------------------------------------------CREAR REPORTE-------------------------------------------------------------//
    public function crearreporte(Request $request) {
        $datos = $request->except('_token');
        $incidencia = $request->input('incidencia');
        $request->input('id_reportado');
        $request->input('id_reportador');
        $desarrollar_incidencia = $request->input('desarrollar_incidencia');
        $this->validate($request, [
            'incidencia' => 'required',
            'desarrollar_incidencia' => 'required',
            'id_reportado' => 'required',
            'id_reportador' => 'required',
        ],
        // segundo array donde ponemos el mensaje personalizado para cada regla
        [
            'incidencia.required' => 'incidencia no debe quedar en blanco',
            'desarrollar_incidencia.required' => 'desarrollar incidencia no debe quedar en blanco',
            'id_reportado.required' => 'id reportado no debe quedar en blanco',
            'id_reportador.required' => 'id reportador no debe quedar en blanco',
        ]);
        try {
            DB::beginTransaction();
            $date = Carbon::now('+02:00');

            //formato correcto
            $fechaactual = $date->toDateTimeString();
            /*insertar datos en la base de datos*/
            //cambiar la linea de abajo
            DB::table('tbl_reportes')->insert(["incidencia"=>$incidencia,"desarrollar_incidencia"=>$desarrollar_incidencia,"estado_incidencia"=>'abierta',"fecha_incidencia"=>$fechaactual,"id_reportado"=>$datos['id_reportado'],"id_reportador"=>$datos['id_reportador']]);
            DB::commit();
            return response()->json(array('resultado'=> 'OK'));
        }   catch (\Exception $e) {
            DB::rollback();
            return response()->json(array('resultado'=> $e->getMessage()));
        }
    }

    public function pillarsesion(){
        $sesion=session()->get('id_user');
        if(isset($sesion)){
            return response()->json(array('resultado'=> $sesion));
        }else{
            return response()->json(array('resultado'=> 'false'));
        }
        
        
    }
    //--------------------------------------------------FIN CREAR REPORTE-----------------------------------------------------------//
    //-----------------------------------------------------GESTIONAR REPORTES----------------------------------------------------------//
    
    public function leerreportes(Request $request){
    $datos=DB::select('select * from tbl_reportes where incidencia like ? ORDER BY fecha_incidencia DESC',['%'.$request->input('filtro').'%']);
    return response()->json($datos);
}


    // public function eliminarreporte($id){
    //     try {
    //         $id = DB::table('tbl_reportes')->where('id','=',$id)->delete();
    //         return response()->json(array('resultado'=> 'OK')); 
    //     } catch (\Throwable $th) {
    //         return response()->json(array('resultado'=> 'NOK: '.$th->getMessage()));
    //     } 
    // }  

    public function estadoreporte($id) {

        $date = Carbon::now('+02:00');
        //formato correcto
        $fechaactual = $date->toDateTimeString();

        $datos=DB::select("SELECT estado_incidencia FROM tbl_reportes
        WHERE id = ?",[$id]);

        try{

            DB::beginTransaction();
            if ($datos[0]->estado_incidencia == "abierta"){

                DB::select("UPDATE tbl_reportes SET estado_incidencia = 'cerrada', fecha_incidencia = '".$fechaactual."'
                WHERE id = ?",[$id]);

            }else{

                DB::select("UPDATE tbl_reportes SET estado_incidencia = 'abierta', fecha_incidencia = '".$fechaactual."'
                WHERE id = ?",[$id]);

            }

            DB::commit();
            return response()->json(array('resultado'=> 'OK'));

        }   catch (\Exception $e) {

            DB::rollback();
            return response()->json(array('resultado'=> 'NOK: '.$e->getMessage()));

        }

    }
    //--------------------------------------------------FIN GESTIONAR REPORTES----------------------------------------------------------//
    

}