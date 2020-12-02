const fs = require('fs');

const inputs = fs.readFileSync('02.txt').toString().split('\n');

let resultPolicyOne = 0;
let resultPolicyTwo = 0;
for (const line of inputs) {
    const res = line.split(': ');
    // Extract patern and key;
    const paternAndKey = res[0].split(' ');
    const repetition = paternAndKey[0].split('-').map(v => parseInt(v));
    const key = paternAndKey[1];
    const password = res[1];
    let countChars = 0;

    if (password) {
        for (const c of password) {
            if (c && c.toString() === key) {
                countChars++;
            }
        }
    }
    countChars >= repetition[0] && countChars <= repetition[1] && resultPolicyOne++;
    password && (password[repetition[0] - 1] === key) ^ (password[repetition[1] - 1] === key) && resultPolicyTwo++;
}

console.log(resultPolicyOne);
console.log(resultPolicyTwo);
