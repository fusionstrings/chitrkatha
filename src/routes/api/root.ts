import type { ServerRequest } from "http/server.ts";

async function root(request: ServerRequest) {
  return 'new Response("ok")';
}

export default root;
