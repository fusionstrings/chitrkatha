// deno-lint-ignore-file
const comicsNumber = '1200';
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
	const { pathname } = new URL(request.url);

	console.log('pathname', JSON.stringify(pathname.split('/api/comics/')));
	const url = `https://xkcd.com/${comicsNumber === "" ? "" : `${comicsNumber}/`
		}info.0.json`;
	return fetch(url);
}

addEventListener("fetch", event => {
	return event.respondWith(
		handleRequest(event.request)
	)
})