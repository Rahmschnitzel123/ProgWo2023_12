const axios = require('axios')

axios.get("https://data.tg.ch/api/v2/catalog/datasets/sk-stat-10/exports/json").then(res => processCompareData(res.data))


function processCompareData(data){

    let processedData = []



    return processedData;
}

// DATA_FORMAT
/*
year:
parties: {[
{party: , votes:}
]}
 */