FROM node:10.15.3 as base
WORKDIR /nick-proxy-server
COPY package.json package-lock.json ./
RUN apk update && apk add bash
RUN npm install --production
COPY . .