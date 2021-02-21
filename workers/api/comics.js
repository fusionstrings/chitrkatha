function comics(request) {
  const { id } = request.params
  return fetch(`https://xkcd.com/${id}/info.0.json`, {
    cf: { cacheTtlByStatus: { "200-299": 86400, 404: 1, "500-599": 0 } },
  })
}

export default comics