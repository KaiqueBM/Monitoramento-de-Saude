const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

firebase.initializeApp(firebaseConfig);

var lista = document.getElementById("lista")

var batimento = []
var horario = []
var nivelTemperatura = []
var temperatura = []
var nivelO2 = []
var o2 = []
var nivelEstresse = []
var estresse = []
var nivelAnsiedade = []
var ansiedade = []

var db = firebase.database().ref('Pacientes/1/monitoramento');
db.on('value', (snapshot) => {
    var data = snapshot.val();

    var total = Object.keys(data).length

    for (let i = 0; i < total; i++) {
        var key = Object.keys(data)[i];
        batimento[i] = data[key].batimento
        horario[i] = data[key].horario
        nivelTemperatura[i] = data[key].nivelTemperatura
        temperatura[i] = data[key].temperatura
        nivelO2[i] = data[key].nivelO2
        o2[i] = data[key].o2
        nivelEstresse[i] = data[key].nivelEstresse
        estresse[i] = data[key].estresse
        nivelAnsiedade[i] = data[key].nivelAnsiedade
        ansiedade[i] = data[key].ansiedade


    }

    var ultimo_horario = horario[horario.length - 1]
    document.getElementById("ultima_att").innerHTML = ultimo_horario

    var data = new Date()
    var dia = data.getDate()
    var mes = data.getMonth()
    var ano = data.getFullYear()
    var data_atual = dia + "/" + mes + "/" + ano;
    document.getElementById("data_atual").innerHTML = data_atual

    google.charts.load('current', { 'packages': ['line'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var grafico = new google.visualization.DataTable();
        grafico.addColumn('string', '');
        grafico.addColumn('number', 'Batimento');

        var ultimosHorarios = horario.slice(horario.length - 10);
        var ultimosBatimento = batimento.slice(batimento.length - 10);

        for (i = 0; i < 10; i++) {
            grafico.addRows([
                [
                    ultimosHorarios[i],
                    ultimosBatimento[i]
                ],
            ]);
        }
        var options = {

            height: 350,
            backgroundColor: { fill: 'transparent' },
            legend: { position: 'none' },
            chartArea: { backgroundColor: 'none' },
            titleTextStyle: {
                color: 'red',
                fontName: 'Roboto',
                fontSize: 20,
                bold: true,
                italic: false
            },
            hAxis: { textStyle: { color: 'black', fontName: 'Poppins', fontSize: 15 } },
            vAxis: {
                textStyle: { color: 'black', fontName: 'Poppins', fontSize: 15 },
                gridlines: { color: '#e2e2e2' },
                viewWindow: { min: '50' }
            },
            colors: ['#4150aa'],
            axes: {
                x: {
                    0: { side: 'bottom' }
                }
            }
        };
        var chart = new google.charts.Line(document.getElementById('line_top_x'));
        chart.draw(grafico, google.charts.Line.convertOptions(options));

    }

    document.getElementById("temperatura_atual").innerHTML = temperatura[temperatura.length - 1]
    document.getElementById("temperatura_atual_nivel").innerHTML = nivelTemperatura[nivelTemperatura.length - 1]

    document.getElementById("temperatura1").innerHTML = temperatura[temperatura.length - 2] + "° às " + horario[horario.length - 2]
    document.getElementById("temperatura2").innerHTML = temperatura[temperatura.length - 3] + "° às " + horario[horario.length - 3]
    document.getElementById("temperatura3").innerHTML = temperatura[temperatura.length - 4] + "° às " + horario[horario.length - 4]
    document.getElementById("temperatura4").innerHTML = temperatura[temperatura.length - 5] + "° às " + horario[horario.length - 5]
    document.getElementById("temperatura5").innerHTML = temperatura[temperatura.length - 6] + "° às " + horario[horario.length - 6]
    document.getElementById("temperatura6").innerHTML = temperatura[temperatura.length - 7] + "° às " + horario[horario.length - 7]

    document.getElementById("saturacao_atual").innerHTML = o2[o2.length - 1]
    document.getElementById("saturacao_atual_nivel").innerHTML = nivelO2[nivelO2.length - 1]

    document.getElementById("saturacao1").innerHTML = o2[o2.length - 2] + "% às " + horario[horario.length - 2]
    document.getElementById("saturacao2").innerHTML = o2[o2.length - 3] + "% às " + horario[horario.length - 3]
    document.getElementById("saturacao3").innerHTML = o2[o2.length - 4] + "% às " + horario[horario.length - 4]
    document.getElementById("saturacao4").innerHTML = o2[o2.length - 5] + "% às " + horario[horario.length - 5]
    document.getElementById("saturacao5").innerHTML = o2[o2.length - 6] + "% às " + horario[horario.length - 6]
    document.getElementById("saturacao6").innerHTML = o2[o2.length - 7] + "% às " + horario[horario.length - 7]

    document.getElementById("estresse_atual").innerHTML = estresse[estresse.length - 1]
    document.getElementById("estresse_atual_nivel").innerHTML = nivelEstresse[nivelEstresse.length - 1]

    document.getElementById("ansiedade_atual").innerHTML = ansiedade[ansiedade.length - 1]
    document.getElementById("ansiedade_atual_nivel").innerHTML = nivelAnsiedade[nivelAnsiedade.length - 1]

    var estresseW = estresse[estresse.length - 1] + "%"

    if (estresse[estresse.length - 1] <= 10) {
        jQuery(".gauge_estresse_grau").css("width", estresseW)
        jQuery(".gauge_estresse_grau").css("background", "#2ebb5d")
    } else if (estresse[estresse.length - 1] > 10 && estresse[estresse.length - 1] <= 40) {
        jQuery(".gauge_estresse_grau").css("width", estresseW)
        jQuery(".gauge_estresse_grau").css("background", "#79e250")
    } else if (estresse[estresse.length - 1] > 40 && estresse[estresse.length - 1] <= 70) {
        jQuery(".gauge_estresse_grau").css("width", estresseW)
        jQuery(".gauge_estresse_grau").css("background", "#eed04a")
    } else if (estresse[estresse.length - 1] > 70 && estresse[estresse.length - 1] <= 90) {
        jQuery(".gauge_estresse_grau").css("width", estresseW)
        jQuery(".gauge_estresse_grau").css("background", "#fa9e15")
    } else {
        jQuery(".gauge_estresse_grau").css("width", estresseW)
        jQuery(".gauge_estresse_grau").css("background", "#d4473d")
    }

    var ansiedadeW = ansiedade[ansiedade.length - 1] + "%"

    if (ansiedade[ansiedade.length - 1] <= 10) {
        jQuery(".gauge_ansiedade_grau").css("width", ansiedadeW)
        jQuery(".gauge_ansiedade_grau").css("background", "#2ebb5d")
    } else if (ansiedade[ansiedade.length - 1] > 10 && ansiedade[ansiedade.length - 1] <= 40) {
        jQuery(".gauge_ansiedade_grau").css("width", ansiedadeW)
        jQuery(".gauge_ansiedade_grau").css("background", "#79e250")
    } else if (ansiedade[ansiedade.length - 1] > 40 && ansiedade[ansiedade.length - 1] <= 70) {
        jQuery(".gauge_ansiedade_grau").css("width", ansiedadeW)
        jQuery(".gauge_ansiedade_grau").css("background", "#eed04a")
    } else if (ansiedade[ansiedade.length - 1] > 70 && ansiedade[ansiedade.length - 1] <= 90) {
        jQuery(".gauge_ansiedade_grau").css("width", ansiedadeW)
        jQuery(".gauge_ansiedade_grau").css("background", "#fa9e15")
    } else {
        jQuery(".gauge_ansiedade_grau").css("width", ansiedadeW)
        jQuery(".gauge_ansiedade_grau").css("background", "#d4473d")
    }

    var db = firebase.database().ref('Pacientes/1/dados');
    db.on('value', (snapshot) => {
        var data = snapshot.val();
        document.getElementById("info_nome").innerHTML = data.nome
        document.getElementById("info_id").innerHTML = "ID: " + data.user
        document.getElementById("info_idade").innerHTML = data.idade
        document.getElementById("info_data").innerHTML = data.dataNascimento
        document.getElementById("info_altura").innerHTML = data.altura
        document.getElementById("info_peso").innerHTML = data.peso
    })

});