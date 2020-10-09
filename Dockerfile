FROM node:12.6-alpine
WORKDIR /nick-proxy-server
COPY package.json package-lock.json ./
RUN apk update && apk add bash
RUN npm install --production
COPY . .