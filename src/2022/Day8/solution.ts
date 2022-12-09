import fs from "fs/promises";
import { NeighbourTrees } from "./types";

async function main(file: string) {
  const data: string = await fs.readFile(file, { encoding: "utf-8" });
  const grid: number[][] = data.split("\r\n").map((line) => line.split("").map(Number));

  let count = 0;
  const scores: Array<number> = [];
  grid.forEach((row, rowI) => {
    row.forEach((_, colI) => {
      const treeMap = mapNeighbourTrees(rowI, colI, grid);
      if (isVisible(treeMap, rowI, colI, grid)) count++;
      scores.push(getScenicScore(treeMap, grid[rowI][colI]));
    });
  });

  return {
    PartA: count,
    PartB: Math.max(...scores),
  };
}

function isOnEdge(row: number, col: number, grid: number[][]): boolean {
  return (row === 0 || col === 0 || row === grid.length - 1 || col === grid[0].length - 1);
}

function isVisible(treesMap: NeighbourTrees, row: number, col: number, grid: number[][]): boolean {
  if (isOnEdge(row, col, grid)) return true;
  const height = grid[row][col];

  return Object.values(treesMap).reduce((isVisible, treeLine) => {
    if (treeLine.every((tree) => tree < height)) isVisible = true;
    return isVisible;
  }, false);
}

function mapNeighbourTrees(row: number, col: number, grid: number[][]): NeighbourTrees {
  return grid.reduce((treeMap: NeighbourTrees, treeRow, i) => {
    if (i < row) {
      treeMap.up.unshift(treeRow[col]);
    } else if (i > row) {
      treeMap.down.push(treeRow[col]);
    } else {
      treeMap.left.push(...treeRow.slice(0, col).reverse());
      treeMap.right.push(...treeRow.slice(col + 1));
    }
    return treeMap;
  },{ up: [], down: [], left: [], right: [] });
}

function getScenicScore(treesMap: NeighbourTrees, height: number): number {
  return Object.values(treesMap).reduce((score, arrTrees) => {
    let count = 0;

    for (const tree of arrTrees) {
      count++;
      if (tree >= height) break;
    }
    return score * count;
  }, 1);
}

main("input.txt").then((res) => console.log(res));
