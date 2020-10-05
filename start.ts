function main(args: string[]): Deno.Process {
  const [mode = "dev"] = args;

  console.log(`started in ${mode} mode at ${new Date().toUTCString()}`);

  return Deno.run({
    cmd: [
      "deno",
      "run",
      "--importmap=importmap.json", // watch is not compatible with this
      "--unstable",
      "--allow-net",
      "--allow-read",
      "--allow-env",
      "src/server.ts",
    ],
  });
}

if (import.meta.main) {
  console.log("ABCD [A XKCD remix]");
  await main(Deno.args).status();
}
