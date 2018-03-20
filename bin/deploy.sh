#!/usr/bin/env sh

BASE_DIR=$1
APP_SERVER=$BLOOMBURGER_APP_SERVER

# stop all running bloomburger processes
ssh bloomburger@$APP_SERVER 'bash -s' < bin/stop-all.sh

# scp all necessary artifacts
scp -r $BASE_DIR/dist bloomburger@$APP_SERVER:/home/bloomburger/workspace/bloomburger
scp -r $BASE_DIR/src/assets/img bloomburger@$APP_SERVER:/home/bloomburger/workspace/bloomburger/dist/assets
scp -r $BASE_DIR/package.json bloomburger@$APP_SERVER:/home/bloomburger/workspace/bloomburger
scp -r $BASE_DIR/src/server bloomburger@$APP_SERVER:/home/bloomburger/workspace/bloomburger/src
scp -r $BASE_DIR/.babelrc bloomburger@$APP_SERVER:/home/bloomburger/workspace/bloomburger
scp -r $BASE_DIR/webpack.config.js bloomburger@$APP_SERVER:/home/bloomburger/workspace/bloomburger

# start bloomburger on app server
ssh bloomburger@$APP_SERVER 'bash -s' < bin/redeploy.sh
