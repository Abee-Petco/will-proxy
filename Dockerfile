FROM node:12.6-alpine
WORKDIR /nick-proxy-server
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .
CMD ["npm", "run", "redis-server"]
CMD ["node", "index.js"]