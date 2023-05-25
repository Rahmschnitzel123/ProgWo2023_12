// DATA_FORMAT
/*
[
{bfs_nr: , votes:}
{bfs_nr: , votes:}
{bfs_nr: , votes:}
...
]
 */

let mapData = []
function init (data){
    mapData = data;
}
function processMapData(data) {
    return Promise.resolve(mapData)
}

export {processMapData, init}

