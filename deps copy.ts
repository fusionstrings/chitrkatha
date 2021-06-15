// import type * as IReact from "https://deno.land/std@0.40.0/types/react.d.ts";
import type * as IReact from "https://denopkg.com/soremwar/deno_types/react/v16.13.1/react.d.ts";
const X: IReact.FC | undefined = undefined;

export {
  listenAndServe,
  ServerRequest,
} from "https://deno.land/std@0.73.0/http/server.ts";

export { serveFile } from "https://deno.land/std@0.73.0/http/file_server.ts";

export { default as React } from "https://jspm.dev/react@16.13.1";
export { default as ReactDOMServer } from "https://jspm.dev/react-dom@16.13.1/server.js";

export const { cwd } = Deno;
