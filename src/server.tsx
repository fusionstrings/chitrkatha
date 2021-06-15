import { h, Fragment } from "https://esm.sh/preact";
import render from "https://esm.sh/preact-render-to-string";

//import {handleRequest} from './request-handler.ts';
import Document from "./components/document.tsx";
import Home from "./components/home.tsx";

function App() {
  return (
    <html>
      <head>
        <title>Hello from JSX</title>
      </head>
      <body>
        <h1>Hello world</h1>
      </body>
    </html>
  );
}

function handleRequest(request: Request) {
  try {
    console.log(request)
    //const { pathname } = new URL(request.url);
    //console.log('pathname: ', pathname);
    console.log('import.meta.url: ', import.meta.url)
    // console.log('url: ', new URL(pathname, import.meta.url));
    // // Check if the request is for style.css.
    // if (pathname.startsWith("/images") || pathname.startsWith("/css") || pathname.startsWith("/favicon-32x32.png") || pathname.startsWith("/favicon-16x16.png")) {
    //   //  Construct a new URL to style.css by using the URL
    //   //  of the script (mod.ts) as base (import.meta.url).
    //   // const image = new URL("/images/chitrkatha-minimal-logo.svg", import.meta.url).toString();
    //   // Fetch the asset and return the fetched response
    //   // to the client.
    //   const STATIC_SERVER = Deno.env.get("STATIC_SERVER");
    //   const url = STATIC_SERVER ? `${STATIC_SERVER}${pathname}` : new URL(`.${pathname}`, import.meta.url);
    //   console.log(url)
    //   //return fetch(url);
    // }
    //const { default: Component } = await import(importMap[pathname]);
    // renderToString generates html string from JSX components.
    return new Response(
      render(
        <Document>
          <h1>hi</h1>
        </Document>,
      ),
      {
        headers: { "content-type": "text/html; charset=uft-8" },
      },
    );
  } catch (error) {
    const body = error.message;
    const status = { status: 400 };
    return new Response(body, status);
  }
}

addEventListener("fetch", async (event: FetchEvent) => {
  console.log(event.request)
  event.respondWith(handleRequest(event.request));
});
