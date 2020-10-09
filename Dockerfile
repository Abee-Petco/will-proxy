FROM node:12.6-alpine
WORKDIR /nick-proxy-server
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .
CMD ["redis-server", "--bind", "redis", "--port", "6379"]
CMD ["node", "index.js"]