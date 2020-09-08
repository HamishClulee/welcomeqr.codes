#!/usr/bin/env bash
cd server
pkill nodejs
pkill node
kill $(lsof -i tcp:1980 | tail -n +2 | awk '{ print $2 }')
kill $(lsof -i tcp:5550 | tail -n +2 | awk '{ print $2 }')
yarn dev