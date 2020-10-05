import type { ServerRequest } from "../../deps.ts";
import Render from "../components/render.tsx";

async function pageNotFound(request: ServerRequest) {
  try {
    const headers = new Headers();
    headers.set("Date", new Date().toUTCString());
    headers.set("Connection", "keep-alive");
    headers.set("Content-Type", "text/html; charset=utf-8");

    const { default: Component } = await import("../components/404.tsx");

    const body = await Render(
      {
        Component,
      },
    );

    const response = {
      status: 404,
      body,
      headers,
    };
    return response;
  } catch (error) {
    return { status: 500 };
  }
}

export default pageNotFound;
