import { extname, readableStreamFromReader, expandGlob } from "../deps.ts";
import type {TAssetMap} from './types.ts';

const MEDIA_TYPES: Record<string, string> = {
  ".md": "text/markdown",
  ".html": "text/html",
  ".htm": "text/html",
  ".json": "application/json",
  ".map": "application/json",
  ".txt": "text/plain",
  ".ts": "text/typescript",
  ".tsx": "text/tsx",
  ".js": "application/javascript",
  ".jsx": "text/jsx",
  ".gz": "application/gzip",
  ".css": "text/css",
  ".wasm": "application/wasm",
  ".mjs": "application/javascript",
  ".svg": "image/svg+xml",
};

async function prepareAssetMap(folderName="public", pathPrefix="./") {
  const assetMap: TAssetMap = {};

  for await (const file of expandGlob(`${pathPrefix}${folderName}/**/*.*`)) {
    const [_, pathname] = file.path.split(folderName);
    assetMap[pathname] = { ...file, pathname };
  }

  return assetMap;
}

/** Returns the content-type based on the extension of a path. */
function contentType(path: string): string | undefined {
  return MEDIA_TYPES[extname(path)];
}

async function serveFile(
  pathname: string,
): Promise<Response | undefined> {
  try {
    const filePath = `./public${pathname}`;

    const [file, fileInfo] = await Promise.all([
      Deno.open(filePath, { read: true }),
      Deno.stat(filePath),
    ]);
    
    const headers = new Headers();
    headers.set("content-length", fileInfo.size.toString());

    const contentTypeValue = contentType(`${pathname}`);

    if (contentTypeValue) {
      headers.set("content-type", contentTypeValue);
    }

    return new Response(readableStreamFromReader(file), { headers });
  } catch (error) {
    throw error;
  }
}

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

export {
  getPathQuery,
  removeLeadingSlash,
  removePathQuery,
  removeSlashes,
  removeTrailingSlash,
  serveFile,
  prepareAssetMap
};
