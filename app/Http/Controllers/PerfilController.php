<?php

namespace App\Http\Controllers;

use App\Models\Perfil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

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

    public function editarperfil(Request $req){
        $id=session()->get('id_user');
        try {
            $data=array();
            //form_editar_sobre_mi
            if ($req->has('campo_user')){
                $data[]= "campo_user='".$req['campo_user']."'";
            }
            if ($req->has('about_user')){
                $data[]= "about_user='".$req['about_user']."'";
            }
            if ($req->has('loc_trabajador')){
                $data[]= "loc_trabajador='".$req['loc_trabajador']."'";
            }
            if ($req->has('lenguaje_preferido')){
                $data[]= "lenguaje_preferido='".$req['lenguaje_preferido']."'";
            }
            if ($req->has('linkedin')){
                $data[]= "linkedin='".$req['linkedin']."'";
            }
            if ($req->has('telefono')){
                $data[]= "telefono='".$req['telefono']."'";
            }
            if ($req->has('github')){
                $data[]= "github='".$req['github']."'";
            }
            if ($req->has(['nombre_idioma', 'nivel_idioma', 'numero_idioma'])){
                $data[]= "curriculum=JSON_REPLACE(curriculum, '$.idiomas[".$req['numero_idioma']."].nivel_idioma', '".$req['nivel_idioma']."', '$.idiomas[".$req['numero_idioma']."].nombre_idioma', '".$req['nombre_idioma']."')";
            }
            DB::beginTransaction();
            DB::select("UPDATE tbl_trabajador SET " . implode(', ', $data) . " WHERE id_usuario=?",[$id]);
            DB::commit();
            return response()->json(array('resultado'=> 'OK'));
        } catch (\Exception $e) {
            return response()->json(array('resultado'=> 'NOK: '.$e->getMessage()));
        }
    }


    /* public function editarperfil(Request $req, $id, $id_perfil){

        DB::beginTransaction();

        try{

            // si es trabajador
            if ($id_perfil == 2){

                // si existe una foto
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

                DB::table('tbl_trabajador')->where('id_usuario','=',$id)->update(["nombre"=>$req['nombre'],"apellido"=>$req['apellido'],"foto_perfil"=>$foto_perfil,"campo_user"=>$req['campo_user'],"experiencia"=>$req['experiencia'],"estudios"=>$req['estudios'],"idiomas"=>$req['idiomas'],"disponibilidad"=>$req['disponibilidad'],"about_user"=>$req['about_user'],"loc_trabajador"=>$req['loc_trabajador'],"edad"=>$req['edad'],"mostrado"=>$req['mostrado']]);

            }

            // si es empresa
            if ($id_perfil == 3){

                // si existe un logo
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

                DB::table('tbl_empresa')->where('id_usuario','=',$id)->update(["nom_emp"=>$req['nom_emp'],"loc_emp"=>$req['loc_emp'],"about_emp"=>$req['about_emp'],"campo_emp"=>$req['campo_emp'],"searching"=>$req['searching'],"vacante"=>$req['vacante'],"mostrado"=>$req['mostrado'],"logo_emp"=>$logo_emp]);

            }

            // si la contraseña la modificas, que tenga md5, si no que conserve valor
            $uscontra = DB::table('tbl_usuarios')->where('id','=',$id)->select('contra')->first();

            if ($req['contra'] == $uscontra->contra){

                DB::table('tbl_usuarios')->where('id','=',$id)->update(["mail"=>$req['mail'],"contra"=>$req['contra']]);

            } else{

                DB::table('tbl_usuarios')->where('id','=',$id)->update(["mail"=>$req['mail'],"contra"=>md5($req['contra'])]);

            }

            DB::commit();
            return response()->json(array('resultado'=> 'OK'));

        }   catch (\Exception $e) {

            DB::rollback();
            return response()->json(array('resultado'=> 'NOK: '.$e->getMessage()));

        }

    } */
}
