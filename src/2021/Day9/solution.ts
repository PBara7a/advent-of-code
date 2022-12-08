import fs from "fs/promises";

async function main(file: string) {
  const data: string = await fs.readFile(file, { encoding: "utf-8" });
  const grid: number[][] = data.split("\r\n").map((line) => line.split("").map(Number));
  const lowPoints: Array<number> = [];
  const basins: Array<number> = [];
  const gridCopy: number[][] = JSON.parse(JSON.stringify(grid));

  grid.forEach((row, i) => {
    row.forEach((_, j) => {
      if (isLowPoint(i, j, grid)) {
        lowPoints.push(grid[i][j]);
      }
      if (grid[i][j] !== 9) {
        basins.push(getBasinSize(i, j, gridCopy));
      }
    });
  });

  return {
    PartA: determineRisk(lowPoints),
    PartB: getLargestBasinsProduct(basins),
  };
}

const determineRisk = (points: Array<number>): number => points.reduce((acc, cur) => acc + cur + 1, 0);

function isLowPoint(row: number, col: number, grid: number[][]): boolean {
  const current = grid[row][col];
  const up = grid[row - 1] !== undefined ? grid[row - 1][col] : 9;
  const down = grid[row + 1] !== undefined ? grid[row + 1][col] : 9;
  const left = grid[row][col - 1] !== undefined ? grid[row][col - 1] : 9;
  const right = grid[row][col + 1] !== undefined ? grid[row][col + 1] : 9;
  return [up, down, left, right].every((height) => height > current);
}

function getBasinSize(row: number, col: number, grid: number[][]): number {
  if (grid[row][col] === 9) return 0;
  grid[row][col] = 9;
  const queue: number[][] = [[row, col]];
  let size = 0;

  while (queue.length) {
    const [row, col] = queue.shift()!;
    size++;

    if (row > 0) {
      if (grid[row - 1][col] !== 9) { // above
        grid[row - 1][col] = 9;
        queue.push([row - 1, col]);
      }
    }
    if (col > 0) {
      if (grid[row][col - 1] !== 9) { // left
        grid[row][col - 1] = 9;
        queue.push([row, col - 1]);
      }
    }
    if (col !== grid[row].length - 1) {
      if (grid[row][col + 1] !== 9) { // right
        grid[row][col + 1] = 9;
        queue.push([row, col + 1]);
      }
    }
    if (row < grid.length - 1) {
      if (grid[row + 1][col] !== 9) { // below
        grid[row + 1][col] = 9;
        queue.push([row + 1, col]);
      }
    }
  }
  return size;
}

function getLargestBasinsProduct(basinSizes: Array<number>): number {
  return basinSizes.sort((a, b) => b - a).slice(0, 3).reduce((total, height) => total * height);
}

main("input.txt").then((res) => console.log(res));
