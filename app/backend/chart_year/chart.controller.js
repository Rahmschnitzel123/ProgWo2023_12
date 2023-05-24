import { processYearData } from './chart.model.js';

async function processYearData(request, response) {
    const datasets = await processYearData();
    response.json(datasets);

    export { processYearData };
}