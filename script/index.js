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
    
    // chiamo la funzione "calculateName"
    let nameCode = calculateName(name);
    console.log(nameCode);

    // qui sotto faccio i calcoli per data di nascita
        // anno di nascita
        let yearCode = calculateYear(year);
        console.log(yearCode);
        
        // mese di nascita
        let monthCode = calculateMonth(month);
        console.log(monthCode);

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
// --------------- //
function calculateName(name) {
    let nameCode = [];
    let consonantArray = []; // mi serve un array per salvare le consonanti e (nel caso fossero più di quattro) saltare la seconda
    // converto in maiuscolo
    name = name.toUpperCase();

    // aggiungo la o le X
    if (name.length < 3) {
        for (let k = 0; k < name.length; k++) {
            nameCode.push(name[k]);
        }
        while (nameCode.length != 3) {
            nameCode.push('X');
        }
    }

    // conto le consonanti
    for (let i = 0; i < name.length; i++) {
        if (consonant.includes(name[i])) {
            consonantArray.push(name[i]);
        }
    }

    // tutte le condizioni principali
    if (consonantArray.length < 3) {
        for (let j = 0; j < name.length; j++) {
            if (consonant.indexOf(name[j]) != -1) {
                nameCode.push(name[j]);
            }
        }
    }

    // metto la condizione per capirmi meglio
    else if (consonantArray.length >= 4) {
        for (let h = 0; h < consonantArray.length; h++) {
            // metto la condizione per saltare la seconda consonante
            // prima verifico che l'if venga eseguito solo se il codice è INCOMPLETO
            // h != 1 => è come se scrivessi è diverso da 2
            if (nameCode.length < 3 && h != 1) {
                if (consonant.indexOf(consonantArray[h]) != -1) {
                    nameCode.push(consonantArray[h]);
                }
            }
        }
    }

    // controllo che il codice del cognome sia solo di 3 caratteri
    if (nameCode.length === 3) {
        console.log('Ok');
    } else {
        for (let k = 0; k < name.length; k++) {
            if (nameCode.length < 3) {
                // in questo caso inizio a prendere le vocali
                if (consonant.indexOf(name[k]) === -1) {
                    nameCode.push(name[k]);
                }
            }
        }
    }
    return nameCode;
}
// --------------- //
function calculateYear(year) {
    let yearCode = [];
    // console.log(year[year.length - 2] + year[year.length - 1]) // => questo metodo funziona
    // inizializzo a 1 così mi sono più semplici i calcoli e lo decremento per prendere prima il PENultimo numero dell'anno
    for (let i = 2; i > 0; i--) {
        yearCode.push(year[year.length - i]);
    }
    // console.log(yearCode);
    return yearCode;
}
// --------------- //
function calculateMonth(month) {
    let monthCode = [];
    // piccolo controllo
    if (month === 'null-month') {
        alert('Mese non valido. Riprova!');
    }

    // uso uno switch per assegnare tutte le lettere
    switch (month) {
        case 'gen':
            monthChar = 'A';
            break;
        case 'feb':
            monthChar = 'B';
            break;
        case 'mar':
            monthChar = 'C';
            break;
        case 'apr':
            monthChar = 'D';
            break;
        case 'mag':
            monthChar = 'E';
            break;
        case 'giu':
            monthChar = 'H';
            break;
        case 'lug':
            monthChar = 'L';
            break;
        case 'ago':
            monthChar = 'M';
            break;
        case 'set':
            monthChar = 'P';
            break;
        case 'ott':
            monthChar = 'R';
            break;
        case 'nov':
            monthChar = 'S';
            break;
        case 'dic':
            monthChar = 'T';
            break; 
        default:
            alert('Errore nell\ assegnazione del codice per il mese!')
            break;
    }
    // pusho il codice
    monthCode.push(monthChar);

    // console.log(monthCode);
    return monthCode;
}