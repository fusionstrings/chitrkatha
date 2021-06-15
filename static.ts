import { expandGlob } from "https://deno.land/std@0.95.0/fs/mod.ts";
// import { walk } from "https://deno.land/std@0.95.0/fs/mod.ts";

type AssetMap = {
  [key: string]: {
    pathname: string;
    path: string;
    name: string;
    isFile: boolean;
    isDirectory: boolean;
    isSymlink: boolean;
  };
};

async function prepareAssetMap() {
  const assetMap: AssetMap = {};
  /**
	 * 
	const x = {
	path: "/Users/dilip/@fusionstrings/chitrkatha-deno-deploy/public/site.webmanifest",
	name: "site.webmanifest",
	isFile: true,
	isDirectory: false,
	isSymlink: false
  }
	 */
  for await (const file of expandGlob("./public/**/*.*")) {
    const [_, pathname] = file.path.split("/public");
    console.log(`pathname: `, pathname);
    console.log(file);
    assetMap[pathname] = { ...file, pathname };
  }

  return assetMap;
}

// async function printFilesNames() {
//   for await (const entry of walk("./public")) {
//     console.log(entry);
//   }
// }

// prepareAssetMap().then(() => console.log("Done!"));
// const write = Deno.writeTextFile("./hello.txt", "Hello World!");

// write.then(() => console.log("File written to ./hello.txt"));
async function generateAssetMap() {
  const assetMap = await prepareAssetMap();
  Deno.writeTextFile("./assetmap.json", JSON.stringify(assetMap));
  console.log("File written to ./assetmap.json");
}

async function main() {
  await generateAssetMap();
  console.log("Done");
}

if (import.meta.main) {
  main();
}

export {prepareAssetMap, generateAssetMap}