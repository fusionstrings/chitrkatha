# ABCD

A [XKCD](https://xkcd.com/) UX and [API](https://xkcd.com/json.html) remix.

## Routes

-   `/` Home Page
-   `/comics/:comics-number` Detail page of comics

## Routes

| Route                              | Layout             | Content-Type                     |
| ---------------------------------- | ------------------ | -------------------------------- |
| `/` OR `/comics?page=1&offset=100` | Gallery Pagination | `text/html; charset=utf-8`       |
| `/comics/:comics-number`           | Comics stand alone | `text/html; charset=utf-8`       |
| `/api/comics?page=1&offset=100`    | Gallery Pagination | `application/json;charset=utf-8` |
| `/api/comics/:comics-number`       | Comics stand alone | `application/json;charset=utf-8` |

## Start
`deno run --allow-all ./start.ts`