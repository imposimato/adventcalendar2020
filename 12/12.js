const fs = require('fs');

const pattern = /(?<dir>\w)(?<value>\d+)/

const input = fs.readFileSync('./12.txt')
    .toString()
    .trimEnd()
    .split("\n")
    .map(row => pattern.exec(row).groups)
    .map(row => ({dir: row.dir, value: parseInt(row.value)}));

// starts facing east
let currentDir = 90;
let northSouth = 0, eastWest = 0;
input.forEach(instr => {
    if (instr.dir.match(/L|R/)) {
        instr.dir === 'L' ? currentDir -= instr.value : currentDir += instr.value;
        if (Math.abs(currentDir) > 360) currentDir = currentDir % 360
        if (currentDir <= 0) currentDir += 360;
    }
    if (instr.dir.match(/N|S/)) {
        instr.dir === 'N' ? northSouth += instr.value : northSouth -= instr.value;
    }
    if (instr.dir.match(/E|W/)) {
        instr.dir === 'E' ? eastWest += instr.value : eastWest -= instr.value;
    }
    if (instr.dir === 'F') {
        if (currentDir === 90) eastWest += instr.value;
        if (currentDir === 180) northSouth -= instr.value;
        if (currentDir === 270) eastWest -= instr.value;
        if (currentDir === 360) northSouth += instr.value;
    }
});

console.log('Part One', Math.abs(northSouth) + Math.abs(eastWest));

// Starts this way
let waypoint = {north: 1, east: 10};
let position = {north: 0, east: 0};
input.forEach(instr => {
    if (instr.dir.match(/L|R/)) {
        const {north, east} = waypoint;
        if (instr.value === 180) {
            waypoint.east *= -1;
            waypoint.north *= -1;
        }
        if ((instr.value === 90 && instr.dir === 'R') ||
            (instr.value === 270 && instr.dir === 'L')) {
            waypoint.east = north;
            waypoint.north = -east;
        }
        if ((instr.value === 90 && instr.dir === 'L') ||
            (instr.value === 270 && instr.dir === 'R')) {
            waypoint.east = -north;
            waypoint.north = east;
        }
    }
    if (instr.dir.match(/N|S/)) {
        instr.dir === 'N' ? waypoint.north += instr.value : waypoint.north -= instr.value;
    }
    if (instr.dir.match(/E|W/)) {
        instr.dir === 'E' ? waypoint.east += instr.value : waypoint.east -= instr.value;
    }
    if (instr.dir === 'F') {
        position.north += waypoint.north * instr.value;
        position.east += waypoint.east * instr.value;
    }
});

console.log('Part two: ', Math.abs(position.north) + Math.abs(position.east));


