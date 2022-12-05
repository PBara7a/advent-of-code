const fs = require("fs").promises;

async function main() {
  const data = await fs.readFile("day9.txt", { encoding: "utf-8" });
  const caveHeights = data
    .split("\r\n")
    .map((line) => line.split("").map((x) => Number(x)));

  const basins = [];

  caveHeights.forEach((row, rowIndex) => {
    row.forEach((_, colIndex) => {
      if (caveHeights[rowIndex][colIndex] !== 9) {
        basins.push(getBasinSize(caveHeights, rowIndex, colIndex));
      }
    });
  });

  return basins
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((total, height) => total * height);
}

function getBasinSize(caveArr, row, col) {
  caveArr[row][col] = 9;
  const queue = [[row, col]];
  let size = 0;

  while (queue.length) {
    const [row, col] = queue.shift();
    size++;

    if (row > 0) {
      // above
      if (caveArr[row - 1][col] !== 9) {
        caveArr[row - 1][col] = 9;
        queue.push([row - 1, col]);
      }
    }

    if (col > 0) {
      // left
      if (caveArr[row][col - 1] !== 9) {
        caveArr[row][col - 1] = 9;
        queue.push([row, col - 1]);
      }
    }

    if (col !== caveArr[row].length - 1) {
      // right
      if (caveArr[row][col + 1] !== 9) {
        caveArr[row][col + 1] = 9;
        queue.push([row, col + 1]);
      }
    }

    if (row < caveArr.length - 1) {
      // below
      if (caveArr[row + 1][col] !== 9) {
        caveArr[row + 1][col] = 9;
        queue.push([row + 1, col]);
      }
    }
  }
  return size;
}

main().then((res) => console.log(res));
