FROM ubuntu:22.04

RUN apt update && apt install -y wget perl

RUN mkdir -p /scripts

COPY scripts/generate_conf.pl /scripts/generate_conf.pl
COPY scripts/generate_binary.pl /scripts/entrypoint.pl

RUN chmod +x /scripts/generate_conf.pl /scripts/entrypoint.pl

RUN mkdir -p /dist

WORKDIR /dist
RUN wget https://cdn.rage.mp/updater/prerelease/server-files/linux_x64.tar.gz && \
    tar --strip-components=1 -xzf linux_x64.tar.gz && \
    rm linux_x64.tar.gz

ENTRYPOINT ["/scripts/entrypoint.pl"]
