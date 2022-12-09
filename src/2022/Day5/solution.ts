import { instructions, stacks } from "./data";
import { CrateStacks } from "./types";

async function main() {
  return {
    PartA: moveCrates(instructions, stacks),
    PartB: moveCrates(instructions, stacks, true),
  };
}

function moveCrates(instructions: number[][], stacks: CrateStacks, useBetterCrane = false): string {
  const stackCopy: CrateStacks = JSON.parse(JSON.stringify(stacks));

  instructions.forEach((line) => {
    const [numOfCrates, fromStackNum, toStackNum] = line;
    const crates = stackCopy[fromStackNum].splice(0, numOfCrates);

    useBetterCrane
      ? stackCopy[toStackNum].unshift(...crates)
      : stackCopy[toStackNum].unshift(...crates.reverse());
  });

  return Object.values(stackCopy).reduce((crates, stack) => crates + stack[0], "");
}

main().then((res) => console.log(res));
