FROM node:8.9.4-alpine

WORKDIR /usr/src

RUN npm install -g @angular/cli@1.6.5

RUN ng new ias-display

WORKDIR /usr/src/ias-display

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .
EXPOSE 4200

RUN npm run-script build-prod

VOLUME /usr/src/ias-display
