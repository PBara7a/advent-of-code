import fs from "fs/promises";
import { Counts } from "./types";

async function main(file: string) {
  const data: string = await fs.readFile(file, { encoding: "utf-8" });
  const lines: Array<string> = data.split("\r\n");

  return {
    PartA: getPowerConsumption(lines),
    PartB: getLifeSupportRating(lines),
  };
}

function getPowerConsumption(data: Array<string>): number {
  let [gammaRate, epsilonRate] = ["", ""];

  for (let col = 0; col < data[0].length; col++) {
    const digitCounts: Counts = getDigitCounts(data, col);

    gammaRate += digitCounts["0"] > digitCounts["1"] ? 0 : 1;
    epsilonRate += digitCounts["0"] > digitCounts["1"] ? 1 : 0;
  }
  return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
}

function getLifeSupportRating(data: Array<string>): number {
  const oxigenGenRating = selectByBitCriteria(data, 1);
  const scrubberRating = selectByBitCriteria(data, 0);
  return parseInt(oxigenGenRating, 2) * parseInt(scrubberRating, 2);
}

function selectByBitCriteria(data: Array<string>, checkBit: number): string {
  let tempData = [...data];
  let curColumn = 0;
  while (tempData.length > 1) {
    const digitCounts: Counts = getDigitCounts(tempData, curColumn);
    tempData = keepAoverB(tempData, digitCounts, curColumn, checkBit);
    curColumn++;
  }
  return tempData[0];
}

function getDigitCounts(data: Array<string>, col: number): Counts {
  const digitCounts: Counts = { 0: 0, 1: 0 };
  data.forEach((_, row) => digitCounts[data[row][col]] += 1);
  return digitCounts;
}

function keepAoverB(
  data: Array<string>, 
  counts: Counts, 
  checkCol: number, 
  keeper: number
): Array<string> {
  if (counts["0"] <= counts["1"]) {
    return data.filter((row) => row[checkCol] === String(keeper));
  }
  return data.filter((row) => row[checkCol] !== String(keeper));
}

main("input.txt").then((res) => console.log(res));
