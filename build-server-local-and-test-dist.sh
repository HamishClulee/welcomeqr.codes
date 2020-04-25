#!/usr/bin/env bash
set -eu
cd server
yarn build && cd dist
node index.js