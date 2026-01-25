// Map: orario → array studenti
const turni = new Map();

// Controlla se uno studente è già in un altro turno
function cercaStudente(codice) {
    for (let [orario, lista] of turni) {
        if (lista.includes(codice)) return orario;
    }
    return null;
}

// Aggiunge un nuovo turno
function aggiungiTurno() {
    const orario = document.getElementById("orario").value.trim();
    const input = document.getElementById("studenti").value;

    if (!orario || !input) return;

    const studenti = input.split(",").map(s => s.trim());

    for (let s of studenti) {
        const trovato = cercaStudente(s);
        if (trovato) {
            alert(`Studente ${s} già presente nel turno ${trovato}`);
            return;
        }
    }

    turni.set(orario, studenti);
    aggiornaOutput();
}

// Aggiunge studente a turno esistente
function aggiungiStudente() {
    const orario = document.getElementById("orarioAdd").value.trim();
    const studente = document.getElementById("studenteAdd").value.trim();

    if (!turni.has(orario)) {
        alert("Turno non esistente");
        return;
    }

    const trovato = cercaStudente(studente);
    if (trovato) {
        alert(`Studente già nel turno ${trovato}`);
        return;
    }

    turni.get(orario).push(studente);
    aggiornaOutput();
}

// Rimuove studente
function rimuoviStudente() {
    const orario = document.getElementById("orarioRem").value.trim();
    const studente = document.getElementById("studenteRem").value.trim();

    if (!turni.has(orario)) return;

    const lista = turni.get(orario);
    turni.set(orario, lista.filter(s => s !== studente));

    aggiornaOutput();
}

// Stampa tabella e statistiche
function aggiornaOutput() {
    let html = "<table><tr><th>Turno</th><th>Studenti</th></tr>";

    let totStudenti = 0;
    let turnoMax = "";
    let max = 0;

    for (let [orario, lista] of turni) {
        html += `<tr><td>${orario}</td><td>${lista.join(", ")}</td></tr>`;
        totStudenti += lista.length;

        if (lista.length > max) {
            max = lista.length;
            turnoMax = orario;
        }
    }

    html += "</table>";
    html += `<p>Numero turni: ${turni.size}</p>`;
    html += `<p>Totale studenti: ${totStudenti}</p>`;
    html += `<p>Turno più affollato: ${turnoMax} (${max})</p>`;

    document.getElementById("output").innerHTML = html;
}

// Event listener
document.getElementById("btnTurno").addEventListener("click", aggiungiTurno);
document.getElementById("btnAdd").addEventListener("click", aggiungiStudente);
document.getElementById("btnRem").addEventListener("click", rimuoviStudente);
