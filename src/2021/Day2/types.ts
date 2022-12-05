export interface MovementsMap {
  [key: string]: (coords: Array<number>, value: number) => void;
}
