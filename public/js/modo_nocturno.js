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
const workContainer = document.getElementById('work');

switchButton.addEventListener('click', () => {
    document.body.classList.toggle('oscuro'); //body del html se cambia a la clase 'oscuro'
    switchButton.classList.toggle('active'); //el boton se cambia a la clase "active"

    if (document.body.classList.contains('oscuro')) { //si el body tiene la clase 'oscuro'
        localStorage.setItem('darkMode', 'enabled'); //activa el modo oscuro
        document.getElementById('img_logo').innerHTML = '<img src="storage/uploads/jobjob_logo.png"></img>'
    } else {
        localStorage.setItem('darkMode', 'disabled'); //si no, desactiva el modo oscuro
        document.getElementById('img_logo').innerHTML = '<img src="storage/uploads/jobjob_logo_black.png"></img>'
    }
});

//si el modo oscuro está activado almacenara el cambio de body y el botón en LocalStorage
if (localStorage.getItem('darkMode') == 'enabled') {
    document.body.classList.toggle('oscuro');
    switchButton.classList.toggle('active');
    document.getElementById('img_logo').innerHTML = '<img src="storage/uploads/jobjob_logo.png"></img>'
}