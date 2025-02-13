import type { Tile, Board } from '$lib/types';
import { pickSixWords, pickEightWords } from "$lib/pickWords";

// word puzzle played on a 5x5 or 7x7 grid

export const myBools = $state({
  helperPositions: false
})

export class Game {
  constructor(gridSize) {
    this.gridSize = gridSize;
    this.grid = this.generateGrid(gridSize);
    this.words = null;
  }

  async initialize() {
    this.words = await this.pickWords(this.gridSize);
  }

  generateGrid(gridSize) {
    const grid = [];
    for (let r = 0; r < gridSize; r++) {
      const row = [];
      for (let c = 0; c < gridSize; c++) {
        const hidden = (r%2 == 1 && c%2 == 1);
        const tile: Tile = {value: ``, correctValue: ``, status: '', x: r, y: c, swapStatus: '', hidden: hidden};
        row.push(tile);
      }
      grid.push(row);
    }
    return grid;
  }

  fillWaffleGrid = (grid, words) => {
    const gridSize = grid.length;
    for (let i = 0; i < words.length; i++) {
      switch (i) {
        case 0:
          for (let x = 0; x < gridSize; x++) {
            grid[0][x].value = words[i][x];
            grid[0][x].correctValue = words[i][x];
          }
          break;
        case 1:
          for (let x = 0; x < gridSize; x++) {
            grid[x][gridSize-1].value = words[i][x];
            grid[x][gridSize-1].correctValue = words[i][x];          
          }
          break;
          case 2:
            for (let x = 0; x < gridSize; x++) {
            grid[gridSize-1][x].value = words[i][x];
            grid[gridSize-1][x].correctValue = words[i][x];
          }
          break;
        case 3:
          for (let x = 0; x < gridSize; x++) {
            grid[x][0].value = words[i][x];
            grid[x][0].correctValue = words[i][x];
          }
          break;
        case 4:
          for (let x = 0; x < gridSize; x++) {
            grid[x][2].value = words[i][x];
            grid[x][2].correctValue = words[i][x];
          }
          break;
        case 5:
          for (let x = 0; x < gridSize; x++) {
            if(gridSize == 5) {
              grid[2][x].value = words[i][x];
              grid[2][x].correctValue = words[i][x];
            } else {
              grid[x][4].value = words[i][x];
              grid[x][4].correctValue = words[i][x];
            }
          }
          break;
          case 6:
          for (let x = 0; x < gridSize; x++) {
            grid[2][x].value = words[i][x];
            grid[2][x].correctValue = words[i][x];
          }
          break;
        case 7:
          for (let x = 0; x < gridSize; x++) {
            grid[4][x].value = words[i][x];
            grid[4][x].correctValue = words[i][x];
          }
          break;
        default:
          break;
      }
    }
    this.updateTileStatuses(grid);
    return grid;
  }

  shuffle2DArray(myArray: Tile[][]) {
    const gridSize = myArray.length;
    // Flatten the 2D array into a 1D array
    const flatArr = myArray.flat(); //.filter(a => a.value !== '');
    // const excludedPositions = ["11", "13", "15", "31", "33", "35", "51", "53", "55", "00", "22",]; // including top corner and 2,2
    const excludedPositions = myBools.helperPositions ? ["00", "22",] : [];
  
    // Fisher-Yates shuffle algorithm
    for (let i = flatArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // don't swap if either of the two tiles are in excluded positions

      let a = flatArr[i].x +''+ flatArr[i].y;
      let b = flatArr[j].x +''+ flatArr[j].y;
      // if( excludedPositions.includes(a) || excludedPositions.includes(b) ) {
      if (flatArr[i].hidden || flatArr[j].hidden || excludedPositions.includes(a) || excludedPositions.includes(b)) {
        continue;
      } else {
        [flatArr[i].correctValue, flatArr[j].correctValue] = [flatArr[j].correctValue, flatArr[i].correctValue];
        [flatArr[i], flatArr[j]] = [flatArr[j], flatArr[i]];
      }   
    }
  
    // Reconstruct the 2D array
    let shuffledArray = [];
    while (flatArr.length) {
      shuffledArray.push(flatArr.splice(0, myArray[0].length));
    }
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        shuffledArray[i][j].x = i;
        shuffledArray[i][j].y = j;
      }
    }
    this.updateTileStatuses(shuffledArray);
    return shuffledArray;
  }

  async pickWords(gridSize) {
    console.log('pickWords: ', gridSize);
    const words = gridSize === 5 ? await pickSixWords() : await pickEightWords();
    return words;
  }

  getGrid() {
    return this.grid;
  }
  
  getWords() {
    return this.words;
  }

  getRow(row: number, arr: Board) {
    return arr[row];
  }
  
  getCol(col: number, arr: Board) {
    return arr.map(x => x[col]);
  }
  
  countAppearances(arr: string[]) {
    let counts: { [key: string]: number } = {};
    for (let i = 0; i < arr.length; i++) {
      counts[arr[i]] = counts[arr[i]] ? counts[arr[i]] + 1 : 1;
    }
    return counts;
  }
  updateTileStatuses(grid) {
    const gridSize = grid.length;
    for(let twice = 0; twice < 2; twice++) {
    for(let r= 0; r < gridSize; r++) {
      for(let c= 0; c < gridSize; c++) {
        let rowLetters = this.getRow(r, grid).filter((l:Tile) => l.status != 'c').map((x:Tile) => x.correctValue);
        let colLetters = this.getCol(c, grid).filter((l:Tile) => l.status != 'c').map((x:Tile) => x.correctValue);
        let value = grid[r][c].value;
        
        let rowOnly = (r%2 == 0 && c%2 == 1);
        let columnOnly = (r%2 == 1 && c%2 == 0);
  
        let testAgainst = columnOnly ? colLetters : rowOnly ? rowLetters : [...rowLetters, ...colLetters];
        let counts = this.countAppearances(testAgainst);
  
        if(Object.keys(counts).includes(value)) {
          grid[r][c].status = 'i';
        } else {
          grid[r][c].status = 'x';
        }
        if (value == grid[r][c].correctValue) {
          grid[r][c].status = 'c';
        }
      }
    }
  }
    return grid;
  }
}









// example usage

// (async () => {
//   const game = new Game(5);
//   await game.initialize();
//   const grid = game.getGrid();
//   const words = game.getWords();
//   // console.log(grid);
//   console.log('words: ', words);

// })();
