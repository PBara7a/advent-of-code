import fs from "fs/promises"

async function main(file: string) {
  const data: string = await fs.readFile(file, { encoding: "utf-8" });

  return {
    PartA: findUniqueSequence(data, 4),
    PartB: findUniqueSequence(data, 14),
  };
}

function findUniqueSequence(data: string, sequenceLength: number): number {
  for (let i = sequenceLength; i < data.length; i++) {
    const charsSet = new Set(data.substring(i - sequenceLength, i).split(""));
    if (charsSet.size === sequenceLength) return i;
  }
  return -1;
}

main("input.txt").then((res) => console.log(res));
