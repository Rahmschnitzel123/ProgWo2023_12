import axios from "axios";
import {init as initChartMap} from "./chart_map/chart.model.js";
import {init as initChartYear} from "./chart_year/chart.model.js";
import {init as initChartCounty} from "./chart_county/chart.model.js";
import {init as initChartCompare} from "./chart_compare/chart.model.js";

function loadAllData() {
    axios.get("https://data.tg.ch/api/v2/catalog/datasets/sk-stat-10/exports/json")
        .then(res => res.data)
        .then(async data => {
            await loadChartMap(data);
            await loadChartYear(data);
            await loadChartCounty(data);
            await loadChartCompare(data);
        });
}

function loadChartMap(data) {
    let parties = ["svp", "fdp", "cvp", "sp", "gp", "glp", "evp", "edu", "bdp", "uebrige"]
    let gemeinde_name = undefined
    let totalVotes = 0
    let bfs = undefined
    let processedData = []
    let datayear = data.filter(obj => obj.wahljahr == 2020)
    for (let entry of datayear) {
        for (let party of parties) {
            totalVotes += entry[party]
        }
        bfs = entry.bfs_nr_gemeinde
        gemeinde_name = entry.gemeinde_name
        processedData.push({gemeinde_name: gemeinde_name, bfs_nr: bfs, votes: totalVotes,})
        totalVotes = 0
        bfs = undefined

    }
    initChartMap(processedData)
}

function loadChartYear(data) {
    let parties = ["svp", "fdp", "cvp", "sp", "gp", "glp", "evp", "edu", "bdp", "uebrige"]
    let total = 0;
    let votesAllYears = [];
    for (let year of ["2008", "2012", "2016", "2020"]) {
        let partiesYear = [];
        for (let party of parties) {
            let datayear = data.filter(obj => obj.wahljahr === year);
            for (let entry of datayear) {
                total += entry[party]
            }
            partiesYear.push({name: party, votes: total})
            total = 0
        }
        votesAllYears.push({year: year, parties: partiesYear});
    }
    initChartYear(votesAllYears);
}

function loadChartCounty(data) {
    let propertiesToDelete = ["bezirk_name", "bezirk_nr", "bfs_nr_gemeinde", "stimmen_total", "stimmen_wahlzettel_ohne_listenbez", "wahljahr"];
    let years = ["2008", "2012", "2016", "2020"];
    let processedData = [];

    for (let year of years) {
        let datayear = data.filter(obj => obj.wahljahr == year);
        let cleanedData = datayear.map(obj => {
            let cleanedObj = Object.assign({}, obj);
            propertiesToDelete.forEach(prop => {
                delete cleanedObj[prop];
            });
            return cleanedObj;
        });

        processedData.push({year: year, countys: cleanedData});
    }
    initChartCounty(processedData);
}

function loadChartCompare(data){
    let parties = ['svp', 'fdp', 'cvp', 'sp', 'gp', 'glp', 'evp', 'edu', 'bdp', 'uebrige']
    let total = 0
    let votesAllYears = []
    for (let year of ['2008', '2012', '2016', '2020']){
        let partiesYear = [];
        for (let party of parties){
            let datayear = data.filter(obj=>obj.wahljahr===year);
            for (let entry of datayear){
                total += entry[party]
            }
            partiesYear.push({name: party, votes: total})
            total = 0
        }
        votesAllYears.push({year: year, parties: partiesYear});
    }
    initChartCompare(votesAllYears);
}

export {loadAllData};
