// Map: chiave = orario, valore = array studenti
const turni = new Map();

function studentePresenteAltrove(codice) {
    for (let [orario, studenti] of turni) {
        if (studenti.includes(codice)) {
            return orario;
        }
    }
    return null;
}

function aggiungiTurno() {
    const orario = document.getElementById("orario").value;
    const studentiInput = document.getElementById("studenti").value;

    const studenti = studentiInput.split(",").map(s => s.trim());

    // controllo studenti duplicati in altri turni
    for (let s of studenti) {
        const trovato = studentePresenteAltrove(s);
        if (trovato) {
            alert(`Errore: lo studente ${s} è già prenotato nel turno ${trovato}`);
            return;
        }
    }

    turni.set(orario, studenti);
    stampaTabella();
}

function aggiungiStudente() {
    const orario = document.getElementById("orarioAdd").value;
    const studente = document.getElementById("studenteAdd").value;

    if (!turni.has(orario)) {
        alert("Turno non esistente");
        return;
    }

    const trovato = studentePresenteAltrove(studente);
    if (trovato) {
        alert(`Errore: lo studente ${studente} è già nel turno ${trovato}`);
        return;
    }

    turni.get(orario).push(studente);
    stampaTabella();
}

function rimuoviStudente() {
    const orario = document.getElementById("orarioRem").value;
    const studente = document.getElementById("studenteRem").value;

    if (!turni.has(orario)) return;

    const studenti = turni.get(orario);
    const index = studenti.indexOf(studente);

    if (index !== -1) {
        studenti.splice(index, 1);
    }

    stampaTabella();
}

function stampaTabella() {
    let html = "<table border='1'><tr><th>Turno</th><th>Studenti</th></tr>";

    let totaleStudenti = 0;
    let maxTurno = "";
    let maxNumero = 0;

    for (let [orario, studenti] of turni) {
        html += `<tr><td>${orario}</td><td>${studenti.join(", ")}</td></tr>`;
        totaleStudenti += studenti.length;

        if (studenti.length > maxNumero) {
            maxNumero = studenti.length;
            maxTurno = orario;
        }
    }

    html += "</table>";

    html += `<p>Numero turni: ${turni.size}</p>`;
    html += `<p>Numero totale studenti: ${totaleStudenti}</p>`;
    html += `<p>Turno con più studenti: ${maxTurno} (${maxNumero})</p>`;

    document.getElementById("output").innerHTML = html;
}
