FROM node:6.2.0-slim
MAINTAINER Matthew Barry "matthew@komputerwiz.net"

RUN useradd -m -d /usr/src/app -s /bin/bash node
WORKDIR /usr/src/app
USER node

COPY package.json /usr/src/app
RUN npm install
COPY . /usr/src/app

CMD [ "npm", "start" ]

