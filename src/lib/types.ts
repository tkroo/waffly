// export type Tile = { value: string; correctValue: string; status: string; x: number; y: number, swapStatus: string, hidden: boolean };
// export type Board = Tile[][] | null;
export interface Tile {
  value: string;
  correctValue: string;
  status: string;
  x: number;
  y: number;
  swapStatus: string;
  hidden: boolean;
}
export type Board = Tile[][];
export type GameReturnType = {
  gridSize: number;
  grid: Board;
  words: string[] | null;
  initialize: () => Promise<void>;
  generateGrid: (gridSize: number) => Board;
  fillWaffleGrid: (grid: Board, words: string[]) => Board;
  shuffle2DArray: (myArray: Board) => Board;
  pickWords: (gridSize: number) => Promise<string[]>;
  getGrid: () => Board;
  getWords: () => string[] | null;
  getRow: (row: number, arr: Board) => Tile[];
  getCol: (col: number, arr: Board) => Tile[];
  solveGrid: (grid: Board) => Board;
  countAppearances: (arr: string[]) => { [key: string]: number; };
  updateTileStatuses: (grid: Board) => Board;
  swapTile: (tile: Tile) => void; // Added swapTile function
  getSwaps: () => number;
  swaps: number;
  startingSwaps: number | null;
};
