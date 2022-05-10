function cambiarModo() {
    const switchButton = document.getElementById('switch');
    document.body.classList.toggle('oscuro'); //toggle the HTML body the class 'dark'
    switchButton.classList.toggle('active'); //toggle the HTML button with the id='switch' with the class 'active'
    var body = document.body;
}