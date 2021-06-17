import type { ServerRequest } from "../../../deps.ts";

const body = `
// import {x, y} from "http://127.0.0.1:8787/main.js";
const z = 4;

export {z};
`;

async function mainScript(request: ServerRequest) {
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

export default mainScript;
