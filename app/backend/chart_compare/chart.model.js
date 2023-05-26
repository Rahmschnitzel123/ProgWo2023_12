//DATA_FORMAT:
/*
{{
    [
        {
            year:
            parties:
    [
        {name: , votes:}

    ]
},
]
}
*/

let compareData = []
function init (data){
    compareData = data;
}
function processCompareData(data) {
    return Promise.resolve(compareData)
}

export {processCompareData, init}



