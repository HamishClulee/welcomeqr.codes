#!/usr/bin/env bash
cd front-published
echo pwd
kill -9 $(lsof -t -i:8080)
yarn serve --fix