import router from '../../backend/chart_map/chart.routes'
import router from '../../backend/chart_map/chart.routes'
import router from '../../backend/chart_year/chart.routes'
import router from '../../backend/chart_county/chart.routes'


async function injectMap() {
    SVGInject.setOptions({ makeIdsUnique: false });
    const elMapTg = document.getElementById('tg-map');
    await SVGInject(elMapTg);
    const elG = document.querySelector('g[id=municipalities]'); // Elternelement 'g' auswählen
    const elPaths = elG.querySelectorAll('path');

    for (let i = 0; i < elPaths.length; i++) {
        const elPath = elPaths[i];

        elPath.addEventListener('mouseover', (event) => {
            const elTooltip = document.getElementById('tooltip-map');
            elTooltip.classList.remove('do-not-display');
            elTooltip.innerHTML = `Die id ist: ${elPath.id}`; // Fügen Sie hier die entsprechenden OGD-Daten hinzu
            elTooltip.style.top = `${event.pageY}px`;
            elTooltip.style.left = `${event.pageX}px`;
        });

        elPath.addEventListener('mouseout', () => {
            const elTooltip = document.getElementById('tooltip-map');
            elTooltip.classList.add('do-not-display');
        });
    }
}

async function callingFunction() {
    await injectMap();
}

callingFunction();
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





