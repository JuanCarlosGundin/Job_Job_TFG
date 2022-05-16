window.onload = function() {
    numerousersJS();
    labelsX = [];
    dataY = [];
}

function objetoAjax() {
    var xmlhttp = false;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}

function numerousersJS() {

    var ajax = objetoAjax();
    formdata = new FormData();
    formdata.append('_token', document.getElementById('token').getAttribute("content"));
    formdata.append('_method', 'GET');

    ajax.open("POST", "numerousers", true);

    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);

            for (var i = 0; i < respuesta.length; i++) {
                labelsX.push(respuesta[i].nom_perfil);
                dataY.push(respuesta[i].num);
            }
            // creamos el chart/grafico
            chartCreate();
        }
    }

    ajax.send(formdata)
}

function chartCreate() {
    const data = {
        labels: labelsX,
        datasets: [{
            label: 'Número de trabajadores y empresas registradas',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: dataY,
        }]
    };
    const config = {
        type: 'line',
        data: data,
        options: {}
    };
    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}