<?php
namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
 
class MailController extends Controller{

    public function sending(Request $request){

        $perfil=session()->get('id_perfil');
        $id=session()->get('id_user');
        $id_receptor = $request->input('id_receptor');
        $mail = $request->input('mail');
        
        try{

            if($perfil==2){

                Mail::raw($mail, function ($message) use($id, $id_receptor) {

                    $emisor=DB::select('select * from tbl_usuarios 
                    inner join tbl_trabajador on tbl_usuarios.id=tbl_trabajador.id_usuario
                    where tbl_usuarios.id=? ',[$id]);
                    $receptor=DB::select('select * from tbl_usuarios 
                    inner join tbl_empresa on tbl_usuarios.id=tbl_empresa.id_usuario
                    where tbl_usuarios.id=? ',[$id_receptor]);
                    $message->to($receptor[0]->{'mail'})
                      ->subject('Mensaje de '.$emisor[0]->{'nombre'}.' '.$emisor[0]->{'apellido'});
                  });
                  return response()->json("OK");

            }else{

                Mail::raw($mail, function ($message) use($id, $id_receptor) {

                    //id_receptor es el que recibe el mensaje
                    $emisor=DB::select('select * from tbl_usuarios 
                    inner join tbl_empresa on tbl_usuarios.id=tbl_empresa.id_usuario
                    where tbl_usuarios.id=? ',[$id]);
                    $receptor=DB::select('select * from tbl_usuarios 
                    inner join tbl_trabajador on tbl_usuarios.id=tbl_trabajador.id_usuario
                    where tbl_usuarios.id=? ',[$id_receptor]);
                    $message->to($receptor[0]->{'mail'})
                      ->subject('Mensaje de la empresa '.$emisor[0]->{'nom_emp'});
                  });
                  return response()->json("OK");

            }

        }catch(\Throwable $th){

            return response()->json(array('resultado'=> 'NOKempresa: '.$th->getMessage()));

        }

    }

}