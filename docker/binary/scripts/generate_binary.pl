#!/usr/bin/perl
use strict;
use warnings;
use File::Path qw(make_path);
use File::Copy qw(copy);
use File::Basename;
use File::Find;

unless (-d '/dist') {
    make_path('/dist') or die "Failed to create /dist: $!\n";
}

chmod 0777, '/dist' or die "Failed to set permissions on /dist: $!\n";

system('/usr/bin/perl /scripts/generate_conf.pl') == 0
    or die "Failed to execute generate_conf.pl: $!\n";

unlink '/scripts/generate_conf.pl' or warn "Failed to remove /scripts/generate_conf.pl: $!\n";

sub copy_dir {
    my ($src, $dst) = @_;

    make_path($dst) unless -d $dst;

    opendir my $dh, $src or die "Can't open directory $src: $!\n";
    my @entries = readdir($dh);
    closedir $dh;

    foreach my $entry (@entries) {
        next if $entry =~ /^\.\.?$/;

        my $src_path = "$src/$entry";
        my $dst_path = "$dst/$entry";

        if (-d $src_path) {
            copy_dir($src_path, $dst_path);
        } else {
            copy($src_path, $dst_path) or warn "Failed to copy $src_path to $dst_path: $!\n";

            if ($entry eq 'ragemp-server') {
                chmod 0755, $dst_path or warn "Failed to set executable permissions on $dst_path: $!\n";
            }
        }
    }
}

copy_dir('/dist', '/mnt/dist');

exit;
