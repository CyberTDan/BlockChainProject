#!/bin/sh

set -e

host="$1"
shift
cmd="$@"

until nc -z "$host" 8545; do
  >&2 echo "Ganache is unavailable - waiting"
  sleep 1
done

>&2 echo "Ganache is up - executing command"
exec $cmd
