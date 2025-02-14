<script>
  let { chooseGame } = $props();
  let dis = $state(false);
</script>

<button class="againbutton" disabled={dis} onclick={() => {dis = false; chooseGame(5)}}>Regular waffle (5x5)</button>
<button class="againbutton" disabled={dis} onclick={() => {dis = false; chooseGame(7)}}>Large waffle (7x7)</button>