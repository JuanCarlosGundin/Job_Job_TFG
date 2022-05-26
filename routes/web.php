<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\curriculumController;
use App\Http\Controllers\AppController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\InicioController;
use App\Http\Controllers\PerfilController;
use App\Http\Controllers\PtecnicaController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\ChattController;

Route::get('/chat', function () {
    return view('chat');
});

Route::get('registrar', function () {
    return view('registrar');
});

Route::get('paginacontacto', function () {
    return view('paginacontacto');
});


/*PRUEBA*/
Route::get('reportesprueba', function () {
    return view('reportesprueba');
});
/*FIN PRUEBA*/
Route::get('login', function () {
    return view('login');
});
Route::get('paginaempresa', function () {
    return view('paginaempresa');
});

Route::get('registrar3', function () {
    return view('registrar3');
});

Route::get('registrar4', function () {
    return view('registrar4');
});

/* ------------InicioController------------ */

//Landing page
Route::get('/', [InicioController::class, 'index']);

//pagina inicio
Route::get('/inicio', [InicioController::class, 'inicio']);

//Acceder a pagina swapper
Route::get('home', [InicioController::class, 'home']);

//Login
Route::post('loginuser', [InicioController::class, 'loginuser']);

/* Registrar */

//Sesiones trabajador
Route::post('sesionestrabajador', [InicioController::class, 'sesionestrabajador']);

//Sesiones empresa
Route::post('sesionesempresa', [InicioController::class, 'sesionesempresa']);

//Trabajador
Route::post('registrotrabajador', [InicioController::class, 'registrotrabajador']);

//Empresa
Route::post('registroempresa', [InicioController::class, 'registroempresa']);

/* Registrar */

Route::post('login', [UsuarioController::class, 'loginP']);

/* Verificar cuenta */

//Pagina verificar
Route::get('verificar', [InicioController::class, 'verificar']);

//Verificar y activar cuenta
Route::post('activarcuenta', [InicioController::class, 'activarcuenta']);

/* Verificar cuenta */

//Logout
Route::get('logout', [UsuarioController::class, 'logout']);

/* ------------InicioController------------ */

/* ------------PerfilController------------ */

//Vista perfil
Route::get('perfil',[PerfilController::class, 'vistaPerfil']);

// mostrarperfil
Route::post('leerperfil',[PerfilController::class, 'leerperfiledit']);

// editarperfiltrabajador
Route::post('editarperfiltrabajador',[PerfilController::class,'editarperfiltrabajador']);

// editarperfilempresa
Route::post('editarperfilempresa',[PerfilController::class,'editarperfilempresa']);

/* ------------PerfilController------------ */

/* ------------PtecnicaController------------ */

// pagina prueba tecnica
Route::get('pruebatecnica',[PtecnicaController::class,'vistaptecnica']);

// leercontenido
Route::post('leercontenido',[PtecnicaController::class,'leercontenido']);

// mostrar_ptecnica_trabajador
Route::post('mostrar_ptecnica_trabajador/{id_empresa}',[PtecnicaController::class,'mostrar_ptecnica_trabajador']);

// iniciar_ptecnica_trabajador
Route::post('iniciar_ptecnica_trabajador/{id_empresa}',[PtecnicaController::class,'iniciar_ptecnica_trabajador']);

// entrar_ptecnica_trabajador
Route::post('entrar_ptecnica_trabajador/{id_empresa}', [PtecnicaController::class, 'entrar_ptecnica_trabajador']);

// insertar_zip_trabajador_trabajador_ptecnica
Route::post('insertar_trabajador_ptecnica/{id_pt}',[PtecnicaController::class, 'insertar_trabajador_ptecnica']);

// crear_prueba_tecnica
Route::post('crear_prueba_tecnica',[PtecnicaController::class, 'crear_prueba_tecnica']);

// mostrar prueba tecnica desde empresa para ver los zips de los trabajadores
Route::post('mostrar_zip_trabajadores/{id_pt}', [PtecnicaController::class, 'mostrar_zip_trabajadores']);

// mostrar datos trabajador en prueba tecnia
Route::post('mostrar_un_trabajador/{id_participante}', [PtecnicaController::class, 'mostrar_un_trabajador']);


/* ------------PtecnicaController------------ */






///////////////////////MAIN/////////////////////

