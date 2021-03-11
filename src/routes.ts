import type { ServerRequest } from "../deps.ts";
import Render from "./components/render.tsx";
import Home from "./components/home.tsx";

async function main(request: ServerRequest) {
  try {

    const headers = new Headers();
    headers.set("Date", new Date().toUTCString());
    headers.set("Connection", "keep-alive");
    headers.set("Content-Type", "text/html; charset=utf-8");

    const body = await Render(
      {
        Component: Home,
      },
    );
    const response = {
      body,
      headers,
    };
    return response;
  } catch (error) {
    return { status: 500, body: error.message };
  }
}

export default main;
