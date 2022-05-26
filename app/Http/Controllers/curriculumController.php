<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\PDF;
//use Barryvdh\DomPDF\Facade as PDF;



class curriculumController extends Controller
{
    public function showEmployees(){
        $trabajador = DB::table('tbl_trabajador')->join('tbl_usuarios', 'tbl_trabajador.id_usuario', '=', 'tbl_usuarios.id')->where('id_usuario', '4')->first();
        return view('plantillaCV1', compact('trabajador'));
    }
    public function curriculums(){
        return view('mostrar-curriculums');
    }
    // Generate PDF
    public function pdf1() {
        $id=session()->get('id_user');
        // retreive all records from db
        $trabajador = DB::table('tbl_trabajador')->join('tbl_usuarios', 'tbl_trabajador.id_usuario', '=', 'tbl_usuarios.id')->where('id_usuario', $id)->first();
        // share data to view
        view()->share('employee',$trabajador);
        $pdf=app('dompdf.wrapper');
        $pdf->loadView('plantillaCV1', compact('trabajador'));

        // download PDF file with download method
        return $pdf->download('pdf_file.pdf');
    }
    public function pdf2() {
        $id=session()->get('id_user');
        // retreive all records from db
        $trabajador = DB::table('tbl_trabajador')->join('tbl_usuarios', 'tbl_trabajador.id_usuario', '=', 'tbl_usuarios.id')->where('id_usuario', $id)->first();
        // share data to view
        view()->share('employee',$trabajador);
        $pdf=app('dompdf.wrapper');
        $pdf->loadView('plantillaCV2', compact('trabajador'));

        // download PDF file with download method
        return $pdf->download('pdf_file.pdf');
    }
    public function pdf3() {
        $id=session()->get('id_user');
        // retreive all records from db
        $trabajador = DB::table('tbl_trabajador')->join('tbl_usuarios', 'tbl_trabajador.id_usuario', '=', 'tbl_usuarios.id')->where('id_usuario', $id)->first();
        // share data to view
        view()->share('employee',$trabajador);
        $pdf=app('dompdf.wrapper');
        $pdf->loadView('plantillaCV3', compact('trabajador'));

        // download PDF file with download method
        return $pdf->download('pdf_file.pdf');
    }
    public function pdf4() {
        $id=session()->get('id_user');
        // retreive all records from db
        $trabajador = DB::table('tbl_trabajador')->join('tbl_usuarios', 'tbl_trabajador.id_usuario', '=', 'tbl_usuarios.id')->where('id_usuario', $id)->first();
        // share data to view
        view()->share('employee',$trabajador);
        $pdf=app('dompdf.wrapper');
        $pdf->loadView('plantillaCV4', compact('trabajador'));

        // download PDF file with download method
        return $pdf->download('pdf_file.pdf');
    }
    public function plantilla1(){
        $id=session()->get('id_user');

        $trabajador = DB::table('tbl_trabajador')->join('tbl_usuarios', 'tbl_trabajador.id_usuario', '=', 'tbl_usuarios.id')->where('id_usuario', $id)->first();
        return view('ver-plantillaCV1', compact('trabajador'));
    }
    public function plantilla2(){
        $id=session()->get('id_user');

        $trabajador = DB::table('tbl_trabajador')->join('tbl_usuarios', 'tbl_trabajador.id_usuario', '=', 'tbl_usuarios.id')->where('id_usuario', $id)->first();
        return view('ver-plantillaCV2', compact('trabajador'));
    }
    public function plantilla3(){
        $id=session()->get('id_user');

        $trabajador = DB::table('tbl_trabajador')->join('tbl_usuarios', 'tbl_trabajador.id_usuario', '=', 'tbl_usuarios.id')->where('id_usuario', $id)->first();
        return view('ver-plantillaCV3', compact('trabajador'));
    }
    public function plantilla4(){
        $id=session()->get('id_user');

        $trabajador = DB::table('tbl_trabajador')->join('tbl_usuarios', 'tbl_trabajador.id_usuario', '=', 'tbl_usuarios.id')->where('id_usuario', $id)->first();
        return view('ver-plantillaCV4', compact('trabajador'));
    }
}
