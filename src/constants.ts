const DEV = Deno.env.get("DENO_ENV") !== "production";
const PROTOCOL = DEV ? "http" : "https";
const STATIC_SERVER = Deno.env.get("STATIC_SERVER")|| 'http://0.0.0.0:4507';

export { DEV, PROTOCOL, STATIC_SERVER };
