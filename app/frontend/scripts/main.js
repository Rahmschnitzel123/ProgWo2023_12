SVGInject.setOptions({makeIdsUnique: false});
const elMapTg = document.getElementById('tg-map');
SVGInject(elMapTg);

makeCharts()

function makeCharts() {
    line()
    bar()
    doughnut()
}


function bar() {
    let label1 = "Anzahl";

    <!-- Maximaler Wert muss angepasst werden -->
    let maxValue = 200000;
    let barData = [123423, 22423, 32454, 23424, 54433, 62687, 74565, 83453, 90010]
    let chartobj = document.getElementById('barChart')
    let barChart = new Chart(chartobj, {
        type: 'bar',
        data: {
            labels: ["SVP", "FDP", "CVP", "SP", "GP", "GLP", "EVP", "EDU", "BDP"],
            datasets: [{
                label: label1,
                data: barData,
                backgroundColor: ["green", "blue", "orange", "red", "lightgreen", "yellow", "brown", "purple", "gray"],
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
}

function doughnut() {

    let doughnutData = [123423, 22423, 32454, 23424, 54433, 62687, 74565, 83453, 90010]
    let chartobj = document.getElementById('doughnutChart')
    let doughnutChart = new Chart(chartobj, {
        type: 'doughnut',
        data: {
            labels: ["SVP", "FDP", "CVP", "SP", "GP", "GLP", "EVP", "EDU", "BDP"],
            datasets: [{
                label: 'Anzahl',
                data: doughnutData,
                backgroundColor: ["green", "blue", "orange", "red", "lightgreen", "yellow", "brown", "purple", "gray"],
            }]
        },
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
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
                }
            },
            responsive: true,
            maintainAspectRatio: false,
        }
    });
}

function line() {
    <!-- Maximaler Wert muss angepasst werden -->
    let maxValue = 100000
    let chartobj = document.getElementById('lineChart')
    let lineChart = new Chart(chartobj, {
        type: 'line',
        data: {
            labels: [2008, 2012, 2016, 2020],
            datasets: [{
                data: [12343, 3231, 24233, 2325]
            }, {
                data: [42343, 40000, 94233, 23245]
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

// Event-Listener für das mouseover Event
elMapTg.addEventListener('mouseover', handleMouseOver);

// Event-Listener für das mouseout Event
elMapTg.addEventListener('mouseout', handleMouseOut);

// Callback-Funktion für das mouseover Event
function handleMouseOver(event) {
    // Gemeindedaten aus OGD abrufen (Beispiel)
    const gemeindeData = getGemeindeData(event.target.id); // Hier musst du deine eigene Logik für den Abruf der OGD-Daten einfügen

    // Tooltip anzeigen und OGD-Daten hinzufügen
    showTooltip(event.target, gemeindeData);
}

// Callback-Funktion für das mouseout Event
function handleMouseOut(event) {
    // Tooltip ausblenden
    hideTooltip(event.target);
}

// Funktion zum Anzeigen des Tooltips und Hinzufügen der OGD-Daten
function showTooltip(target, gemeindeData) {
    // Tooltip-Element erstellen (Beispiel)
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.textContent = gemeindeData; // Hier musst du die entsprechenden OGD-Daten in den Tooltip einfügen

    // Tooltip-Element dem DOM hinzufügen (Beispiel)
    document.body.appendChild(tooltip);

    // Position des Tooltips festlegen (Beispiel)
    const rect = target.getBoundingClientRect();
    tooltip.style.top = rect.top + 'px';
    tooltip.style.left = rect.left + 'px';
}

// Funktion zum Ausblenden des Tooltips
function hideTooltip(target) {
    // Tooltip-Element aus dem DOM entfernen (Beispiel)
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}






