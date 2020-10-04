import { cwd, serveFile, ServerRequest } from "../deps.ts";

function removePathQuery(path: string) {
  const [modulePath] = path.split("?");

  return modulePath;
}

function removeLeadingSlash(path: string) {
  if (path.startsWith("/")) {
    return path.slice(1);
  }
  return path;
}

function removeTrailingSlash(path: string) {
  if (path.endsWith("/")) {
    return path.slice(-1);
  }
  return path;
}

function removeSlashes(path: string) {
  return removeTrailingSlash(removeLeadingSlash(path));
}

async function serveStatic(request: ServerRequest) {
  try {
    const { url } = request;
    const path = `${cwd()}/public${url}`;
    return serveFile(request, path);
  } catch (error) {
    throw new Error(error);
  }
}

export {
  removeLeadingSlash,
  removePathQuery,
  removeSlashes,
  removeTrailingSlash,
  serveStatic,
};
