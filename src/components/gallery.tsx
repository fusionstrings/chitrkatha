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
  pages: number;
  page: number;
  offset: number;
  records: number;
};

function Gallery({ comics, pages, page, records, offset }: GalleryProps) {
  const pageList = Array.from({ length: pages }, (_, index) => index + 1);

  return (
    <React.Fragment>
      <header>
        <h1 className="logo"><a href="/">ABCD</a></h1>
      </header>
      <main data-layout={comics.length > 1 ? "grid" : "frame"}>
        {comics?.map(({ img, alt, safe_title, num, transcript }) => (
          <figure className="comics-strip" key={num}>
            <h3 className="strip-title">{safe_title}</h3>
            <a href={`/comics/${num}`}>
              {/* https://github.com/facebook/create-react-app/issues/9745 to use ` loading="lazy"`*/}
              <img
                src={img}
                alt={alt}
              />
            </a>
            <div className="transcript">{transcript}</div>
            <div className="image-description">{alt}</div>
          </figure>
        ))}
      </main>
      <footer>
        <ul className="pagination">
          {pageList.map((pageCount: number) => (
            <li key={pageCount} className={pageCount === page ? "active" : ""}>
              <a href={`/comics?page=${pageCount}`}>
                {pageCount}
              </a>
            </li>
          ))}
        </ul>
      </footer>
    </React.Fragment>
  );
}

export default Gallery;
