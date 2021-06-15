import importMap from "../importmap.ts";
import { STATIC_SERVER } from "./constants.ts";
import { removePathQuery, removeSlashes, serveFile, prepareAssetMap } from "./functions.ts";
import pageNotFound from "./routes/404.ts";

const assetMap = await prepareAssetMap();
// async function handleRequest(
//   request: Request,
// ) {
//   const { pathname } = new URL(request.url);
//   try {
//     // Try if manual override exists
//     const module = await import(importMap[pathname]);
//     const response = await module.default(request);

//     return response;
//   } catch (error) {
//     try {
//       // Try if static file exists
//       const response = await serveStatic(request);

//       return response; //new Response(new TextEncoder().encode(response));
//     } catch (error) {
//       try {
//         // Try if explicit route handler exists
//         const path = removeSlashes(removePathQuery(pathname));
//         const modulePath = path === "" ? "./routes.ts" : `./routes/${path}.ts`;

//         const module = await import(modulePath);
//         return module.default(request);
//       } catch (error) {
//         try {
//           // Try if scoped route handler exists
//           if (pathname.startsWith("/comics")) {
//             const module = await import(`./routes/comics.ts`);
//             return module.default(request);
//           } else if (pathname.startsWith("/api/comics")) {
//             const module = await import(`./routes/api/comics.ts`);
//             return module.default(request);
//           } else if (pathname.startsWith("/api/")) {
//             const module = await import(`./routes/api.ts`);
//             return module.default(request);
//           } else {
//             // Remove the duplicate as this also exist in the catch block of next step
//             return pageNotFound();
//           }
//         } catch (error) {
// 			return pageNotFound();
//         }
//       }
//     }
//   }
// }

async function handleRequest(request: Request) {
  const { pathname } = new URL(request.url);
  try {
    // const moduleURL = new URL(importMap[pathname], import.meta.url);
    const module = await import(importMap[pathname]);
    return module.default(request);
  } catch (error) {
    try {
      //return await serveFile(pathname);
      // const file = await serveFile(pathname);
      // return file;
      return await fetch(`${STATIC_SERVER}${assetMap[pathname].pathname}`);
      // return serveFile(assetMap[pathname].pathname);
    } catch (error) {
      try {
        // Try if explicit route handler exists
        const path = removeSlashes(removePathQuery(pathname));
        const modulePath = path === "" ? "./routes.ts" : `./routes/${path}.ts`;
        const module = await import(modulePath);
        return module.default(request);
      } catch (error) {
        try {
          // Try if scoped route handler exists
          if (pathname.startsWith("/xkcd")) {
            const module = await import(`./routes/xkcd.ts`);
            return module.default(request);
          } else if (pathname.startsWith("/api/xkcd")) {
            const module = await import(`./routes/api/xkcd.ts`);
            return module.default(request);
          } else if (pathname.startsWith("/api/")) {
            const module = await import(`./routes/api.ts`);
            return module.default(request);
          } else {
            // Remove the duplicate as this also exist in the catch block of next step
            return pageNotFound();
          }
        } catch (error) {
          return new Response(error.message || error.toString(), {
            status: 500,
          });
        }
      }
    }
  }
}

export { handleRequest };
