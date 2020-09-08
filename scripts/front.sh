#!/usr/bin/env bash
cd front
kill $(lsof -i tcp:8080 | tail -n +2 | awk '{ print $2 }')
yarn serve --fix