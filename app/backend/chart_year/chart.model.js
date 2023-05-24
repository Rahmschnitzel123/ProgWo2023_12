const axios = require('axios')

axios.get("https://data.tg.ch/api/v2/catalog/datasets/sk-stat-10/exports/json").then(res => processData(res))

function processData(data, newParam = []) {

    let parties = ['svp', 'fdp', 'cvp', 'sp', 'gp', 'glp', 'evp', 'edu', 'bdp', 'uebrige']

    //let processedData = {year: undefined, parties:parties.map(p => {let smth = {}; smth[p] = undefined; return(smth)})}
    let processedData = []
    let total = 0
    data = data.data
    let votesAllYears = []
    for (let year of ['2008', '2012', '2016', '2020']){
        let partiesYear = [];
        for (let party of parties){
            let datayear = data.filter(obj=>obj.wahljahr===year);
                for (entry of datayear){
                    total += entry[party]
                }
                partiesYear.push({name: party, votes: total})
                total = 0
        }
        votesAllYears.push({year: year, parties: partiesYear});
    }
    console.log(JSON.stringify(votesAllYears))

console.log(processedData)
return processedData
}