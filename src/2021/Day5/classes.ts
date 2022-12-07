import { Coordinate } from "./types";

export class Line {
  start: Coordinate;
  end: Coordinate;
  constructor(startCoordinate: Coordinate, endCoordinate: Coordinate) {
    this.start = startCoordinate;
    this.end = endCoordinate;
  }

  isVerticalLine(): boolean {
    return this.start.x === this.end.x;
  }

  isHorizontalLine(): boolean {
    return this.start.y === this.end.y;
  }

  getAllPoints(): Array<Coordinate> {
    const orderedXPoints = [this.start.x, this.end.x].sort((a, b) => a - b);
    const orderedYPoints = [this.start.y, this.end.y].sort((a, b) => a - b);
    const points: Array<Coordinate> = [];

    if (this.isVerticalLine()) {
      for (let i = orderedYPoints[0]; i <= orderedYPoints[1]; i++) {
        points.push({ x: this.start.x, y: i });
      }
    } else if (this.isHorizontalLine()) {
      for (let i = orderedXPoints[0]; i <= orderedXPoints[1]; i++) {
        points.push({ x: i, y: this.start.y });
      }
    } else {
      const diffX: number = this.start.x - this.end.x;
      const diffY: number = this.start.y - this.end.y;
      const coord: Coordinate = { ...this.start };
      points.push({ x: coord.x, y: coord.y });

      while (coord.x !== this.end.x || coord.y !== this.end.y) {
        diffX > 0 ? coord.x-- : coord.x++;
        diffY > 0 ? coord.y-- : coord.y++;
        points.push({ x: coord.x, y: coord.y });
      }
    }

    return points;
  }
}
