const fs = require("fs")

const input = fs.readFileSync("day8.txt", { encoding: "utf-8" }).split("\n")

const orderSignal = (signal) => signal.split("").sort().join("")

// Part 1
const signalPatternsMap = {}
let count = 0

input.forEach(line => {
  const [signalPatterns, outputDigits] = line.split(" | ")

  signalPatterns.split(" ").forEach(signal => {
    if (signal.length === 2) {
      signalPatternsMap[orderSignal(signal)] = 1
    } else if (signal.length === 3) {
      signalPatternsMap[orderSignal(signal)] = 7
    } else if (signal.length === 4) {
      signalPatternsMap[orderSignal(signal)] = 4
    } else if (signal.length === 7) {
      signalPatternsMap[orderSignal(signal)] = 8
    }
  })

  outputDigits.split(" ").forEach(digit => {
    const orderedSignal = orderSignal(digit)

    if (signalPatternsMap[orderedSignal] !== undefined) {
      count++
    }
  })
})

console.log("Digits 1, 4, 7, or 8 appear ", count, " times.")
