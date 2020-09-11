#!/usr/bin/env bash
pkill nodejs
pkill node
kill $(lsof -i tcp:1980 | tail -n +2 | awk '{ print $2 }')
kill $(lsof -i tcp:5550 | tail -n +2 | awk '{ print $2 }')
kill $(lsof -i tcp:8888 | tail -n +2 | awk '{ print $2 }')
kill $(lsof -i tcp:8080 | tail -n +2 | awk '{ print $2 }')
kill $(lsof -i tcp:7070 | tail -n +2 | awk '{ print $2 }')
./scripts/front-subdoms.sh & ./scripts/server.sh & ./scripts/front-main.sh
exit 0