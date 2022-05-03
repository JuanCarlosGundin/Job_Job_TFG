<?php

namespace App\Http\Controllers;

use App\Models\Inicio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

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

    public function registrotrabajador(Request $req){

        //Comprobar si el correo introducido ya existe en la BBDD
        $comprobarmail=DB::select('select mail from tbl_usuarios where mail=? ',[$req['mail']]);
        if (count($comprobarmail)>0){
            return response()->json(array('resultado'=> 'correoexiste'));
        }

        //añadir foto trabajador si existe
        if($req->hasFile('foto_perfil')){

            $foto_perfil = $req->file('foto_perfil')->store('uploads','public');

        }else{

            $foto_perfil = NULL;

        }

        try {
            
            DB::beginTransaction();
            $id=DB::table('tbl_usuarios')->insertGetId(["mail"=>$req['mail'],"contra"=>md5($req['contra']),"id_perfil"=>'2',"estado"=>'1',"verificado"=>'0']);

            DB::table('tbl_trabajador')->insert(["id_usuario"=>$id,"nombre"=>$req['nombre'],"apellido"=>$req['apellido'],"foto_perfil"=>$foto_perfil,"campo_user"=>$req['campo_user'],"experiencia"=>$req['experiencia'],"estudios"=>$req['estudios'],"idiomas"=>$req['idiomas'],"disponibilidad"=>$req['disponibilidad'],"about_user"=>$req['about_user'],"loc_trabajador"=>$req['loc_trabajador'],"edad"=>$req['edad'],"mostrado"=>$req['mostrado']]);

            Mail::raw('Entra a este link para validar tu cuenta de Job Job y acceder a nuestro servicio : (verificar)', function ($message) use($id) {
                $usuario=DB::select('select * from tbl_usuarios 
                inner join tbl_trabajador on tbl_usuarios.id=tbl_trabajador.id_usuario
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
            $user=DB::table("tbl_usuarios")->where('mail','=',$usuario)->where('contra','=',md5($contra))->first();
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
