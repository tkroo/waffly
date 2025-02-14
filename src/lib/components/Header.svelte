<script>
	import Info from "./Info.svelte";

  let { title, showPopup, choiceMade=$bindable() } = $props();
</script>

<header>
  <h1><button onclick={() => choiceMade = false}>{title}</button></h1>
  <button onclick={() => showPopup = !showPopup} class="abs help">
    {#if showPopup}
    <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="none" viewBox="0 0 24 24"><title>back</title><path fill="#000" fill-rule="evenodd" d="M3 12a9 9 0 1 1 18 0 9 9 0 0 1-18 0Zm9-11C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1Zm.707 6.707a1 1 0 0 0-1.414-1.414l-5 5a1 1 0 0 0 0 1.414l5 5a1 1 0 0 0 1.414-1.414L9.414 13H17a1 1 0 1 0 0-2H9.414l3.293-3.293Z" clip-rule="evenodd"/></svg>
    {:else}
    <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><title>help</title><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12Zm12.25 4.75a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Zm-3.115-7.786C10.4 8.46 11.083 8 12 8c1.283 0 2 .835 2 1.5s-.717 1.5-2 1.5a1 1 0 0 0-1 1v1a1 1 0 1 0 2 0v-.113c1.632-.373 3-1.64 3-3.387C16 7.404 14.03 6 12 6c-1.543 0-2.975.775-3.636 2.036a1 1 0 1 0 1.771.928Z" fill="#f6f5f4"/></svg>
    {/if}
  </button>
  <!-- <div class="controls">
    <button onclick={() => setup(5)}>5x5</button>
    <button onclick={() => setup(7)}>7x7</button>
    <button onclick={shuffle}>shuffle</button>
    <div>size: {size}</div>
  </div> -->
</header>
<Info bind:showPopup />

<style>
  header {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    line-height: 0;
    margin: 1rem auto;
  }
  h1 {
    margin: 0;
    padding: 0;
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
  .abs svg path {
    stroke: none;
    fill: var(--bg);
  }
</style>