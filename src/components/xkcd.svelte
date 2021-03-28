<script>
  import { onMount } from 'svelte'
  import fetchComics from './functions/xkcd.js'
  import Header from './components/xkcd/header.svelte'
  import Main from './components/xkcd/main.svelte'
  import Footer from './components/xkcd/footer.svelte'

  const url = new URL(window.location)
  const page = url.searchParams.get('page') || 1
  const offset = url.searchParams.get('offset') || 20
  const comics = url.searchParams.get('comics')
  onMount(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js')
      })
    }
  })
</script>

<chitrkatha-page-xkcd>
  <Header />
  {#await fetchComics()}
    <p>...waiting</p>
  {:then latestComics}
    <Main
      comicsPerPage={parseInt(offset, 10)}
      {latestComics}
      {page}
      totalComics={latestComics.num}
      totalPages={Math.ceil(latestComics.num / offset)}
      pageNumber={parseInt(page, 10)}
      {comics}
    />
    <Footer
      comicsPerPage={parseInt(offset, 10)}
      {latestComics}
      {page}
      totalComics={latestComics.num}
      totalPages={Math.ceil(latestComics.num / offset)}
      pageNumber={parseInt(page, 10)}
    />
  {:catch error}
    <p>An error occurred!</p>
  {/await}
</chitrkatha-page-xkcd>
