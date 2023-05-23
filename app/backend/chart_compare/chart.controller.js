import { functionFromModel } from './pathToModel';

async function functionInModel(request, response) {
    const datasets = await functionFromModel();
    response.json(datasets);

    export { functionInModel };
}