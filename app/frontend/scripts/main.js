let dataDoughnut = [];

getData();

function getData() {
    const getMapData = axios.get('/api/mapData')
    const getYearData = axios.get('/api/yearData')
    const getCountyData = axios.get('/api/countyData')
    const getCompareData = axios.get('/api/compareData')

    getMapData.then((response) => (injectMap(response.data)));
    getYearData.then((response) => bar(response.data));
    getCountyData.then((response) => doughnut(response.data));
    getCompareData.then((response) => line(response.data));
}

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
    }
}


function bar(data) {
    const getMostRecentData = data.reduce((prev, current) => {
        return (current.year > prev.year) ? current : prev;
    });
    let chartValues = [];
    for (let i = 0; i < getMostRecentData.parties.length; i++) {
        chartValues.push(getMostRecentData.parties[i].votes)
    }
    let label1 = "Anzahl";
    let maxValue = 500000;
    let chartobj = document.getElementById('barChart')
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
    const elGetSelectedYear = document.getElementById('columnYear');
    elGetSelectedYear.addEventListener('change', (event) => {
        const selectedYear = event.target.value;
        const newData = [];
        for (const partiesAtYear of data) {
            if (partiesAtYear.year === selectedYear) {
                for (let i = 0; i < partiesAtYear.parties.length; i++) {
                    newData.push(partiesAtYear.parties[i].votes)
                }
            }
        }
        updateDataBar(barChart, newData);
    });

}

function updateDataBar(chart, values) {
    chart.data.datasets[0].data = values;
    chart.update();
}

async function doughnut(data) {
    await searchList(data);
    await searchListChange();
    dataDoughnut = data;
    const chartValue = await getDataDoughnut(data);
    let chartobj = document.getElementById('doughnutChart')
    let doughnutChart = new Chart(chartobj, {
        type: 'doughnut',
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
                legend: {
                    display: false,
                }

            },
            responsive: true,
            maintainAspectRatio: false,
        }
    });
}

function getDataDoughnut(data) {
    const getSelectedYear = document.querySelector('#doughnutYear option[selected]')
    const getYear = getSelectedYear.textContent;
    const getClickedCounty = document.querySelector('ul li[class=clicked]');
    const countyValues = [];
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


function searchList(data) {
    let everyCounty = [];
    const countys = data[0].countys;
    let listOfCounties = [];
    for (let i = 0; i < countys.length; i++) {
        listOfCounties.push(countys[i].gemeinde_name)
    }
    everyCounty = [...new Set(listOfCounties)];
    const sortedEveryCounty = everyCounty.sort((a, b) => a.localeCompare(b));
    const getListCounty = document.querySelector('ul');
    for (let i = 0; i < sortedEveryCounty.length; i++) {
        const createList = document.createElement('li');
        getListCounty.appendChild(createList);
        createList.textContent = sortedEveryCounty[i];
    }


    const listItems = document.querySelectorAll('.gemeinden-liste li');
    for (let i = 0; i < listItems.length; i++) {
        listItems[i].addEventListener("click", (event) => {
            const listItem = event.target;
            for (let j = 0; j < listItems.length; j++) {
                listItems[j].classList.remove('clicked');
            }
            listItem.classList.add('clicked')
        })
    }
    addingFilter();
    const getFirstCounty = document.querySelector('ul li');
    getFirstCounty.classList.add('clicked');


}

function searchListChange() {
    const elAllListCounty = document.querySelectorAll('ul li');
    const elListYears = document.querySelector('select[id=doughnutYear]')
    for (let i = 0; i < elAllListCounty.length; i++) {
        elAllListCounty[i].addEventListener('click',
            () => {
                updateDoughnut();
            })
    }
    elListYears.addEventListener('change', (event) => {
        updateDoughnut()
    });
}

function updateDoughnut() {
    const elListCounty = document.querySelector('ul li[class=clicked]').textContent;
    const selectElement = document.querySelector("#doughnutYear");
    const selectedYear = selectElement.value;

    const chartInstance = Chart.getChart("doughnutChart");

    chartInstance.data.datasets[0].data = [];
    chartInstance.update();
    const countyValues = [];
    for (let i = 0; i < dataDoughnut.length; i++) {
        if (dataDoughnut[i].year === selectedYear) {
            const getCountys = dataDoughnut[i].countys;
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
    chartInstance.data.datasets[0].data = countyValues;
    chartInstance.update();
}

function addingFilter() {
    const listItems = document.querySelectorAll('.gemeinden-liste li');
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', filterList);

    function filterList() {
        const searchTerm = searchInput.value.toLowerCase();
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

async function line(data) {
    console.log(data)
    dropChangeRes();
    const chartValue = await getDataCompare(data);
    let maxValue = 100000
    let chartobj = document.getElementById('lineChart')
    let lineChart = new Chart(chartobj, {
        type: 'line',
        data: {
            labels: [2008, 2012, 2016, 2020],
            datasets: [{
                data: [2323]
            }, {
                data: [2323]
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

function dropChangeRes () {
    const drop1 = document.querySelector('.lineChartDrop1');
    const drop2 = document.querySelector('.lineChartDrop2');

    drop1.addEventListener('change', function() {
        drop2.querySelectorAll('option').forEach(option => {
            option.disabled = (option.value === this.value);
        });
    });

    drop2.addEventListener('change', function() {
        drop1.querySelectorAll('option').forEach(option => {
            option.disabled = (option.value === this.value);
        });
    });
}

function getDataCompare(data){
    const elGetSelectedParty1 = document.querySelector('.lineChartDrop1 option[selected]');
    const elGetSelectedParty2 = document.querySelector('.lineChartDrop2 option[selected]');
    const getNameParty1 = elGetSelectedParty1.textContent
    const getNameParty2 = elGetSelectedParty2.textContent
    let party = [];
    for (let i = 0; i < data.length; i++) {
        const yearData = data[i].parties;
        console.log(yearData)
        for (let j = 0; j < yearData; j++) {
            console.log(getNameParty1 + " " + yearData[j].name);
            if (yearData[j].name === getNameParty1);
            console.log("hlajs")
            party = yearData[j].name;
        }
    }
    console.log(party)
}





