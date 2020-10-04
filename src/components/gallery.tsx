import { React } from "../../deps.ts";

type Comics = {
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
type GalleryProps = {
  comics: Comics[];
};

function Gallery({ comics }: GalleryProps) {
  return (
    <React.Fragment>
      {comics?.map(({ img, alt, safe_title, num }) => (
        <a key={num} href={`/comics/${num}`}>
          <figure key={num}>
            <h2>{safe_title}</h2>
            <img src={img} alt={alt} />
          </figure>
        </a>
      ))}
    </React.Fragment>
  );
}

export default Gallery;
