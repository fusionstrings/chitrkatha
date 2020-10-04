import { listenAndServe, ServerRequest } from "../deps.ts";
import importMap from "../importmap.ts";
import { removePathQuery, removeSlashes, serveStatic } from "./functions.ts";
import pageNotFound from "./routes/404.ts";

async function serveRequest(
  request: ServerRequest,
) {
  const { url } = request;

  try {
    // Try if manual override exists
    const module = await import(importMap[url]);
    const response = await module.default(request);

    request.respond(response);
  } catch (error) {
    try {
      // Try if static file exists
      const response = await serveStatic(request);

      request.respond(response);
    } catch (error) {
      try {
        // Try if explicit route handler exists
        const path = removeSlashes(removePathQuery(url));
        const modulePath = path === "" ? "./routes.ts" : `./routes/${path}.ts`;

        const module = await import(modulePath);
        const response = await module.default(request);

        request.respond(response);
      } catch (error) {
        try {
          // Try if scoped route handler exists
          if (url.startsWith("/comics")) {
            const module = await import(`./routes/comics.ts`);
            const response = await module.default(request);
            request.respond(response);
          } else if (url.startsWith("/api/comics")) {
            const module = await import(`./routes/api/comics.ts`);
            const response = await module.default(request);
            request.respond(response);
          } else if (url.startsWith("/api/")) {
            const module = await import(`./routes/api.ts`);
            const response = await module.default(request);
            request.respond(response);
          } else {
            // Remove the duplicate as this also exist in the catch block of next step
            const response = await pageNotFound(request);
            request.respond(response);
          }
        } catch (error) {
          const response = await pageNotFound(request);

          request.respond(response);
        }
      }
    }
  }
}

type IRequestHandler = (req: ServerRequest) => void;

async function main(requestHandler: IRequestHandler) {
  // 1729
  const port = Number(Deno.env.get("PORT") || 1729);
  const address = { port };

  console.log(`Dev Server started at http://localhost:${port}`);

  listenAndServe(
    address,
    requestHandler,
  );
}

if (import.meta.main) {
  main(serveRequest);
}

export default main;
