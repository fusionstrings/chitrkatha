<script>
  export let totalPages = 1
  export let pageNumber = 1
</script>

<footer>
  <ul class="pagination">
    {#each Array(totalPages) as _, pageCount}
      <li key={pageCount} class={pageCount + 1 === pageNumber ? 'active' : ''}>
        <a href={`?page=${pageCount + 1}`}>
          {pageCount + 1}
        </a>
      </li>
    {/each}
  </ul>
  <p>&copy 2021 Chitrkatha</p>
</footer>
