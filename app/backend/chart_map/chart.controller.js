import { processMapData } from './chart.model.js';

async function processMapData(request, response) {
    const datasets = await processMapData();
    response.json(datasets);

    export { processMapData };
}