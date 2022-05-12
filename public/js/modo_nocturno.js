// function cambiarModo() {
//     var body = document.body;
//     const switchButton = document.getElementById('switch');
//     document.body.classList.toggle('oscuro'); //toggle the HTML body the class 'dark'
//     switchButton.classList.toggle('active'); //toggle the HTML button with the id='switch' with the class 'active'

//     if (document.body.classList.contains('oscuro')) {
//         localStorage.setItem('dark-mode', 'true');
//     } else {
//         localStorage.setItem('dark-mode', 'false');
//     }

//     if (localStorage.getItem('dark-mode') === true) {
//         document.body.classList.add('oscuro');
//         btnSwitch.classList.toggle('active');
//     } else {
//         document.body.classList.remove('oscuro');
//         btnSwitch.classList.toggle('remove');
//     }
// }

const switchButton = document.getElementById('switch');

switchButton.addEventListener('click', () => {
    document.body.classList.toggle('oscuro'); //cambiar el cuerpo del HTML por la clase 'dark'
    switchButton.classList.toggle('active'); //cambiar el botón HTML con el id='switch' con la clase 'active'
    workContainer.classList.toggle('oscuro');

    if (document.body.classList.contains('oscuro')) { //cuando el cuerpo tiene la clase 'dark' actualmente
        localStorage.setItem('oscuro', 'enabled'); //almacenar estos datos si el modo oscuro está activado
    } else {
        localStorage.setItem('oscuro', 'disabled'); //almacenar estos datos si el modo oscuro está desactivado
    }
});

if (localStorage.getItem('oscuro') == 'enabled') {
    document.body.classList.toggle('oscuro');
    switchButton.classList.toggle('active');
    workContainer.classList.toggle('oscuro');
}