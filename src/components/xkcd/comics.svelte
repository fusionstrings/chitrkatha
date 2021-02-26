<script>
  import fetchComics from '../../functions/xkcd.js'
  export let id = 'latest'
</script>

{#await fetchComics(id)}
  <p>...waiting</p>
{:then data}
  <figure class="comics-strip" key={data.num}>
    <h3 class="strip-title">{data.safe_title}</h3>
    <a href={`?comics=${data.num}`}>
      <img loading="lazy" src={`api/images?image=${data.img}`} alt={data.alt} />
    </a>
    <div class="transcript">{data.transcript}</div>
    <div class="image-description">{data.alt}</div>
  </figure>
{:catch error}
  <p>An error occurred!</p>
{/await}
