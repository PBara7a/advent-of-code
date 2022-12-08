import fs from "fs/promises";

async function main(file: string) {
  const data: string = await fs.readFile(file, { encoding: "utf-8" });
  const rucksacks: Array<string> = data.split("\r\n");

  const itemPriorities = rucksacks.map((rucksack) => {
    const mid = rucksack.length / 2;
    const repeatedItem = getRepeatedItem(rucksack.slice(0, mid), rucksack.slice(mid));
    return determinePriority(repeatedItem!);
  });

  const groups: string[][] = createGroups(rucksacks);
  const badges: Array<string> = groups.map((group) => getGroupBadge(group)!);
  const badgePriorities: Array<number> = badges.map((badge) => determinePriority(badge));

  return {
    PartA: sumPriorities(itemPriorities),
    PartB: sumPriorities(badgePriorities),
  };
}

function getRepeatedItem(firstCompartment: string, secondCompartment: string): string | null {
  for (const char of firstCompartment) {
    if (secondCompartment.includes(char)) {
      return char;
    }
  }
  return null;
}

function determinePriority(char: string): number {
  if (char === char.toLowerCase()) {
    return char.charCodeAt(0) - 96;
  }
  return char.charCodeAt(0) - 38;
}

function sumPriorities(priorities: Array<number>): number {
  return priorities.reduce((total, priority) => total + priority);
}

function createGroups(rucksacks: Array<string>): string[][] {
  const groupSize: number = 3;
  const numOfGroups: number = rucksacks.length / groupSize;
  return Array.from({ length: numOfGroups }, (_, i) => rucksacks.slice(i * groupSize, (i + 1) * groupSize))
}

function getGroupBadge(group: Array<string>): string | null {
  const [sack1, sack2, sack3] = group;
  for (const item of sack1) {
    if (sack2.includes(item) && sack3.includes(item)) {
      return item;
    }
  }
  return null
}

main("input.txt").then((res) => console.log(res));
