const fs = require("fs");

const input = fs
  .readFileSync("day6.txt", { encoding: "utf-8" })
  .split(",")
  .map((el) => Number(el));

const NUM_OF_DAYS = 256;

// Part 1
const getFishPopulationModel = (fishTimers, currentDay, numOfDays) => {
  if (currentDay === numOfDays) return fishTimers;

  let numberOfNewFish = 0;

  const fishTimersArr = fishTimers.map((fish) => {
    const timer = fish - 1;

    if (timer < 0) {
      numberOfNewFish++;
      return 6;
    }

    return timer;
  });

  for (let i = 0; i < numberOfNewFish; i++) {
    fishTimersArr.push(8);
  }

  return getFishPopulationModel(fishTimersArr, currentDay + 1, numOfDays);
};

// const fishAfter = getFishPopulationModel(input, 0, NUM_OF_DAYS);

// console.log("Number of lanterfish: ", fishAfter.length);

// Part 2
const fishTimersObj = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };

input.forEach((fishTimer) => (fishTimersObj[fishTimer] += 1));

const improvedGetFishPopulationModel = (timersObj, currentDay, numOfDays) => {
  if (currentDay === numOfDays) return timersObj;

  const numberOfNewFish = timersObj[0];
  const newFishTimersObj = {};

  for (const timer in timersObj) {
    if (timer - 1 >= 0) {
      newFishTimersObj[timer - 1] = timersObj[timer];
    }
  }

  newFishTimersObj[6] += numberOfNewFish;
  newFishTimersObj[8] = numberOfNewFish;

  return improvedGetFishPopulationModel(
    newFishTimersObj,
    currentDay + 1,
    numOfDays
  );
};

const fishTimersObjAfterXDays = improvedGetFishPopulationModel(
  fishTimersObj,
  0,
  NUM_OF_DAYS
);

const numOfFish = Object.values(fishTimersObjAfterXDays).reduce(
  (a, b) => a + b
);

console.log("Number of lanterfish: ", numOfFish);
