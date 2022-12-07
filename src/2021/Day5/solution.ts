import fs from "fs/promises";
import { Line } from "./classes";
import { Coordinate } from "./types";

async function main(file: string) {
  const data: string = await fs.readFile(file, { encoding: "utf-8" });
  const lines: Coordinate[][] = data.split("\r\n").map((line) =>
    line.split(" -> ").map((coord) =>
      coord.split(",").reduce((coorObj: Coordinate, cur, i) => {
        if (i === 0) coorObj.x = parseInt(cur);
        else if (i === 1) coorObj.y = parseInt(cur);
        return coorObj;
      }, {x: 0, y: 0})
    )
  );

  const dangerPoints = numOfDangerousPoints(lines);

  return {
    PartA: dangerPoints.horizontalAndVertical,
    PartB: dangerPoints.allLines,
  };
}

const numOfDangerousPoints = (lines: Coordinate[][]) => {
  const lineObjects: Array<Line> = lines.map((line) => new Line(line[0], line[1]));

  const mapOfHorizonalAndVertical: Record<string, number> = mapPoints(lineObjects);
  const dangerPoints: number = Object.values(mapOfHorizonalAndVertical).filter((value) => value > 1).length;

  const mapOfAllLines: Record<string, number> = mapPoints(lineObjects, true);
  const dangerPoints2: number = Object.values(mapOfAllLines).filter((value) => value > 1).length;

  return {
    horizontalAndVertical: dangerPoints,
    allLines: dangerPoints2,
  };
};

const mapPoints = (lineObjects: Array<Line>, checkAll: boolean = false): Record<string, number> => {
  const pointMap: Record<string, number> = {};

  lineObjects.forEach((line) => {
    const condition: boolean = checkAll || line.isHorizontalLine() || line.isVerticalLine();

    if (condition) {
      const points: Array<Coordinate> = line.getAllPoints();

      points.forEach((point) => {
        const pointStr: string = JSON.stringify(point);
        pointMap[pointStr] = (pointMap[pointStr] || 0) + 1;
      });
    }
  });
  return pointMap;
};

main("input.txt").then((res) => console.log(res));
