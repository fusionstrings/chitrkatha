<script>
  import { onMount } from 'svelte'
  import Header from './header.svelte'
  import Main from './main.svelte'
  import Footer from './footer.svelte'

  onMount(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js')
      })
    }
  })
</script>

<chitrkatha-page>
  <Header />
  <Main />
  <Footer />
</chitrkatha-page>
