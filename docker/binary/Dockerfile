FROM ubuntu:22.04

RUN apt update && apt install -y wget

RUN useradd -ms /bin/bash adriantandara

RUN mkdir -p /dist && chown -R adriantandara:adriantandara /dist

USER adriantandara

WORKDIR /dist

RUN wget https://cdn.rage.mp/updater/prerelease/server-files/linux_x64.tar.gz && \
    tar -xzf linux_x64.tar.gz && \
    rm linux_x64.tar.gz && \
    mv ragemp-srv/* . && \
    rm -rf ragemp-srv

RUN echo '#!/bin/bash\n\
echo "{" > /dist/conf.json\n\
vars=$(env | grep "^RAGE_CONF_" | cut -d= -f1)\n\
count=$(echo "$vars" | wc -l)\n\
index=0\n\
for var in $vars; do\n\
    value=$(printenv $var)\n\
    key=$(echo $var | sed "s/^RAGE_CONF_//" | tr "[:upper:]" "[:lower:]")\n\
    if [ ! -z "$value" ]; then\n\
        index=$((index+1))\n\
        if [ $index -eq $count ]; then\n\
            echo "  \"$key\": \"$value\"" >> /dist/conf.json\n\
        else\n\
            echo "  \"$key\": \"$value\"," >> /dist/conf.json\n\
        fi\n\
    fi\n\
done\n\
echo "}" >> /dist/conf.json' > /dist/generate_conf.sh && \
    chmod +x /dist/generate_conf.sh

ENTRYPOINT ["/bin/sh", "-c", "/dist/generate_conf.sh && rm -f /dist/generate_conf.sh && cp -r /dist /mnt/dist && rm -rf /dist && exit"]
