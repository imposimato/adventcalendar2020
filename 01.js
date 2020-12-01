const fs = require('fs');

const array = fs.readFileSync('01.txt').toString().split("\n");

// Cast Array as obj to reduce bigO
function castToObj(inputs) {
    let tempObj = {};
    for (const value of inputs) {
        if (!tempObj[value]) {
            tempObj[value] = 1;
        }
        else {
            tempObj[value] += 1;
        }
    }
    return tempObj;
}

function findPair(values, target) {
    const object = castToObj(values);
    for (const v of values) {
        const int = parseInt(v);
        const diff = target - int;
        if (object[diff.toString()]) {
            return [int, diff];
        }
    }
    return null;
}

function findTriplets(inputs, sum) {
    for (let i = 0; i < inputs.length; i++) {
        const currDiff = sum - parseInt(inputs[i]);
        for (let j = i + 1; j < inputs.length; j++) {
            let tempArr = inputs.slice(j);
            const pair = findPair(tempArr, currDiff);
            if (pair) {
                return [parseInt(inputs[i]), ...pair];
            }
        }
    }
}

console.log(findTriplets(array, 2020));
