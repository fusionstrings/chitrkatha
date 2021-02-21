<script>
  import Comics from './comics.svelte'
  export let comicsPerPage = 20
  export let page = 1
  export let latestComics
</script>

<main data-layout="grid">
  {#each Array(comicsPerPage) as _, comics}
    <Comics id={(latestComics.num - ((page - 1)* comicsPerPage) )- comics} />
  {/each}
</main>
