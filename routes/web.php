<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\curriculumController;
use App\Http\Controllers\AppController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\InicioController;
use App\Http\Controllers\PerfilController;

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

// editar sobre_mi
Route::post('editarperfil',[PerfilController::class,'editarperfil']);

/* ------------PerfilController------------ */











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

//estadouserJS
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