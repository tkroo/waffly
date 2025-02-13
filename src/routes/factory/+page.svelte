<script lang="ts">
  import type { Tile, Board, GameReturnType } from '$lib/types';
  import { createGame } from '$lib/game2.svelte';
  import LetterTile from "$lib/LetterTile.svelte";
  import { onMount } from 'svelte';

  let board = $state({} as Board);
  let size: number = $state(5)
  let game: GameReturnType | null;
  let words = $state([]);

  let swapPair = $state([]);

  const setup = async (s: number) => {
    game = createGame(s);
    await game.initialize();
    const grid = game.getGrid();
    words = game.getWords();
    const filled = game.fillWaffleGrid(grid, words);
    board = game.shuffle2DArray(filled);
    // board = filled;
    
  }
  
  const shuffle = () => {
    board = game?.shuffle2DArray(board);
  }

  onMount(() => {
    setup(size);
  })

  function handleTileClick(tile: Tile) {
    game.swapTile(tile);
    game.updateTileStatuses(board);
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
{#if words}<p>{words}</p>{/if}
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