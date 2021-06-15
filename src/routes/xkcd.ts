// import { removeSlashes } from "../functions.ts";
// import { PROTOCOL } from "../constants.ts";
import Render from "./../components/render.tsx";
import XKCD from "./../components/xkcd.tsx";

async function main(request: Request) {
  try {
    const url = new URL(request.url);
    const headers = new Headers();
    headers.set("Date", new Date().toUTCString());
    headers.set("Connection", "keep-alive");
    headers.set("Content-Type", "text/html; charset=utf-8");

    // const host = request.headers.get("host");

    // Assuming `http`
    //const [_, query] = getPathQuery(request.url);
    // const API_URL = `${PROTOCOL}://${host}/api/${removeSlashes(request.url)}`;
    url.pathname = `/api${url.pathname}`;
    const data = await fetch(url.toString());
    const comics = await data.json();

    const body = await Render(
      {
        props: { ...comics },
        Component: XKCD,
      },
    );
    return new Response(new TextEncoder().encode(body), { headers });
  } catch (error) {
    return new Response(error.message || error.toString(), {
      status: 500,
    });
  }
}

export default main;
