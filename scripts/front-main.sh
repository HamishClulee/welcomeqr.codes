#!/usr/bin/env bash
kill $(lsof -i tcp:8080 | tail -n +2 | awk '{ print $2 }')
cd front
yarn serve:main
exit 0