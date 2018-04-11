FROM node:8.11.1-alpine

RUN mkdir -p /usr/src/ias-display
RUN chown node:node /usr/src/ias-display
WORKDIR /usr/src/ias-display

USER node
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH="/home/node/.npm-global/bin:${PATH}"

RUN npm install -g @angular/cli@1.6.5

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .
EXPOSE 4200

RUN npm run-script build-prod

VOLUME /usr/src/ias-display
