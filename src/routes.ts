import Render from "./components/render.tsx";
import Home from "./components/home.tsx";

async function home() {
  try {
    const headers = new Headers();
    headers.set("Date", new Date().toUTCString());
    headers.set("Connection", "keep-alive");
    headers.set("Content-Type", "text/html; charset=utf-8");

    const body = await Render(
      {
        Component: Home,
      },
    );

    return new Response(new TextEncoder().encode(body), { headers });
  } catch (error) {
    return new Response(error.message || error.toString(), {
      status: 500,
    });
  }
}

export default home;
