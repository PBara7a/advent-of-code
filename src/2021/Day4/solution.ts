import fs from "fs/promises";
import { Card, Line, CardNumber } from "./types";

async function main() {
  const data: string = await fs.readFile("input.txt", { encoding: "utf-8" });
  const rawNums: Array<string> = data.split("\r\n\r\n");

  const bingoNumbers: Array<number> = rawNums
    .shift()!
    .split(",")
    .map(Number);

  const cards: Array<Card> = rawNums.map((card) =>
    card.split("\r\n").map((line) =>
      line
        .split(" ")
        .filter(Boolean)
        .map((num) => ({ [num]: false }))
    )
  );

  const [firstScore, lastScore] = getScores(bingoNumbers, cards);

  return {
    PartA: firstScore,
    PartB: lastScore,
  };
}

function getScores(bingoNumbers: Array<number>, cards: Array<Card>): Array<number> {
  let remainingCardsNum = cards.length;
  const winningScores: Record<string, number> = {};
  const winnerIndeces: Array<number> = [];

  for (const num of bingoNumbers) {
    if (!remainingCardsNum) break
    for (let i = 0; i < cards.length; i++) {
      markNumber(cards[i], num);

      if (isWinnerCard(cards[i]) && !(i in winningScores)) {
        winningScores[i] = calculateScore(cards[i], num);
        winnerIndeces.push(i);
        remainingCardsNum--;
      } 
    }
  }
  const firstWinnerScore = winningScores[winnerIndeces[0]];
  const lastWinnerScore = winningScores[winnerIndeces[winnerIndeces.length - 1]];
  return [firstWinnerScore, lastWinnerScore];
}

function markNumber(card: Card, number: number): void {
  card.forEach((line) => {
    const foundNumObj = line.find((obj) => number in obj);
    if (foundNumObj) foundNumObj[number] = true;
  });
}

function isWinnerCard(card: Card): boolean {
  const hasWinningLine: boolean = card.some((line) => isWinningLine(line));
  const hasWinningColumn: boolean = card[0].reduce((isWinner: boolean, _: CardNumber, i: number) => {
      if (isWinningColumn(card, i)) isWinner = true;
      return isWinner;
  }, false);

  return hasWinningLine || hasWinningColumn;
}

function isWinningLine(line: Line): boolean {
  return line.every((obj) => Boolean(Object.values(obj)[0]));
}

function isWinningColumn(card: Card, col: number): boolean {
  return card.every((line) => Boolean(Object.values(line[col])[0]));
}

function calculateScore(card: Card, lastNumber: number): number {
  return (card.reduce((total, line) => {
      return (total + line.reduce((lineTotal, numObj) => {
        const [number, isMarked] = Object.entries(numObj)[0];
        if (!isMarked) lineTotal += Number(number);
        return lineTotal;
      }, 0));
    }, 0) * lastNumber
  );
}

main().then((res) => console.log(res));
