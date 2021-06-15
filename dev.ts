function main(args: string[]): Deno.Process {
  const [mode = "production"] = args;

  console.log(`started in ${mode} mode at ${new Date().toUTCString()}`);

  return Deno.run({
    cmd: [
      "deno",
      "run",
      "--import-map=deno.importmap", // watch is not compatible with this
      "--unstable",
      "--allow-net",
      "--allow-read",
      "--allow-env",
      "--watch",
      "src/server.ts",
    ],
  });
}

if (import.meta.main) {
  console.log("ABCD [A XKCD remix]");
  await main(Deno.args).status();
}
