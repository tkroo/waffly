<script>
  let { children } = $props();
</script>

<svelte:head>
  <title>waffly</title>
</svelte:head>

<main>
  {@render children()}
</main>