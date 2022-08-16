// Importing the filesystem module
const fs = require('fs');

const nums = fs
    .readFileSync('day1.txt', { encoding: 'utf-8'})
    .split('\n')
    .filter((x) => Boolean(x))
    .map((x) => parseInt(x));

// PART 1
let increased = 0;
let decreased = 0;
for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) {
        increased++;
    }
    else if (nums[i] < nums[i - 1]) {
        decreased++;
    }
}
console.log("Increased: ", increased, "Decreased: ", decreased)


// PART 2
increased = 0;
decreased = 0;
for (let i = 1; i < nums.length; i++) {
    if ((nums[i] + nums[i + 1] + nums[i + 2]) > (nums[i - 1] + nums[i] + nums[i + 1])) {
        increased++;
    }
    else if ((nums[i] + nums[i + 1] + nums[i + 2]) < (nums[i - 1] + nums[i] + nums[i + 1])) {
        decreased++;
    }
}
console.log("Three-measurement:")
console.log("Increased: ", increased, "Decreased: ", decreased)