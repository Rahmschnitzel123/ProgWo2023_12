// Deklaration der globalen Variablen für die Daten
let datapie = [];
let dataLine = [];

// Funktion zum Abrufen der Daten
getData();

function getData() {
    // HTTP-Anfragen an die verschiedenen API-Endpunkte
    const getMapData = axios.get('/api/mapData');
    const getYearData = axios.get('/api/yearData');
    const getCountyData = axios.get('/api/countyData');
    const getCompareData = axios.get('/api/compareData');

    // Verarbeitung der Daten nach dem erfolgreichen Abrufen
    getMapData.then((response) => (injectMap(response.data))); // Karten-Daten verarbeiten
    getYearData.then((response) => bar(response.data)); // Balken-Diagramm-Daten verarbeiten
    getCountyData.then((response) => pie(response.data)); // Torten-Diagramm-Daten verarbeiten
    getCompareData.then((response) => line(response.data)); // Linien-Diagramm-Daten verarbeiten

}

// Funktion zum Einfügen der Karten-Daten
async function injectMap(data) {
    const mapData = data;
    SVGInject.setOptions({makeIdsUnique: false});
    const elMapTg = document.getElementById('tg-map');
    await SVGInject(elMapTg);
    const elG = document.querySelector('g[id=municipalities]'); // Elternelement 'g' auswählen
    const elPaths = elG.querySelectorAll('path');
    for (let i = 0; i < elPaths.length; i++) {
        const elPath = elPaths[i];

        elPath.addEventListener('mouseover', (event) => {
            let correctData = [];
            for (let i = 0; i < mapData.length; i++) {
                if (mapData[i].bfs_nr === elPath.id) {
                    correctData.push(mapData[i].gemeinde_name);
                    correctData.push(mapData[i].bfs_nr);
                    correctData.push(mapData[i].votes);
                }
            }
            const elTooltip = document.getElementById('tooltip-map');
            elTooltip.hidden = false;
            elTooltip.innerHTML = 'Gemeindename: ' + correctData[0] + '<br>' + 'Gemeindenummer: ' + correctData[1] + '<br>' + 'Anzahl Stimmen: ' + correctData[2]; // Fügen Sie hier die entsprechenden OGD-Daten hinzu
            elTooltip.style.top = `${event.pageY}px`;
            elTooltip.style.left = `${event.pageX}px`;
        });

        elPath.addEventListener('mouseout', () => {
            const elTooltip = document.getElementById('tooltip-map');
            elTooltip.hidden = true;
        });

        elPath.addEventListener('click', () => {
            const getClickedCounty = document.getElementById('tooltip-map').textContent
            const gemeindenameRegex = /Gemeindename: (.+?)(?=Gemeindenummer:|$)/; // Aktualisierter regulärer Ausdruck
            const match = getClickedCounty.match(gemeindenameRegex);
            let gemeindename = "";
            if (match && match.length > 1) {
                gemeindename = match[1];
            }
            const elGetListName = document.querySelectorAll('.gemeinden-liste ul li');
            for (let j = 0; j < elGetListName.length; j++) {
                if (elGetListName[j].textContent === gemeindename) {
                    elGetListName[j].classList.add('clicked');
                    const listItemHeight = elGetListName[j].offsetHeight;
                    const targetScrollPosition = j * listItemHeight;
                    const listContainer = document.querySelector('.gemeinden-liste');
                    listContainer.scrollTop = targetScrollPosition;
                } else {
                    elGetListName[j].classList.remove('clicked');
                }
            }

            updatepie();

            const targetElement = document.querySelector('#pieChart');
            targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// Funktion zum Erstellen des Balken-Diagramms
function bar(data) {
    // Die Funktion 'getMostRecentData' ermittelt die Daten des neuesten Jahres.
    const getMostRecentData = data.reduce((prev, current) => {
        return (current.year > prev.year) ? current : prev;
    });

    // Die Werte der Parteien werden in ein Array 'chartValues' gespeichert.
    let chartValues = [];
    for (let i = 0; i < getMostRecentData.parties.length; i++) {
        chartValues.push(getMostRecentData.parties[i].votes)
    }

    // Weitere Variablen werden definiert: 'label1', 'maxValue' und 'chartobj'.
    let label1 = "Anzahl";
    let maxValue = 500000;
    let chartobj = document.getElementById('barChart')

    // Ein neues Chart-Objekt 'barChart' wird erstellt und mit den entsprechenden Konfigurationen initialisiert.
    let barChart = new Chart(chartobj, {
        type: 'bar',
        data: {
            labels: ["SVP", "FDP", "CVP", "SP", "GP", "GLP", "EVP", "EDU", "BDP", "Übrige"],
            datasets: [{
                label: label1,
                data: chartValues,
                backgroundColor: ["green", "blue", "orange", "red", "lightgreen", "yellow", "brown", "purple", "gray", "lightgray"],
                borderColor: [
                    'rgb(157,231,25)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)',
                    'rgb(201, 203, 207)',
                    'rgb(211,34,34)'
                ],
                borderWidth: 2
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: maxValue,
                }
            },
        }
    });

    // Eventlistener für Änderungen des ausgewählten Jahres werden hinzugefügt.
    const elGetSelectedYear = document.getElementById('columnYear');
    elGetSelectedYear.addEventListener('change', (event) => {
        const selectedYear = event.target.value;
        const newData = [];

        // Neue Daten werden für das ausgewählte Jahr ermittelt und in 'newData' gespeichert.
        for (const partiesAtYear of data) {
            if (partiesAtYear.year === selectedYear) {
                for (let i = 0; i < partiesAtYear.parties.length; i++) {
                    newData.push(partiesAtYear.parties[i].votes)
                }
            }
        }

        // Die Daten des Balkendiagramms werden aktualisiert.
        updateDataBar(barChart, newData);
    });
}

// Die Funktion 'updateDataBar' aktualisiert die Daten des Balkendiagramms.
function updateDataBar(chart, values) {
    chart.data.datasets[0].data = values;
    chart.update();
}

// Die Funktion 'pie' erstellt ein.


// Funktion zur Erstellung des Pie-Charts
async function pie(data) {
    // Funktion aufrufen, um die Liste der Gemeinden zu erstellen und anzuzeigen
    await searchList(data);
    // Funktion aufrufen, um das Verhalten der Gemeindeliste bei Änderungen zu definieren
    await searchListChange();
    // Daten für das Pie-Chart speichern
    datapie = data;
    // Daten für das Chart-Objekt abrufen
    const chartValue = await getDatapie(data);
    // Chart-Element im DOM finden
    let chartobj = document.getElementById('pieChart');
    // Pie-Chart mit den Daten und Optionen erstellen
    let pieChart = new Chart(chartobj, {
        type: 'pie',
        data: {
            labels: ["SVP", "FDP", "CVP", "SP", "GP", "GLP", "EVP", "EDU", "BDP", "Übrige"],
            datasets: [{
                label: 'Anzahl',
                data: chartValue,
                backgroundColor: ["green", "blue", "orange", "red", "lightgreen", "yellow", "brown", "purple", "gray", "lightgray"],
            }]
        },
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                        // Benutzerdefinierte Formatierung der Tooltip-Labels
                        label: function (context) {
                            let value = context.parsed;
                            let sum = 0;
                            for (let i = 0; i < context.dataset.data.length; i++) {
                                sum += context.dataset.data[i];
                            }
                            let ratio = value / sum * 100;
                            return [" Anzahl: " + value, " Anteil: " + ratio.toFixed(1) + "%"];
                        }
                    }
                },
                // Legende ausblenden
                legend: {
                    display: false,
                }
            },
            responsive: true,
            maintainAspectRatio: false,
        }
    });
}

