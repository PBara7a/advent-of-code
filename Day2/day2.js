// Importing the filesystem module
const fs = require('fs');

const directions = fs
    .readFileSync('day2.txt', { encoding: 'utf-8'})
    .split('\n')
    // .filter((x) => Boolean(x))
    // .map((x) => parseInt(x));

// PART 1
let xAxis = 0;
let yAxis = 0;

for (let i = 0; i < directions.length; i++) {
    const directionArr = directions[i].split(' ');
    if (directionArr[0] === 'forward') {
        xAxis += parseInt(directionArr[1]);
    }
    else if (directionArr[0] === 'down') {
        yAxis += parseInt(directionArr[1]);
    }
    else if (directionArr[0] === 'up') {
        yAxis -= parseInt(directionArr[1]);
    }
}

console.log("X-Axis:", xAxis, "Y-Axis:", yAxis)
console.log("X-Axis x Y-Axis:", xAxis * yAxis)

// Part 2
xAxis = 0;
yAxis = 0;
let aim = 0;

for (let i = 0; i < directions.length; i++) {
    const directionArr = directions[i].split(' ');
    if (directionArr[0] === 'forward') {
        xAxis += parseInt(directionArr[1]);
        yAxis += (aim * parseInt(directionArr[1]));
    }
    else if (directionArr[0] === 'down') {
        aim += parseInt(directionArr[1]);
    }
    else if (directionArr[0] === 'up') {
        aim -= parseInt(directionArr[1]);
    }
}

console.log("X-Axis:", xAxis, "Y-Axis:", yAxis)
console.log("X-Axis x Y-Axis:", xAxis * yAxis)
