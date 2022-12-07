import fs from "fs/promises";
import { FishPopulation } from "./types";

async function main(file: string) {
  const data: string = await fs.readFile(file, { encoding: "utf-8" });
  const initialState: Array<number> = data.split(",").map(Number);

  const fishTimers: FishPopulation = mapFishTimers(initialState);
  const after80Days: FishPopulation = fishPopulationModel(fishTimers, 0, 80);
  const after256Days: FishPopulation = fishPopulationModel(fishTimers, 0, 256);

  return {
    PartA: getTotalFish(after80Days),
    PartB: getTotalFish(after256Days),
  };
}

function mapFishTimers(state: Array<number>): FishPopulation {
  return state.reduce((fishTimers: FishPopulation, timer: number) => {
      fishTimers[timer] = (fishTimers[timer] || 0) + 1;
      return fishTimers;
    },
    { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 }
  );
}

function fishPopulationModel(timersMap: FishPopulation, currentDay: number, numOfDays: number): FishPopulation {
  if (currentDay === numOfDays) return timersMap;

  const numberOfNewFish: number = timersMap[0];
  const newFishTimersMap: FishPopulation = {};

  Object.keys(timersMap).forEach((timer) => {
    if (Number(timer) - 1 >= 0) {
      newFishTimersMap[Number(timer) - 1] = timersMap[timer];
    }
  });

  newFishTimersMap[6] += numberOfNewFish;
  newFishTimersMap[8] = numberOfNewFish;

  return fishPopulationModel(newFishTimersMap, currentDay + 1, numOfDays);
}

function getTotalFish(fishPopulationMap: FishPopulation): number {
  return Object.values(fishPopulationMap).reduce((total, cur) => total + cur);
}

main("input.txt").then((res) => console.log(res));
