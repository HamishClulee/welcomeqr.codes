#!/usr/bin/env bash
cd front-published
kill $(lsof -i tcp:7070 | tail -n +2 | awk '{ print $2 }')
cd front/subdoms-app
yarn serve:subdoms --fix --port 7070