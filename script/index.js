function calcola(event) {
    event.preventDefault(); // non riaggiorno la pagina
    // array consonanti
    const consonant = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];

    let lastName = document.getElementById('last-name').value;
    let name = document.getElementById('name').value;
    let day = document.getElementById('day').value;
    let month = document.getElementById('month').value;
    let year = document.getElementById('year').value;
    let sex = document.getElementById('sex').value;
    let bornPlace = document.getElementById('born-place')

    // verifichiamo si veda tutto correttamente
    console.log(`${lastName} ${name} ${day} ${month} ${year} ${sex} ${bornPlace}`)

}