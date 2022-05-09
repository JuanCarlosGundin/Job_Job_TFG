<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\PDF;
// use Barryvdh\DomPDF\Facade as PDF;



class curriculumController extends Controller
{
    public function showEmployees(){
        $trabajador = DB::table('tbl_trabajador')->join('tbl_usuarios', 'tbl_trabajador.id_usuario', '=', 'tbl_usuarios.id')->where('id_usuario', '5')->first();
        return view('plantillaCV1', compact('trabajador'));
    }
    // Generate PDF
    public function createPDF() {
        // retreive all records from db
        $trabajador = DB::table('tbl_trabajador')->where('id_usuario', '2')->first();
        // share data to view
        view()->share('employee',$trabajador);
        $pdf=app('dompdf.wrapper');
        $pdf->loadView('plantillaCV1', compact('trabajador'));
        // download PDF file with download method
        return $pdf->download('pdf_file.pdf');
    }
    public function plantilla1(){

        return view('plantillaCV1');
    }
    public function plantilla2(){

        return view('plantilla1');
    }
    public function plantilla3(){

        return view('plantilla1');
    }
}
