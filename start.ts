import { parse } from "https://deno.land/std@0.90.0/flags/mod.ts";

function main(args: string[]): Deno.Process {

  const {mode = "production", file = "src/server.ts"} = parse(args);

  console.log(`started in ${mode} mode at ${new Date().toUTCString()}`);

  return Deno.run({
    cmd: [
      "deno",
      "run",
      "--import-map=deno.importmap",
      "--unstable",
      "--allow-net",
      "--allow-read",
      "--allow-env",
      `${file}`,
    ],
  });
}

if (import.meta.main) {
  console.log("ABCD [A XKCD remix]");
  await main(Deno.args).status();
}
