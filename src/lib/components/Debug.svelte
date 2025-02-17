<script>
  import { myBools } from "$lib/utils.svelte";
  // import History from "$lib/components/History.svelte";
  let { board, words } = $props();
</script>

{#if myBools.debug}
  <div class="debug">

    <div class="mono">
      {#each board as brow}
      <div>{@html brow.map(x => {return x.value ? `<span>${x.correctValue}</span>` : '<span class="blank">.</span>'}).join('')}</div>
      {/each}
    </div>
    <div>{words.join(', ')}</div>
  </div>
{/if}


<style>
  .debug {
    position: fixed;
    bottom: 0;
    right: 0;
    background-color: hsla(0, 0%, 0%, 0.25);
    color: #fff;
    padding: 0.5rem 1rem;
    z-index: 1000;
    /* font-size: 2rem; */
  }
  .cols {
    display: flex;
    gap: 1rem;
  }
  .cols .mono {
    font-size: 0.85rem;
  }
  .mono {
    padding: 0;
    letter-spacing: 10px;
    /* font-weight: bold; */
    text-align: left;
    font-size: 0.85rem;
    font-family: monospace;
  }

  :global {.blank {
    visibility: hidden;
  }}
</style>