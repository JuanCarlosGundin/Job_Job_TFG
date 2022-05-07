<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\AppController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\InicioController;

/* ------------InicioController------------ */

Route::get('/', [InicioController::class, 'inicio']);

//Acceder al swapper
Route::get('home', [InicioController::class, 'home']);

/* Login */
//Login
Route::post('loginuser', [InicioController::class, 'loginuser']);
/* Login */

/* Registrar */

//Sesiones trabajador
Route::post('sesionestrabajador', [InicioController::class, 'sesionestrabajador']);

//Trabajador
Route::post('registrotrabajador', [InicioController::class, 'registrotrabajador']);

//Empresa
Route::post('registroempresa', [InicioController::class, 'registroempresa']);

/* Registrar */


/* Verificar cuenta */

//Pagina verificar
Route::get('verificar', [InicioController::class, 'verificar']);

//Verificar y activar cuenta
Route::post('activarcuenta', [InicioController::class, 'activarcuenta']);

/* Verificar cuenta */

//Logout
Route::get('logout', [UsuarioController::class, 'logout']);

/* ------------InicioController------------ */











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
///ZONA ADMINISTRADOR

///ZONA NOTIFICACIONES
//Acceder a vista Notificaciones
Route::get('notificaciones',[UsuarioController::class, 'vistaNotificaciones']);

//leernotificacionesJS
Route::post('leernotificaciones',[UsuarioController::class, 'leernotificaciones']);
//leerperfiloneuser
Route::post('leerperfiluser/{id}/{id_perfil}',[UsuarioController::class, 'leerperfiloneuser']);

///ZONA NOTIFICACIONES

/*EDITAR PERFIL*/

//Vista perfil
Route::get('perfil',[UsuarioController::class, 'vistaPerfil']);

// mostrarperfil.
Route::post('leerperfil',[UsuarioController::class, 'leerperfiledit']);

// editarperfil
Route::put('editarperfil/{id}/{id_perfil}',[UsuarioController::class, 'editarperfil']);

/*FIN EDITAR PERFIL*/
///mandar correo chat
Route::post('mandar', [MailController::class, 'sending']);