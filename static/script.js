// Formu elementu iegūšana
const form = document.getElementById('tempForm');
const dateInput = document.getElementById('date');
const minTempInput = document.getElementById('min_temp');
const maxTempInput = document.getElementById('max_temp');
const tableBody = document.querySelector('#dataTable tbody');
const avgTempDisplay = document.getElementById('avgTemp');

// Es izmantoju masīvu, lai saglabātu visus ierakstītos temperatūras datus
let temperatures = [];

// Pievieno notikumu apstrādātāju, lai pievienotu datus tabulai
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Novērst lapas pārlādi

    // Vērtību iegūšana no veidlapas
    const date = dateInput.value;
    const minTemp = parseFloat(minTempInput.value);
    const maxTemp = parseFloat(maxTempInput.value);

    // Pārbaudām, vai ievades vērtības ir pareizas
    if (!date || isNaN(minTemp) || isNaN(maxTemp) || minTemp > maxTemp) {
        alert('Lūdzu, aizpildiet visus laukus ar pareizām vērtībām!');
        return;
    }

    // Aprēķinām vidējo temperatūru
    const avgTemp = ((minTemp + maxTemp) / 2).toFixed(1);

    // Saglabāju temperatūras datus masīvā
    temperatures.push({ minTemp, maxTemp, avgTemp: parseFloat(avgTemp) });

    // Izveidoju jaunu tabulas rindu
    const newRow = document.createElement('tr');

    // Pievienoju datus tabulas rindā
    newRow.innerHTML = `
        <td>${date}</td>
        <td>${minTemp} °C</td>
        <td>${maxTemp} °C</td>
        <td><i>${avgTemp} °C</i></td>
    `;

    // Pievienoju rindu tabulai
    tableBody.appendChild(newRow);

    // Aprēķinu vidējo temperatūru visām dienām
    calculateOverallAvgTemp();

    // Notīru veidlapu pēc datu pievienošanas
    form.reset();
});

// Funkcija, kas aprēķina un atjaunina vidējo temperatūru visām dienām
function calculateOverallAvgTemp() {
    if (temperatures.length === 0) {
        avgTempDisplay.textContent = 'Vidējā temperatūra visām dienām: N/A';
        return;
    }

    // Aprēķinu vidējo temperatūru visām dienām
    const totalAvgTemp = temperatures.reduce((acc, temp) => acc + temp.avgTemp, 0);
    const overallAvgTemp = (totalAvgTemp / temperatures.length).toFixed(1);

    // Atjauno vidējo temperatūru ekrānā
    avgTempDisplay.textContent = `Vidējā temperatūra visām dienām: ${overallAvgTemp} °C`;
}