// Funktion zum Abrufen der Daten für das Pie-Chart
function getDatapie(data) {
    // Ausgewähltes Jahr auswählen
    const getSelectedYear = document.querySelector('#pieYear option[selected]');
    const getYear = getSelectedYear.textContent;
    // Ausgewählte Gemeinde auswählen
    const getClickedCounty = document.querySelector('ul li[class=clicked]');
    const countyValues = [];
    // Daten für das ausgewählte Jahr und die ausgewählte Gemeinde durchsuchen
    for (let i = 0; i < data.length; i++) {
        if (data[i].year === getYear) {
            const getCountys = data[i].countys;
            for (let j = 0; j < getCountys.length; j++) {
                if (getCountys[j].gemeinde_name === getClickedCounty.textContent) {
                    countyValues.push(getCountys[j].svp)
                    countyValues.push(getCountys[j].fdp)
                    countyValues.push(getCountys[j].cvp)
                    countyValues.push(getCountys[j].sp)
                    countyValues.push(getCountys[j].gp)
                    countyValues.push(getCountys[j].glp)
                    countyValues.push(getCountys[j].evp)
                    countyValues.push(getCountys[j].edu)
                    countyValues.push(getCountys[j].bdp)
                    countyValues.push(getCountys[j].uebrige)
                }
            }
        }
    }
    return countyValues;
}

