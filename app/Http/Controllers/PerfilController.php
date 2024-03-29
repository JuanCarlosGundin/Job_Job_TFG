<?php

namespace App\Http\Controllers;

use App\Models\Perfil;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class PerfilController extends Controller{
    public function vistaPerfil(){

        return view('perfil');

    }


    public function leerperfiledit(){

        $id=session()->get('id_user');
        $id_perfil=session()->get('id_perfil');
        try {
            if ($id_perfil == 2){

                $trabajador=DB::table('tbl_usuarios')
                ->join('tbl_trabajador', 'tbl_usuarios.id', '=', 'tbl_trabajador.id_usuario')
                ->where('id', '=', $id)->first();
                return response()->json(array('resultado' => $trabajador, 'id_perfil' =>$id_perfil));

            }
            if ($id_perfil == 3) {

                $empresa=DB::table('tbl_usuarios')
                ->join('tbl_empresa', 'tbl_usuarios.id', '=', 'tbl_empresa.id_usuario')
                ->where('id', '=', $id)->first();
                return response()->json(array('resultado' => $empresa, 'id_perfil' =>$id_perfil));

            }
        } catch (\Exception $e) {
            return response()->json(array('resultado'=> 'NOK: '.$e->getMessage()));
        }

    }

    public function editarperfiltrabajador(Request $req) {
        $id=session()->get('id_user');

        try {

            //obtener dia y hora
            $date = Carbon::now('+02:00');

            //formato correcto
            $updated_at = $date->toDateTimeString();

            $datauser=array();

            $datauser[]= "updated_at='".$updated_at."'";

            //editar_user
            if ($req->has('mail')){
                //Comprobar si el correo introducido ya existe en la BBDD
                $comprobarmail = DB::table("tbl_usuarios")->where('id','=',$id)->where('mail','=',$req['mail'])->count();
                if ($comprobarmail>=1){
                    $validator = Validator::make($req->all(), [
                        'mail'=>'required|email|string|max:100',
                    ]);
                    if ($validator->fails()) {
    
                        return response()->json(['errors'=>$validator->errors()->all()]);
                    }
                } else {
                    $validator = Validator::make($req->all(), [
                        'mail'=>'required|unique:tbl_usuarios,mail|string|max:100',
                    ]);
                    if ($validator->fails()) {
    
                        return response()->json(['errors'=>$validator->errors()->all(),'hola'=>'lol']);
                    }
                }

                $datauser[]= "mail='".$req['mail']."'";
            }

            if ($req->has(['contra_old', 'contra', 'contra2'])){
                $validator = Validator::make($req->all(), [
                    'contra'=>'required|string|min:8|max:100',
                    'contra2'=>'required|same:contra',
                ]);
                if ($validator->fails()) {

                    return response()->json(['errors'=>$validator->errors()->all()]);
                }

                $comprobarhash=hash('sha256',$req['contra_old']);
                $comprobarcontra = DB::table("tbl_usuarios")->where('id','=',$id)->first();
                if ($comprobarcontra->contra==$comprobarhash){
                    $contra=hash('sha256',$req['contra']);
                    $datauser[]= "contra='".$contra."'";                    
                }
                else{
                    return response()->json(array('resultado'=> 'contraseña_incorrecta'));
                }

            }

            $data=array();

            //editar_user
            if ($req->has('nombre')){
                $validator = Validator::make($req->all(), [
                    'nombre'=>'required|string|max:100',
                ]);
                if ($validator->fails()) {
                    
                    return response()->json(['errors'=>$validator->errors()->all()]);
                }
                $data[]= "nombre='".$req['nombre']."'";
            }
            if ($req->has('apellido')) {
                $validator = Validator::make($req->all(), [
                    'apellido'=>'required|string|max:100',
                ]);
                if ($validator->fails()) {
                    
                    return response()->json(['errors'=>$validator->errors()->all()]);
                }

                $data[]= "apellido='".$req['apellido']."'";
            }
            //editar_foto_perfil

            if ($req->has('foto_perfil')) {
                $validator = Validator::make($req->all(), [
                    'foto_perfil'=>'required|image',
                ]);
                if ($validator->fails()) {

                    return response()->json(['errors'=>$validator->errors()->all()]);
                }

                $foto = DB::table('tbl_trabajador')->select('foto_perfil')->where('id_usuario','=',$id)->first();

                if ($foto->foto_perfil != null) {
                    Storage::delete('public/'.$foto->foto_perfil);
                }
                $foto_perfil = $req->file('foto_perfil')->store('uploads','public');
                $data[]= "foto_perfil='".$foto_perfil."'";
            }
            //editar_sobre_mi
            if ($req->has('campo_user')) {
                $validator = Validator::make($req->all(), [
                    'campo_user'=>'string|max:50'
                ]);
                if ($validator->fails()) {
                    
                    return response()->json(['errors'=>$validator->errors()->all()]);
                } 

                $data[]= "campo_user='".$req['campo_user']."'";
            }
            if ($req->has('about_user')) {
                $validator = Validator::make($req->all(), [
                    'about_user'=>'string|max:300'
                ]);
                if ($validator->fails()) {
                    
                    return response()->json(['errors'=>$validator->errors()->all()]);
                } 

                $data[]= "about_user='".$req['about_user']."'";
            }
            if ($req->has('loc_trabajador')) {
                $validator = Validator::make($req->all(), [
                    'loc_trabajador'=>'string|max:100'
                ]);
                if ($validator->fails()) {
                    
                    return response()->json(['errors'=>$validator->errors()->all()]);
                }
                
                $data[]= "loc_trabajador='".$req['loc_trabajador']."'";
            }
            if ($req->has('lenguaje_preferido')) {
                $validator = Validator::make($req->all(), [
                    'lenguaje_preferido'=>'string|max:50'
                ]);
                if ($validator->fails()) {
                    
                    return response()->json(['errors'=>$validator->errors()->all()]);
                }

                $data[]= "lenguaje_preferido='".$req['lenguaje_preferido']."'";
            }
            if ($req->has('linkedin')) {
                $validator = Validator::make($req->all(), [
                    'linkedin'=>'string|max:100'
                ]);
                if ($validator->fails()) {
                    
                    return response()->json(['errors'=>$validator->errors()->all()]);
                }

                $data[]= "linkedin='".$req['linkedin']."'";
            }
            if ($req->has('telefono')) {
                $validator = Validator::make($req->all(), [
                    'telefono'=>'string|max:15'
                ]);
                if ($validator->fails()) {
                    
                    return response()->json(['errors'=>$validator->errors()->all()]);
                }

                $data[]= "telefono='".$req['telefono']."'";
            }
            if ($req->has('github')) {
                $validator = Validator::make($req->all(), [
                    'github'=>'string|max:100'
                ]);
                if ($validator->fails()) {
                    
                    return response()->json(['errors'=>$validator->errors()->all()]);
                }

                $data[]= "github='".$req['github']."'";
            }

            //Actualizar idiomas
            if ($req->has(['nombre_idioma', 'nivel_idioma', 'numero_idioma'])) {

                $validator = Validator::make($req->all(), [
                    'nombre_idioma.*'=>'string|max:100',
                    'nivel_idioma.*'=>'string|max:100'
                ]);
                if ($validator->fails()) {
                    
                    return response()->json(['errors'=>$validator->errors()->all()]);
                } 

                //Modificar un solo idioma
                $data[]= "curriculum=JSON_REPLACE(curriculum, '$.idiomas[".$req['numero_idioma']."].nivel_idioma', '".$req['nivel_idioma']."', '$.idiomas[".$req['numero_idioma']."].nombre_idioma', '".$req['nombre_idioma']."')";
            } elseif ($req->has(['nombre_idioma', 'nivel_idioma'])) {

                $validator = Validator::make($req->all(), [
                    'nombre_idioma.*'=>'string|max:100',
                    'nivel_idioma.*'=>'string|max:100'
                ]);
                if ($validator->fails()) {
                    
                    return response()->json(['errors'=>$validator->errors()->all()]);
                } 

                //Crear idioma
                $existecurriculum= DB::table('tbl_trabajador')->select('curriculum')->where('id_usuario','=',$id)->first();
                if ($existecurriculum->curriculum==null) {

                    //crear JSON curriculum
                    $lineaidioma='{"idiomas":[{"nivel_idioma": "'.$req['nivel_idioma'].'","nombre_idioma": "'.$req['nombre_idioma'].'"}]}';
                    $data[]="curriculum='".$lineaidioma."'";
                } else {

                    $existeidiomas= DB::table('tbl_trabajador')->select('curriculum->idiomas as idiomas')->where('id_usuario','=',$id)->first();
                    if ($existeidiomas->idiomas==null) {

                        //Crear JSON idiomas
                        $data[]="curriculum = JSON_INSERT(curriculum, '$.idiomas', JSON_ARRAY(JSON_OBJECT('nivel_idioma', '".$req['nivel_idioma']."', 'nombre_idioma', '".$req['nombre_idioma']."')))";
                    } else {

                        //appendear idiomas
                        $data[]="curriculum = JSON_ARRAY_APPEND(curriculum, '$.idiomas', JSON_OBJECT('nivel_idioma', '".$req['nivel_idioma']."', 'nombre_idioma', '".$req['nombre_idioma']."'))";
                    }
                }

            } elseif ($req->has('numero_idioma')) {

                //eliminar un solo idioma
                $data[]= "curriculum=JSON_REMOVE(curriculum, '$.idiomas[".$req['numero_idioma']."]')";
            }

            //Actualizar estudios
            if ($req->has(['nombre_formación', 'lugar_formación', 'año_entrada', 'año_salida', 'numero_estudio'])) {

                $validator = Validator::make($req->all(), [
                    'nombre_formación.*'=>'string|max:100',
                    'lugar_formación.*'=>'string|max:100',
                    /* 'año_entradafor.*'=>'date',
                    'año_salidafor.*'=>'date|after:año_entradafor' */
                ]);
                if ($validator->fails()) {
                    
                    return response()->json(['errors'=>$validator->errors()->all()]);
                }

                //Modificar un solo estudio
                $data[]= "curriculum=JSON_REPLACE(curriculum, '$.estudios[".$req['numero_estudio']."].año_salida', '".$req['año_salida']."', '$.estudios[".$req['numero_estudio']."].año_entrada', '".$req['año_entrada']."', '$.estudios[".$req['numero_estudio']."].lugar_formación', '".$req['lugar_formación']."', '$.estudios[".$req['numero_estudio']."].nombre_formación', '".$req['nombre_formación']."')";
            } elseif ($req->has(['nombre_formación', 'lugar_formación', 'año_entrada', 'año_salida'])) {

                $validator = Validator::make($req->all(), [
                    'nombre_formación.*'=>'string|max:100',
                    'lugar_formación.*'=>'string|max:100',
                    /* 'año_entradafor.*'=>'date',
                    'año_salidafor.*'=>'date|after:año_entradafor' */
                ]);
                if ($validator->fails()) {
                    
                    return response()->json(['errors'=>$validator->errors()->all()]);
                }

                //Crear estudio
                $existecurriculum= DB::table('tbl_trabajador')->select('curriculum')->where('id_usuario','=',$id)->first();
                if ($existecurriculum->curriculum==null) {

                    //crear JSON curriculum
                    $lineaestudio='{"estudios":[{"año_salida": "'.$req['año_salida'].'","año_entrada": "'.$req['año_entrada'].'","lugar_formación": "'.$req['lugar_formación'].'","nombre_formación": "'.$req['nombre_formación'].'"}]}';
                    $data[]="curriculum='".$lineaestudio."'";
                } else {

                    $existeestudio= DB::table('tbl_trabajador')->select('curriculum->estudios as estudios')->where('id_usuario','=',$id)->first();
                    if ($existeestudio->estudios==null) {

                        //Crear JSON estudios
                        $data[]="curriculum = JSON_INSERT(curriculum, '$.estudios', JSON_ARRAY(JSON_OBJECT('año_salida', '".$req['año_salida']."', 'año_entrada', '".$req['año_entrada']."', 'lugar_formación', '".$req['lugar_formación']."', 'nombre_formación', '".$req['nombre_formación']."')))";
                    } else {

                        //appendear estudios
                        $data[]="curriculum = JSON_ARRAY_APPEND(curriculum, '$.estudios', JSON_OBJECT('año_salida', '".$req['año_salida']."', 'año_entrada', '".$req['año_entrada']."', 'lugar_formación', '".$req['lugar_formación']."', 'nombre_formación', '".$req['nombre_formación']."'))";
                    }
                }
            } elseif ($req->has('numero_estudio')) {

                // Eliminar un solo estudio
                $data[]= "curriculum=JSON_REMOVE(curriculum, '$.estudios[".$req['numero_estudio']."]')";
            }

            //Actualizar experiencias
            if ($req->has(['nombre_experiencia', 'lugar_experiencia', 'año_entrada', 'año_salida', 'funciones', 'numero_experiencia'])) {

                $validator = Validator::make($req->all(), [
                    'nombre_experiencia.*'=>'string|max:100',
                    'lugar_experiencia.*'=>'string|max:200',
                    'funciones.*'=>'string|max:500',
                    /* 'año_entradaexp.*'=>'date',
                    'año_salidaexp.*'=>'date|after:año_entradaexp' */
                ]);
                if ($validator->fails()) {
                    
                    return response()->json(['errors'=>$validator->errors()->all()]);
                }

                //Modificar una sola experiencia
                $data[]= "curriculum=JSON_REPLACE(curriculum, '$.experiencia[".$req['numero_experiencia']."].funciones', '".$req['funciones']."', '$.experiencia[".$req['numero_experiencia']."].año_salida', '".$req['año_salida']."', '$.experiencia[".$req['numero_experiencia']."].año_entrada', '".$req['año_entrada']."', '$.experiencia[".$req['numero_experiencia']."].lugar_experiencia', '".$req['lugar_experiencia']."', '$.experiencia[".$req['numero_experiencia']."].nombre_experiencia', '".$req['nombre_experiencia']."')";
            } elseif ($req->has(['nombre_experiencia', 'lugar_experiencia', 'año_entrada', 'año_salida', 'funciones'])) {

                $validator = Validator::make($req->all(), [
                    'nombre_experiencia.*'=>'string|max:100',
                    'lugar_experiencia.*'=>'string|max:200',
                    'funciones.*'=>'string|max:500',
                    /* 'año_entradaexp.*'=>'date',
                    'año_salidaexp.*'=>'date|after:año_entradaexp' */
                ]);
                if ($validator->fails()) {
                    
                    return response()->json(['errors'=>$validator->errors()->all()]);
                }

                //Crear experiencia
                $existecurriculum= DB::table('tbl_trabajador')->select('curriculum')->where('id_usuario','=',$id)->first();
                if ($existecurriculum->curriculum==null) {

                    //crear JSON curriculum
                    $lineaexperiencia='{"experiencia":[{"funciones": "'.$req['funciones'].'","año_salida": "'.$req['año_salida'].'","año_entrada": "'.$req['año_entrada'].'","lugar_experiencia": "'.$req['lugar_experiencia'].'","nombre_experiencia": "'.$req['nombre_experiencia'].'"}]}';
                    $data[]="curriculum='".$lineaexperiencia."'";
                } else {

                    $existeexperiencia= DB::table('tbl_trabajador')->select('curriculum->experiencia as experiencia')->where('id_usuario','=',$id)->first();
                    if ($existeexperiencia->experiencia==null) {

                        //Crear JSON experiencia
                        $data[]="curriculum = JSON_INSERT(curriculum, '$.experiencia', JSON_ARRAY(JSON_OBJECT('funciones', '".$req['funciones']."','año_salida', '".$req['año_salida']."', 'año_entrada', '".$req['año_entrada']."', 'lugar_experiencia', '".$req['lugar_experiencia']."', 'nombre_experiencia', '".$req['nombre_experiencia']."')))";
                    } else {

                        //appendear experiencia
                        $data[]="curriculum = JSON_ARRAY_APPEND(curriculum, '$.experiencia', JSON_OBJECT('funciones', '".$req['funciones']."','año_salida', '".$req['año_salida']."', 'año_entrada', '".$req['año_entrada']."', 'lugar_experiencia', '".$req['lugar_experiencia']."', 'nombre_experiencia', '".$req['nombre_experiencia']."'))";
                    }
                }
            } elseif ($req->has('numero_experiencia')) {

                // Eliminar una sola experiencia
                $data[]= "curriculum=JSON_REMOVE(curriculum, '$.experiencia[".$req['numero_experiencia']."]')";
            }

            //Actualizar habilidades
            if ($req->has(['nombre_habilidad', 'nivel_habilidad', 'numero_habilidad'])) {

                $validator = Validator::make($req->all(), [
                    'nombre_habilidad.*'=>'string|max:100',
                    'nivel_habilidad.*'=>'string|max:100',
                ]);
                if ($validator->fails()) {
                    
                    return response()->json(['errors'=>$validator->errors()->all()]);
                }

                //Modificar una sola habilidad
                $data[]= "curriculum=JSON_REPLACE(curriculum, '$.habilidades[".$req['numero_habilidad']."].nivel_habilidad', '".$req['nivel_habilidad']."', '$.idiomas[".$req['numero_habilidad']."].nombre_habilidad', '".$req['nombre_habilidad']."')";
            } elseif ($req->has(['nombre_habilidad', 'nivel_habilidad'])) {

                $validator = Validator::make($req->all(), [
                    'nombre_habilidad.*'=>'string|max:100',
                    'nivel_habilidad.*'=>'string|max:100',
                ]);
                if ($validator->fails()) {
                    
                    return response()->json(['errors'=>$validator->errors()->all()]);
                }

                //Crear habilidad
                $existecurriculum= DB::table('tbl_trabajador')->select('curriculum')->where('id_usuario','=',$id)->first();
                if ($existecurriculum->curriculum==null) {

                    //crear JSON curriculum
                    $lineahabilidad='{"habilidades":[{"nivel_habilidad": "'.$req['nivel_habilidad'].'","nombre_habilidad": "'.$req['nombre_habilidad'].'"}]}';
                    $data[]="curriculum='".$lineahabilidad."'";
                } else {

                    $existehabilidades= DB::table('tbl_trabajador')->select('curriculum->habilidades as habilidades')->where('id_usuario','=',$id)->first();
                    if ($existehabilidades->habilidades==null) {

                        //Crear JSON habilidades
                        $data[]="curriculum = JSON_INSERT(curriculum, '$.habilidades', JSON_ARRAY(JSON_OBJECT('nivel_habilidad', '".$req['nivel_habilidad']."', 'nombre_habilidad', '".$req['nombre_habilidad']."')))";
                    } else {

                        //appendear habilidades
                        $data[]="curriculum = JSON_ARRAY_APPEND(curriculum, '$.habilidades', JSON_OBJECT('nivel_habilidad', '".$req['nivel_habilidad']."', 'nombre_habilidad', '".$req['nombre_habilidad']."'))";
                    }
                }

            } elseif ($req->has('numero_habilidad')) {

                //eliminar una sola habilidad
                $data[]= "curriculum=JSON_REMOVE(curriculum, '$.habilidades[".$req['numero_habilidad']."]')";
            }

            //editar_disponibilidad
            if ($req->has('disponibilidad')) {

                $validator = Validator::make($req->all(), [
                    'disponibilidad'=>'string|max:45'
                ]);
                if ($validator->fails()) {
                    
                    return response()->json(['errors'=>$validator->errors()->all()]);
                }

                $data[]= "disponibilidad='".$req['disponibilidad']."'";
            }
            if ($req->has('carnet_conducir')) {

                $validator = Validator::make($req->all(), [
                    'carnet_conducir'=>'string|max:45'
                ]);
                if ($validator->fails()) {
                    
                    return response()->json(['errors'=>$validator->errors()->all()]);
                }

                $data[]= "carnet_conducir='".$req['carnet_conducir']."'";
            }
            if ($req->has('vehiculo_propio')) {

                $validator = Validator::make($req->all(), [
                    'vehiculo_propio'=>'string|max:45'
                ]);
                if ($validator->fails()) {
                    
                    return response()->json(['errors'=>$validator->errors()->all()]);
                }
                
                $data[]= "vehiculo_propio='".$req['vehiculo_propio']."'";
            }

            //editar_configuracion
            if ($req->has('mostrado')) {

                $data[]= "mostrado='".$req['mostrado']."'";
            }

            DB::beginTransaction();
            DB::select("UPDATE tbl_usuarios SET " . implode(', ', $datauser) . " WHERE id=?",[$id]);
            DB::select("UPDATE tbl_trabajador SET " . implode(', ', $data) . " WHERE id_usuario=?",[$id]);
            DB::commit();
            return response()->json(array('resultado'=> 'OK'));
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(array('resultado'=> 'NOK: '.$e->getMessage()));
        }
    }

    public function editarperfilempresa(Request $req) {

        $id=session()->get('id_user');
        try {

            //obtener dia y hora
            $date = Carbon::now('+02:00');

            //formato correcto
            $updated_at = $date->toDateTimeString();

            $datauser=array();

            $datauser[]= "updated_at='".$updated_at."'";

            //editar_user_empresa
            if ($req->has('mail')){

                //Comprobar si el correo introducido ya existe en la BBDD
                $comprobarmail = DB::table("tbl_usuarios")->where('id','=',$id)->where('mail','=',$req['mail'])->count();
                if ($comprobarmail>=1){
                    $validator = Validator::make($req->all(), [
                        'mail'=>'required|email|string|max:100',
                    ]);
                    if ($validator->fails()) {
    
                        return response()->json(['errors'=>$validator->errors()->all()]);
                    }
                } else {
                    $validator = Validator::make($req->all(), [
                        'mail'=>'required|unique:tbl_usuarios,mail|string|max:100',
                    ]);
                    if ($validator->fails()) {
    
                        return response()->json(['errors'=>$validator->errors()->all(),'hola'=>'lol']);
                    }
                }

                $datauser[]= "mail='".$req['mail']."'";
            }

            if ($req->has(['contra_old', 'contra', 'contra2'])){

                $validator = Validator::make($req->all(), [
                    'contra'=>'required|string|min:8|max:100',
                    'contra2'=>'required|same:contra',
                ]);
                if ($validator->fails()) {

                    return response()->json(['errors'=>$validator->errors()->all()]);
                }

                $comprobarhash=hash('sha256',$req['contra_old']);
                $comprobarcontra = DB::table("tbl_usuarios")->where('id','=',$id)->first();
                if ($comprobarcontra->contra==$comprobarhash){
                    $contra=hash('sha256',$req['contra']);
                    $datauser[]= "contra='".$contra."'";                    
                }
                else{
                    return response()->json(array('resultado'=> 'contraseña_incorrecta'));
                }

            }

            $data=array();

            //editar_user_empresa
            if ($req->has('nom_emp')){

                $validator = Validator::make($req->all(), [
                    'nom_emp'=>'required|string|max:100',
                ]);
                if ($validator->fails()) {
                    
                    return response()->json(['errors'=>$validator->errors()->all()]);
                }
                
                $data[]= "nom_emp='".$req['nom_emp']."'";
            }

            //editar_logo_emp

            if ($req->has('logo_emp')) {

                $validator = Validator::make($req->all(), [
                    'logo_emp'=>'required|image',
                ]);
                if ($validator->fails()) {

                    return response()->json(['errors'=>$validator->errors()->all()]);
                }

                $logo = DB::table('tbl_empresa')->select('logo_emp')->where('id_usuario','=',$id)->first();

                if ($logo->logo_emp != null) {
                    Storage::delete('public/'.$logo->logo_emp);
                }
                $logo_emp = $req->file('logo_emp')->store('uploads','public');
                $data[]= "logo_emp='".$logo_emp."'";
            }

            //editar_sobre_empresa
            if ($req->has('about_emp')){

                $validator = Validator::make($req->all(), [
                    'about_emp'=>'string|max:300'
                ]);
                if ($validator->fails()) {
                    
                    return response()->json(['errors'=>$validator->errors()->all()]);
                }
                
                $data[]= "about_emp='".$req['about_emp']."'";
            }
            if ($req->has('campo_emp')){

                $validator = Validator::make($req->all(), [
                    'campo_emp'=>'string|max:100'
                ]);
                if ($validator->fails()) {
                    
                    return response()->json(['errors'=>$validator->errors()->all()]);
                }
                
                $data[]= "campo_emp='".$req['campo_emp']."'";
            }
            if ($req->has('loc_emp')){
                
                $validator = Validator::make($req->all(), [
                    'loc_emp'=>'string|max:100'
                ]);
                if ($validator->fails()) {
                    
                    return response()->json(['errors'=>$validator->errors()->all()]);
                }
                
                $data[]= "loc_emp='".$req['loc_emp']."'";
            }

            //editar_buscamos_empresa
            if ($req->has('vacante')){

                $validator = Validator::make($req->all(), [
                    'vacante'=>'string|max:100'
                ]);
                if ($validator->fails()) {
                    
                    return response()->json(['errors'=>$validator->errors()->all()]);
                }
                
                $data[]= "vacante='".$req['vacante']."'";
            }
            if ($req->has('searching')){

                $validator = Validator::make($req->all(), [
                    'searching'=>'string|max:300'
                ]);
                if ($validator->fails()) {
                    
                    return response()->json(['errors'=>$validator->errors()->all()]);
                }
                
                $data[]= "searching='".$req['searching']."'";
            }

            //editar_configuracion_empresa
            if ($req->has('mostrado')) {

                $data[]= "mostrado='".$req['mostrado']."'";
            }

            DB::beginTransaction();
            DB::select("UPDATE tbl_usuarios SET " . implode(', ', $datauser) . " WHERE id=?",[$id]);
            DB::select("UPDATE tbl_empresa SET " . implode(', ', $data) . " WHERE id_usuario=?",[$id]);
            DB::commit();
            return response()->json(array('resultado'=> 'OK'));
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(array('resultado'=> 'NOK: '.$e->getMessage()));
        }
    }



}
