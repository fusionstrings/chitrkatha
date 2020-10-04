import type { ServerRequest } from "../../deps.ts";
import Render from "./../components/render.tsx";

async function fetchComics(comicsNumber: string) {
  const url = `https://xkcd.com/${
    comicsNumber === "" ? "" : `${comicsNumber}/`
  }info.0.json`;
  // console.log("url: ", url);
  // https://xkcd.com/614/info.0.json
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

async function main(request: ServerRequest) {
  try {
    const { url } = request;
    const headers = new Headers();
    headers.set("Date", new Date().toUTCString());
    headers.set("Connection", "keep-alive");
    headers.set("Content-Type", "text/html; charset=utf-8");

    const latestComics = await fetchComics("");
    const { num } = latestComics;
    const THUMBNAIL_PER_PAGE = 100;

    const data = await Promise.all(
      Array.from(
        { length: num },
        (_, index) => num - index,
      )
        .slice(0, THUMBNAIL_PER_PAGE - 1).map(async (comics: number) => {
          return fetchComics(`${comics}`);
        }),
    );

    const { default: Component } = await import("../components/gallery.tsx");

    const body = await Render(
      {
        url,
        data,
        Component,
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
