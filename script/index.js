// array consonanti
const consonant = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];

function calculate(event) {
    event.preventDefault(); // non riaggiorno la pagina

    let lastName = document.getElementById('last-name').value;
    let name = document.getElementById('name').value;
    let day = document.getElementById('day').value;
    let month = document.getElementById('month').value;
    let year = document.getElementById('year').value;
    let sex = document.getElementById('sex').value;
    let bornPlace = document.getElementById('born-place')

    // verifichiamo si veda tutto correttamente
    console.log(`${lastName} ${name} ${day} ${month} ${year} ${sex} ${bornPlace}`)

    // chiamo la funzione "calculateLastName"
    let lastNameCode = calculateLastName(lastName);
    console.log(lastNameCode)
}
// --------------- //
function calculateLastName(lastName) {
    let lastNameCode = [];
    // primo controllo => se è lungo una lettere dà errore
    if (lastName.length === 1) {
        alert('Il cognome deve essere lungo almeno 2 lettere! Riprova.');
        window.location.reload();
        return;
    }
    // converto in maiuscolo
    lastName = lastName.toUpperCase();

    // se è lungo due aggiungo la X
    if (lastName.length === 2) {
        for (let k = 0; k < lastName.length; k++) {
            lastNameCode.push(lastName[k]);
        }
        lastNameCode.push('X');
    }

    for (let i = 0; i < lastName.length; i++) {
        // controllo che il codice per il cognome non sia già stato creato del tutto
        if (lastNameCode.length < 3) {
            // controllo che la lettera sia una consonante
            if (consonant.indexOf(lastName[i]) != -1) {
                lastNameCode.push(lastName[i]);
            }
        }
    }
    // controllo che il codice del cognome sia solo di 3 caratteri
    if (lastNameCode.length === 3) {
        console.log('Ok');
    } else {
        for (let j = 0; j < lastName.length; j++) {
            if (lastNameCode.length < 3) {
                // in questo caso inizio a prendere le vocali
                if (consonant.indexOf(lastName[j]) === -1) {
                    lastNameCode.push(lastName[j]);
                }
            }
        }
    }
    return lastNameCode;
}
