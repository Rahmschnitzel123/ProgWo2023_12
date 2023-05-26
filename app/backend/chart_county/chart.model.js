// DATA_FORMAT
/*
[
  {
    "gemeinde_name": "Aadorf",
    "wahljahr": "2020",
    "svp": 12113,
    "fdp": 4462,
    "cvp": 9690,
    "sp": 3139,
    "gp": 3546,
    "glp": 2762,
    "evp": 2765,
    "edu": 907,
    "bdp": 0
  },
  {
    "gemeinde_name": "Berg",
    "wahljahr": "2020",
    "svp": 7906,
    "fdp": 2177,
    "cvp": 3463,
    "sp": 1227,
    "gp": 1154,
    "glp": 2049,
    "evp": 1293,
    "edu": 2179,
    "bdp": 223
  }
]
*/



let countyData = []
function init (data){
    countyData = data;
}
function processCountyData(data) {
    return Promise.resolve(countyData)
}

export {processCountyData, init}

