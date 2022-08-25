const fs = require("fs");

const input = fs
  .readFileSync("day4.txt", { encoding: "utf-8" })
  .split(/\r\n\r/);

const bingoNumbers = input
  .shift()
  .split(",")
  .map((x) => parseInt(x));

const cardsData = input
  .map((x) => x.split(/\r\n/g))
  .map((card) =>
    card.map((line) =>
      line
        .trim()
        .split(" ")
        .filter((x) => x)
        .map((num) => parseInt(num))
    )
  )
  .filter((card) => card.length === 5);

class Card {
  constructor(lines) {
    this.lines = lines.map((line) =>
      line.map((num) => ({ num, marked: false }))
    );
    this.markedWin = false;
  }

  markNumber(num) {
    const foundNum = this._findNumber(num);

    if (foundNum) foundNum.marked = true;
  }

  markCard() {
    this.markedWin = true;
  }

  checkCard() {
    let cardWon = false;

    this.lines.forEach((line) => {
      if (this._isMarkedLine(line)) {
        cardWon = true;
      }
    });

    for (let i = 0; i < this.lines[0].length; i++) {
      if (this._isMarkedColumn(i)) {
        cardWon = true;
      }
    }

    return cardWon;
  }

  calculateScore(lastNum) {
    let total = 0;

    for (const line of this.lines) {
      total += line.reduce((acc, cur) => {
        if (!cur.marked) {
          acc += cur.num;
        }
        return acc;
      }, 0);
    }
    return total * lastNum;
  }

  _findNumber(num) {
    for (const line of this.lines) {
      const found = line.find((el) => el.num === num);

      if (found) return found;
    }
  }

  _isMarkedLine(line) {
    return line.every((num) => num.marked);
  }

  _isMarkedColumn(index) {
    return this.lines.every((line) => line[index].marked);
  }
}

const cards = cardsData.map((item) => new Card(item));

// Part 1
const part1 = () => {
  for (const number of bingoNumbers) {
    for (const card of cards) {
      card.markNumber(number);

      const cardWon = card.checkCard();

      if (cardWon) return card.calculateScore(number);
    }
  }
};

console.log("Final score of winning card: ", part1());

// Part 2
const part2 = () => {
  let numOfCardsInPlay = cards.length;

  for (const number of bingoNumbers) {
    for (const card of cards) {
      card.markNumber(number);

      const cardWon = card.checkCard();

      if (cardWon && !card.markedWin) {
        card.markCard();
        numOfCardsInPlay--;
      }

      if (numOfCardsInPlay === 0) {
        return card.calculateScore(number);
      }
    }
  }
};

console.log("Final score of last winning card: ", part2());
