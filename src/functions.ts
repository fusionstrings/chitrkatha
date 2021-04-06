import { cwd, serveFile, ServerRequest, exists } from "../deps.ts";

function getPathQuery(path: string) {
  return path.split("?");
}

function removePathQuery(path: string) {
  const [modulePath] = getPathQuery(path);

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
    const fileExists = await exists(path);
    const fileInfo = await Deno.stat(path);
    if(fileExists && !fileInfo.isDirectory){
      return serveFile(request, path);
    }

    throw new Error(`Path doesn't exist or is a directory`);

  } catch (error) {
    throw new Error(error);
  }
}

export {
  getPathQuery,
  removeLeadingSlash,
  removePathQuery,
  removeSlashes,
  removeTrailingSlash,
  serveStatic,
};
