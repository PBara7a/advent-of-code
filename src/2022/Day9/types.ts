export type KnotCoord = {
  x: number,
  y: number
}

export type Move = [string, number]

export type HeadMovements = {
  [key: string]: (coord: KnotCoord) => number,
}