<script lang="ts">
  import { gameMessages } from "$lib/game_messages";
  let { myButton, swaps, outOfTurns, solved, shuffle, chooseGame } = $props();
  import { fade } from "svelte/transition";
</script>



<div class="message">
  {#if solved}
    <div transition:fade class="fade-container">
      <div class="win-loose">
        {swaps < 2 ? gameMessages.close[Math.floor(Math.random() * gameMessages.close.length)] : gameMessages.won[Math.floor(Math.random() * gameMessages.won.length)]}
      </div>
       <div class="choices">
        {@render myButton("5x5 Puzzle", "", () => chooseGame(5))}
        {@render myButton("7x7 Puzzle", "", () => chooseGame(7))}
       </div>
    </div>
  {/if}
  {#if outOfTurns}
    <div transition:fade class="fade-container">
      <div class="win-loose">
        {gameMessages.lost[Math.floor(Math.random() * gameMessages.lost.length)]}
      </div>
      <div class="choices">
        {@render myButton("Replay ?", "grid-column: 1 / span 2;", () => shuffle())}
        {@render myButton("5x5 Puzzle", "", () => chooseGame(5))}
        {@render myButton("7x7 Puzzle", "", () => chooseGame(7))}
      </div>
    </div>
  {/if}
</div>

<style>
  .message {
    color: var(--bg);
    font-weight: bold;
    padding: 0;
  }

  .win-loose {
    margin: 1rem auto;
    font-size: 1.6rem;
    text-align: center;
  }
</style>