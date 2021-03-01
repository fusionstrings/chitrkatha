<script>
  import { onMount } from 'svelte'
  import Header from './components/chitrkatha/header.svelte'
  import Main from './components/chitrkatha/main.svelte'
  import Footer from './components/chitrkatha/footer.svelte'

  onMount(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/chitrkatha-service-worker.js')
      })
    }
  })
</script>

<chitrkatha-page>
  <Header />
  <Main />
  <Footer />
</chitrkatha-page>
