const output = document.getElementById("output");

function stampa(testo) {
  output.textContent += testo + "\n";
}

// Funzione per chiedere un numero valido
function chiediNumero(messaggio) {
  let valore;
  do {
    valore = prompt(messaggio);
    if (isNaN(valore) || valore === "" || valore === null) {
      alert("Errore: devi inserire un numero valido!");
    }
  } while (isNaN(valore) || valore === "" || valore === null);

  return Number(valore);
}

const turni = new Map();

/* INPUT TURNI E STUDENTI */

let numeroTurni = chiediNumero("Quanti turni vuoi inserire?");
alert("Numero turni inseriti: " + numeroTurni);

for (let i = 0; i < numeroTurni; i++) {
  let orario = prompt(`Inserisci orario del turno ${i + 1}`);
  alert("Turno inserito: " + orario);

  let numeroStudenti = chiediNumero(
    `Quanti studenti per il turno ${orario}?`
  );
  alert("Numero studenti inseriti: " + numeroStudenti);

  let studenti = [];

  for (let j = 0; j < numeroStudenti; j++) {
    let codice = prompt(`Inserisci codice studente ${j + 1}`);
    alert("Studente inserito: " + codice);
    studenti.push(codice);
  }

  turni.set(orario, studenti);
}

/* OUTPUT NELLA PAGINA*/

stampa("ELENCO TURNI:");
for (const [orario, studenti] of turni) {
  stampa(`Turno ${orario}: ${studenti.join(", ")}`);
}

stampa("\nNumero totale turni: " + turni.size);

let totaleStudenti = 0;
for (const studenti of turni.values()) {
  totaleStudenti += studenti.length;
}
stampa("Numero totale studenti: " + totaleStudenti);

/* RICERCA STUDENTE*/

let studenteCercato = prompt("Inserisci codice studente da cercare");
alert("Studente cercato: " + studenteCercato);

let trovato = false;

for (const [orario, studenti] of turni) {
  if (studenti.includes(studenteCercato)) {
    stampa(`Studente ${studenteCercato} trovato nel turno ${orario}`);
    trovato = true;
  }
}

if (!trovato) {
  stampa(`Studente ${studenteCercato} non presente in nessun turno`);
}

/*AGGIUNTA STUDENTE */

let nuovoStudente = prompt("Inserisci codice studente da aggiungere");
alert("Studente da aggiungere: " + nuovoStudente);

let turnoDestinazione = prompt("Inserisci turno di destinazione");
alert("Turno di destinazione: " + turnoDestinazione);

let giaPresente = false;
for (const studenti of turni.values()) {
  if (studenti.includes(nuovoStudente)) {
    giaPresente = true;
  }
}

if (giaPresente) {
  stampa("Errore: studente già presente in un altro turno");
} else if (turni.has(turnoDestinazione)) {
  turni.get(turnoDestinazione).push(nuovoStudente);
  stampa(`Studente ${nuovoStudente} aggiunto al turno ${turnoDestinazione}`);
}

/*RIMOZIONE STUDENTE*/

let studenteRimuovere = prompt("Inserisci codice studente da rimuovere");
alert("Studente da rimuovere: " + studenteRimuovere);

let turnoRimozione = prompt("Inserisci turno da cui rimuoverlo");
alert("Turno di rimozione: " + turnoRimozione);

if (turni.has(turnoRimozione)) {
  let studenti = turni.get(turnoRimozione);
  let index = studenti.indexOf(studenteRimuovere);

  if (index !== -1) {
    studenti.splice(index, 1);
    stampa(`Studente ${studenteRimuovere} rimosso dal turno ${turnoRimozione}`);
  } else {
    stampa("Studente non trovato nel turno indicato");
  }
}

/* SITUAZIONE AGGIORNATA*/

stampa("\nSITUAZIONE AGGIORNATA:");
for (const [orario, studenti] of turni) {
  stampa(`Turno ${orario}: ${studenti.join(", ")}`);
}

/* TURNO CON PIÙ STUDENTI*/


let maxTurno = "";
let maxNumero = 0;

for (const [orario, studenti] of turni) {
  if (studenti.length > maxNumero) {
    maxNumero = studenti.length;
    maxTurno = orario;
  }
}

stampa(
  `\nTurno con il maggior numero di studenti:\n${maxTurno} (${maxNumero} studenti)`
);
   /*TURNI CON ALMENO N STUDENTI*/

let N = chiediNumero("Inserisci N (numero minimo di studenti)");
alert("Valore di N inserito: " + N);

stampa(`\nTurni con almeno ${N} studenti:`);
for (const [orario, studenti] of turni) {
  if (studenti.length >= N) {
    stampa(orario);
  }
}
