import { handleRequest } from "./request-handler.ts";

const server = Deno.listen({ port: 1729 });

for await (const conn of server) {
  (async () => {
    const httpConn = Deno.serveHttp(conn);
    for await (const requestEvent of httpConn) {
      requestEvent.respondWith(handleRequest(requestEvent.request));
    }
  })();
}
