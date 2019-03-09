FROM centos:7 as builder

# install chromium to run karma tests
COPY google-chrome.repo /etc/yum.repos.d/
RUN yum update -y && \
  yum install -y google-chrome-stable wget && \
  yum clean all
ENV CHROME_BIN=/opt/google/chrome/chrome \
  CHROME_PATH=/opt/google/chrome

# create project folder
RUN useradd --user-group --create-home --shell /bin/false node && \
  mkdir -p /usr/src/ias-display && \
  chown node:node /usr/src/ias-display
WORKDIR /usr/src/ias-display

# create user node
USER node

# install node
RUN wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
RUN . /home/node/.nvm/nvm.sh && nvm install 10.15.1

# install Angular CLI
RUN . /home/node/.nvm/nvm.sh && npm install -g @angular/cli@6.0.8

# install project requirements
COPY package.json .
COPY package-lock.json .
RUN . /home/node/.nvm/nvm.sh && npm install

# copy project files
COPY . .
EXPOSE 4200

# test and build project
RUN . /home/node/.nvm/nvm.sh &&  ng test --watch=false --browsers=ChromeDocker --karma-config karma.low_resources.conf.js
RUN . /home/node/.nvm/nvm.sh &&  npm run-script build-prod

# copy compiled files to smaller image
FROM centos:7
COPY --from=builder /usr/src/ias-display/dist /usr/src/ias-display/dist
VOLUME /usr/src/ias-display
