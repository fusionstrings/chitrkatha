function comics(request) {
  const { id } = request.params
  return fetch(`https://xkcd.com/${id}/info.0.json`)
}

export default comics