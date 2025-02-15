<script lang="ts">
  import AgainButton from "$lib/components/AgainButton.svelte";
  import ChoiceButtons from "$lib/components/ChoiceButtons.svelte";
  import { gameMessages } from "$lib/game_messages";
  let { swaps, startingSwaps, outOfTurns, solved, shuffle, chooseGame, toggleDebug } = $props();
</script>

<div class="message">
  <div class="prog">
    <progress value={swaps} max={startingSwaps}></progress>
    <button class="swapsnotice" onclick={toggleDebug}>{swaps} swaps remain</button>
  </div>
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

  .prog {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.25rem;
    height: 1.5rem;
    gap: 0.25rem;
  }

  .swapsnotice {
    font-size: 0.85rem;
  }

  @media screen and (max-width: 500px) {
    .prog {
      margin-top: 0.75rem;
      flex-wrap: wrap;
      justify-content: center;
    }
    .swapsnotice {
      text-align: center;
    }
    progress[value],
    progress[value]::-webkit-progress-bar {
      width: 100%;
    }
  }


  .win-loose {
    font-size: 1.6rem;
    text-align: center;
  }
  
  progress[value],
  progress[value]::-webkit-progress-bar {
    --bg: hsl(157, 90%, 32%);
    --fg: hsl(43, 50%, 53%);
    appearance: none;
    border: none;
    width: 70%;
    flex-grow: 1;
    
    height: .5rem;

    background: var(--xcolor);
    border-radius: var(--radius);
      
    position: relative;
    margin: 0 0;
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