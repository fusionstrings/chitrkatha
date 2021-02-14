FROM hayd/deno:alpine-1.7.2

EXPOSE 1993

WORKDIR /app

USER deno

COPY deps.ts .
RUN deno cache deps.ts

ADD . .
RUN deno cache start.ts

CMD ["run", "--unstable", "--allow-all", "start.ts"]