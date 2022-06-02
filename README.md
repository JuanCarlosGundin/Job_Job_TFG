# PROYECTO 5 - JobJob

**Actualmente las páginas de búsqueda de trabajo están muy tránsitadas; como estudiantes de DAW2 nosotros nos fijamos en eso y decidimos hacer la nuestra, pero con una usabilidad mucho más sencilla. Después de pensar profundamente que funcionalidades tendría, nació JobJob. Esta página web trata sobre una especie de "Tinder" pero para empresas y trabajadores, donde la principal funcionalidad de esta aplicación es poder hacer que las empresas y trabajadores interactúen entre ellos y así poder encontrar a tu empresa ideal, o por lo contrario, a tu trabajador ideal. Cuando la empresa inicie sesión verá a los trabajadores y podrá decir si le gustan o no para el puesto que proponen. En el otro caso, cuando el trabajador inicie sesión podrá ver a las empresas y hacer match con ellas. Otra funcionalidad es el uso de pruebas técnicas, donde una empresa publica una prueba técnica y un trabajador se puede apuntar para así demostrar sus habilidades. Además, tenemos un creador de currículum totalmente gratuito donde no tendrás que introducir tus datos manualmente para hacerlo ya que este te lo crea automáticamente. Estas no son todas las funcionalidades, te invitamos a que pruebes nuestra página web y poder descubrirlas todas.**


## Pre-requisitos 📋

### EDITOR DE CÓDIGO-> VISUAL STUDIO CODE
### INSTALAR XAMPP: https://www.apachefriends.org/es/index.html

## Comenzando🚀 - Instalación🔧

Si quieres obtener nuestro proyecto sigue estos pasos:
```
1. Copiar el enlace de code en verde para seguidamente hacer un git clone dentro de htdocs en Visual Studio Code.
2. Una vez clonado dentro de la aplicación ejecutamos en el terminal *composer install*
3. Luego el env.example lo renombramos a .env
4. También en el .env poner esto pero con tus datos, esto se introduce para poder mandar mails. ->

MAIL_DRIVER=smtp
MAIL_HOST=smtp.googlemail.com
MAIL_PORT=587
MAIL_USERNAME=correo
MAIL_PASSWORD=contraseña
MAIL_ENCRYPTION=tls 
MAIL_FROM_ADDRESS=correo
MAIL_FROM_NAME="${APP_NAME}"

6. Seguidamente ejecutamos en el terminal "php artisan key:generate" y "php artisan storage:link"
7. Para tener la base de datos tendrás que hacer migraciones, para esto te dejo los pasos. 
Primero deberás crear una base de datos vacía en phpmyadmin o workbench, después en el .env 
donde pone DB_DATABASE deberemos poner el nombre de nuestra base de datos, seguidamente para 
finalizar en el terminal deberemos ejecutar esto -> php artisan migrate:fresh --seed
8. Para ver correctamente las imágenes, copiar el contenido de la carpeta "/public/img" a "/storage".
9. Ejecutar este comando en el terminal -> 
"composer require barryvdh/laravel-dompdf"

10. Para ejecutar el websocket, dentro de public->js->chat.js en la línea 425 tendremos que poner nuestra IP
(para ver nuestra IP ejecutar ipconfig en cmd). Además en el terminal deberemos ejecutar "pip install websockets"
y tener en cuenta que debemos tener instalado python 3.10 para poder ejecutarlo. Seguidamente en la carpeta ws
está sokcetweb.py donde deberemos ejecutarlo para así teener el websocket en marcha.
```
### Acceso login

**Lo primero que tienes que hacer es registrarte, ya sea como empresa o como trabajador. Una vez te registres te llegará un mail de confirmación para verificar tu correo. Una vez verificado ya puedes iniciar sesión.**

## Construido con 🛠️

    PHP 
    LARAVEL
    AJAX
    JAVASCRIPT
    MYSQL
    SCSS
    PYTHON
    BOOTSTRAP

## Autores ✒️

    Laura Fernández Bernardes   -   Estudiante DAW2
    Juan Carlos Gundín Ríos     -   Estudiante DAW2
    David Ortega Colomo         -   Estudiante DAW2
    Diego Soledispa Campozano   -   Estudiante DAW2
    Pol García Moreno           -   Estudiante DAW2
    Arnau Balart Correa         -   Estudiante DAW2

## Contacto 📧     
  ```  
                                                                                            Laura Fernández Bernardos   -   10000068.joan23@fje.edu
                                                                                            Juan Carlos Gundín Ríos     -   100005882.joan23@fje.edu
    Si te ha quedado alguna duda sobre el proyecto no dudes en contactarnos por correo ->   David Ortega Colomo         -   100006394.joan23@fje.edu
                                                                                            Diego Soledispa Campozano   -   31966.joan23@fje.edu
                                                                                            Pol García Moreno           -   6244.joan23@fje.edu
                                                                                            Pol García Moreno           -   34016.joan23@fje.edu
  ```  