// Funktion zum Erstellen und Filtern der Gemeindeliste
function searchList(data) {
    let everyCounty = [];
    const countys = data[0].countys;
    let listOfCounties = [];
    // Liste aller Gemeinden erstellen
    for (let i = 0; i < countys.length; i++) {
        listOfCounties.push(countys[i].gemeinde_name)
    }
    // Eindeutige Gemeinden ermitteln und sortieren
    everyCounty = [...new Set(listOfCounties)];
    const sortedEveryCounty = everyCounty.sort((a, b) => a.localeCompare(b));
    const getListCounty = document.querySelector('ul');
    // Gemeinden zur Liste hinzufügen
    for (let i = 0; i < sortedEveryCounty.length; i++) {
        const createList = document.createElement('li');
        getListCounty.appendChild(createList);
        createList.textContent = sortedEveryCounty[i];
    }

    const listItems = document.querySelectorAll('.gemeinden-liste li');
    // Eventlistener für den Klick auf eine Gemeinde hinzufügen
    for (let i = 0; i < listItems.length; i++) {
        listItems[i].addEventListener("click", (event) => {
            const listItem = event.target;
            // Klassen der Gemeinden zurücksetzen und aktuell ausgewählte Gemeinde markieren
            for (let j = 0; j < listItems.length; j++) {
                listItems[j].classList.remove('clicked');
            }
            listItem.classList.add('clicked')
        })
    }
    addingFilter();
    // Erste Gemeinde als ausgewählt markieren
    const getFirstCounty = document.querySelector('ul li');
    getFirstCounty.classList.add('clicked');
}

// Funktion zur Aktualisierung der Gemeindeliste bei Änderungen
function searchListChange() {
    const elAllListCounty = document.querySelectorAll('ul li');
    const elListYears = document.querySelector('select[id=pieYear]')
    // Eventlistener für den Klick auf eine Gemeinde hinzufügen
    for (let i = 0; i < elAllListCounty.length; i++) {
        elAllListCounty[i].addEventListener('click',
            () => {
                updatepie();
            })
    }
    // Eventlistener für die Änderung des Jahres hinzufügen
    elListYears.addEventListener('change', (event) => {
        updatepie()
    });
}

// Funktion zum Aktualisieren des Pie-Charts
function updatepie() {
    // Ausgewählte Gemeinde und Jahr abrufen
    const elListCounty = document.querySelector('ul li[class=clicked]').textContent;
    const selectElement = document.querySelector("#pieYear");
    const selectedYear = selectElement.value;

    const chartInstance = Chart.getChart("pieChart");
    // Daten des Charts zurücksetzen
    chartInstance.data.datasets[0].data = [];
    chartInstance.update();
    const countyValues = [];
    // Daten für die ausgewählte Gemeinde und Jahr durchsuchen
    for (let i = 0; i < datapie.length; i++) {
        if (datapie[i].year === selectedYear) {
            const getCountys = datapie[i].countys;
            for (let j = 0; j < getCountys.length; j++) {
                if (getCountys[j].gemeinde_name === elListCounty) {
                    countyValues.push(getCountys[j].svp)
                    countyValues.push(getCountys[j].fdp)
                    countyValues.push(getCountys[j].cvp)
                    countyValues.push(getCountys[j].sp)
                    countyValues.push(getCountys[j].gp)
                    countyValues.push(getCountys[j].glp)
                    countyValues.push(getCountys[j].evp)
                    countyValues.push(getCountys[j].edu)
                    countyValues.push(getCountys[j].bdp)
                    countyValues.push(getCountys[j].uebrige)
                }
            }
        }
    }
    // Daten des Charts mit den neuen Werten aktualisieren
    chartInstance.data.datasets[0].data = countyValues;
    chartInstance.update();
}

