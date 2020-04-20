#!/usr/bin/env bash
cd server-V2
kill -9 $(lsof -t -i:1980)
yarn dev