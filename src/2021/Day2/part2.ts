import fs from "fs/promises";
import { MovementsMap } from "./types";

async function main(file: string) {
  const data: string = await fs.readFile(file, { encoding: "utf-8" });
  const directions: Array<string> = data.split("\r\n");

  const coords: Array<number> = [0, 0, 0]; // [xAxis, yAxis, aim]

  directions.forEach((line) => {
    const [instruction, value]: Array<string> = line.split(" ");
    movements[instruction](coords, Number(value));
  });

  return coords[0] * coords[1];
}

const movements: MovementsMap = {
  down: (coords: Array<number>, value) => (coords[2] += value),
  up: (coords: Array<number>, value) => (coords[2] -= value),
  forward: (coords: Array<number>, value) => {
    coords[0] += value;
    coords[1] += value * coords[2];
  },
};

main("input.txt").then((res) => console.log(res));
