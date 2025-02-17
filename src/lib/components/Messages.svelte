<script lang="ts">
  import AgainButton from "$lib/components/AgainButton.svelte";
  import ChoiceButtons from "$lib/components/ChoiceButtons.svelte";
  import { gameMessages } from "$lib/game_messages";
	// import Progress from "./Progress.svelte";
  let { swaps, startingSwaps, outOfTurns, solved, shuffle, chooseGame, toggleDebug } = $props();
</script>

<div class="message">
  <!-- <Progress {swaps} {startingSwaps} {toggleDebug} /> -->
  <div class="win-loose">
    {#if solved}
    {swaps < 2 ? gameMessages.close[Math.floor(Math.random() * gameMessages.close.length)] : gameMessages.won[Math.floor(Math.random() * gameMessages.won.length)]}
    <ChoiceButtons {chooseGame} />
    {/if}
    {#if outOfTurns}{gameMessages.lost[Math.floor(Math.random() * gameMessages.lost.length)]}
    <AgainButton message="Replay?" func={shuffle} />
    <ChoiceButtons {chooseGame} />
    {/if}
  </div>
</div>

<style>
  .message {
    color: var(--bg);
    font-weight: bold;
    padding: 0;
  }

  .win-loose {
    font-size: 1.6rem;
    text-align: center;
  }
</style>