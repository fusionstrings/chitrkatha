import { handleRequest } from "./request-handler.ts";

async function handleConnection(connection: Deno.Conn) {
  const httpConnection = Deno.serveHttp(connection);

  for await (const { request, respondWith } of httpConnection) {
    respondWith(handleRequest(request));
  }
}

async function main() {
  const server = Deno.listen({ port: Number(Deno.env.get("PORT") || 1729) });

  for await (const connection of server) {
    handleConnection(connection);
  }
}

if (import.meta.main) {
  main();
}

export default main;
