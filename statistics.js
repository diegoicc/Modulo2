var memberm = data.results[0].members;
var diezporciento = Math.round((memberm.length * 10) / 100);
var page = window.location.pathname;

console.log(page);

var statistics = {
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
};



/* Asignacion de datos */

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


if (page.includes("/senate_attendance") || page.includes("/house_attendance")) {
  tableattendance(statistics.least_engaged, "most-a");
/* crear tabla house attendance most */
tableattendance(statistics.most_engaged, "least-a");
}

else {
  tableLoyal(statistics.least_loyal, "most-l");

tableLoyal(statistics.most_loyal, "least-l");
}

console.table(statistics.least_engaged);


/* Declarar funciones */


function calcularm(array, listarpartido) {
  let contador = array.filter(function (miembro) {
    return miembro.party === listarpartido;
  })
  return contador.length;
}


function calcularp(arrayMembers, nombreDePartido) {
  let divisor = 0;
  let contador = 0;
  arrayMembers.forEach(element => {
    if (element.party === nombreDePartido) {
      contador += element.votes_with_party_pct;
      divisor++;
    }

  });
  return (contador / divisor).toFixed(2);
}

function calcularptotal(arrayMembers) {
  let contador = 0;
  arrayMembers.forEach(element => {
    contador += element.votes_with_party_pct;

  });
  return (contador / arrayMembers.length).toFixed(2);
}


var table1 = document.getElementById("table1");
table1.innerHTML = addTable();

function addTable() {

  var tabla = '<thead class="thead-light"><tr><th>Party</th><th>Number of reps</th><th>% Voted with Party</th></tr></thead>';
  tabla += '<tbody>';

  tabla += '<tr>';
  tabla += '<td class="party">' + "Democrat" + '</td>';
  tabla += '<td class="state">' + statistics.number_of_democrats + '</td>';
  tabla += '<td>' + statistics.democrats_average_votes_with_party + '</td>';
  tabla += '</tr>';

  tabla += '<tr>';
  tabla += '<td class="party">' + "Republican" + '</td>';
  tabla += '<td class="state">' + statistics.number_of_republicans + '</td>';
  tabla += '<td>' + statistics.republicans_average_votes_with_party + '</td>';
  tabla += '</tr>';


  if (statistics.number_of_independents > 0) {
    tabla += '<tr>';
    tabla += '<td class="party">' + "Independent" + '</td>';
    tabla += '<td class="state">' + statistics.number_of_independents + '</td>';
    tabla += '<td>' + statistics.independents_average_votes_with_party + '</td>';
    tabla += '</tr>';
  }


  tabla += '<tr>';
  tabla += '<td class="party">' + "Total" + '</td>';
  tabla += '<td class="state">' + statistics.total + '</td>';
  tabla += '<td>' + statistics.total_average + '</td>';
  tabla += '</tr>';
  tabla += '</tbody>';

  return tabla;
}




function tableattendance(membersArray, id) {

    let tablaSenado = document.getElementById(id);
    
    let tabla = '<thead class="thead-light"><tr><th>Name</th><th>Missed votes</th><th>% Missed</th></tr></thead>';
    
    tabla += '<tbody>';
    
    membersArray.forEach(function(integrante) {
        tabla += '<tr>';

        if (integrante.middle_name === null) {
            tabla += '<td><a href="' + integrante.url + '">' + integrante.first_name + ' ' + integrante.last_name + '</td>';
        } else {
            tabla += '<td><a href="' + integrante.url + '">' + integrante.first_name + ' ' + integrante.middle_name + ' ' + integrante.last_name + '</a></td>';
          }
        tabla += '<td class="party">' + integrante.missed_votes + '</td>';

        tabla += '<td class="state">' + integrante.missed_votes_pct + '</td>';

        tabla += '</tr>';
    });
    
    tabla += '</tbody>';

    tablaSenado.innerHTML = tabla;

}

function tableLoyal(membersArray, id) {

  let tablaSenado = document.getElementById(id);
  
  let tabla = '<thead class="thead-light"><tr><th>Name</th><th>Party Votes</th><th>% Votes</th></tr></thead>';
  
  tabla += '<tbody>';
  
  membersArray.forEach(function(integrante) {
      tabla += '<tr>';

      if (integrante.middle_name === null) {
          tabla += '<td><a href="' + integrante.url + '">' + integrante.first_name + ' ' + integrante.last_name + '</td>';
      } else {
          tabla += '<td><a href="' + integrante.url + '">' + integrante.first_name + ' ' + integrante.middle_name + ' ' + integrante.last_name + '</a></td>';
        }
      tabla += '<td class="party">' + integrante.total_votes + '</td>';

      tabla += '<td class="state">' + integrante.votes_with_party_pct + '</td>';

      tabla += '</tr>';
  });
  
  tabla += '</tbody>';

  tablaSenado.innerHTML = tabla;

}


function leastAttendance(memberm) {
    let aux = [];
    memberm.sort(function(a,b) {
      if (a.missed_votes_pct > b.missed_votes_pct) {
        return 1;
      }
      else if (a.missed_votes_pct < b.missed_votes_pct) {
        return -1;
      }
          
  
    })
    for (var i = 0; i < diezporciento; i++) {
      aux.push(memberm[i]);
    }

    while (aux[aux.length-1].missed_votes_pct === memberm[i+1].missed_votes_pct) {
      aux.push(memberm[i+1]);
      i++
    }

    return aux;


}

function mostAttendance(memberm) {
  let aux = [];
  memberm.sort(function(a,b) {
    if (a.missed_votes_pct < b.missed_votes_pct) {
      return 1;
    }
    else if (a.missed_votes_pct > b.missed_votes_pct) {
      return -1;
    }
        

  })
  for (var i = 0; i < diezporciento; i++) {
    aux.push(memberm[i]);
  }

  while (aux[aux.length-1].missed_votes_pct === memberm[i+1].missed_votes_pct) {
    aux.push(memberm[i+1]);
    i++
  }

  return aux;


}

function leastLoyal(memberm) {
  let aux = [];
  memberm.sort(function(a,b) {
    if (a.votes_with_party_pct > b.votes_with_party_pct) {
      return 1;
    }
    else if (a.votes_with_party_pct < b.votes_with_party_pct) {
      return -1;
    }
        

  })
  for (var i = 0; i < diezporciento; i++) {
    aux.push(memberm[i]);
  }

  while (aux[aux.length-1].votes_with_party_pct === memberm[i+1].votes_with_party_pct) {
    aux.push(memberm[i+1]);
    i++
  }

  return aux;


}

function mostLoyal(memberm) {
let aux = [];
memberm.sort(function(a,b) {
  if (a.votes_with_party_pct < b.votes_with_party_pct) {
    return 1;
  }
  else if (a.votes_with_party_pct > b.votes_with_party_pct) {
    return -1;
  }
      

})
for (var i = 0; i < diezporciento; i++) {
  aux.push(memberm[i]);
}

while (aux[aux.length-1].votes_with_party_pct === memberm[i+1].votes_with_party_pct) {
  aux.push(memberm[i+1]);
  i++
}

return aux;


}