export const handsMap: Record<string, number> = {
  A: 0,
  B: 1,
  C: 2,
  X: 0,
  Y: 1,
  Z: 2,
};

export const resultsMap: Record<string, Record<string, string>> = {
  // X = lose, Y = draw, Z = win
  X: {
    A: "C",
    B: "A",
    C: "B",
  },
  Y: {
    A: "A",
    B: "B",
    C: "C",
  },
  Z: {
    A: "B",
    B: "C",
    C: "A",
  },
};
