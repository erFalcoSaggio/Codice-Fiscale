// © Falcari Alessandro 2024

// array consonanti
const consonant = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];
// array tutte le lettere
const allLetters = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
    'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];
// array i valori per lettere nel Check Digit
const lettersValues = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26
];

// funzione per l'anno bisestile
function annoBisesto(year) {
    if (year % 4 === 0) {
      if (year % 100 === 0) {
        if (year % 400 === 0) {
          return true; // bisestile
        } else {
          return false; // non bisestile
        }
      } else {
        return true;
      }
    } else {
      return false;
    }
}
// funzione principale
function calculate(event) {
    event.preventDefault(); // non riaggiorno la pagina

    let lastName = document.getElementById('last-name').value;
    let name = document.getElementById('name').value;
    let day = document.getElementById('day').value;
    let month = document.getElementById('month').value;
    let year = document.getElementById('year').value;
    let sex = document.getElementById('sex').value;
    let bornPlace = document.getElementById('born-place').value;

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

        // giorno di nascita (serve anche il sesso e il mese e anno per calcolare gli anni bisestili)
        let dayCode = calculateDay(day, sex, month, year);
        console.log(dayCode);

    // qua per la funzione del comune (ne ho messi solo alcuni)
    let bornPlaceCode = calculateBornPlace(bornPlace);
    console.log(bornPlaceCode);

    // unisco tutto
    let allCodes = [...lastNameCode, ...nameCode, ...yearCode, ...monthCode, ...dayCode, ...bornPlaceCode].join('');
    console.log(allCodes);
    
    // ultimo passaggio ==> check digit
    let checkDigitCode = checkDigit(allCodes);
    console.log(checkDigitCode);

    // unione finale (scrivo il nome in italiano perchè mi piace così)
    let codiceFiscale = [...allCodes, ...checkDigitCode].join('');
    console.log(codiceFiscale)

    document.getElementById('ris').innerText = codiceFiscale;
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
        return;
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
// --------------- //
function calculateDay(day, sex, month, year) {
    let dayCode = [];
    // piccolo controllo
    if (day === 'null-day') {
        alert('Giorno non valido. Riprova!');
        return;
    }
   
    // faccio tutti i controlli per i vari mesi (parto da quelli con 30 giorni)
    if (month === 'apr' || month === 'giu' || month === 'set' || month === 'nov') {
        // non possono avere più di 30 giorni (escluso)
        if (day > 30) {
            alert(`Non esistono ${day} giorni a ${month}`);
            return;
        }
    }
    // ora per febbraio
    if (month === 'feb') {
        let annoBisestoValue = annoBisesto(year);
        // automaticamente controlla se è vero
        if (annoBisestoValue) {
            // controlla che siano massimo 29 giorni
            if (day > 29) {
                alert(`Non esistono ${day} giorni a ${month} nel ${year}`); // piccolo alert di errore per far capire (spero)
                return;
            }
        } 
        // anno non bisestile
        else {
            if (day > 28) {
                alert(`Non esistono ${day} giorni a ${month} nel ${year}`); // piccolo alert di errore per far capire (spero)
                return;
            }
        }
    }

    // parseInto il valore, lo rendo numero
    // ora parto a controllare il sesso
    if (sex === 'male') {
        for (let i = 0; i < day.length; i++) {
            dayCode.push(day[i]);
        }
    }

    // il sesso è femmina
    else {
        day = parseInt(day);
        day += 40;
        // console.log(day);
        day = day.toString(); // => rimetto in stringa
        for (let j = 0; j < day.length; j++) {
            dayCode.push(day[j]);
        }   
    }  
    // console.log(dayCode) 
    return dayCode;
}
// --------------- //
function calculateBornPlace(bornPlace) {
    let bornPlaceCode = [];
    let placeCode;
    
    // faccio uno switch
    switch (bornPlace) {
        case 'VR':
            placeCode = 'L781';
            break;
        case 'VV':
            placeCode = 'F537';
            break;
        case 'VI':
            placeCode = 'L840';
            break;
        case 'VT':
            placeCode = 'M082';
            break;
        default:
            alert('Errore nel calcolo del codice per il comune!');
            return;
    }

    // verifico che un placeCode esista
    if (placeCode) {
        for (let i = 0; i < placeCode.length; i++) {
            bornPlaceCode.push(placeCode[i]);
        }
    }
    // console.log(bornPlaceCode);
    return bornPlaceCode;
}
// --------------- //
function checkDigit(allCodes) {
    // Tabelle di conversione
    const tabellaC = {
        'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8, 'J': 9,
        'K': 10, 'L': 11, 'M': 12, 'N': 13, 'O': 14, 'P': 15, 'Q': 16, 'R': 17, 'S': 18,
        'T': 19, 'U': 20, 'V': 21, 'W': 22, 'X': 23, 'Y': 24, 'Z': 25,
        '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9
    };
    
    const tabellaD = {
        'A': 1, 'B': 0, 'C': 5, 'D': 7, 'E': 9, 'F': 13, 'G': 15, 'H': 17, 'I': 19, 'J': 21,
        'K': 2, 'L': 4, 'M': 18, 'N': 20, 'O': 11, 'P': 3, 'Q': 6, 'R': 8, 'S': 12, 'T': 14,
        'U': 16, 'V': 10, 'W': 22, 'X': 25, 'Y': 24, 'Z': 23,
        '0': 1, '1': 0, '2': 5, '3': 7, '4': 9, '5': 13, '6': 15, '7': 17, '8': 19, '9': 21
    };
    
    const tabellaE = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    // Somma ponderata dei caratteri
    let somma = 0;

    // Elaborazione dei primi 15 caratteri
    for (let i = 0; i < 15; i++) {
        let char = allCodes[i];
        if (i % 2 === 0) { // Posizioni dispari (1, 3, 5, ..., 15)
            somma += tabellaD[char];
        } else { // Posizioni pari (2, 4, 6, ..., 14)
            somma += tabellaC[char];
        }
    }

    // Calcolo del resto della divisione per 26
    let resto = somma % 26;

    // Restituzione del carattere di controllo
    // console.log(tabellaE[resto]); ==> teoricamente funziona
    checkDigitCode = tabellaE[resto];

    return checkDigitCode;
}
