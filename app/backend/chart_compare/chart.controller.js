import { processCompareData } from './chart.model.js';

async function processCompareData(request, response) {
    const datasets = await functionFromModel();
    response.json(datasets);

    export { processCompareData };
}