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

### Start

`deno run --allow-all ./start.ts`
