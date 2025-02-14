<script>
  let { func, message } = $props();
  let initialMessage = $state(message);
  let dis = $state(false);
  const runFunc = async () => {
    if(func.name == 'setup') {
      dis = true;
      message = 'Please wait...';
      setTimeout(() => {
        func();
        dis = false;
        message = initialMessage;
      }, 500);
    } else {
      func();
    }
  }
</script>
<button class="againbutton" disabled='{dis}' onclick={() => runFunc()}>{message}</button>

