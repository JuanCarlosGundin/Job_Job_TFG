<?php

namespace App\Http\Controllers;

use App\Models\Inicio;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class InicioController extends Controller{

    public function inicio(){
        return view('inicio');
    }

    public function home(){
        return view('home');
    }

    ///Login

    public function loginuser(Request $req){

        try{

            $user=DB::table("tbl_usuarios")->where('mail','=',$req['mail'])->where('contra','=',md5($req['contra']))->first();

            if ($user == null){

                return response()->json(array('resultado'=> 'noexiste'));

            }else if($user->verificado==0){

                return response()->json(array('resultado'=> 'noverificado'));

            }else if($user->estado==0){

                return response()->json(array('resultado'=> 'baneado'));

            }else {

                if($user->id_perfil==1){

                    $req->session()->put('id_user',$user->id);
                    return response()->json(array('resultado'=> 'admin'));

                }else{

                    /* $req->session()->put('nombre',$req->mail); */
                    $req->session()->put('id_user',$user->id);
                    $req->session()->put('id_perfil',$user->id_perfil);
                    return response()->json(array('resultado'=> 'OK'));

                }

            }

        }catch (\Throwable $th) {

            return response()->json(array('resultado'=> 'NOK: '.$th->getMessage()));

        }   

    }

    ///Registro

    public function sesionestrabajador(Request $req){
        //Aqui se tiene que validar con laravel/php

        try {
            if ($req->has(['mail', 'nombre', 'contra', 'contra2'])) {
                $req->validate([
                    'mail'=>'required|unique:tbl_usuarios,mail|string|max:100',
                    'contra'=>'required|string|min:8|max:100',
                    'contra2'=>'required|same:contra'
                ]);
                $req->session()->put('mail', $req->mail);
                $req->session()->put('nombre', $req->nombre);
                $req->session()->put('contra', $req->contra);
                return response()->json(array('resultado'=> 'OK'));
            }

            if ($req->has('apellido')){
                $req->session()->put('apellido', $req->apellido);
            }
            if ($req->has('edad')){
                $req->session()->put('edad', $req->edad);
            }
            if ($req->has('foto_perfil')){
                //añadir foto trabajador si existe
                if($req->hasFile('foto_perfil')){

                    $foto_perfil = $req->file('foto_perfil')->store('temporal','public');

                }else{

                    $foto_perfil = NULL;

                }
                $req->session()->put('foto_perfil', $foto_perfil);
            }
            
            if ($req->has('campo_user')){
                $req->session()->put('campo_user', $req->campo_user);
            }
            if ($req->has('about_user')){
                $req->session()->put('about_user', $req->about_user);
            }
            if ($req->has('loc_trabajador')){
                $req->session()->put('loc_trabajador', $req->loc_trabajador);
            }
            if ($req->has('disponibilidad')){
                $req->session()->put('disponibilidad', $req->disponibilidad);
            }
            if ($req->has(['nombre_idioma', 'nivel_idioma'])) {
                $req->session()->put('nombre_idioma', $req->nombre_idioma);
                $req->session()->put('nivel_idioma', $req->nivel_idioma);
            }
            if ($req->has(['nombre_formación', 'lugar_formación', 'año_entradafor', 'año_salidafor'])) {
                $req->session()->put('nombre_formación', $req->nombre_formación);
                $req->session()->put('lugar_formación', $req->lugar_formación);
                $req->session()->put('año_entradafor', $req->año_entradafor);
                $req->session()->put('año_salidafor', $req->año_salidafor);
            }
            if ($req->has(['nombre_experiencia', 'lugar_experiencia', 'funciones', 'año_entradaexp', 'año_salidaexp'])) {
                $req->session()->put('nombre_experiencia', $req->nombre_experiencia);
                $req->session()->put('lugar_experiencia', $req->lugar_experiencia);
                $req->session()->put('funciones', $req->funciones);
                $req->session()->put('año_entradaexp', $req->año_entradaexp);
                $req->session()->put('año_salidaexp', $req->año_salidaexp);
            }
            return response()->json(array('resultado'=> 'OK'));

        }   catch (\Exception $e) {

            return response()->json(array('resultado'=> $e->getMessage()));

        }

    }

    public function registrotrabajador(){

        //Comprobar si el correo introducido ya existe en la BBDD
        $comprobarmail = DB::table("tbl_usuarios")->where('mail','=',session()->get('mail'))->count();

        if ($comprobarmail>0){
            return response()->json(array('resultado'=> 'correoexiste'));
        }

        //obtener dia y hora
        $date = Carbon::now('+02:00');

        //formato correcto
        $created_at = $date->toDateTimeString();


        $data = array("nombre"=>session()->get('nombre'));
        if (session()->has('apellido')){
            $data += array("apellido"=>session()->get('apellido'));
        }
        if (session()->has('edad')){
            $data += array("edad"=>session()->get('edad'));
        }
        if (session()->has('foto_perfil')){
            $foto_perfil=explode('/',session()->get('foto_perfil'));
            try {
                Storage::move('public/'.session()->get('foto_perfil'), 'public/uploads/'.$foto_perfil[1]);
            } catch (\Exception $e) {
                return response()->json(array('resultado'=> $e->getMessage()));
            }
            
            $data += array("foto_perfil"=>'uploads/'.$foto_perfil[1]);
        }
        if (session()->has('campo_user')){
            $data += array("campo_user"=>session()->get('campo_user'));
        }
        if (session()->has('about_user')){
            $data += array("about_user"=>session()->get('about_user'));
        }
        if (session()->has('loc_trabajador')){
            $data += array("loc_trabajador"=>session()->get('loc_trabajador'));
        }
        if (session()->has('disponibilidad')){
            $data += array("disponibilidad"=>session()->get('disponibilidad'));
        }
        if (session()->has('nombre_idioma') || session()->has('nombre_formación') || session()->has('nombre_experiencia')){
            $datoscurriculum=[];
        }
        if (session()->has('nombre_idioma') && session()->has('nivel_idioma')){
            $nombre_idioma=explode(',',session()->get('nombre_idioma'));
            $nivel_idioma=explode(',',session()->get('nivel_idioma'));
            $dataidioma=[];
            for ($i=0; $i <count($nombre_idioma) ; $i++) {
                $lineaidioma='"'.$i.'": {"nivel_idioma": "'.$nivel_idioma[$i].'","nombre_idioma": "'.$nombre_idioma[$i].'"}';
                array_push($dataidioma, $lineaidioma);
                
            }
            $idiomafase2= implode(",",$dataidioma);
            $idiomas='"idiomas": {'.$idiomafase2.'}';
            array_push($datoscurriculum, $idiomas);
            
        }
        if (session()->has('nombre_formación') && session()->has('lugar_formación') && session()->has('año_entradafor') && session()->has('año_salidafor')){
            $nombre_formación=explode(',',session()->get('nombre_formación'));
            $lugar_formación=explode(',',session()->get('lugar_formación'));
            $año_entradafor=explode(',',session()->get('año_entradafor'));
            $año_salidafor=explode(',',session()->get('año_salidafor'));
            $dataformacion=[];
            for ($i=0; $i <count($nombre_formación) ; $i++) {
                $lineaformación='"'.$i.'": {"año_salida": "'.$año_salidafor[$i].'","año_entrada": "'.$año_entradafor[$i].'","lugar_formación": "'.$lugar_formación[$i].'","nombre_formación": "'.$nombre_formación[$i].'"}';
                array_push($dataformacion, $lineaformación);
                
            }
            $formacionfase2= implode(",",$dataformacion);
            $formaciones='"estudios": {'.$formacionfase2.'}';
            array_push($datoscurriculum, $formaciones);
            
        }
        if (session()->has('nombre_experiencia') && session()->has('lugar_experiencia')&& session()->has('funciones') && session()->has('año_entradaexp') && session()->has('año_salidaexp')){
            $nombre_experiencia=explode(',',session()->get('nombre_experiencia'));
            $lugar_experiencia=explode(',',session()->get('lugar_experiencia'));
            $funciones=explode(',',session()->get('funciones'));
            $año_entradaexp=explode(',',session()->get('año_entradaexp'));
            $año_salidaexp=explode(',',session()->get('año_salidaexp'));
            $dataexperiencia=[];
            for ($i=0; $i <count($nombre_experiencia) ; $i++) {
                $lineaexperiencia='"'.$i.'": {"funciones": "'.$funciones[$i].'","año_salida": "'.$año_salidaexp[$i].'","año_entrada": "'.$año_entradaexp[$i].'","lugar_experiencia": "'.$lugar_experiencia[$i].'","nombre_experiencia": "'.$nombre_experiencia[$i].'"}';
                array_push($dataexperiencia, $lineaexperiencia);
                
            }
            $experienciafase2= implode(",",$dataexperiencia);
            $experiencias='"experiencia": {'.$experienciafase2.'}';
            array_push($datoscurriculum, $experiencias);
            
        }
        if ((session()->has('nombre_idioma') && session()->has('nombre_formación')) ||
        (session()->has('nombre_idioma') && session()->has('nombre_experiencia')) ||
        (session()->has('nombre_formación') && session()->has('nombre_experiencia'))){
            $arrcurriculum=implode(',',$datoscurriculum);
            $curriculum= '{'.$arrcurriculum.'}';
            $data += array("curriculum"=>$curriculum);
        }
        //buscar una forma de eliminar archivos en temporal
        $data += array("mostrado"=>"0");
        /* return response()->json(array('resultado'=> $data)); */
        $key = array_keys($data);
        $value = array_values($data);

        try {
            
            DB::beginTransaction();
            $id=DB::table('tbl_usuarios')->insertGetId(["mail"=>session()->get('mail'),"contra"=>hash('sha256',session()->get('contra')),"estado"=>'1',"verificado"=>'0',"created_at"=>$created_at,"id_perfil"=>'2']);

            DB::select("insert into tbl_trabajador (id_usuario,". implode(',' , $key) .") values (?,'". implode("','" , $value) ."')",[$id]);

            Mail::raw('Entra a este link para validar tu cuenta de Job Job y acceder a nuestro servicio : (verificar)', function ($message) use($id) {
                $usuario=DB::select('select * from tbl_usuarios 
                inner join tbl_trabajador on tbl_usuarios.id=tbl_trabajador.id_usuario
                where tbl_usuarios.id=? ',[$id]);
                $message->to($usuario[0]->{'mail'})
                  ->subject('Link Para validar tu cuenta de Job Job');
              });

            DB::commit();
            session()->flush();
            return response()->json(array('resultado'=> 'OK'));

        }   catch (\Exception $e) {

            DB::rollback();
            return response()->json(array('resultado'=> $e->getMessage()));

        }

    }

    public function registroempresa(Request $req){

        //Comprobar si el correo introducido ya existe en la BBDD
        $comprobarmail=DB::select('select mail from tbl_usuarios where mail=? ',[$req['mail']]);
        if (count($comprobarmail)>0){
            return response()->json(array('resultado'=> 'correoexiste'));
        }

        //añadir foto trabajador si existe
        if($req->hasFile('logo_emp')){

            $logo_emp = $req->file('logo_emp')->store('uploads','public');

        }else{

            $logo_emp = NULL;

        }

        try {
            
            DB::beginTransaction();
            $id=DB::table('tbl_usuarios')->insertGetId(["mail"=>$req['mail'],"contra"=>md5($req['contra']),"id_perfil"=>'3',"estado"=>'1',"verificado"=>'0']);

            DB::table('tbl_empresa')->insert(["id_usuario"=>$id,"nom_emp"=>$req['nom_emp'],"loc_emp"=>$req['loc_emp'],"about_emp"=>$req['about_emp'],"campo_emp"=>$req['campo_emp'],"searching"=>$req['searching'],"mostrado"=>$req['mostrado'],"vacante"=>$req['vacante'],"logo_emp"=>$logo_emp]);

            Mail::raw('Entra a este link para validar tu cuenta de Job Job y acceder a nuestro servicio : (verificar)', function ($message) use($id) {
                $usuario=DB::select('select * from tbl_usuarios 
                inner join tbl_empresa on tbl_usuarios.id=tbl_empresa.id_usuario
                where tbl_usuarios.id=? ',[$id]);
                $message->to($usuario[0]->{'mail'})
                  ->subject('Link Para validar tu cuenta de Job Job');
              });

            DB::commit();
            return response()->json(array('resultado'=> 'OK'));

        }   catch (\Exception $e) {

            DB::rollback();
            return response()->json(array('resultado'=> $e->getMessage()));

        }

    }


    public function verificar(){

        return view('verificacion');

    }

    public function activarcuenta(Request $req){   
        $usuario = $req->input('user');
        $contra = $req->input('contra');
        try{
            $user=DB::table("tbl_usuarios")->where('mail','=',$usuario)->where('contra','=',hash('sha256',$contra))->first();
            //return response()->json($user->id);
            //AQUI VA LA FUNCIÓN DEL LOGIN PARA COMPROBAR CONTRASEÑA
            //si la contraseña es correcta ejecuta esta función de abajo y nos indica que estamos verificados
            DB::update('update tbl_usuarios set verificado = 1 where id=?',[$user->id]);
              return response()->json("OK");
        }catch(\Throwable $th){
            return response()->json(array('resultado'=> 'NOK: '.$th->getMessage()));
        }
    }

}
