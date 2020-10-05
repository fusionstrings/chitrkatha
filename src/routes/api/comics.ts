import type { ServerRequest } from "../../../deps.ts";
import { PROTOCOL } from "../../constants.ts";
import { removePathQuery, removeSlashes } from "../../functions.ts";

async function fetchComics(comicsNumber: string) {
  try {
    const url = `https://xkcd.com/${
      comicsNumber === "" ? "" : `${comicsNumber}/`
    }info.0.json`;
    // https://xkcd.com/614/info.0.json
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

async function main(request: ServerRequest) {
  try {
    const host = request.headers.get("host");

    // Assuming `http`
    const url = new URL(`${PROTOCOL}://${host}${request.url}`);
    const page = url.searchParams.get("page");
    const offset = url.searchParams.get("offset");

    const headers = new Headers();
    headers.set("Date", new Date().toUTCString());
    headers.set("Connection", "keep-alive");
    headers.set("Content-Type", "application/json; charset=utf-8");

    const path = removeSlashes(removePathQuery(request.url));
    const comicsNumber = removeSlashes(path.split("api/comics")[1]);

    if (Number.isNaN(parseInt(comicsNumber)) === false) {
      const data = await fetchComics(comicsNumber);
      const body = JSON.stringify([data].filter(Boolean));
      const response = {
        body,
        headers,
      };
      return response;
    }

    const latestComics = await fetchComics("");
    const { num: TOTAL_RECORDS } = latestComics;
    const RECORDS_PER_PAGE = offset ? parseInt(offset, 10) : 100;
    const TOTAL_PAGES = Math.ceil(TOTAL_RECORDS / RECORDS_PER_PAGE);
    const PAGE_NUMBER = page ? parseInt(page, 10) : 1;

    // This might be a redirect
    const data = PAGE_NUMBER < TOTAL_PAGES
      ? await Promise.all(
        Array.from(
          { length: RECORDS_PER_PAGE },
          (_, index) =>
            (Math.ceil(PAGE_NUMBER) < 1
              ? TOTAL_RECORDS
              : TOTAL_RECORDS - (RECORDS_PER_PAGE * (PAGE_NUMBER - 1))) -
            index,
        )
          .map(async (comicsNumber: number) => {
            try {
              return fetchComics(`${comicsNumber}`);
            } catch (error) {
              // https://xkcd.com/404/info.0.json is broken
              return false;
            }
          }),
      ).catch((error) => {
        throw new Error(error);
      })
      : [latestComics];

    const body = JSON.stringify(data.filter(Boolean));
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
