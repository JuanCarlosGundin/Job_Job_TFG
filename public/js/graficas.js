window.onload = function() {
    numerousersJS();
    localizacionempresasJS();
    labelsX = [];
    dataY = [];
    labelsXempresa = [];
    dataYempresa = [];
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
            graficousuarios();
        }
    }

    ajax.send(formdata)
}

function graficousuarios() {
    const data = {
        labels: labelsX,
        datasets: [{
            label: 'Comparativa empresas y trabajadores',
            backgroundColor: ['rgb(24, 108, 167)',
                'rgb(146, 175, 215)'
            ],
            borderColor: ['rgb(24, 108, 167)',
                'rgb(146, 175, 215)'
            ],
            data: dataY,
        }]
    };
    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    label: false,
                }
            }
        },
    };
    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );

}

//------------------------------------------------------------------------------------------------------------------------//

function localizacionempresasJS() {

    var ajax = objetoAjax();
    formdata = new FormData();
    formdata.append('_token', document.getElementById('token').getAttribute("content"));
    formdata.append('_method', 'GET');

    ajax.open("POST", "localizacionempresas", true);

    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);

            for (var i = 0; i < respuesta.length; i++) {
                labelsXempresa.push(respuesta[i].loc_emp);
                dataYempresa.push(respuesta[i].empresas);
            }
            // creamos el chart/grafico
            graficolocalizacion();
        }
    }

    ajax.send(formdata)
}

function graficolocalizacion() {
    const data = {
        labels: labelsXempresa,
        datasets: [{
            label: 'Localización empresas registradas',
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(249, 188, 63)',
                'rgb(97, 77, 35)',
                'rgb(65, 216, 26)',
                'rgb(254, 173, 0)',
                'rgb(62, 90, 155)',
                'rgb(6, 13, 32)',
                'rgb(81, 82, 72)',
                'rgb(248, 0, 255)',
                'rgb(255, 0, 108)',
                'rgb(218, 223, 240)',
                'rgb(94, 78, 159)',
                'rgb(187, 158, 186)'

            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(249, 188, 63)',
                'rgb(97, 77, 35)',
                'rgb(65, 216, 26)',
                'rgb(254, 173, 0)',
                'rgb(62, 90, 155)',
                'rgb(6, 13, 32)',
                'rgb(81, 82, 72)',
                'rgb(248, 0, 255)',
                'rgb(255, 0, 108)',
                'rgb(218, 223, 240)',
                'rgb(94, 78, 159)',
                'rgb(187, 158, 186)'

            ],
            data: dataYempresa,
        }]
    };
    const config = {
        type: 'doughnut',
        data: data,
    };
    const locaempresas = new Chart(
        document.getElementById('locaempresas'),
        config
    );

}