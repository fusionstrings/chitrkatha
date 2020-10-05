[![Run on Repl.it](https://repl.it/badge/github/fusionstrings/chitrkatha)](https://repl.it/github/fusionstrings/chitrkatha)

# Future of accessible Comics, Stories and Art

## ABCD

A [XKCD](https://xkcd.com/) UX and [API](https://xkcd.com/json.html) remix.

### Routes

| Route                              | Layout             | Content-Type                     |
| ---------------------------------- | ------------------ | -------------------------------- |
| `/comics` OR `/comics?page=1&offset=100` | Gallery Pagination | `text/html; charset=utf-8`       |
| `/comics/:comics-number`           | Comics stand alone | `text/html; charset=utf-8`       |
| `/api/comics?page=1&offset=100`    | N/A                | `application/json;charset=utf-8` |
| `/api/comics/:comics-number`       | N/A                | `application/json;charset=utf-8` |

### Start
Default port `1729`
`deno run --allow-all ./start.ts`

### Build using Docker

`docker build --pull --rm -f "Dockerfile" -t abcd:latest "."`

### Run using Docker
- `docker run --rm -it  --env-file=.env -p 8080:8080 abcd:latest`
- `docker run --rm -it  --env PORT=8080 -p 8080:8080 abcd:latest`
- `docker run --rm -it  --env PORT=8080 DENO_ENV=production -p 8080:8080 fusionstrings/abcd:latest`

### Make it real
- [x] A minimal dev server #getstart
- [x] Working API #makeitwork
- [ ] Make it look good
- [ ] Improve UX
- [ ] Use [Seam Carving](https://crates.delbertbeta.cc/crates/seamcarving) to create thumbnails.
- [ ] Move to a production grade server

### Add some drama to the story
- [ ] Add service worker
- [ ] Add client side JS
- [ ] Add Landing Page
- [ ] Use cloudflare as edge proxy
- [ ] Use cloudflare analytics to customise user and developer experience
- [ ] Adapt the project for [Saturday Morning Breakfast Cereal](https://www.smbc-comics.com/)
- [ ] Analyse and optimise component reusability across Server/Edge/Service Worker/Browser

### Architecture
- The project is influenced by open source projects which championed file path expressed as URL routes in the web app and it actively tries to learn and copy from novel ideas, with a difference, which are -
- Easy on engineering and heavy on creation, thus lighter tooling
- Maximum use of composition and declarative dependencies, which is enabled by using imports/exports as expression of component metadata.

### Contribution

The project uses Deno and by that extension it also uses [Deno's flavour of typescript](https://deno.land/manual@v1.4.4/getting_started/typescript).

The reason to choose Deno is driven by improved developer ergonomics towards prototyping without giving up on viable toolings. Infact it is modern in manyways, such as-
- Typescript runtime
- V8 powered modern Javascript runtime
- Out of the box support of many crucial [W3 standard Browser APIs](https://doc.deno.land/https/github.com/denoland/deno/releases/latest/download/lib.deno.d.ts), major being [`window`](https://doc.deno.land/https/github.com/denoland/deno/releases/latest/download/lib.deno.d.ts#window), [`addEventListener`](https://doc.deno.land/https/github.com/denoland/deno/releases/latest/download/lib.deno.d.ts#addEventListener), [`removeEventListener`](https://doc.deno.land/https/github.com/denoland/deno/releases/latest/download/lib.deno.d.ts#removeEventListener), [`fetch`](https://doc.deno.land/https/github.com/denoland/deno/releases/latest/download/lib.deno.d.ts#fetch), [Standard HTTP ESM import/export](https://deno.land/manual/examples/import_export), importmaps, Workers etc. Some of these quite mature browser APIs have lack of support in contemporary frontend build tooling.
- Many developer tooling like, linting, formatting, lock file generation, compilation, bundling, JSX support is included in a opinionated way, which removes need of lot of tooling from development projects from the beginning.
- There are a lot of things which would still require need of other build softwares, nodejs or otherwise but then best days of enthusiasm is not lost.

#### [Install Deno](https://deno.land/#installation)

```sh
curl -fsSL https://deno.land/x/install/install.sh | sh
```

- [`dev.ts`](dev.ts) is the development and [`start.ts`](start.ts) is the non-development mode application entry point and every dependency is expressed through ESM imports / exports.
- [`importmap.json`](importmap.json) can be used to simulate node flavour of bare imports, this is very useful to share components across node js projects.
- By following top down dataflow, all third party dependencies are registered in [`deps.ts`](deps.ts)
- [`Server`](src/server.ts) exports the server as default export, which can be used to pass custom Server Request handlers.
- [`mod.ts`](mod.ts) is the public API.
- files in [public](public) folder are served as static files, without any processing.
- [`src`](src) folder contains source code.
- [`routes`](routes) folder contain route handlers called from [Server](src/server.ts).
- `try/catch` is used extensively as opposed to other control flow-
	- It is easy to refactor `try/catch` blocks as they can be viewd as nested async functions. This adds to the boilerplate but a fair trade.
	- Silently failing promises hide bugs and increases unhandled cases. 
- [`functions.ts`](src/functions.ts) contains reusable functions.
- Code is intentionaly kept moist as oppose to total dry.