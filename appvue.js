var pagUrl = "";
if (document.getElementById("senate_data")) {
  var pagUrl = 'https://api.propublica.org/congress/v1/113/senate/members.json'
} else {
  var pagUrl = 'https://api.propublica.org/congress/v1/113/house/members.json'
};

var m = [];

var app = new Vue({
  el: '#app',
  data: {
    "number_of_democrats": 0,
    "number_of_republicans": 0,
    "number_of_independents": 0,
    "total": 0,
    "democrats_average_votes_with_party": 0,
    "republicans_average_votes_with_party": 0,
    "independents_average_votes_with_party": 0,
    "total_average": 0,
    "least_engaged": [],
    "most_engaged": [],
    "least_loyal": [],
    "most_loyal": [],
  },
  methods: {
    getNewcode: function (url, {
      fetch(url {
        method: 'GET'
        headers: {
          'X-API-Key': BUSCARLO EN EL MAILLLLLLLLLLLLLLLLLLLLLLLLLLLL
        }
      }).then(function (response) {
        return response.json();
      }).then(function (datosNuevos)) {
        app.statistics = getDatos(static),
        /* statistics.number_of_democrats = calcularm(memberm, "D");
        statistics.number_of_independents = calcularm(memberm, "I");
        statistics.number_of_republicans = calcularm(memberm, "R");
        statistics.total = statistics.number_of_democrats + statistics.number_of_independents + statistics.number_of_republicans;
        statistics.democrats_average_votes_with_party = calcularp(memberm, "D");
        statistics.republicans_average_votes_with_party = calcularp(memberm, "R");
        statistics.independents_average_votes_with_party = calcularp(memberm, "I");
        statistics.total_average = calcularptotal(memberm);
        statistics.least_engaged = leastAttendance(memberm);
        statistics.most_engaged = mostAttendance(memberm);
        statistics.least_loyal = leastLoyal(memberm);
        statistics.most_loyal = mostLoyal(memberm); */
      }
    });
  }
});

function getDatos(statistics) {
  statistics.number_of_democrats = calcularm(memberm, "D");
  statistics.number_of_independents = calcularm(memberm, "I");
  statistics.number_of_republicans = calcularm(memberm, "R");
  statistics.total = statistics.number_of_democrats + statistics.number_of_independents + statistics.number_of_republicans;
  statistics.democrats_average_votes_with_party = calcularp(memberm, "D");
  statistics.republicans_average_votes_with_party = calcularp(memberm, "R");
  statistics.independents_average_votes_with_party = calcularp(memberm, "I");
  statistics.total_average = calcularptotal(memberm);
  statistics.least_engaged = leastAttendance(memberm);
  statistics.most_engaged = mostAttendance(memberm);
  statistics.least_loyal = leastLoyal(memberm);
  statistics.most_loyal = mostLoyal(memberm);
}

/*  miFiltro(data.results[0].members); */

function miFiltro(arrayCompleto) {
  let listaFiltrada = [];
  let checkeados = document.querySelectorAll("input[name=party-filter]:checked");
  let seleccionado = document.querySelector("select").value

  checkeados = Array.from(checkeados);
  console.log(checkeados);
  checkeados = checkeados.map(function (input) {
      return input.value
  })
  // console.log(checkeados)
  listaFiltrada = arrayCompleto.filter(function (member) {
      return checkeados.includes(member.party) && (seleccionado == "All" ? true : member.state == seleccionado)
  })
  console.log(listaFiltrada);
  return listaFiltrada
}