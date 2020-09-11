#!/usr/bin/env bash
set -eu
echo "---------------------- Building front. --------------------------------------"
cd ../front
yarn build:main
cd ..
echo "---------------------- Copying static assets to /server/dist. ----------------"
DATE=`date '+%Y-%m-%d %H:%M:%S'`
rm -R $PWD/server/dist/front-end
mkdir $PWD/server/dist/front-end
cp -a $PWD/front/main-app/dist/. $PWD/server/dist/front-end