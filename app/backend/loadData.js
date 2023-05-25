import axios from 'axios';
import {init as initChart} from "./chart_map/chart.model.js";

function loadAllData() {
    axios.get("https://data.tg.ch/api/v2/catalog/datasets/sk-stat-10/exports/json").then(res => res.data).then(data => {
        let parties = ['svp', 'fdp', 'cvp', 'sp', 'gp', 'glp', 'evp', 'edu', 'bdp', 'uebrige']
        let gemeinde_name = undefined
        let totalVotes = 0
        let bfs = undefined
        let processedData = []
        let datayear = data.filter(obj=>obj.wahljahr==2020)
        for (let entry of datayear){
            for (let party of parties){
                totalVotes += entry[party]
            }
            bfs = entry.bfs_nr_gemeinde
            gemeinde_name = entry.gemeinde_name
            processedData.push({gemeinde_name: gemeinde_name, bfs_nr: bfs, votes: totalVotes,})
            totalVotes = 0
            bfs = undefined

        }
        initChart(processedData)
        /*
    let parties = ['svp', 'fdp', 'cvp', 'sp', 'gp', 'glp', 'evp', 'edu', 'bdp', 'uebrige']
    let totalVotes = 0
    let bfs = undefined
    let processedData = []
    let years = ['2008', '2012', '2016', '2020']
    let dataToPush = []
    for (let year of years) {
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
    */
         
    });
}

export {loadAllData};