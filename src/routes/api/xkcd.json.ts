import type { ServerRequest } from "../../../deps.ts";

async function fetchComics(comicsNumber: string) {
  try {
    const url = `https://xkcd.com/${
      comicsNumber === "" ? "" : `${comicsNumber}/`
    }info.0.json`;
    // https://xkcd.com/614/info.0.json
    const response = await fetch(url);
    const body = new Uint8Array(await response.arrayBuffer());
	//const json = await response.json();
    return body;
  } catch (error) {
    console.error(error);
  }
}

async function main(request: ServerRequest) {
  try {

    const headers = new Headers();
    headers.set("Date", new Date().toUTCString());

    return {
      body: await fetchComics(""),
      headers,
    };
  } catch (error) {
    return { status: 500 };
  }
}

export default main;
