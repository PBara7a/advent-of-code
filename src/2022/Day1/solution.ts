import fs from "fs/promises";

async function main(file: string) {
  const data = await fs.readFile(file, { encoding: "utf-8" });
  const input = data.split("\r\n\r\n")
                .map((elfCals) => elfCals.split("\r\n").map(Number));

  const elfCalTotals = input.map((elfCals) => sumOfCalories(elfCals));
  const top3ElfCals = getTop3MostCalories(elfCalTotals);

  return {
    PartA: top3ElfCals[0],
    PartB: sumOfCalories(top3ElfCals),
  };
}

function getTop3MostCalories(totals: Array<number>): Array<number> {
  return totals.sort((a, b) => b - a).slice(0, 3);
}

function sumOfCalories(calsArr: Array<number>): number {
  return calsArr.reduce((total, cals) => total + cals);
}

main("input.txt").then((res) => console.log(res));
