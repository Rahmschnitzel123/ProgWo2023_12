SVGInject.setOptions({makeIdsUnique: false});
const elMapTg = document.getElementById('tg-map');
SVGInject(elMapTg);

makeCharts()
function makeCharts() {
    line()
    bar()
    doughnut()
}

function line() {
    let label1 = 'joe'
    let label2 = 'who'
    let chartobj = document.getElementById('lineChart')
    let lineChart = new Chart(chartobj, {
        type: 'line',
        data: {
            labels: [1, 2, 3, 4, 5],
            datasets: [{
                label: label1,
                data: [1, 2, 3, 5, 6]
            },{
                label: label2,
                data: [5, 3, 7, 5, 9]
            }]
        }

    });
}

function bar() {
    let label1 = 'joe'
    let label2 = 'who'
    let chartobj = document.getElementById('barChart')
    let lineChart = new Chart(chartobj, {
        type: 'bar',
        data: {
            labels: [1, 2, 3, 4, 5],
            datasets: [{
                label: label1,
                data: [1, 2, 3, 5, 6]
            },{
                label: label2,
                data: [5, 3, 7, 5, 9]
            }]
        }

    });
}

function doughnut() {

    let label1 = 'joe'
    let label2 = 'who'
    let chartobj = document.getElementById('doughnutChart')
    let lineChart = new Chart(chartobj, {
        type: 'doughnut',
        data: {
            labels: [
                'Red',
                'Blue',
                'Yellow'
            ],
            datasets: [{
                label: 'My First Dataset',
                data: [300, 50, 100],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
            }]
        }

    });
}


