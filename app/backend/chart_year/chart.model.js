//DATA_FORMAT:
/*
{{
    [
        {
            year:
            parties:
    [
        {partyName: , votes:}
        {partyName: , votes:}
        {partyName: , votes:}
        {partyName: , votes:}
        {partyName: , votes:}
    ]
},
]
}
*/

let yearData = []
function init(data) {
    yearData = data;
}

function processYearData(data) {
    return Promise.resolve(yearData)
}

export {processYearData, init}

