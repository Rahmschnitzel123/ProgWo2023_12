import {processCountyData as getData} from './chart.model.js';

async function processCountyData(request, response) {
    const datasets = await getData();
    response.json(datasets);

}

export {processCountyData};