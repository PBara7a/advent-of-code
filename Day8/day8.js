const fs = require("fs");

const input = fs.readFileSync("day8.txt", { encoding: "utf-8" }).split("\r\n");

const orderSignal = (signal) => signal.split("").sort().join("");

let signalPatternsMap;

// Part 1
let count = 0;

input.forEach((line) => {
  signalPatternsMap = {};
  const [signalPatterns, outputDigits] = line.split(" | ");

  signalPatterns.split(" ").forEach((signal) => {
    if (signal.length === 2) {
      signalPatternsMap[orderSignal(signal)] = 1;
    } else if (signal.length === 3) {
      signalPatternsMap[orderSignal(signal)] = 7;
    } else if (signal.length === 4) {
      signalPatternsMap[orderSignal(signal)] = 4;
    } else if (signal.length === 7) {
      signalPatternsMap[orderSignal(signal)] = 8;
    }
  });

  outputDigits.split(" ").forEach((digit) => {
    const orderedSignal = orderSignal(digit);

    if (signalPatternsMap[orderedSignal] !== undefined) {
      count++;
    }
  });
});

console.log("Digits 1, 4, 7, or 8 appear ", count, " times.");

// Part 2
let total = 0;

input.forEach((line) => {
  signalPatternsMap = {};
  const [signalPatterns, outputDigits] = line.split(" | ");

  // Map patterns of numbers with a unique number of segments
  signalPatterns.split(" ").forEach((signal) => {
    if (signal.length === 2) {
      signalPatternsMap[orderSignal(signal)] = 1;
    } else if (signal.length === 3) {
      signalPatternsMap[orderSignal(signal)] = 7;
    } else if (signal.length === 4) {
      signalPatternsMap[orderSignal(signal)] = 4;
    } else if (signal.length === 7) {
      signalPatternsMap[orderSignal(signal)] = 8;
    }
  });

  // Find the panels that lit "one" and "four"
  let onePanels, fourPanels;
  for (const [key, value] of Object.entries(signalPatternsMap)) {
    if (value === 1) onePanels = key.split("");
    else if (value === 4) fourPanels = key.split("");
  }

  // Find the panels that lit the left square angle of a "four"
  const midSquareAnglePanels = fourPanels.filter(
    (char) => !onePanels.includes(char)
  );

  // Map patterns of numbers with 5 and 6 segments
  signalPatterns.split(" ").forEach((signal) => {
    const orderedSignal = orderSignal(signal);

    switch (signal.length) {
      case 5:
        if (onePanels.every((panel) => signal.includes(panel))) {
          signalPatternsMap[orderedSignal] = 3;
        } else if (
          midSquareAnglePanels.every((panel) => signal.includes(panel))
        ) {
          signalPatternsMap[orderedSignal] = 5;
        } else {
          signalPatternsMap[orderedSignal] = 2;
        }
        break;

      case 6:
        if (fourPanels.every((panel) => signal.includes(panel))) {
          signalPatternsMap[orderedSignal] = 9;
        } else if (
          midSquareAnglePanels.every((panel) => signal.includes(panel))
        ) {
          signalPatternsMap[orderedSignal] = 6;
        } else {
          signalPatternsMap[orderedSignal] = 0;
        }
        break;

      default:
        break;
    }
  });

  // Find output value and add to total
  let outputValue = "";

  outputDigits.split(" ").forEach((digit) => {
    const orderedSignal = orderSignal(digit);

    outputValue += signalPatternsMap[orderedSignal];
  });

  total += Number(outputValue);
});

console.log("The sum of all output digits is", total);
