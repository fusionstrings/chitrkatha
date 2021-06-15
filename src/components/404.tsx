import React from "https://esm.sh/react";

type PageProps = {
  path?: string;
};

function PageNotFound({ path }: PageProps): JSX.Element {
  return (
    <React.Fragment>
      <h1>404 Page not found</h1>
      <h5>{path}</h5>
      <h2><a href="/">Go to home page</a></h2>
    </React.Fragment>
  );
}

export default PageNotFound;
