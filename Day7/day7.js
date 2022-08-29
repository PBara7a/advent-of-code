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

// Part 2
const positions2 = Array.from(Array(Math.max(...input)).keys());

const fuelMap2 = {};

positions2.forEach((x) => {
  fuelMap2[x] = input
    .map((crabPos, i) => {
      const dif = Math.abs(crabPos - x);
      let totalFuel = 0;
      for (let i = 0; i <= dif; i++) {
        totalFuel += i;
      }
      return totalFuel;
    })
    .reduce((acc, cur) => acc + cur);
});

const minFuel2 = Math.min(...Object.values(fuelMap2));

for (const pos in fuelMap2) {
  if (fuelMap2[pos] === minFuel2) console.log(pos, fuelMap2[pos]);
}
