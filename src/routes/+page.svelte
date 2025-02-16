<script lang="ts">
  import { navigating, page } from '$app/state';
  import { onMount } from 'svelte';
  import { onNavigate, beforeNavigate, pushState, goto } from '$app/navigation';
  import { decodeText, encodeText } from '$lib/rot13.js';
  import type { Tile, Board, GameReturnType } from '$lib/types';
  import { createGame } from '$lib/game.svelte';
  import { myBools } from '$lib/utils.svelte.js';
  import ChoiceButtons from "$lib/components/ChoiceButtons.svelte";
	import Debug from '$lib/components/Debug.svelte';
	import Header from '$lib/components/Header.svelte';
  import LetterTile from "$lib/components/LetterTile.svelte";
  import Messages from "$lib/components/Messages.svelte";
  import Stats from '$lib/components/Stats.svelte';

  let { data } = $props();

  const title = 'waffleclone';

  let board = $state({} as Board);
  let game: GameReturnType | null;
  let words: string[] | null = $state([]);
  let swaps: number | null | undefined = $state();
  let startingSwaps = $state();
  
  let myURL = $state();
  let showPopup = $state(false);
  
  

  const toggleDebug = () => {
    myBools.debug = !myBools.debug;
  }

  onMount(() => {
    console.log('-- ONMOUNT ONMOUNT ONMOUNT ONMOUNT ONMOUNT');
    checkForPuzzle();
  })

  const handleNav = () => {
    checkForPuzzle();
  }

  const checkForPuzzle = () => {
    const p = getPuzzleFromSearchParam();
    if (p !== null) {
      chooseGame(p.size, p.puzzle);
    } else {
      return null;
    }
  }

  const chooseGame = (s: number, puzzle: string[]) => {
    if(puzzle !== undefined) {
      setup(s, puzzle)
    } else {
      setup(s, null);
    }
    
  }

  const getPuzzleFromSearchParam = () => {
    const p = page.url.searchParams.get('p');
    if (p !== null) {
      const puzzle = decodeText(p);
      const size = parseInt(p[0]);
      return ({ size: size, puzzle: puzzle });
    } else {
       return null;
     }

    // if (data.puzzle) {
    //   const size:number = parseInt(data.puzzle[0]);
    //   const puzzle = decodeText(data.puzzle);
    //   console.log('++ gPFSP: size: ', size, 'puzzle: ', puzzle);
    //   return ({ size: size, puzzle: puzzle });
    // } else {
    //   console.log('++ gPFSP: NO PUZZLE IN SEARCH PARAMS');
    //   return null;
    // }
  }

  const updateURL = (p: string[]) => {
    const encoded = encodeText(p);
    page.url.searchParams.set('p', encoded);
    page.url.searchParams.set('w', p.join('-'));
    myURL = page.url;
    pushState(page.url, {});
    
  }

  const setup = async (s: number, puzzleArr: string[] | null) => {
    console.log('\n\n\n====');
    console.log('==== setup(s, puzzleArr): s', s, 'puzzleArr', puzzleArr);
    // size = s;
    game = createGame(s);
    await game.initialize();
    const grid = game.getGrid();
    if(puzzleArr) {
      words = puzzleArr;
      board = game?.fillWaffleGrid(grid, words);
    } else {
      words = game?.getWords();
      updateURL([s.toString(), ...words]);
    }
    if(words) {
      // choiceMade = true;
      board = game?.fillWaffleGrid(grid, words);
    } else {
      throw new Error('words is undefined');
  }
    board = game?.shuffle2DArray(board);
    game?.resetSwaps();
    swaps = game?.startingSwaps;
    startingSwaps = game?.startingSwaps;
  }

  const shuffle = () => {
    game?.resetSwaps();
    swaps = game?.startingSwaps;
    board = game?.shuffle2DArray(board) ?? [];
  }

  const handleTileClick = (tile: Tile) => {
    game?.swapTile(tile);
    game?.updateTileStatuses(board);
    swaps = game?.getSwaps();
  }

  const outOfTurns = $derived.by((): boolean => {
    return swaps !== null && swaps !== undefined && swaps <= 0 && !solved;
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

  const solvePuzzle = () => {
    board = game?.solveGrid(board) ?? board;
    board = game?.updateTileStatuses(board) ?? board;
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key == '-') {
      myBools.debug = !myBools.debug;
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
      solvePuzzle()
    }
    if (e.key == ']') {
      swaps = (swaps ?? 0) + 1;
    }
    if (e.key == '[') {
      swaps = (swaps ?? 0) - 1;
    }
  }

  let pageTitle = $derived.by(() => {
    if (board.length > 0) {
      return `${board?.length}x${board?.length}${title}`;
    } else {
      return title
    }
  })

</script>
<svelte:window onkeydown={handleKeyDown} onpopstate={() => handleNav()}/>
<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>
<Header {title} {showPopup} bind:words />
{#if myBools.debug}
  <div class="debug">{words}</div>
{/if}
<!-- {#if !words?.length}
<div class="choices">
  <ChoiceButtons {chooseGame} />
</div>
{/if} -->
{#if board && words!.length > 0}
<Stats {board} />
<div class="board" class:solved={solved} class:failed={outOfTurns} style="--cols: {board.length}" >
  {#each board as row, rowIndex}
    <div class="row" data-row={rowIndex}>
      {#each row as tile, colIndex}
        {#if !tile.hidden}
          <LetterTile
            {handleTileClick}
            {tile}
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
<Debug {board} {words} />
{#if myBools.debug}
<div class="testing">
  <p>words: {words}</p>
  <p>myURL: {JSON.stringify(myURL)}</p>
</div>
{/if}
{:else}
<div class="choices">
  <p>Choose a puzzle size.</p>
  <ChoiceButtons {chooseGame} />
</div>
<!-- {#if words?.length == 0}
  {/if} -->
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
  .testing {
    font-size: 0.8rem;
    border: 1px dashed rgb(90, 108, 126);
  }
  .testing p {
    margin: 0;
  }
  .testing button {
    font-size: 0.8rem;
    padding: 0.125rem 0.5rem;
    /* border: 1px solid var(--bg); */
    color: var(--fg);
    background-color: var(--bg);
  }
</style>