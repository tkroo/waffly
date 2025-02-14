<script lang="ts">
  import type { Tile, Board, GameReturnType } from '$lib/types';
  import { createGame } from '$lib/game.svelte';
  import ChoiceButtons from "$lib/components/ChoiceButtons.svelte";
	import Header from '$lib/components/Header.svelte';
  import LetterTile from "$lib/components/LetterTile.svelte";
  import Messages from "$lib/components/Messages.svelte";
  import Stats from '$lib/components/Stats.svelte';

  const title = 'waffleclone';

  let board = $state({} as Board);
  let size: number = $state(15)
  let game: GameReturnType | null;
  let words = $state([]);
  let swaps: number | null | undefined = $state();
  let startingSwaps = $state();
  
  let swapPair = $state([]);
  
  let choiceMade = $state(false);
  let showPopup = $state(false);
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

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key == '-') {
      debug = !debug;
    }
    if (e.key == '=') {
      shuffle();
    }
    // if (e.key == '0') {
    //   myBools.cheat = !myBools.cheat;
    // }
    if (e.key == '5') {
      chooseGame(5);
    }
    if (e.key == '7') {
      chooseGame(7);
    }
    if (e.key == 's') {
      board = game?.solveGrid(board); 
      board = game?.updateTileStatuses(board);
    }
    if (e.key == ']') {
      swaps++;
    }
    if (e.key == '[') {
      swaps--;
    }
  }

</script>
<svelte:window onkeydown={handleKeyDown} />
<svelte:head>
  <title>{title} {size}x{size}</title>
</svelte:head>
<Header {title} {showPopup} bind:choiceMade />
{#if debug}
  <div class="debug">{words}</div>
{/if}
{#if !choiceMade}
<div class="choices">
  <ChoiceButtons {chooseGame} />
</div>
{/if}
{#if board && choiceMade && words.length > 0}
<Stats {board} />
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
{:else}
{#if choiceMade && words.length == 0}
  <p class="error">Failed to create puzzle. Try again.</p>
  <div class="choices">
    <ChoiceButtons {chooseGame} />
  </div>
  {/if}
{/if}


<style>
  .choices {
    margin-top: 5rem;
    font-size: 1.5rem;
    width: 100%;
  }
  .board {
    --gap: 0.5rem;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: var(--gap);
    transition: all 0.3s ease-in-out;
    container-type: inline-size;
    
    width: 100%;
    /* border: 1px dashed dodgerblue; */
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
  .error {
    color: rgb(211, 64, 64);
    font-size: 1.5rem;
    text-align: center;
    margin: 1rem auto;
  }
</style>