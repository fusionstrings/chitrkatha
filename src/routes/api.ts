import type { ServerRequest } from "../../deps.ts";

async function main(request: ServerRequest) {
  try {
    const headers = new Headers();
    headers.set("Date", new Date().toUTCString());
    headers.set("Connection", "keep-alive");
    headers.set("Content-Type", "application/json; charset=utf-8");

    const response = {
      body: "API",
      headers,
    };
    return response;
  } catch (error) {
    return { status: 500, body: "500" };
  }
}

export default main;
