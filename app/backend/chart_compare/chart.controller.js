import { processCompareData } from './chart.model.js';

async function processCompareData(request, response) {
    const datasets = await processCompareData();
    response.json(datasets);

    export { processCompareData };
}