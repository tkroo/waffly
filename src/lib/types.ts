export type Tile = { value: string; correctValue: string; status: string; x: number; y: number, swapStatus: string, hidden: boolean };
export type Board = Tile[][];