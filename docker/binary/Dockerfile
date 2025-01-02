FROM ubuntu:22.04

RUN apt update && apt install -y wget perl

RUN useradd -ms /bin/bash adriantandara

RUN mkdir -p /dist && chown -R adriantandara:adriantandara /dist

USER adriantandara

WORKDIR /dist

RUN wget https://cdn.rage.mp/updater/prerelease/server-files/linux_x64.tar.gz && \
    tar --strip-components=1 -xzf linux_x64.tar.gz && \
    rm linux_x64.tar.gz

RUN echo '#!/usr/bin/perl\n\
use strict;\n\
use warnings;\n\
my $conf_file = "/dist/conf.json";\n\
open my $fh, ">", $conf_file or die "Could not open $conf_file for writing: $!";\n\
print $fh "{\n";\n\
my $first = 1;\n\
foreach my $var (keys %ENV) {\n\
    if ($var =~ /^RAGE_CONF_(.*)/) {\n\
        my $key = lc($1);\n\
        my $value = $ENV{$var};\n\
        if ($value) {\n\
            if ($first) {\n\
                $first = 0;\n\
            } else {\n\
                print $fh ",\n";\n\
            }\n\
            print $fh "  \"$key\": ";\n\
            if ($value eq "true") {\n\
                print $fh "true";\n\
            } elsif ($value eq "false") {\n\
                print $fh "false";\n\
            } elsif ($value =~ /^[0-9]+(\.[0-9]+)?$/) {\n\
                print $fh $value;\n\
            } else {\n\
                print $fh "\"$value\"";\n\
            }\n\
        }\n\
    }\n\
}\n\
print $fh "\n}";\n\
close $fh;' > /dist/generate_conf.pl && \
    chmod +x /dist/generate_conf.pl

ENTRYPOINT ["/bin/bash", "-c", "\
if [ ! -d /dist ]; then mkdir -p /dist; fi && \
chmod -R 777 /dist && \
/usr/bin/perl /dist/generate_conf.pl && \
rm /dist/generate_conf.pl && \
cp -r /dist/* /mnt/dist/ && \
exit"]
