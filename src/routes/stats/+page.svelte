<script lang="ts">
  import { wordlist_5 } from "$lib/wordlist_5.js";
  import { wordlist_7 } from "$lib/wordlist_7.js";
  import GameStats from "$lib/components/GameStats.svelte";

  let { data } = $props();
  console.log('=========\n data: ', data);

  let games_5_letters = $derived.by(() => data.games.filter(game => game.words.length == 6));
  let games_7_letters = $derived.by(() => data.games.filter(game => game.words.length == 8));

  let testword = $state('');
  
  const inWordList = $derived.by((): boolean => {
    return wordlist_5.includes(testword) || wordlist_7.includes(testword);
  })
</script>

<div class="wrapper">
  <h1><a href="/">waffly</a></h1>
  <section>
    <h1>Word checker</h1>
    <label for="length"><input type="text" name="length" bind:value={testword}> is <span class:green={testword.length == 7 || testword.length == 5}>{testword.length} letters</span>
      {#if testword.length == 5 || testword.length == 7}
      and <strong>{testword}</strong> <span class="{inWordList ? 'green' : 'red'}">{inWordList ? 'IS' : 'IS NOT'}</span> in the wordlist.
      {/if}
    </label>
    <p>
      <a href={`https://www.merriam-webster.com/dictionary/${testword}`} target="merriamwebster">try merriam-webster</a>
    </p>
  </section>
  
  <section>
    <h1>Stats</h1>
    <div class="row">
      <div class="col">
        <GameStats title="5x5 games" games={games_5_letters} />
      </div>
  
      <div class="col">
        <GameStats title="7x7 games" games={games_7_letters} />
      </div>
    </div>
  </section>
</div>


<style>
  .wrapper {
    margin: 2rem auto;
    max-width: 1200px;
  }
  /* .full-width-breakout {
    margin: 4em -100%;
    margin: 4em calc(50% - 50vw);
    padding: 0 16rem;
  } */

  h1 {
    margin: 2rem 0 0 0;
    font-size: 2rem;
  }
  .row {
    display: flex;
    justify-content: space-between;
  }
  .col {
    flex: 1;
    /* border: 1px dashed darkcyan; */
  }
  .green {
    color: var(--ccolor);
  }
  .red {
    color: #ea0029;
  }
</style>