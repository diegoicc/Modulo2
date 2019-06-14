
createSenateTable();

function createSenateTable() {

    var tablaSenado = document.getElementById('tablaDatos');
    var arrayfiltrado = miFiltro(data.results[0].members);
    var tablaFormateada = addTable(arrayfiltrado);



    tablaSenado.innerHTML = tablaFormateada;

}

function addTable(membersArray) {

    var tabla = '<thead class="thead-light"><tr><th>Full Name</th><th>Party</th><th>State </th><th>Seniority</th><th>Percentage of votes with party</th></tr></thead>';


    tabla += '<tbody>';

    membersArray.forEach(function (integrante) {
        tabla += '<tr>';

        if (integrante.middle_name === null) {
            tabla += '<td><a href="' + integrante.url + '">' + integrante.first_name + ' ' + integrante.last_name + '</td>';
        } else {
            tabla += '<td><a href="' + integrante.url + '">' + integrante.first_name + ' ' + integrante.middle_name + ' ' + integrante.last_name + '</a></td>';
        }
        tabla += '<td class="party">' + integrante.party + '</td>';

        tabla += '<td class="state">' + integrante.state + '</td>';

        tabla += '<td>' + integrante.seniority + '</td>';

        tabla += '<td> % ' + integrante.votes_with_party_pct + '</td>';

        tabla += '</tr>';
    });

    tabla += '</tbody>';

    return tabla;

}
crearDropdown(data.results[0].members);
function crearDropdown(arrayCompleto) {
    var select = document.getElementById('select-states');

    listaEstado = arrayCompleto.map(function (member) {
        return member.state;
    })
    console.log(listaEstado);
    listaEstado = listaEstado.filter(function (estado, indice, array) {
        return array.indexOf(estado) == indice
    }).sort()
    console.log(listaEstado);
    let output = "";
    output = "<option value='All'> All </option>";

    listaEstado.forEach(function (estado) {
        output += "<option value='" + estado + "'>" + estado + "</option>"
    })
    console.log(listaEstado);
    console.log(output)

    select.innerHTML = output;


}

/*  miFiltro(data.results[0].members); */

function miFiltro(arrayCompleto) {
    let listaFiltrada = [];
    // let listaFiltradaFor = [];
    let checkeados = document.querySelectorAll("input[name=party-filter]:checked");
    let seleccionado = document.querySelector("select").value
    // console.log(seleccionado);

    // console.log(checkeados);
    checkeados = Array.from(checkeados);
    console.log(checkeados);
    checkeados = checkeados.map(function (input) {
        return input.value
    })
    // console.log(checkeados)

    listaFiltrada = arrayCompleto.filter(function (member) {
        return checkeados.includes(member.party) && (seleccionado == "All" ? true : member.state == seleccionado)
    })

    // for (let i = 0; i < arrayCompleto.length; i++) {

    //   if (checkeados.includes(arrayCompleto[i].party)  && (seleccionado == "All" ? true : arrayCompleto[i].state == seleccionado) ) {
    //     listaFiltradaFor.push(arrayCompleto[i])
    //   }

    // }
    console.log(listaFiltrada);
    // console.log(listaFiltradaFor);

    return listaFiltrada

}
