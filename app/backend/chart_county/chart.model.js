const axios = require('axios')
const {json} = require("express");

axios.get("https://data.tg.ch/api/v2/catalog/datasets/sk-stat-10/exports/json").then(res => processCountyData(res.data))


function processCountyData(data) {

}
    console.log(JSON.stringify(processedData))
    return processedData
}

// DATA_FORMAT
/*
{
    "year": "2020",
    "countys":
    [
    {
        "bfs_nr": "4551",
        "votes": 36765
    },{
        "bfs_nr": "4551",
        "votes": 36765
    }
    ]
    */