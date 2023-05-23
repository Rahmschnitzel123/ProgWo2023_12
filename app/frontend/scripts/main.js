SVGInject.setOptions({makeIdsUnique: false});
const elMapTg = document.getElementById('tg-map');
SVGInject(elMapTg);

let apidata = axios.get("https://data.tg.ch/api/v2/catalog/datasets/sk-stat-10/exports/json").then(makeChart)

function makeChart() {
    let label1 = 'joe'
    let label2 = 'who'
    let chartobj = document.getElementById(lineChart)
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
