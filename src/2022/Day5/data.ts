import fs from "fs";
import { CrateStacks } from "./types";

const input: string = fs.readFileSync("input.txt", { encoding: "utf-8" });
const [inputTop, inputBottom] = input.split("\r\n\r\n");

export const instructions: number[][] = inputBottom
  .split("\r\n")
  .map((move) => move.match(/\d+/g)!.map(Number));

const drawing: Array<string> = inputTop.split("\r\n");
const stacksInitialState: Array<string> = drawing.slice(0, drawing.length - 1);

export const stacks: CrateStacks = stacksInitialState.reduce((stacks: CrateStacks, line) => {
  let currentStack = 1;
  for (let i = 1; i < line.length; i += 4) {
    if (line[i] !== " ") {
      if (currentStack in stacks) stacks[currentStack].push(line[i]);
      else stacks[currentStack] = [line[i]];
    }
    currentStack++;
  }
  return stacks;
}, {});