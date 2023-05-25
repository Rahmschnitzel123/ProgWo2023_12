import {processMapData as getData} from './chart.model.js';

async function processMapData(request, response) {
    const datasets = await getData();
    response.json(datasets);

}

export {processMapData};
