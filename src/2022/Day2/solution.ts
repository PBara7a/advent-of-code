import fs from "fs/promises";
import { handsMap, resultsMap } from "./data";

async function main(file: string) {
  const data: string = await fs.readFile(file, { encoding: "utf-8" });
  const plays: string[][] = data.split("\r\n").map((play) => play.split(" "));

  const [partAScore, partBScore] = plays.reduce((scores, play) => {
    const [elfHand, suggestedStrategy] = play;
    const myHand = chooseMyHand(elfHand, suggestedStrategy);
    scores[0] += playHand(elfHand, suggestedStrategy);
    scores[1] += playHand(elfHand, myHand);
    return scores;
  }, [0, 0]);

  return {
    PartA: partAScore,
    PartB: partBScore,
  };
}

function playHand(elfHand: string, myHand: string): number {
  const [winPoints, drawPoints, lossPoints] = [6, 3, 0];
  const res = (3 + handsMap[elfHand] - handsMap[myHand]) % 3;
  // res: 0 -> draw, 1 -> elf wins, 2 -> I win
  if (res === 2) {
    return handsMap[myHand] + 1 + winPoints;
  } else if (res === 1) {
    return handsMap[myHand] + 1 + lossPoints;
  } else {
    return handsMap[myHand] + 1 + drawPoints;
  }
}

function chooseMyHand(elfHand: string, neededResult: string): string {
  return resultsMap[neededResult][elfHand];
}

main("input.txt").then((res) => console.log(res));
