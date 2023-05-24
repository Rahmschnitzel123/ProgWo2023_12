import { processCountyData } from './chart.model.js';

async function processCountyData(request, response) {
    const datasets = await processCountyData();
    response.json(datasets);

    export { processCountyData };
}