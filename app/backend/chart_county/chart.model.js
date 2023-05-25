const axios = require('axios')
const {json} = require("express");

axios.get("https://data.tg.ch/api/v2/catalog/datasets/sk-stat-10/exports/json").then(res => processCountyData(res.data))


function processCountyData(data) {
    let parties = ['svp', 'fdp', 'cvp', 'sp', 'gp', 'glp', 'evp', 'edu', 'bdp', 'uebrige']
    let totalVotes = 0
    let bfs = undefined
    let processedData = []
    let years = ['2008', '2012', '2016', '2020']
    let dataToPush = []
    for (let year of years){
    let datayear = data.filter(obj => obj.wahljahr == year)
    for (let entry of datayear) {
        for (let party of parties) {
            totalVotes += entry[party]
        }
        bfs = entry.bfs_nr_gemeinde
        dataToPush.push({bfs_nr: bfs, votes: totalVotes})
        processedData.push({year: year, countys: dataToPush})
        totalVotes = 0
        bfs = undefined

    }
}
    //console.log(JSON.stringify(processedData))
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