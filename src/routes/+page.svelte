<script lang="ts">
  import type { Tile, Board, GameReturnType } from '$lib/types';
  import { createGame } from '$lib/game.svelte';
  import LetterTile from "$lib/components/LetterTile.svelte";
  import Messages from "$lib/components/Messages.svelte";
  import ChoiceButtons from "$lib/components/ChoiceButtons.svelte";

  const title = 'waffleclone';

  let board = $state({} as Board);
  let size: number = $state(15)
  let game: GameReturnType | null;
  let words = $state([]);
  let swaps: number | null | undefined = $state();
  let startingSwaps = $state();
  let choiceMade = $state(false);

  let swapPair = $state([]);

  let debug = $state(false);

  const toggleDebug = () => {
    debug = !debug;
  }

  const setup = async (s: number) => {
    size = s;
    game = createGame(s);
    await game.initialize();
    const grid = game.getGrid();
    words = game.getWords();
    board = game.fillWaffleGrid(grid, words);
    board = game.shuffle2DArray(board);
    game.resetSwaps();
    swaps = game.startingSwaps;
    startingSwaps = game.startingSwaps;
    // board = filled;
    
  }
  
  const shuffle = () => {
    game.resetSwaps();
    swaps = game?.startingSwaps;
    board = game?.shuffle2DArray(board);
  }

  // onMount(() => {
  //   setup(size);
  // })

  function handleTileClick(tile: Tile) {
    game?.swapTile(tile);
    game?.updateTileStatuses(board);
    swaps = game?.getSwaps();
  }

  const outOfTurns = $derived.by((): boolean => {
    return swaps <= 0 && !solved;
  });
  
  const solved = $derived.by(() => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j].value != board[i][j].correctValue) {
          return false;
        }
      }
    }
    return true;
  })

  function chooseGame(s: number) {
    choiceMade = true;
    setup(s);
  }

</script>

<svelte:head>
  <title>{title} {size}x{size}</title>
</svelte:head>
<header>
  <h1><button onclick={() => choiceMade = false}>{title}</button></h1>
  <!-- <div class="controls">
    <button onclick={() => setup(5)}>5x5</button>
    <button onclick={() => setup(7)}>7x7</button>
    <button onclick={shuffle}>shuffle</button>
    <div>size: {size}</div>
  </div> -->
</header>
{#if debug}
  <div class="debug">{words}</div>
{/if}
{#if !choiceMade}
<ChoiceButtons {chooseGame} />  
{/if}
{#if board && choiceMade}
<div class="board" class:solved={solved} class:failed={outOfTurns} style="--cols: {board.length}" >
  {#each board as row, rowIndex}
    <div class="row" data-row={rowIndex}>
      {#each row as tile, colIndex}
        {#if !tile.hidden}
          <LetterTile
            {handleTileClick}
            {tile}
            {swapPair}
            {solved} {outOfTurns}
            delayFactor={colIndex+rowIndex}
          /> 
        {:else}
        <div class="tile blank"></div>
        {/if}
      {/each}
    </div>
  {/each}
</div>

<Messages {toggleDebug} {swaps} {startingSwaps} {outOfTurns} {solved} {chooseGame} {shuffle} />

{/if}


<style>
  header {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    width: 100%;
  }
  h1 {
    margin: 0 0 1rem 0;
  }
  h1 button {
    margin: 0;
    padding: 0;
    font-size: 1.2rem;
    font-weight: bold;
    text-transform: uppercase;
    /* color: var(--ccolor); */
    background: linear-gradient(0deg, var(--ccolor), var(--icolor));
    background: -webkit-linear-gradient(0deg, var(--ccolor), var(--icolor));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
  }
  .board {
    --gap: 0.5rem;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: var(--gap);
    transition: all 0.3s ease-in-out;
  }

  .board.failed {
    opacity: 0.5;
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

  .debug {
    position: fixed;
    bottom: 0;
    right: 0;
    background-color: hsla(0, 0%, 0%, 0.25);
    color: #fff;
    padding: 0.5rem 1rem;
    z-index: 1000;
    font-size: 0.8rem;
  }
</style>