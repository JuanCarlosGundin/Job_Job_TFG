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
    public function sendingcontacto(Request $request){
        
        $nombre = $request->input('nombre');
        $email = $request->input('email');
        $telefono = $request->input('telefono');
        $asunto = $request->input('asunto');
        $mensaje = $request->input('mensaje');
        $cuerpo = 'Hola buenas, mi nombre es '.$nombre. "\n" . "\n" .'Aquí abajo te dejo mis datos '
        . "\n" .'Email: '.$email. "\n" .'Teléfono: '.$telefono. "\n" . "\n" .'ASUNTO: '.
        $asunto. "\n" . "\n" .'MENSAJE: '.$mensaje;

        //---------Validaciones---------
        //primer array de validaciones donde ponemos las reglas
        $this->validate($request, [
            'nombre' => 'required',
            'email' => 'required|email|max:100',
            'telefono' => 'required|min:9|max:9',
            'asunto' => 'required',
            'mensaje' => 'required',
        ],
        // segundo array donde ponemos el mensaje personalizado para cada regla
        [
            'nombre.required' => 'El nombre no se puede quedar en blanco',
            'email.required' => 'El email no se puede quedar en blanco',
            'email.email' => 'Introduce un email correcto',
            'email.max' => 'El email no puede ser más largo de 100 carácteres',
            'telefono.required' => 'El telefono no se puede quedar en blanco',
            'telefono.min' => 'Comprueba que el teléfono tenga 9 carácteres',
            'telefono.max' => 'Comprueba que el teléfono tenga 9 carácteres',
            'asunto.required' => 'El asunto no se puede quedar en blanco',
            'mensaje.required' => 'El mensaje no se puede quedar en blanco',
        ]);
        try{
            
            Mail::raw($cuerpo, function ($message) use($asunto) {

                $message->to('100006394.joan23@fje.edu')
                  ->subject('Solicitud de contacto con el asunto: '.$asunto);

              });
            return response()->json("OK");  
            }catch(\Throwable $th){
                return response()->json(array('resultado'=> 'NOK: '.$th->getMessage()));
            }
        
    }
    public function enviarcorreoadmin(Request $request){
        
        $destinatario = $request->input('destinatario');
        $asunto = $request->input('asunto');
        $mensaje = $request->input('mensaje');
        $cuerpo = 'Hola, te contactamos desde JobJob. '. "\n" .'Te escribimos para decirte que '.$mensaje;

        //---------Validaciones---------
        //primer array de validaciones donde ponemos las reglas
        $this->validate($request, [
            'destinatario' => 'required',
            'asunto' => 'required',
            'mensaje' => 'required',
        ],
        // segundo array donde ponemos el mensaje personalizado para cada regla
        [
            'destinatario.required' => 'El destinatario no se puede quedar en blanco',
            'asunto.required' => 'El asunto no se puede quedar en blanco',
            'mensaje.required' => 'El mensaje no se puede quedar en blanco',
        ]);
        try{
            
            Mail::raw($cuerpo, function ($message) use($asunto, $destinatario) {

                $message->to($destinatario)
                  ->subject('Solicitud de contacto de JobJob con el asunto: '.$asunto);

              });
            return response()->json("OK");  
            }catch(\Throwable $th){
                return response()->json(array('resultado'=> 'NOK: '.$th->getMessage()));
            }
        
    }
    public function enviarcorreoadmintrabajadores(Request $request){
        $trabajadores = DB::table('tbl_usuarios')->select('mail')->where('id_perfil','=','2')->get();
        // $trabajadoresarray=$trabajadores[0];
        $asuntotrabajador = $request->input('asuntotrabajador');
        $mensajetrabajador = $request->input('mensajetrabajador');
        $cuerpotrabajador = 'Hola, te contactamos desde JobJob. '. "\n" .$mensajetrabajador;

        //---------Validaciones---------
        //primer array de validaciones donde ponemos las reglas
        $this->validate($request, [
            'asuntotrabajador' => 'required',
            'mensajetrabajador' => 'required',
        ],
        // segundo array donde ponemos el mensaje personalizado para cada regla
        [
            'asuntotrabajador.required' => 'El asunto no se puede quedar en blanco',
            'mensajetrabajador.required' => 'El mensaje no se puede quedar en blanco',
        ]);
        foreach ($trabajadores as $trabajador) {
        try{
            
            Mail::raw($cuerpotrabajador, function ($message) use($asuntotrabajador, $trabajador) {

                $message->to($trabajador-> {'mail'})
                  ->subject('Mensaje de JobJob con el asunto: '.$asuntotrabajador);

              });
              
        } catch(\Throwable $th) {
            return response()->json(array('resultado'=> 'NOK: '.$th->getMessage()));
         }
        
        }
    return response()->json("OK");
    }
}