// Funktion zum Hinzufügen eines Filters zur Gemeindeliste
function addingFilter() {
    const listItems = document.querySelectorAll('.gemeinden-liste li');
    const searchInput = document.getElementById('searchInput');
    // Eventlistener für die Eingabe im Suchfeld hinzufügen
    searchInput.addEventListener('input', filterList);

    function filterList() {
        const searchTerm = searchInput.value.toLowerCase();
        // Gemeinden entsprechend des Suchbegriffs filtern
        listItems.forEach((item) => {
            const listItemText = item.textContent.toLowerCase();
            if (listItemText.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
}

// Funktion "line" zur Erstellung des Line-Charts
async function line(data) {
    // Zurücksetzen der Dropdown-Optionen und des DataLine-Datensatzes
    dropChangeRes();
    dataLine = data;
    // Abrufen der Chart-Werte über die Funktion "getDataCompare" und Warten auf das Ergebnis
    const chartValue = await getDataCompare(data);
    // Festlegen des Maximalwerts für die y-Achse des Charts
    let maxValue = 500000
    // Abrufen des Chart-Elements und Erstellen einer neuen Chart-Instanz
    let chartobj = document.getElementById('lineChart')
    let lineChart = new Chart(chartobj, {
        type: 'line',
        data: {
            labels: [2008, 2012, 2016, 2020],
            datasets: [{
                data: chartValue[0]
            }, {
                data: chartValue[1]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: maxValue,
                }
            },
            plugins: {
                legend: {
                    display: false,
                }
            },
        }
    });
}

// Funktion zum Aktualisieren des Line-Charts bei Dropdown-Änderungen
function dropChangeRes() {
    // Abrufen der Dropdown-Elemente
    const drop1 = document.querySelector('.lineChartDrop1');
    const drop2 = document.querySelector('.lineChartDrop2');

    // Event Listener für Änderungen an Dropdown 1
    drop1.addEventListener('change', function () {
        // Deaktivieren der ausgewählten Option in Dropdown 2 und Entfernen der Klasse 'clickedLine' von allen Optionen
        drop2.querySelectorAll('option').forEach(option => {
            option.disabled = (option.value === this.value);
            option.classList.remove('clickedLine')
        });
        // Aktualisieren des Line-Charts
        updateLineChart();
    });

    // Event Listener für Änderungen an Dropdown 2
    drop2.addEventListener('change', function () {
        // Deaktivieren der ausgewählten Option in Dropdown 1 und Entfernen der Klasse 'clickedLine' von allen Optionen
        drop1.querySelectorAll('option').forEach(option => {
            option.disabled = (option.value === this.value);
            option.classList.remove('clickedLine')
        });
        // Aktualisieren des Line-Charts
        updateLineChart();
    });
}

// Funktion zum Abrufen der Stimmen für die ausgewählten Parteien
function getVotesForSelectedParties(data, selectedParties) {
    // Leere Arrays für die Stimmen der beiden Parteien
    let votesParty1 = [];
    let votesParty2 = [];

    // Durchlaufen der Daten und Parteien
    for (let i = 0; i < data.length; i++) {
        const yearData = data[i].parties;

        for (let j = 0; j < yearData.length; j++) {
            // Überprüfen, ob die Partei mit ausgewählten Parteien übereinstimmt und Stimmen hinzufügen
            if (yearData[j].name === selectedParties[0]) {
                votesParty1.push(yearData[j].votes);
            }

            if (yearData[j].name === selectedParties[1]) {
                votesParty2.push(yearData[j].votes);
            }
        }
    }

    return [votesParty1, votesParty2];
}

// Funktion zum Aktualisieren des Line-Charts mit den ausgewählten Parteien
function updateLineChart() {
    // Abrufen der ausgewählten Parteien
    const selectedParties = getSelectedPartiesLineChart();
    // Abrufen der Stimmen für die ausgewählten Parteien
    const [votesParty1, votesParty2] = getVotesForSelectedParties(dataLine, selectedParties);

    // Abrufen der Chart-Instanz und Aktualisieren der Daten für die beiden Datasets
    const chartInstance = Chart.getChart("lineChart");
    chartInstance.data.datasets[0].data = votesParty1;
    chartInstance.data.datasets[1].data = votesParty2;
    chartInstance.update();
}

// Funktion zum Abrufen der Daten für den Vergleich
function getDataCompare(data) {
    // Abrufen der ausgewählten Parteien im Line-Chart
    const selectedParties = getSelectedPartiesLineChart();

    // Abrufen der Stimmen für die ausgewählten Parteien aus den übergebenen Daten
    const [votesParty1, votesParty2] = getVotesForSelectedParties(data, selectedParties);

    // Rückgabe der Stimmen als Array
    return [votesParty1, votesParty2];
}


// Funktion zum Abrufen der ausgewählten Parteien im Line-Chart
function getSelectedPartiesLineChart() {
    // Abrufen der ausgewählten Optionen in den Dropdowns
    const elGetSelectedParty1 = document.querySelector('.lineChartDrop1 option:checked');
    const elGetSelectedParty2 = document.querySelector('.lineChartDrop2 option:checked');
    let getNameParty1 = elGetSelectedParty1.textContent.toLowerCase()
    let getNameParty2 = elGetSelectedParty2.textContent.toLowerCase()

    // Ersetzen des Buchstabens 'ü' durch 'ue', falls vorhanden
    if (getNameParty1.includes('ü')) {
        getNameParty1 = getNameParty1.replace(/ü/g, 'ue');
    }
    if (getNameParty2.includes('ü')) {
        getNameParty2 = getNameParty2.replace(/ü/g, 'ue');
    }

    // Rückgabe der ausgewählten Parteinamen als Array
    const values = [getNameParty1, getNameParty2]
    return values;
}





