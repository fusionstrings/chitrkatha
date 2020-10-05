[![Run on Repl.it](https://repl.it/badge/github/fusionstrings/chitrkatha)](https://repl.it/github/fusionstrings/chitrkatha)

# Future of accessible Comics, Stories and Art

## ABCD

A [XKCD](https://xkcd.com/) UX and [API](https://xkcd.com/json.html) remix.

### Routes

| Route                              | Layout             | Content-Type                     |
| ---------------------------------- | ------------------ | -------------------------------- |
| `/` OR `/comics?page=1&offset=100` | Gallery Pagination | `text/html; charset=utf-8`       |
| `/comics/:comics-number`           | Comics stand alone | `text/html; charset=utf-8`       |
| `/api/comics?page=1&offset=100`    | N/A                | `application/json;charset=utf-8` |
| `/api/comics/:comics-number`       | N/A                | `application/json;charset=utf-8` |

### Build
`docker build --pull --rm -f "Dockerfile" -t lightsaber:latest "."`

### Start
Default port `1729`

- `deno run --allow-all ./start.ts`
- `docker run --rm -it  --env-file=.env -p 8080:8080 abcd:latest`
- `docker run --rm -it  --env PORT=8080 -p 8080:8080 abcd:latest`

