<script lang="ts">
  import { Game } from "$lib/game.svelte.ts";
	import LetterTile from "$lib/LetterTile.svelte";

  let board = $state();
  let size:number = $state(5)
  let game;

  let swapPair:Tile[] = $state([]);

  const setup = async (s: number) => {
    game = new Game(s);
    await game.initialize();
    const grid = game.getGrid();
    const words = game.getWords();
    const filled = game.fillWaffleGrid(grid, words);
    board = game.shuffle2DArray(filled);
    // board = filled;
    
  }
  
  const shuffle = () => {
    board = game.shuffle2DArray(board);
  }

  setup(size);

  function handleTileClick(tile) {
    tile.swapStatus='';
    if (swapPair.length == 0) {
      swapPair.push(tile);
    } else if (swapPair.length == 1) {
      swapPair.push(tile);
      swapTiles(swapPair[0], swapPair[1]);
      swapPair = [];
    }
  }

  function swapTiles(tile1: Tile, tile2: Tile) {
    if(tile1.value != tile2.value) {
      [tile1.value, tile2.value] = [tile2.value, tile1.value];
      tile1.swapStatus = 'woo';
      tile2.swapStatus = 'woo';

      // if (!myBools.easierMode || (tile2.value != tile2.correctValue && tile1.value != tile1.correctValue)) {
      //   swapCounter--;
      // }
      board = game.updateTileStatuses(board);
    }
    // saveHistory();
  }

  
</script>

  <header>
    <h1>waffly</h1>
    <div class="controls">
      <button onclick={() => setup(5)}>5x5</button>
      <button onclick={() => setup(7)}>7x7</button>
      <button onclick={shuffle}>shuffle</button>
    </div>
  </header>
{#if board}
<div class="board" style="--cols: {board.length}" >
  {#each board as row, rowIndex}
    <div class="row" data-row={rowIndex}>
      {#each row as tile, colIndex}
        {#if !tile.hidden}
          <LetterTile
            {handleTileClick}
            {tile}
            {swapPair}
            delayFactor={colIndex+rowIndex}
          /> 
        {:else}
        <div class="tile blank"></div>
        {/if}
      {/each}
    </div>
  {/each}
</div>
{/if}




<style>
  header {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  .board {
    --gap: 0.5rem;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: var(--gap);
    transition: all 0.3s ease-in-out;
  }
  .row {
    display: grid;
    gap: var(--gap);
    grid-template-columns: repeat(var(--cols), 1fr);
    width: 100%;
  }

  .tile.blank {
    visibility: hidden;
  }
  @media screen and (max-width: 500px) {
    .board{
      --gap: 0.25rem;
    } 
  }
</style>
