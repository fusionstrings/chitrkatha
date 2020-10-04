import { React } from "../../deps.ts";

interface IDocumentProps {
  style?: string;
  meta?: string;
  children?: string;
}

function Document({ style = "css/style.css", meta, children }: IDocumentProps) {
  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        {meta}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#cf133f" />
        <meta name="apple-mobile-web-app-title" content="ABCD" />
        <meta name="application-name" content="ABCD" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="stylesheet" href={style} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

export default Document;
