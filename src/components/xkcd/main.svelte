<script>
  import Comics from './comics.svelte'
  export let comicsPerPage = 20
  export let page = 1
  export let latestComics
  export let comics
</script>

{#if comics}
  <main data-layout="frame">
    <Comics id={comics} />
  </main>
{:else}
  <main data-layout="grid">
    {#each Array(comicsPerPage) as _, comicsNumber}
      {#if latestComics.num - (page - 1) * comicsPerPage - comicsNumber > 0}
        <Comics id={latestComics.num - (page - 1) * comicsPerPage - comicsNumber} />
      {/if}
    {/each}
  </main>
{/if}
