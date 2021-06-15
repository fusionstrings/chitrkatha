import React from "https://esm.sh/react";
import ReactDOMServer from 'https://esm.sh/react-dom/server'
import Document from "./document.tsx";

type RenderProps = {
  props?: object;
  Component: React.ElementType;
};

function Render({ Component, props }: RenderProps) {
  // preserve data-reactroot
  const __html = ReactDOMServer.renderToString(
    <main id="__root"><Component {...props} /></main>,
  );

  const document = ReactDOMServer.renderToStaticMarkup(
    <Document style={`/css/style.css`}>
      __html
    </Document>,
  );

  const [header, footer] = document.split("__html");

  return `<!DOCTYPE html>${header}${__html}${footer}`;
}

export default Render;
