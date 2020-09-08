#!/usr/bin/env bash
cd front-published
kill $(lsof -i tcp:7070 | tail -n +2 | awk '{ print $2 }')
yarn serve --fix --port 7070