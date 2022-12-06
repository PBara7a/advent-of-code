export type CardNumber = {
  [key: string]: boolean;
};

export type Line = Array<CardNumber>;

export type Card = Array<Line>;
