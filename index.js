const NUMBER_OF_WORKERS = 4;

const napa = require('napajs');
const zone = napa.zone.create('zone', { workers: NUMBER_OF_WORKERS} );

// Time measuring
const start = Date.now();

// Testing variables
let longSequence = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100];
let originalLength = longSequence.length;

// Paralleling processing the longSequence
function multiply(seq, times) {
  for(var i = 0; i < seq.length; i++) {
    seq[i] = seq[i] * times;

    // simulating a long processing block
    var e = new Date().getTime() + (10);
    while (new Date().getTime() <= e) {}
  }

  return seq;
}

function printResults(seq) {
  console.log(seq);
}

//Slicing longSequence in 4 pieces and sending them to parallel processing
var parallelism = NUMBER_OF_WORKERS;
var promises = [];
for(var i = 0; i < parallelism; i++)
  promises[i] = zone.execute(multiply, [longSequence.splice(0, originalLength / parallelism), 2]);

Promise.all(promises).then(values => {
    values.forEach(result => printResults(result.value));
    console.log('Total runtime: ' + (Date.now() - start) + 'ms');
});