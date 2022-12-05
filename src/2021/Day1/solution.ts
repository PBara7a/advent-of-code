const fs = require("fs").promises;

async function main(file: string) {
  const data: string = await fs.readFile(file, { encoding: "utf-8" });
  const measurements: Array<number> = data.split("\r\n").map(Number);

  const groups: Array<number> = [];
  for (let i = 0; i < measurements.length - 2; i++) {
    groups.push(measurements.slice(i, i + 3).reduce((acc, cur) => acc + cur));
  }

  return {
    PartOne: countIncrements(measurements),
    PartTwo: countIncrements(groups),
  };
}

function countIncrements(measurements: Array<number>): number {
  return measurements.reduce((count, measurement, i) => {
    return count + Number(measurement > measurements[i - 1]);
  }, 0);
}

main("input.txt").then((res) => console.log(res));
