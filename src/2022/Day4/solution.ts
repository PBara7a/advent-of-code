import fs from "fs/promises";
import { CheckSections } from "./types";

async function main(file: string) {
  const input: string = await fs.readFile(file, { encoding: "utf-8" });
  const pairs: number[][][] = input
    .split("\r\n")
    .map((pair) => pair.split(",").map((elf) => elf.split("-").map(Number)));

  return {
    PartA: getNumOfOverlaps(pairs, isFullyContained),
    PartB: getNumOfOverlaps(pairs, isOverlaping),
  };
}

function isFullyContained(sectionA: Array<number>, sectionB: Array<number>): boolean {
  return (
    (sectionA[0] >= sectionB[0] && sectionA[1] <= sectionB[1]) ||
    (sectionA[0] <= sectionB[0] && sectionA[1] >= sectionB[1])
  );
}

function isOverlaping(sectionA: Array<number>, sectionB: Array<number>): boolean {
  return sectionA[1] >= sectionB[0] && sectionB[1] >= sectionA[0];
}

function getNumOfOverlaps(sections: number[][][], checkFunc: CheckSections) {
  return sections.reduce((total, pair) => {
    const [sectionA, sectionB] = pair;
    const isOverlaping = checkFunc(sectionA, sectionB);
    return total + Number(isOverlaping);
  }, 0);
}

main("input.txt").then((res) => console.log(res));
