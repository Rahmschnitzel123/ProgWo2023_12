const axios = require('axios')

axios.get("https://data.tg.ch/api/v2/catalog/datasets/sk-stat-10/exports/json").then(res => processMapData(res.data))


function processMapData(data){
    let parties = ['svp', 'fdp', 'cvp', 'sp', 'gp', 'glp', 'evp', 'edu', 'bdp', 'uebrige']
    let totalVotes = 0
    let bfs = undefined
    let processedData = []
    let datayear = data.filter(obj=>obj.wahljahr==2020)
    for (let entry of datayear){
        for (let party of parties){
            totalVotes += entry[party]
        }
        bfs = entry.bfs_nr_gemeinde
        processedData.push({bfs_nr: bfs, votes: totalVotes})
        totalVotes = 0
        bfs = undefined

    }
    //log(processedData)


return(processedData)
}

// DATA_FORMAT
/*
[
{bfs_nr: , votes:}
{bfs_nr: , votes:}
{bfs_nr: , votes:}
...
]
 */