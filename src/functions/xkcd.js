async function fetchComics(id="latest") {
	// http://xkcd.com/${id}/info.0.json
	const response = await fetch(`/api/comics/${id}`)
	// const response = await fetch(id==='latest' ? `https://xkcd.com/info.0.json` : `https://xkcd.com/${id}/info.0.json`)
	return await response.json()
}

export default fetchComics;