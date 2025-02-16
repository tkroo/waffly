<script>
  import { myBools } from "$lib/utils.svelte";
  // import History from "$lib/components/History.svelte";
  let { board, words } = $props();
</script>

{#if myBools.debug}
  <hr>
  <h3>solution</h3>
  <div class="cols">

    <div class="mono">
      {#each board as brow}
      <div>{@html brow.map(x => {return x.value ? `<span>${x.correctValue}</span>` : '<span class="blank">.</span>'}).join('')}</div>
      {/each}
    </div>
    <p>{words.map(x => "'"+x+"'").join(', ')}</p>

  </div>
  <!-- <History {h} /> -->
{/if}


<style>
  .cols {
    display: flex;
    gap: 1rem;
  }
  .cols .mono {
    font-size: 0.85rem;
  }
  .mono {
    padding: 0;

    letter-spacing: 8px;
    font-weight: bold;
    text-align: left;
    font-size: 0.5rem;
    font-family: monospace;
  }

  :global {.blank {
    visibility: hidden;
  }}
</style>