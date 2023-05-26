import {processCompareData as getData} from './chart.model.js';

async function processCompareData(request, response) {
    const datasets = await getData();
    response.json(datasets);

}

export {processCompareData};
