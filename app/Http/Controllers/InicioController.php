<?php

namespace App\Http\Controllers;

use App\Models\Inicio;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class InicioController extends Controller{

    public function index(){
        return view('index');
    }

    public function inicio(){
        return view('inicio');
    }

    public function home(){
        return view('home');
    }

    ///Login

    public function loginuser(Request $req){

        try {

            $user=DB::table("tbl_usuarios")->where('mail','=',$req['mail'])->where('contra','=',hash('sha256',$req['contra']))->first();

            if ($user == null) {

                return response()->json(array('resultado'=> 'noexiste'));
            } else if ($user->verificado==0) {

                return response()->json(array('resultado'=> 'noverificado'));
            } else if ($user->estado==0) {

                return response()->json(array('resultado'=> 'baneado'));
            } else {

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
        } catch (\Throwable $th) {

            return response()->json(array('resultado'=> 'NOK: '.$th->getMessage()));
        }   
    }

    ///Registro

    public function sesionestrabajador(Request $req){
        //Aqui se tiene que validar con laravel/php

        try {
            //sessiontrabajador0
            if ($req->has(['mail', 'contra', 'contra2'])) {
                $validator = Validator::make($req->all(), [
                    'mail'=>'required|unique:tbl_usuarios,mail|string|max:100',
                    'contra'=>'required|string|min:8|max:100',
                    'contra2'=>'required|same:contra',
                ]);
                if ($validator->fails()) {

                    return response()->json(['errors'=>$validator->errors()->all()]);
                }
                $req->session()->put('mail', $req->mail);
                $req->session()->put('contra', $req->contra);

                return response()->json(array('resultado'=> 'OK'));
            }
            //sessiontrabajador1
            if ($req->has(['nombre', 'apellido', 'edad'])){
                $validator = Validator::make($req->all(), [
                    'nombre'=>'required|string|max:100',
                    'apellido'=>'required|string|max:100',
                    'edad'=>'required|date|before:-18 years'
                ]);
                if ($validator->fails()) {
                    
                    return response()->json(['errors'=>$validator->errors()->all()]);
                } 
                $req->session()->put('nombre', $req->nombre);
                $req->session()->put('apellido', $req->apellido);
                $req->session()->put('edad', $req->edad);
            }
            //sessiontrabajador2
            if ($req->has('campo_user')){
                $validator = Validator::make($req->all(), [
                    'campo_user'=>'string|max:50'
                ]);
                if ($validator->fails()) {
                    
                    return response()->json(['errors'=>$validator->errors()->all()]);
                } 
                $req->session()->put('campo_user', $req->campo_user);
            }
            if ($req->has('about_user')){
                $validator = Validator::make($req->all(), [
                    'about_user'=>'string|max:300'
                ]);
                if ($validator->fails()) {
                    
                    return response()->json(['errors'=>$validator->errors()->all()]);
                } 
                $req->session()->put('about_user', $req->about_user);
            }
            if ($req->has('lenguaje_preferido')){
                $validator = Validator::make($req->all(), [
                    'lenguaje_preferido'=>'string|max:30'
                ]);
                if ($validator->fails()) {
                    
                    return response()->json(['errors'=>$validator->errors()->all()]);
                } 
                $req->session()->put('lenguaje_preferido', $req->lenguaje_preferido);
            }
            //sessiontrabajador3
            if ($req->has('loc_trabajador')){
                $validator = Validator::make($req->all(), [
                    'loc_trabajador'=>'string|max:100'
                ]);
                if ($validator->fails()) {
                    
                    return response()->json(['errors'=>$validator->errors()->all()]);
                } 
                $req->session()->put('loc_trabajador', $req->loc_trabajador);
            }
            if ($req->has('disponibilidad')){
                $validator = Validator::make($req->all(), [
                    'disponibilidad'=>'string|max:30'
                ]);
                if ($validator->fails()) {
                    
                    return response()->json(['errors'=>$validator->errors()->all()]);
                } 
                $req->session()->put('disponibilidad', $req->disponibilidad);
            }
            if ($req->has('foto_perfil')){
                //añadir foto trabajador si existe
                if($req->hasFile('foto_perfil')){
                    $validator = Validator::make($req->all(), [
                        'foto_perfil'=>'image|max:500000'
                    ]);
                    if ($validator->fails()) {
                        
                        return response()->json(['errors'=>$validator->errors()->all()]);
                    } 
                    $foto_perfil = $req->file('foto_perfil')->store('temporal','public');
                }else{

                    $foto_perfil = NULL;
                }

                $req->session()->put('foto_perfil', $foto_perfil);
            }
            //sessiontrabajador4
            if ($req->has(['nombre_idioma', 'nivel_idioma'])) {
                $validator = Validator::make($req->all(), [
                    'nombre_idioma'=>'string|max:100',
                    'nivel_idioma'=>'string|max:100'
                ]);
                if ($validator->fails()) {
                    
                    return response()->json(['errors'=>$validator->errors()->all()]);
                } 
                $req->session()->put('nombre_idioma', $req->nombre_idioma);
                $req->session()->put('nivel_idioma', $req->nivel_idioma);
            }
            //sessiontrabajador5
            if ($req->has(['nombre_formación', 'lugar_formación', 'año_entradafor', 'año_salidafor'])) {
                return response()->json(array('resultado'=> gettype($req['nombre_formación'])));
                $nombre_formación=explode(',',$req['nombre_formación']);
                for ($i=0; $i < count($nombre_formación); $i++) { 
                    $validator = Validator::make($req->all(), [
                        'nombre_formación'=>'string|max:100'
                    ]);
                    if ($validator->fails()) {
                        
                        return response()->json(['errors'=>$validator->errors()->all()]);
                    } 
                }
                $validator = Validator::make($req->all(), [
                    'nombre_formación'=>'string|max:100',
                    'lugar_formación'=>'string|max:100',
                    'año_entradafor'=>'date',
                    'año_salidafor'=>'date|after:año_entradafor'
                ]);
                if ($validator->fails()) {
                    
                    return response()->json(['errors'=>$validator->errors()->all()]);
                } 
                $req->session()->put('nombre_formación', $req->nombre_formación);
                $req->session()->put('lugar_formación', $req->lugar_formación);
                $req->session()->put('año_entradafor', $req->año_entradafor);
                $req->session()->put('año_salidafor', $req->año_salidafor);
            }
            //sessiontrabajador6
            if ($req->has(['nombre_experiencia', 'lugar_experiencia', 'funciones', 'año_entradaexp', 'año_salidaexp'])) {
                $validator = Validator::make($req->all(), [
                    'nombre_experiencia'=>'string|max:100',
                    'lugar_experiencia'=>'string|max:200',
                    'funciones'=>'string|max:500',
                    'año_entradaexp'=>'date',
                    'año_salidaexp'=>'date|after:año_entradaexp'
                ]);
                if ($validator->fails()) {
                    
                    return response()->json(['errors'=>$validator->errors()->all()]);
                } 
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

    public function sesionesempresa(Request $req){
        try {
            //sessionempresa0
            if ($req->has(['mail', 'nom_emp', 'contra', 'contra2'])) {
                $req->validate([
                    'mail'=>'required|unique:tbl_usuarios,mail|string|max:100',
                    'nom_emp'=>'required|string|max:200',
                    'contra'=>'required|string|min:8|max:100',
                    'contra2'=>'required|same:contra'
                ]); 
                $req->session()->put('mail', $req->mail);
                $req->session()->put('nom_emp', $req->nom_emp);
                $req->session()->put('contra', $req->contra);
                return response()->json(array('resultado'=> 'OK'));
            }
            //sessionempresa1
            if ($req->has('about_emp')){
                $req->validate([
                    'about_emp'=>'string|max:300'
                ]); 

                $req->session()->put('about_emp', $req->about_emp);
            }
            if ($req->has('campo_emp')){
                $req->validate([
                    'campo_emp'=>'string|max:100'
                ]); 

                $req->session()->put('campo_emp', $req->campo_emp);
            }
            if ($req->has('searching')){
                $req->validate([
                    'searching'=>'string|max:300'
                ]); 
                $req->session()->put('searching', $req->searching);
            }
            //sessionempresa2
            if ($req->has('logo_emp')){

                //añadir foto trabajador si existe
                if($req->hasFile('logo_emp')){
                    $req->validate([
                        'logo_emp'=>'image|max:500000'
                    ]); 
                    $logo_emp = $req->file('logo_emp')->store('temporal','public');
                }else{

                    $logo_emp = NULL;
                }

                $req->session()->put('logo_emp', $logo_emp);
            }
            if ($req->has('loc_emp')){
                $req->validate([
                    'loc_emp'=>'string|max:100'
                ]); 
                $req->session()->put('loc_emp', $req->loc_emp);
            }
            if ($req->has('vacante')){
                $req->validate([
                    'vacante'=>'string|max:100'
                ]); 
                $req->session()->put('vacante', $req->vacante);
            }

            return response()->json(array('resultado'=> 'OK'));
        } catch (\Exception $e) {
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

        //sessiontrabajador1
        $data = array("nombre"=>session()->get('nombre'));
        $data += array("apellido"=>session()->get('apellido'));
        $data += array("edad"=>session()->get('edad'));
        //sessiontrabajador2
        if (session()->has('campo_user')){
            $data += array("campo_user"=>session()->get('campo_user'));
        }
        if (session()->has('about_user')){
            $data += array("about_user"=>session()->get('about_user'));
        }
        if (session()->has('lenguaje_preferido')){
            $data += array("lenguaje_preferido"=>session()->get('lenguaje_preferido'));
        }
        //sessiontrabajador3
        if (session()->has('loc_trabajador')){
            $data += array("loc_trabajador"=>session()->get('loc_trabajador'));
        }
        if (session()->has('disponibilidad')){
            $data += array("disponibilidad"=>session()->get('disponibilidad'));
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

        if (session()->has('nombre_idioma') || session()->has('nombre_formación') || session()->has('nombre_experiencia')){
            $datoscurriculum=[];
        }
        //sessiontrabajador4
        if (session()->has('nombre_idioma') && session()->has('nivel_idioma')){
            $nombre_idioma=explode(',',session()->get('nombre_idioma'));
            $nivel_idioma=explode(',',session()->get('nivel_idioma'));
            //modificar registros idiomas.json
            $dataidioma=[];
            for ($i=0; $i <count($nombre_idioma) ; $i++) {
                $lineaidioma='{"nivel_idioma": "'.$nivel_idioma[$i].'","nombre_idioma": "'.$nombre_idioma[$i].'"}';
                array_push($dataidioma, $lineaidioma);
                
            }
            $idiomafase2= implode(",",$dataidioma);
            $idiomas='"idiomas": ['.$idiomafase2.']';
            array_push($datoscurriculum, $idiomas);
            
        }
        //sessiontrabajador5
        if (session()->has('nombre_formación') && session()->has('lugar_formación') && session()->has('año_entradafor') && session()->has('año_salidafor')){
            $nombre_formación=explode(',',session()->get('nombre_formación'));
            $lugar_formación=explode(',',session()->get('lugar_formación'));
            $año_entradafor=explode(',',session()->get('año_entradafor'));
            $año_salidafor=explode(',',session()->get('año_salidafor'));
            $dataformacion=[];
            for ($i=0; $i <count($nombre_formación) ; $i++) {
                $lineaformación='{"año_salida": "'.$año_salidafor[$i].'","año_entrada": "'.$año_entradafor[$i].'","lugar_formación": "'.$lugar_formación[$i].'","nombre_formación": "'.$nombre_formación[$i].'"}';
                array_push($dataformacion, $lineaformación);
                
            }
            $formacionfase2= implode(",",$dataformacion);
            $formaciones='"estudios": ['.$formacionfase2.']';
            array_push($datoscurriculum, $formaciones);
            
        }
        //sessiontrabajador6
        if (session()->has('nombre_experiencia') && session()->has('lugar_experiencia')&& session()->has('funciones') && session()->has('año_entradaexp') && session()->has('año_salidaexp')){

            $nombre_experiencia=explode(',',session()->get('nombre_experiencia'));
            $lugar_experiencia=explode(',',session()->get('lugar_experiencia'));
            $funciones=explode(',',session()->get('funciones'));
            $año_entradaexp=explode(',',session()->get('año_entradaexp'));
            $año_salidaexp=explode(',',session()->get('año_salidaexp'));
            $dataexperiencia=[];

            for ($i=0; $i <count($nombre_experiencia) ; $i++) {

                $lineaexperiencia='{"funciones": "'.$funciones[$i].'","año_salida": "'.$año_salidaexp[$i].'","año_entrada": "'.$año_entradaexp[$i].'","lugar_experiencia": "'.$lugar_experiencia[$i].'","nombre_experiencia": "'.$nombre_experiencia[$i].'"}';
                array_push($dataexperiencia, $lineaexperiencia); 
            }

            $experienciafase2= implode(",",$dataexperiencia);
            $experiencias='"experiencia": ['.$experienciafase2.']';
            array_push($datoscurriculum, $experiencias);
        }
        if ((session()->has('nombre_idioma') && session()->has('nombre_formación')) ||
        (session()->has('nombre_idioma') && session()->has('nombre_experiencia')) ||
        (session()->has('nombre_formación') && session()->has('nombre_experiencia'))) {

            $arrcurriculum=implode(',',$datoscurriculum);
            $curriculum= '{'.$arrcurriculum.'}';
            $data += array("curriculum"=>$curriculum);
        } elseif (session()->has('nombre_idioma') || session()->has('nombre_formación') || session()->has('nombre_experiencia')){
            $curriculum= '{'.$datoscurriculum[0].'}';
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

        } catch (\Exception $e) {

            DB::rollback();
            return response()->json(array('resultado'=> $e->getMessage()));

        }

    }

    public function registroempresa(){

        //Comprobar si el correo introducido ya existe en la BBDD
        $comprobarmail = DB::table("tbl_usuarios")->where('mail','=',session()->get('mail'))->count();

        if ($comprobarmail>0){
            return response()->json(array('resultado'=> 'correoexiste'));
        }

        //obtener dia y hora
        $date = Carbon::now('+02:00');

        //formato correcto
        $created_at = $date->toDateTimeString();

        //sessionempresa0
        $data = array("nom_emp"=>session()->get('nom_emp'));
        //sessionempresa1
        if (session()->has('about_emp')){
            $data += array("about_emp"=>session()->get('about_emp'));
        }
        if (session()->has('campo_emp')){
            $data += array("campo_emp"=>session()->get('campo_emp'));
        }
        if (session()->has('searching')){
            $data += array("searching"=>session()->get('searching'));
        }
        //sessionempresa2
        if (session()->has('logo_emp')){
            $logo_emp=explode('/',session()->get('logo_emp'));
            try {
                Storage::move('public/'.session()->get('logo_emp'), 'public/uploads/'.$logo_emp[1]);
            } catch (\Exception $e) {
                return response()->json(array('resultado'=> $e->getMessage()));
            }
            
            $data += array("logo_emp"=>'uploads/'.$logo_emp[1]);
        }
        if (session()->has('loc_emp')){
            $data += array("loc_emp"=>session()->get('loc_emp'));
        }
        if (session()->has('vacante')){
            $data += array("vacante"=>session()->get('vacante'));
        }

        //buscar una forma de eliminar archivos en temporal
        $data += array("mostrado"=>"0");
        /* return response()->json(array('resultado'=> $data)); */
        $key = array_keys($data);
        $value = array_values($data);


        try {
            
            DB::beginTransaction();
            $id=DB::table('tbl_usuarios')->insertGetId(["mail"=>session()->get('mail'),"contra"=>hash('sha256',session()->get('contra')),"estado"=>'1',"verificado"=>'0',"created_at"=>$created_at,"id_perfil"=>'3']);

            DB::select("insert into tbl_empresa (id_usuario,". implode(',' , $key) .") values (?,'". implode("','" , $value) ."')",[$id]);

            Mail::raw('Entra a este link para validar tu cuenta de Job Job y acceder a nuestro servicio : (verificar)', function ($message) use($id) {
                $usuario=DB::select('select * from tbl_usuarios 
                inner join tbl_empresa on tbl_usuarios.id=tbl_empresa.id_usuario
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
