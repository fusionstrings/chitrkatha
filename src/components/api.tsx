import { React } from "../../deps.ts";

type PageProps = {
  path?: string;
};

function PageNotFound({ path }: PageProps): JSX.Element {
  return (
    <React.Fragment>
      <h1>404 Page not found</h1>
      <h5>{path}</h5>
    </React.Fragment>
  );
}

export default PageNotFound;
