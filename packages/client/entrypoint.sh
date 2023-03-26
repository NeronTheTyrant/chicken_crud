#!/bin/sh

cd ../..

# Install domain + lib + client dependencies
yarn install --pure-lockfile --non-interactive

# Build common packages
yarn build:common

cd packages/client

exec "$@"