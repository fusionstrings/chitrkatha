import { React } from "../../deps.ts";

type GalleryProps = {
  data?: {
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
  }[];
};

function Gallery({ data = [] }: GalleryProps) {
  return (
    <h1>Gallery {data.length}</h1>
  );
}

export default Gallery;
