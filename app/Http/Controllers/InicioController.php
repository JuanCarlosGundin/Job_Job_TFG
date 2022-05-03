<?php

namespace App\Http\Controllers;

use App\Models\Inicio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InicioController extends Controller{

    public function inicio(){
        return view('inicio');
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

    public function verificar(){

        return view('verificacion');
        
    }

}
