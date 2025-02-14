<script lang="ts">
  import AgainButton from "$lib/components/AgainButton.svelte";
  import ChoiceButtons from "$lib/components/ChoiceButtons.svelte";
  import { gameMessages } from "$lib/game_messages";
  let { swaps, startingSwaps, outOfTurns, solved, shuffle, chooseGame, toggleDebug } = $props();
</script>

<h3 class="message">
  <button class="swapsnotice" onclick={toggleDebug}>{swaps} swaps remaining</button>
  <progress value={swaps} max={startingSwaps}></progress>
  {#if solved}
    {swaps < 2 ? gameMessages.close[Math.floor(Math.random() * gameMessages.close.length)] : gameMessages.won[Math.floor(Math.random() * gameMessages.won.length)]}
    <ChoiceButtons {chooseGame} />
  {/if}
  {#if outOfTurns}{gameMessages.lost[Math.floor(Math.random() * gameMessages.lost.length)]}
  <AgainButton message="Replay?" func={shuffle} />
  <ChoiceButtons {chooseGame} />
  {/if}
</h3>

<style>
  .message {
    font-size: 1.5rem;
    padding: 0;
    margin: 2rem auto;
    min-height: 4.5rem;
    text-align: center;
  }

  .message .swapsnotice {
    font-size: 1rem;
    margin: 0 auto;
    padding: 0;
  }

  .solved .message {
    color: var(--ccolor);
  }

  progress[value],
  progress[value]::-webkit-progress-bar {
    --bg: hsl(157, 90%, 32%);
    --fg: hsl(43, 50%, 53%);
    appearance: none;
    border: none;
    width: 100%;
    
    height: .5rem;

    background: var(--xcolor);
    border-radius: var(--radius);
      
    position: relative;
    margin: 0 0 0.5rem;
  }

  progress::-moz-progress-bar {
    background: var(--ccolor);
    border-radius: var(--radius);
  }
  progress::-webkit-progress-value {
    background: var(--ccolor);
    border-radius: var(--radius);
  }
</style>