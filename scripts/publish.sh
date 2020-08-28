#!/usr/bin/env bash
cd front-published
kill -9 $(lsof -t -i:7070)
yarn serve --fix --port 7070 --open