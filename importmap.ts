/**
 * This file exists because the value of importmap entry for the key ending with `/` must also end with `/`
 */
type ImportMap = {
  [key: string]: string;
};

const importMap: ImportMap = {
  "/": "./routes.ts",
};

export default importMap;
