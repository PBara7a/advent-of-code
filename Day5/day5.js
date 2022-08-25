const fs = require("fs");

const input = fs
  .readFileSync("day5.txt", { encoding: "utf-8" })
  .split(/\n/)
  .map((x) =>
    x
      .trim()
      .split(/ -> /)
      .map((coor) =>
        coor.split(",").reduce((coorObj, cur, i) => {
          if (i === 0) coorObj.x = parseInt(cur);
          else if (i === 1) coorObj.y = parseInt(cur);

          return coorObj;
        }, {})
      )
  );

class Line {
  constructor(startCoordinate, endCoordinate) {
    this.start = startCoordinate;
    this.end = endCoordinate;
  }

  isVerticalLine() {
    return this.start.x === this.end.x;
  }

  isHorizontalLine() {
    return this.start.y === this.end.y;
  }

  getAllPoints() {
    const orderedXPoints = [this.start.x, this.end.x].sort((a, b) => a - b);
    const orderedYPoints = [this.start.y, this.end.y].sort((a, b) => a - b);

    const points = [];

    if (this.isVerticalLine()) {
      for (let i = orderedYPoints[0]; i <= orderedYPoints[1]; i++) {
        points.push({ x: this.start.x, y: i });
      }
    } else if (this.isHorizontalLine()) {
      for (let i = orderedXPoints[0]; i <= orderedXPoints[1]; i++) {
        points.push({ x: i, y: this.start.y });
      }
    } else {
      const diffX = this.start.x - this.end.x;
      const diffY = this.start.y - this.end.y;
      const coor = { ...this.start };

      points.push({ x: coor.x, y: coor.y });

      while (coor.x !== this.end.x || coor.y !== this.end.y) {
        diffX > 0 ? coor.x-- : coor.x++;
        diffY > 0 ? coor.y-- : coor.y++;
        points.push({ x: coor.x, y: coor.y });
      }
    }

    return points;
  }
}

// Part 1
const part1 = () => {
  const pointsMap = {};
  let pointsWhereLinesOverlapTwiceOrMore = 0;

  for (const l of input) {
    const line = new Line(...l);

    if (line.isHorizontalLine() || line.isVerticalLine()) {
      const points = line.getAllPoints();

      for (const point of points) {
        const pointStr = JSON.stringify(point);

        if (pointsMap[pointStr]) {
          pointsMap[pointStr]++;
        } else {
          pointsMap[pointStr] = 1;
        }
      }
    }
  }

  for (const point in pointsMap) {
    if (pointsMap[point] > 1) {
      pointsWhereLinesOverlapTwiceOrMore++;
    }
  }

  return pointsWhereLinesOverlapTwiceOrMore;
};

console.log("Number of points where at least two lines overlap: ", part1());

// Part 2
const part2 = () => {
  const pointsMap = {};
  let pointsWhereLinesOverlapTwiceOrMore = 0;

  for (const l of input) {
    const line = new Line(...l);

    const points = line.getAllPoints();

    for (const point of points) {
      const pointStr = JSON.stringify(point);

      if (pointsMap[pointStr]) {
        pointsMap[pointStr]++;
      } else {
        pointsMap[pointStr] = 1;
      }
    }
  }

  for (const point in pointsMap) {
    if (pointsMap[point] > 1) {
      pointsWhereLinesOverlapTwiceOrMore++;
    }
  }

  return pointsWhereLinesOverlapTwiceOrMore;
};

console.log("Number of points where at least two lines overlap: ", part2());
