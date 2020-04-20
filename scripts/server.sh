#!/usr/bin/env bash
cd server
kill -9 $(lsof -t -i:1980)
yarn start --fix