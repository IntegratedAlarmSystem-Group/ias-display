#!/bin/sh
chown -R node:node /usr/src/ias-display/node_modules
su node -c "npm install"
su node -c "ng test --watch=false --single-run --browser=ChromeDocker"
