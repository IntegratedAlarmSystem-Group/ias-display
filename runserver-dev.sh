#!/bin/sh
chown -R node:node /usr/src/ias-display/node_modules
su node -c "npm install" -s /bin/sh
su node -c "ng serve --host 0.0.0.0 --port 4200 --configuration docker" -s /bin/sh
