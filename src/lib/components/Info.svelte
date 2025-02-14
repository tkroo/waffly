<script>
  import LinkToOriginal from "$lib/components/LinkToOriginal.svelte";
  import { myBools } from "$lib/utils.svelte";
  let { showPopup = $bindable() } = $props();
  import { fade } from "svelte/transition";
</script>

{#if showPopup}
<div class="popup" transition:fade={{duration: 100}}>
<!-- <div class="popup" class:showPopup={myBools.showPopup}> -->
  <div class="content">
    <h2>How to Play</h2>
    <ul class="items">
      <li class="col2"><span class="tile-little green">W</span>Letter is in the correct position.</li>
      <li class="col2"><span class="tile-little yellow">W</span>Letter is in the row or column, but wrong position.</li>
      <li class="col2"><span class="tile-little gray">W</span>Letter is not in the row or column.</li>
    </ul>
    <h2>Preferences</h2>
    <label for="highContrast">
      <input type="checkbox" id="highContrast" bind:checked={myBools.highContrast}>
      High contrast colors
    </label>
    <!-- 
    <label for="easier">
      <input type="checkbox" id="easier" bind:checked={myBools.easierMode}>
      Easier mode <small>(don't loose a swap if placement is correct)</small>
    </label>
    <label for="helper">
      <input type="checkbox" id="helper" bind:checked={myBools.helperPositions}>
      Some positions are not shuffled.
    </label>
    <label class="todo" for="helperCount">
      <span class="helperCount">{myBools.helperCount}</span>non-shuffled tiles<br>
      <span class="range">
        harder <input disabled type="range" id="helperCount" min=0 max=8 bind:value={myBools.helperCount}> easier
      </span>
    </label> -->
    <h2>Info</h2>
    <LinkToOriginal />
  </div>
</div>
{/if}

<style>
  .popup {
    position: absolute;
    top: 3.5rem;
    left: 0rem;
    right: 0rem;
    bottom: 0rem;
    z-index: 9999;
    margin: 0 auto;
    padding: 0;
    max-width: var(--maxwide);
    /* background-color: pink; */
  }

  label {
    margin-bottom: 1rem;
  }
  label span.range {
    display: flex;
    align-items: center;
    font-size: 1rem;
  }
  label span.helperCount {
    display: inline-block;
    min-width: 1rem;
    margin-right: 0.25rem;
  }

  label.todo {
    color: var(--bline);
  }
  
  .content {
    --bline: light-dark(#666, #444);
    background-color: var(--fg);
    /* background-color: hsla(0, 100%, 50%, 0.75); */
    color: var(--bg);
    font-size: 1.2rem;
    text-align: left;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 0.5rem;
    height: 100%;
    
  }
   .items {
    margin: 0;
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    line-height: 1.5;
   }

   .col2 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
   }

   h2 {
    margin: 2rem 0 1rem -0.5rem;
    border-bottom: 1px solid var(--bline);
    width: 100%;
   }

   h2:first-child {
    margin-top: 0;
   }

  .tile-little {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    padding: 1px;
    width: 2.5rem;
    height: 2.5rem;
    aspect-ratio: 1/1;
    border-radius: var(--radius);
    color: #fff;
  }
  .green {
    background-color: var(--ccolor);
  }
  .yellow {
    background-color: var(--icolor);
  }
  .gray {
    background-color: var(--xcolor);
  }
</style>