const fs = require("fs");

const input = fs
  .readFileSync("day9.txt", { encoding: "utf-8" })
  .split("\r\n")
  .map((line) => line.split("").map((x) => Number(x)));

// Part 1

const lowPoints = [];

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[0].length; j++) {
    let upHeight, downHeight, leftHeight, rightHeight;
    const curHeight = input[i][j];

    if (i === 0 && j === 0) {
      downHeight = input[i + 1][j];
      rightHeight = input[i][j + 1];
    } else if (i === 0 && j === input[0].length - 1) {
      downHeight = input[i + 1][j];
      leftHeight = input[i][j - 1];
    } else if (i === 0) {
      downHeight = input[i + 1][j];
      rightHeight = input[i][j + 1];
      leftHeight = input[i][j - 1];
    } else if (i === input.length - 1 && j === 0) {
      upHeight = input[i - 1][j];
      rightHeight = input[i][j + 1];
    } else if (i === input.length - 1 && j === input[0].length - 1) {
      upHeight = input[i - 1][j];
      leftHeight = input[i][j - 1];
    } else if (i === input.length - 1) {
      upHeight = input[i - 1][j];
      leftHeight = input[i][j - 1];
      rightHeight = input[i][j + 1];
    } else if (j === 0) {
      upHeight = input[i - 1][j];
      downHeight = input[i + 1][j];
      rightHeight = input[i][j + 1];
    } else if (j === input[0].length - 1) {
      upHeight = input[i - 1][j];
      downHeight = input[i + 1][j];
      leftHeight = input[i][j - 1];
    } else {
      upHeight = input[i - 1][j];
      downHeight = input[i + 1][j];
      leftHeight = input[i][j - 1];
      rightHeight = input[i][j + 1];
    }

    const adjacentHeights = [
      upHeight,
      downHeight,
      leftHeight,
      rightHeight,
    ].filter((height) => height !== undefined);
    console.log(adjacentHeights);

    if (adjacentHeights.every((height) => curHeight < height)) {
      lowPoints.push(curHeight);
    }
  }
}

const risk = lowPoints.reduce((acc, cur) => acc + cur + 1, 0);

console.log("The sum of the risk levels is ", risk);
