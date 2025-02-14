<script>
  import { myBools } from "$lib/utils.svelte";
  let { children } = $props();
</script>

<svelte:head>
  <title>waffly</title>
</svelte:head>

<main class:cb={myBools.highContrast}>
  {@render children()}
</main>