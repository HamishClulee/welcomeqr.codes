#!/usr/bin/env bash

# Not re implemented after merging FE shared code branch
set -eu
http-server ./front/main-app/dist/ -p 8989 -o