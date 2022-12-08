import fs from "fs/promises"
import { PatternsMap } from "./types";

async function main(file: string) {
  const data: string = await fs.readFile(file, { encoding: "utf-8" });
  const [signalEntries, outputEntries]: string[][][] = data.split("\r\n").reduce(
    (dataArrays: string[][][], line) => {
      const [signal, output] = line.split(" | ");
      dataArrays[0].push(signal.split(" "));
      dataArrays[1].push(output.split(" "));
      return dataArrays;
    },
    [[], []]
  );

  let ocurrencesOf1478: number = 0;
  let total: number = 0;
  signalEntries.forEach((entry, i) => {
    const signalPatterns: PatternsMap = mapSignalPatterns(entry);
    ocurrencesOf1478 += count1478SignalOcurrences(signalPatterns, outputEntries[i]);
    total += getOutputNumber(signalPatterns, outputEntries[i]);
  });

  return {
    PartA: ocurrencesOf1478,
    PartB: total,
  };
}

const orderSignal = (signal: string): string => signal.split("").sort().join("");

function mapSignalPatterns(signals: Array<string>): PatternsMap {
  const patternsMap: PatternsMap = signals.reduce((patternsMap: PatternsMap, signal) => {
    if (signal.length === 2) {
      patternsMap[orderSignal(signal)] = 1;
    } else if (signal.length === 3) {
      patternsMap[orderSignal(signal)] = 7;
    } else if (signal.length === 4) {
      patternsMap[orderSignal(signal)] = 4;
    } else if (signal.length === 7) {
      patternsMap[orderSignal(signal)] = 8;
    }
    return patternsMap;
  }, {});

  const [onePanels, fourPanels, midSquareAnglePanels] = getHelperPanels(patternsMap);

  signals.forEach((signal) => {
    if (signal.length === 5) {
      if (onePanels.every((panel) => signal.includes(panel))) {
        patternsMap[orderSignal(signal)] = 3;
      } else if (
        midSquareAnglePanels.every((panel) => signal.includes(panel))
      ) {
        patternsMap[orderSignal(signal)] = 5;
      } else {
        patternsMap[orderSignal(signal)] = 2;
      }
    } else if (signal.length === 6) {
      if (fourPanels.every((panel) => signal.includes(panel))) {
        patternsMap[orderSignal(signal)] = 9;
      } else if (
        midSquareAnglePanels.every((panel) => signal.includes(panel))
      ) {
        patternsMap[orderSignal(signal)] = 6;
      } else {
        patternsMap[orderSignal(signal)] = 0;
      }
    }
  });
  return patternsMap;
};

function getHelperPanels(patternsMap: PatternsMap): string[][] {
  let onePanels: Array<string> = [], fourPanels: Array<string> = [];
  for (const [signal, output] of Object.entries(patternsMap)) {
    if (output === 1) onePanels = signal.split("");
    else if (output === 4) fourPanels = signal.split("");
  }
  const midSquareAnglePanels = fourPanels.filter((char) => !onePanels.includes(char));
  return [onePanels, fourPanels, midSquareAnglePanels];
};

function count1478SignalOcurrences(patternsMap: PatternsMap, outputs: Array<string>): number {
  const nums: Array<number> = [1, 4, 7, 8];
  return outputs.reduce((count, output) => {
    const orderedSignal = orderSignal(output);
    if (nums.includes(patternsMap[orderedSignal])) count++;
    return count;
  }, 0);
};

function getOutputNumber(patternsMap: PatternsMap, outputs: Array<string>): number {
  return Number(outputs.reduce((panel, output) => panel + patternsMap[orderSignal(output)], ""));
};

main("input.txt").then((res) => console.log(res));
