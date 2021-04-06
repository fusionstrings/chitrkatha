<script>
  import { onMount } from 'svelte'
  import Header from './chitrkatha/header.svelte'
  import Main from './chitrkatha/main.svelte'
  import Footer from './chitrkatha/footer.svelte'

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
