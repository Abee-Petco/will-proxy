FROM node:10.15.3 as base
WORKDIR /nick-proxy-server
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .