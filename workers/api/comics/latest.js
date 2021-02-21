const latestComics = request => {
  return fetch('https://xkcd.com/info.0.json', {
    cf: { cacheTtlByStatus: { "200-299": 86400, 404: 1, "500-599": 0 } },
  })
}

export default latestComics