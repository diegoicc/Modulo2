var pagUrl = "";
if (document.getElementById("senate-data")) {
  var pagUrl = 'https://api.propublica.org/congress/v1/113/senate/members.json'
} else {
  var pagUrl = 'https://api.propublica.org/congress/v1/113/house/members.json'
};

var memberm = [];
var diezporciento = Math.round((memberm.length * 10) / 100);


var app = new Vue({
  el: '#app',
  data: {
    "members": [],
    "auxmembers": [],
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
    "diezporciento":0,
     
  },
  methods: {
    getNewcode: function () {
      fetch(pagUrl, {
        method: 'GET',
        headers: {
          'X-API-Key': "LnbErDIHSSKiC47IqaFduWS0d2IIEWqM7VVTfzZI"
        }
      }).then(function (response) {
        return response.json();
      }).then(function (datosNuevos) {
        /* app.statistics = getDatos(statistics), */
          app.members = datosNuevos.results[0].members,
          app.auxmembers = datosNuevos.results[0].members,

          app.number_of_democrats = app.calcularm(app.members, "D"),
          app.number_of_independents = app.calcularm(app.members, "I"),
          app.number_of_republicans = app.calcularm(app.members, "R"),
          console.log(app.number_of_independents);
          app.total = app.number_of_democrats + app.number_of_independents + app.number_of_republicans,
          app.democrats_average_votes_with_party = app.calcularp(app.members, "D"),
          app.republicans_average_votes_with_party = app.calcularp(app.members, "R"),
          app.independents_average_votes_with_party = app.calcularp(app.members, "I"),
          app.total_average = app.calcularptotal(app.members),
          app.calculardiezporciento();
          app.least_engaged = app.leastAttendance(app.members),
          
          app.most_engaged = app.mostAttendance(app.members),
          
          app.least_loyal = app.leastLoyal(app.members),
          app.most_loyal = app.mostLoyal(app.members);
      })
    },
    calculardiezporciento: function() {
      
      app.diezporciento = Math.round((app.members.length * 10) / 100);
    },

 
      calcularm: function (array, listarpartido) {
      let contador = array.filter(function (miembro) {
        return miembro.party === listarpartido;
      })
      return contador.length;
      
    },

    calcularp: function (arrayMembers, nombreDePartido) {
      let divisor = 0;
      let contador = 0;
      arrayMembers.forEach(element => {
        if (element.party === nombreDePartido) {
          contador += element.votes_with_party_pct;
          divisor++;
        }
    
      });
      return (contador / divisor).toFixed(2);
    },
    
    calcularptotal: function (arrayMembers) {
      let contador = 0;
      arrayMembers.forEach(element => {
        contador += element.votes_with_party_pct;
    
      });
      return (contador / arrayMembers.length).toFixed(2);
    },

    leastAttendance: function (memberm) {
      let aux = [];
      
      memberm.sort(function (a, b) {
        if (a.missed_votes_pct > b.missed_votes_pct) {
          return 1;
        } else if (a.missed_votes_pct < b.missed_votes_pct) {
          return -1;
        }
      })
      for (var i = 0; i < app.diezporciento; i++) {
        aux.push(memberm[i]);
      }
      console.log(memberm);
      console.log(aux);
      while (aux[aux.length - 1].missed_votes_pct === memberm[i + 1].missed_votes_pct) {
        aux.push(memberm[i + 1]);
        i++
      }
      return aux;
    },

    miFiltro: function () {
      let listaFiltrada = [];
      let checkeados = document.querySelectorAll("input[name=party-filter]:checked");
      let seleccionado = document.querySelector("select").value
    
      checkeados = Array.from(checkeados);
      console.log(checkeados);
      checkeados = checkeados.map(function (input) {
        return input.value
      })
     
      listaFiltrada = app.auxmembers.filter(function (member) {
        return checkeados.includes(member.party) && (seleccionado == "All" ? true : member.state == seleccionado)
      })
      console.log(listaFiltrada);
      app.members = listaFiltrada;
    },

    mostAttendance: function (memberm) {
      let aux = [];
      memberm.sort(function (a, b) {
        if (a.missed_votes_pct < b.missed_votes_pct) {
          return 1;
        } else if (a.missed_votes_pct > b.missed_votes_pct) {
          return -1;
        }
      })
      for (var i = 0; i < app.diezporciento; i++) {
        aux.push(memberm[i]);
      }
      while (aux[aux.length - 1].missed_votes_pct === memberm[i + 1].missed_votes_pct) {
        aux.push(memberm[i + 1]);
        i++
      }
      return aux;
    },

    leastLoyal: function (memberm) {
      let aux = [];
      memberm.sort(function (a, b) {
        if (a.votes_with_party_pct > b.votes_with_party_pct) {
          return 1;
        } else if (a.votes_with_party_pct < b.votes_with_party_pct) {
          return -1;
        }
      })
      for (var i = 0; i < app.diezporciento; i++) {
        aux.push(memberm[i]);
      }
      while (aux[aux.length - 1].votes_with_party_pct === memberm[i + 1].votes_with_party_pct) {
        aux.push(memberm[i + 1]);
        i++
      }
      return aux;
    },

    mostLoyal: function (memberm) {
      let aux = [];
      memberm.sort(function (a, b) {
        if (a.votes_with_party_pct < b.votes_with_party_pct) {
          return 1;
        } else if (a.votes_with_party_pct > b.votes_with_party_pct) {
          return -1;
        }
      })
      for (var i = 0; i < app.diezporciento; i++) {
        aux.push(memberm[i]);
      }
      while (aux[aux.length - 1].votes_with_party_pct === memberm[i + 1].votes_with_party_pct) {
        aux.push(memberm[i + 1]);
        i++
      }
      return aux;
    }
    
  }
})

app.getNewcode();