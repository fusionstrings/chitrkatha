async function fetchComics(comicsNumber) {
  try {
    const url = `https://xkcd.com/${comicsNumber === "" ? "" : `${comicsNumber}/`
      }info.0.json`;
    // https://xkcd.com/614/info.0.json
    return fetch(url);
  } catch (error) {
    console.error(error);
  }
}


/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest() {
  return fetchComics();
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})