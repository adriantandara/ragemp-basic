FROM ubuntu:22.04

RUN apt update && \
    apt install -y wget software-properties-common && \
    add-apt-repository -y ppa:ubuntu-toolchain-r/test && \
    apt update && \
    apt install -y libstdc++6 && \
    rm -rf /var/lib/apt/lists/*

RUN mkdir -p /dist

WORKDIR /dist

RUN wget https://cdn.rage.mp/updater/prerelease/server-files/linux_x64.tar.gz && \
    tar -xzf linux_x64.tar.gz && \
    rm linux_x64.tar.gz && \
    mv ragemp-srv/* . && \
    rm -rf ragemp-srv

RUN chmod -R 777 /dist

ENTRYPOINT ["/bin/sh", "-c", "cp -r /dist /mnt/dist && rm -rf /dist && exit"]
