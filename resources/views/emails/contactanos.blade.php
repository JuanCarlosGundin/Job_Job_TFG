<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>contactanos</title>
    <style>
        h1{
            color: blue;
        }
    </style>
</head>

<body>
    <h1>Nueva solicitud de contacto</h1>
    
    <p><strong>Nombre: </strong>{{$contacto['nombre']}}</p>
    <p><strong>Email: </strong>{{$contacto['email']}}</p>
    <p><strong>Telefono: </strong>{{$contacto['telefono']}}</p>
    <p><strong>Asunto: </strong>{{$contacto['asunto']}}</p>
    <p><strong>Mensaje: </strong>{{$contacto['mensaje']}}</p>
</body>
</html>