#!/usr/bin/env bash
kill $(lsof -i tcp:7070 | tail -n +2 | awk '{ print $2 }')
cd front
yarn serve:subdoms
exit 0