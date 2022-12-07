import fs from "fs/promises"
import { FuelMap } from "./types";

async function main(file: string) {
  const data: string = await fs.readFile(file, { encoding: "utf-8" });
  const crabPositions: Array<number> = data.split(",").map(Number);

  const fuelMap: FuelMap = mapFuelTotals(crabPositions);
  const enhancedFuelMap: FuelMap = mapFuelTotalsEnhanced(crabPositions);

  return {
    PartA: minimumFuelSpentToAlign(fuelMap),
    PartB: minimumFuelSpentToAlign(enhancedFuelMap),
  };
}

function mapFuelTotals(crabPositions: Array<number>): FuelMap {
  return crabPositions.reduce((fuelMap: FuelMap, alignPosition) => {
    fuelMap[alignPosition] = totalFuel(crabPositions, alignPosition);
    return fuelMap;
  }, {});
}

function totalFuel(crabPositions: Array<number>, targetPosition: number): number {
  return crabPositions.reduce((total, curPosition) => total + Math.abs(curPosition - targetPosition), 0);
}

function mapFuelTotalsEnhanced(crabPositions: Array<number>): FuelMap {
  const allPositions: Array<number> = Array.from({ length: Math.max(...crabPositions) + 1 }, (_, i) => i);
  return allPositions.reduce((fuelMap: FuelMap, alignPosition) => {
    fuelMap[alignPosition] = totalFuelEnhanced(crabPositions, alignPosition);
    return fuelMap;
  }, {});
}

function totalFuelEnhanced(crabPositions: Array<number>, targetPosition: number): number {
  return crabPositions.reduce((total, curPosition) => {
    const dif = Math.abs(curPosition - targetPosition);
    return total + (dif * (dif + 1)) / 2;
  }, 0);
}

function minimumFuelSpentToAlign(fuelMap: FuelMap): number {
  return Math.min(...Object.values(fuelMap));
}

main("input.txt").then((res) => console.log(res));
