type TComics = {
  month: string;
  num: number;
  link: string;
  year: string;
  news: string;
  safe_title: string;
  transcript: string;
  alt: string;
  img: string;
  title: string;
  day: string;
};

type IRequestHandler = (request: Request) => Promise<void>;

type TAssetMap = {
  [key: string]: {
    pathname: string;
    path: string;
    name: string;
    isFile: boolean;
    isDirectory: boolean;
    isSymlink: boolean;
  };
};
export type { TComics, IRequestHandler, TAssetMap };