import fs from "fs/promises";

async function main(file: string) {
  const data: string = await fs.readFile(file, { encoding: "utf-8" });
  const instructions: Array<string> = data.split("\r\n");

  let x: number = 1;
  let cycle: number = 0;
  let output: string = "";
  const signalStrengths: Record<string, number> = {
    20: 0,
    60: 0,
    100: 0,
    140: 0,
    180: 0,
    220: 0,
  };

  instructions.forEach((instruction) => {
    if (instruction === "noop") {
      cycle++;

      if (cycle in signalStrengths) signalStrengths[cycle] = cycle * x;
      output += isInDrawingPos(x, cycle) ? "#" : ".";
    } else {
      const xChange = Number(instruction.split(" ")[1]);
      for (let i = 0; i < 2; i++) {
        cycle++;

        if (cycle in signalStrengths) signalStrengths[cycle] = cycle * x;
        output += isInDrawingPos(x, cycle) ? "#" : ".";
      }
      x += xChange;
    }
  });

  return {
    PartA: Object.values(signalStrengths).reduce((total, signal) => total + signal),
    PartB: output.match(/.{1,40}/g),
  };
}

function isInDrawingPos(x: number, cycle: number): boolean {
  const xPixels = [x - 1, x, x + 1];
  const drawPos = cycle % 40 ? (cycle % 40) - 1 : 40 - 1;
  return xPixels.includes(drawPos);
}

main("input.txt").then((res) => console.log(res));
