async function fetchComics(id="latest") {
	const response = await fetch(`/api/comics/${id}`)
	return await response.json()
}

export default fetchComics;