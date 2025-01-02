#!/usr/bin/perl
use strict;
use warnings;

my $conf_file = "/dist/conf.json";
open my $fh, ">", $conf_file or die "Could not open $conf_file for writing: $!";

print $fh "{\n";
my $first = 1;

foreach my $var (keys %ENV) {
    if ($var =~ /^RAGE_CONF_(.*)/) {
        my $key = lc($1);
        my $value = $ENV{$var};

        if ($value) {
            print $fh $first ? "" : ",\n";
            $first = 0;

            print $fh "  \"$key\": ";

            if ($value eq "true") {
                print $fh "true";
            } elsif ($value eq "false") {
                print $fh "false";
            } elsif ($value =~ /^[0-9]+(\.[0-9]+)?$/) {
                print $fh $value;
            } else {
                print $fh "\"$value\"";
            }
        }
    }
}

print $fh "\n}";
close $fh;
