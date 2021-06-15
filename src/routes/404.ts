import Render from "../components/render.tsx";
import PageNotFound from "../components/404.tsx";

async function pageNotFound() {
  try {
    const headers = new Headers();
    headers.set("Date", new Date().toUTCString());
    headers.set("Connection", "keep-alive");
    headers.set("Content-Type", "text/html; charset=utf-8");

    const body = await Render(
      {
        Component: PageNotFound,
      },
    );

    return new Response(new TextEncoder().encode(body), { headers, status: 404 });
  } catch (error) {
    return new Response(error.message || error.toString(), {
      status: 500,
    });
  }
}

export default pageNotFound;
