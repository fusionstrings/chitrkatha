FROM hayd/deno:alpine-1.8.2

EXPOSE 1729

WORKDIR /app

USER deno

COPY deps.ts .
# RUN deno cache deps.ts

ADD . .
RUN deno cache start.ts

CMD ["run", "--import-map=deno.importmap", "--unstable", "--allow-all", "start.ts"]