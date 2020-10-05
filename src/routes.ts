import type { ServerRequest } from "../deps.ts";
import { PROTOCOL } from "./constants.ts";

async function main(request: ServerRequest) {
  try {
    const host = request.headers.get("host");
    const defaultURL = `${PROTOCOL}://${host}/comics`;

    const headers = new Headers();
    headers.set("Location", defaultURL);

    const response = {
      status: 302,
      headers,
    };
    return response;
  } catch (error) {
    return { status: 500 };
  }
}

export default main;
