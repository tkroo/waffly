<script>
  // let { tile, swapPair, delayFactor, handleTileClick, outOfTurns } = $props();
  let { tile, handleTileClick, swapPair, delayFactor } = $props();
  let active = $derived.by(() => {
    return swapPair.length && swapPair[0].x == tile.x && swapPair[0].y == tile.y
  })
</script>

<button
  onclick={() => {
    // if (tile.value != tile.correctValue && !outOfTurns) {
    if (tile.value != tile.correctValue) {
      handleTileClick(tile)
    }
  }}
  class="tile bounce"
  class:active={tile.swapStatus == 'selected'}
  data-status={tile.status}
  data-swapStatus={tile.swapStatus == 'selected' ? 'woo' : ''}
  style="animation-delay: {delayFactor * 50}ms"
  >
  <span class="answer">{tile.correctValue}</span>
  <div class="inner"></div>
  {tile.value}
</button>

<style>
  .tile {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    font-size: clamp(2rem, 6cqi, 3.5rem);
    /* font-size: 3rem; */
    font-weight: bold;
    aspect-ratio: 1;
    text-transform: uppercase;
    border-radius: 0.5rem;
    border: none;
    z-index: 20;
    transition: all 0.2s ease-in;
  }

  .tile .inner {
  position: absolute;
  z-index: -1;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: var(--radius);
  border: 4px solid hsla(0, 0%, 80%, 0);
  transition: all 0.2s ease-out;
  /* background-color: hsla(200, 75%, 100%, 0.25); */
}


.tile .answer {
  position: absolute;
  z-index: 2;
  top: 0.2rem;
  right: 0.2rem;
  font-size: 0.7rem;
  opacity: 0;
  background-color: #000;
  color: #fff;
  /* box-shadow: 2px 2px 4px 2px hsla(0, 0%, 0%, 0.25); */
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1/1;
  border-radius: var(--radius);
}

  .cheat .answer {
    opacity: 1 !important;
  }
  .tile.active {
    transition: all 0.1s ease-out;
    transform: scale(1.2);
    outline: 0.5rem solid hsla(200, 60%, 60%, 0.5);
    outline-offset: -0.5rem;
    z-index: 1000;
    /* background-color: hsl(36, 24%, 83%); */
  }

  .tile.active .inner {
    background-color: hsla(36, 24%, 100%, 0.25);
    /* border: 6px solid hsl(200, 60%, 60%); */
  }

  .tile[data-status='c'] {
    color: #efedea;
    background-color: var(--ccolor);
  }
  .tile[data-status='i'] {
    color: #efedea;
    background-color: var(--icolor);
  }
  .tile[data-status='x'] {
    color: #efedea;
    background-color: var(--xcolor);
  }
  .tile[data-swapStatus='woo'][data-status='c'] {
    /* border-radius: 50%; */
    animation-delay: 0s !important;
    animation: woo2 0.4s ease-in-out 0s 2 reverse both running;
  }
  .solved .tile[data-swapStatus='woo'] {
    animation: unset;
  }

  .tile.blank {
    border: none;
    background-color: transparent;
    color: transparent;
    cursor: initial;
  }

  @keyframes woo2 {
  0% {
    color: #efedea;
  }
  5% {
    color: var(--wavecolor1);
  }
  50% {
    color: var(--wavecolor2);
  }
  100% {
    color: var(--wavecolor3);
  }
}
</style>
