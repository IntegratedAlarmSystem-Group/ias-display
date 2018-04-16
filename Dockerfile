FROM node:8.11.1-alpine as builder

# install chromium to run karma tests
RUN apk update && apk add udev ttf-freefont chromium
ENV CHROME_BIN=/usr/bin/chromium-browser
ENV CHROME_PATH=/usr/lib/chromium/

# create project folder
RUN mkdir -p /usr/src/ias-display
RUN chown node:node /usr/src/ias-display
WORKDIR /usr/src/ias-display

# install Angular CLI
USER node
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH="/home/node/.npm-global/bin:${PATH}"
RUN npm install -g @angular/cli@1.6.5

# install project requirements
COPY package.json .
COPY package-lock.json .
RUN npm install

# copy project files
COPY . .
EXPOSE 4200

# test and build project
RUN ng test --watch=false --single-run --browser=ChromeDocker
RUN npm run-script build-prod

# copy compiled files to smaller image
FROM alpine:3.7
COPY --from=builder /usr/src/ias-display/dist /usr/src/ias-display/dist
VOLUME /usr/src/ias-display
