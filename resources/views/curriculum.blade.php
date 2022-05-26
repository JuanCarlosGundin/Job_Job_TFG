<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Laravel 7 PDF Example</title>
    <link rel="icon" href="storage/uploads/logo.png">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet" type="text/css" />
</head>
<body>
    <div class="container mt-5">
        <h2 class="text-center mb-3">Laravel HTML to PDF Example</h2>
        <div class="d-flex justify-content-end mb-4">
            <a class="btn btn-primary" href="{{ URL::to('/curriculum/pdf') }}">Export to PDF</a>
        </div>
        <table class="table table-bordered mb-5">
            <thead>
                <tr class="table-danger">
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Edad</th>
                    <th scope="col">Experiencia</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <?php $curriculum=json_decode($trabajador->curriculum);
                    ?>
                    <th scope="row">{{ $trabajador->id_usuario }}</th>
                    <td>{{ $trabajador->nombre }}</td>
                    <td>{{ $trabajador->apellido }}</td>
                    <td>{{ $trabajador->edad }}</td>
                    <td>{{ $curriculum->experiencia->{'0'}->nombre_experiencia }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <script src="{{ asset('js/app.js') }}" type="text/js"></script>
</body>
</html>