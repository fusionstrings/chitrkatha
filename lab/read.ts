import { readableStreamFromReader } from "https://deno.land/std@0.95.0/io/streams.ts";

for await (const conn of Deno.listen({ port: 8000 })) {
  (async () => {
    const httpConn = Deno.serveHttp(conn);
    for await (const { request, respondWith } of httpConn) {
      const file = await Deno.open("./android-chrome-512x512.png", { read: true });
      respondWith(new Response(readableStreamFromReader(file)));
    }
  })();
}