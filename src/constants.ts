const DEV = Deno.env.get("DENO_ENV") !== "production";
const PROTOCOL = DEV ? "http" : "https";
export { DEV, PROTOCOL };
