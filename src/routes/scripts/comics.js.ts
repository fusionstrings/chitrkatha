import type { ServerRequest } from "../../../deps.ts";

const body = `
import {x, y} from "https://experiments.fusionstrings.workers.dev/main.js";

console.log(x);
`;

async function pageNotFound(request: ServerRequest) {
  try {
    const headers = new Headers();
    headers.set("Date", new Date().toUTCString());
    headers.set("Connection", "keep-alive");
    headers.set("Content-Type", "text/javascript; charset=utf-8");

    const response = {
      body,
      headers,
    };
    return response;
  } catch (error) {
    return { status: 500 };
  }
}

export default pageNotFound;
