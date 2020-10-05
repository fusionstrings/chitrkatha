import type { ServerRequest } from "../../deps.ts";
import { PROTOCOL } from "../constants.ts";
import Render from "./../components/render.tsx";
import Gallery from "./../components/gallery.tsx";

async function main(request: ServerRequest) {
  try {
    //const { url } = request;
    const headers = new Headers();
    headers.set("Date", new Date().toUTCString());
    headers.set("Connection", "keep-alive");
    headers.set("Content-Type", "text/html; charset=utf-8");

    const host = request.headers.get("host");

    // Assuming `http`
    const API_URL = new URL(`${PROTOCOL}://${host}/api/comics`);

    const data = await fetch(API_URL);
    const comics = await data.json();

    const body = await Render(
      {
        props: { comics },
        Component: Gallery,
      },
    );
    const response = {
      body,
      headers,
    };
    return response;
  } catch (error) {
    return { status: 500, body: "500" };
  }
}

export default main;
