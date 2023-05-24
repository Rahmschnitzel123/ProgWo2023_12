const axios = require('axios')

axios.get("https://data.tg.ch/api/v2/catalog/datasets/sk-stat-10/exports/json").then(res => processCountyData(res.data))


function processCountyData(data){

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