function main(args: string[] = []): Deno.Process {
  return Deno.run({
    cmd: [
      "deno",
      "run",
      //"--importmap=importmap.json", // watch is not compatible with this
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
  await main().status();
}
