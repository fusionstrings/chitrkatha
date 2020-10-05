import type { ServerRequest } from "../../deps.ts";
import { removeSlashes } from "../functions.ts";
import { PROTOCOL } from "../constants.ts";
import Render from "./../components/render.tsx";
import Comics from "./../components/comics.tsx";

async function main(request: ServerRequest) {
  try {
    //const { url } = request;
    const headers = new Headers();
    headers.set("Date", new Date().toUTCString());
    headers.set("Connection", "keep-alive");
    headers.set("Content-Type", "text/html; charset=utf-8");

    const host = request.headers.get("host");

    // Assuming `http`
    //const [_, query] = getPathQuery(request.url);
    const API_URL = `${PROTOCOL}://${host}/api/${removeSlashes(request.url)}`;

    const data = await fetch(API_URL);
    const comics = await data.json();

    const body = await Render(
      {
        props: { ...comics },
        Component: Comics,
      },
    );
    const response = {
      body,
      headers,
    };
    return response;
  } catch (error) {
    return { status: 500 };
  }
}

export default main;
