FROM mcr.microsoft.com/vscode/devcontainers/base:debian-10

ENV DENO_VERSION=1.9.2
ENV DEPLOYCTL_VERSION=0.3.0
ENV DENO_STD_LIB_VERSION=0.95.0
ENV DENO_INSTALL=/deno
ENV STATIC_SERVER=http://0.0.0.0:4507

RUN mkdir -p /deno \
    && curl -fsSL https://deno.land/x/install/install.sh | sh -s v${DENO_VERSION}\
    && chown -R vscode /deno

ENV PATH=${DENO_INSTALL}/bin:${PATH} \
    DENO_DIR=${DENO_INSTALL}/.cache/deno

RUN deno install --allow-read --allow-write --allow-env --allow-net --allow-run --no-check -r -f --root ${DENO_INSTALL} https://deno.land/x/deploy@${DEPLOYCTL_VERSION}/deployctl.ts
RUN deno install --allow-net --allow-read --root ${DENO_INSTALL} https://deno.land/std@${DENO_STD_LIB_VERSION}/http/file_server.ts
# RUN file_server ./public
# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#    && apt-get -y install --no-install-recommends <your-package-list-here>
