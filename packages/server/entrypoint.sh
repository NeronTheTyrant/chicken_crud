#!/bin/sh

# Install domain + lib + client dependencies
yarn install --pure-lockfile --non-interactive

# Build common packages
yarn build:common

exec "$@"