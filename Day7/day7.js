const fs = require("fs");

const input = fs
  .readFileSync("day7.txt", { encoding: "utf-8" })
  .split(",")
  .map((el) => Number(el));

// Part 1
const positions = new Set(input.sort((a, b) => a - b));

const fuelMap = {};

positions.forEach((x) => {
  fuelMap[x] = input
    .map((crabPos) => Math.abs(crabPos - x))
    .reduce((acc, cur) => acc + cur);
});

const minFuel = Math.min(...Object.values(fuelMap));

for (const pos in fuelMap) {
  if (fuelMap[pos] === minFuel) console.log(pos, fuelMap[pos]);
}
