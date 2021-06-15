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
    throw error;
  }
}

async function main(request: Request) {
  try {
    // const host = request.headers.get("host");

    // Assuming `http`
    const url = new URL(request.url);
    const page = url.searchParams.get("page");
    const offset = url.searchParams.get("offset");

    const headers = new Headers();
    headers.set("Date", new Date().toUTCString());
    headers.set("Connection", "keep-alive");
    headers.set("Content-Type", "application/json; charset=utf-8");

    const path = removeSlashes(removePathQuery(request.url));
    const comicsNumber = removeSlashes(path.split("api/xkcd")[1]);

    const latestComics = await fetchComics("");
    const { num: TOTAL_RECORDS } = latestComics;
    const RECORDS_PER_PAGE = offset ? parseInt(offset, 10) : 25;
    const TOTAL_PAGES = Math.ceil(TOTAL_RECORDS / RECORDS_PER_PAGE);
    const PAGE_NUMBER = page ? parseInt(page, 10) : 1;

    const payload = {
      records: TOTAL_RECORDS,
      offset: RECORDS_PER_PAGE,
      pages: TOTAL_PAGES,
      page: PAGE_NUMBER,
    };

    if (Number.isNaN(parseInt(comicsNumber)) === false) {
      const data = await fetchComics(comicsNumber);

      const body = JSON.stringify(
        { ...payload, comics: [data].filter(Boolean) },
      );
      return new Response(new TextEncoder().encode(body), { headers });
    }

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
          .map((comicsNumber: number) => {
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

    const body = JSON.stringify({ ...payload, comics: data.filter(Boolean) });
    
    return new Response(new TextEncoder().encode(body), { headers });
  } catch (error) {
    return new Response(error.message || error.toString(), {
      status: 500,
    });
  }
}

export default main;
