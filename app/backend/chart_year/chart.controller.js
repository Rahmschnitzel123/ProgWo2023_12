import { processYearData as getData } from './chart.model.js';

async function processYearData(request, response) {
    const datasets = await getData();
    response.json(datasets);

}

export {processYearData};
