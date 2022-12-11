import fs from"fs/promises";
import { Monkey } from "./types";

async function main(file: string) {
  const input: string = await fs.readFile(file, { encoding: "utf-8" });

  return {
    PartA: getMonkeyBusinessAfterXRounds(input, 20),
    PartB: getMonkeyBusinessAfterXRounds(input, 10000, true),
  };
}

function getMonkeyBusinessAfterXRounds(input: string, rounds: number, partB = false): number {
  const monkeys: Array<Monkey> = input.split("\r\n\r\n").map((monkey) => {
    const lines = monkey.split("\r\n");
    return {
      inpectedItems: 0,
      items: lines[1].match(/(\d+)/g)!.map(Number),
      operation: lines[2].split("  Operation: new = old ")[1].split(" "),
      test: Number(lines[3].match(/(\d+)/)![0]),
      throwTo: [
        Number(lines[4].match(/(\d)/)![0]),
        Number(lines[5].match(/(\d)/)![0]),
      ],
    };
  });

  const superMod: number = monkeys.reduce((product, monkey) => product * monkey.test, 1);

  for (let i = 0; i < rounds; i++) {
    monkeys.forEach((monkey) => {
      while (monkey.items.length) {
        let item = monkey.items.shift()!;
        monkey.inpectedItems++;

        item = operation(monkey.operation, item) % superMod;

        if (!partB) item = Math.floor(item / 3);

        item % monkey.test === 0
          ? monkeys[monkey.throwTo[0]].items.push(item)
          : monkeys[monkey.throwTo[1]].items.push(item);
      }
    });
  }

  monkeys.sort((a, b) => b.inpectedItems - a.inpectedItems);
  return monkeys[0].inpectedItems * monkeys[1].inpectedItems;
}

function operation(op: Array<string>, a: number): number {
  const b = op[1] === "old" ? a : Number(op[1]);
  if (op[0] === "+") return a + b;
  if (op[0] === "*") return a * b;
  return -1;
}

main("input.txt").then((res) => console.log(res));
