FROM node

RUN npm install -g zapier-platform-cli

WORKDIR /work/

COPY package.json ./
RUN yarn install
