#!/usr/bin/env bash
set -eu
echo "---------------------- Building locally. --------------------------------------"
cd front
yarn build --fix
cd ..
echo "---------------------- Copying static assets to /server. ----------------------"
DATE=`date '+%Y-%m-%d %H:%M:%S'`
rm -R $PWD/server/src/front-end
mkdir $PWD/server/src/front-end
cp -a $PWD/front/dist/. $PWD/server/src/front-end
echo "---------------------- Pushing to GIT. ----------------------------------------"
# git add .
# MSG=". Deployed: $DATE"
# git commit -m "$1 $MSG"npm install -g yarn
# git push
echo "---------------------- shiping the mevn'z -------------------------------------"
# below is an example of how i deploy to digital ocean, feel free to do whatever you want
# ssh <<enter your ssh address>> 'cd /var/www/mevn-folder-name && git reset --hard && git pull && sudo systemctl restart mevn-app-name.service'
echo "---------------------- Deploy complete. Have a nice day. ----------------------"
