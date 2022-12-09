import fs from "fs/promises";
import { HeadMovements, KnotCoord, Move } from "./types";

async function main(file: string) {
  const data: string = await fs.readFile(file, { encoding: "utf-8" });
  const moves: Array<Move> = data.split("\r\n").map((move) => {
    const [direction, steps] = move.split(" ");
    return [direction, Number(steps)];
  });

  const partA = trackRopeTailMovement(moves, 2);
  const partB = trackRopeTailMovement(moves, 10);

  return {
    PartA: Object.keys(partA).length,
    PartB: Object.keys(partB).length,
  };
}

const headMovements: HeadMovements = {
  U: (coord: KnotCoord) => coord.y++,
  D: (coord: KnotCoord) => coord.y--,
  L: (coord: KnotCoord) => coord.x--,
  R: (coord: KnotCoord) => coord.x++,
};

function trackRopeTailMovement(moves: Array<Move>, ropeLength: number): Record<string, number> {
  const rope: Array<KnotCoord> = Array.from({ length: ropeLength }, () => ({ x: 0, y: 0 }));
  const [head, tail] = [rope[0], rope[rope.length - 1]];
  const visited: Record<string, number> = {};

  moves.forEach((move) => {
    const [dir, steps] = move;

    for (let i = 0; i < steps; i++) {
      headMovements[dir](head);
      for (let j = 1; j < ropeLength; j++) {
        const { x, y } = determineKnotPosition(rope[j - 1], rope[j]);
        rope[j].x = x;
        rope[j].y = y;
      }
      visited[JSON.stringify(tail)] = (visited[JSON.stringify(tail)] || 0) + 1;
    }
  });
  return visited;
}

function determineKnotPosition(prevKnot: KnotCoord, curKnot: KnotCoord): KnotCoord {
  const temp: KnotCoord = { x: curKnot.x, y: curKnot.y };
  const xDif = prevKnot.x - curKnot.x;
  const yDif = prevKnot.y - curKnot.y;

  if (Math.abs(xDif) > 1) {
    if (yDif) temp.y += yDif > 0 ? 1 : -1;
    temp.x += xDif > 0 ? 1 : -1;
  } else if (Math.abs(yDif) > 1) {
    if (xDif) temp.x += xDif > 0 ? 1 : -1;
    temp.y += yDif > 0 ? 1 : -1;
  }
  return temp;
}

main("input.txt").then((res) => console.log(res));