//LEER EL CONTENIDO
Route::post('mostrar',[AppController::class, 'mostrar']);
//Positivo
Route::post('si',[AppController::class, 'si']);
//negativo
Route::post('no',[AppController::class, 'no']);

////Diego_branch

///ZONA ADMINISTRADOR

//Acceder a vista Admin
Route::get('cPanelAdmin',[UsuarioController::class, 'vistaAdmin']);

//leerJS
Route::post('leer',[UsuarioController::class,'leer']);

//perfilesJS
Route::post('perfiles',[UsuarioController::class,'perfiles']);

//crearJS
Route::post('crearuser',[UsuarioController::class,'crearuser']);

//estadouserJS /tambien sirve para desactivar la cuenta en el editar
Route::put('estadouser/{id}',[UsuarioController::class,'estadouser']);

//mostrarmodaluserJS
Route::post('mostrarmodaluser/{id}/{id_perfil}',[UsuarioController::class,'mostrarmodaluser']);

//modificaruserJS
Route::put('modificaruser/{id}/{id_perfil}',[UsuarioController::class,'modificaruser']);

//eliminaruserJS
Route::delete('eliminaruser/{id}/{id_perfil}',[UsuarioController::class,'eliminaruser']);

///FINAL ZONA ADMINISTRADOR

///ZONA NOTIFICACIONES

//Acceder a vista Notificaciones
Route::get('notificaciones',[UsuarioController::class, 'vistaNotificaciones']);

//leernotificacionesJS
Route::post('leernotificaciones',[UsuarioController::class, 'leernotificaciones']);

//leerperfiloneuser
Route::post('leerperfiluser/{id}/{id_perfil}',[UsuarioController::class, 'leerperfiloneuser']);

///FINAL ZONA NOTIFICACIONES

//EDITAR PERFIL//

///mandar correo chat
Route::post('mandar', [MailController::class, 'sending']);

//ZONA CONTACTO
//mandar correo a admin por la pagina de contacto
Route::post('mandarcontacto', [MailController::class, 'sendingcontacto']);
//ZONA CONTACTO
//mandar correo a usuario individual desde la página de admin
Route::post('enviarcorreoadmin', [MailController::class, 'enviarcorreoadmin']);
//mandar correo a usuario individual desde la página de admin
Route::post('enviarcorreoadmintrabajadores', [MailController::class, 'enviarcorreoadmintrabajadores']);


//ZONA REPORTES
//el usuario puede hacer reportes de otros usuarios.
Route::post('crearreporte',[UsuarioController::class,'crearreporte']);
//////////////////////////////////////CURRICULUM/////////////////////////////////////////
Route::get('/curriculum', [curriculumController::class, 'showEmployees']);
Route::get('/curriculum/pdf1', [curriculumController::class, 'pdf1']);
Route::get('/curriculum/pdf2', [curriculumController::class, 'pdf2']);
Route::get('/curriculum/pdf3', [curriculumController::class, 'pdf3']);
Route::get('/curriculum/pdf4', [curriculumController::class, 'pdf4']);


Route::get('/curriculum/plantilla1', [curriculumController::class, 'plantilla1']);
Route::get('/curriculum/plantilla2', [curriculumController::class, 'plantilla2']);
Route::get('/curriculum/plantilla3', [curriculumController::class, 'plantilla3']);
Route::get('/curriculum/plantilla4', [curriculumController::class, 'plantilla4']);


//////RESET PASSWORD//////
Route::get('forget-password', [ForgotPasswordController::class, 'showForgetPasswordForm'])->name('forget.password.get');
Route::post('forget-password', [ForgotPasswordController::class, 'submitForgetPasswordForm'])->name('forget.password.post'); 
Route::get('reset-password/{token}', [ForgotPasswordController::class, 'showResetPasswordForm'])->name('reset.password.get');
Route::post('reset-password', [ForgotPasswordController::class, 'submitResetPasswordForm'])->name('reset.password.post');

//ZONA CHAT//

//Al cargar el chat 
Route::post('getchat', [ChattController::class, 'getchat']);

//insertar mensaje del chat
Route::post('insert', [ChattController::class, 'insert']);

//lee los chats activos para mostrarlos
Route::post('leerChats', [ChattController::class, 'leerChats']);

///mandar correo chat
Route::post('mandar', [MailController::class, 'sending']);

///mandar correo chat
Route::post('crearchat', [ChattController::class, 'crearchat']);

//FINAL ZONA GIGACHAT//
