require('newrelic');
const express = require('express');
const serveStatic = require('serve-static');
const morgan = require('morgan');
const redis = require('redis');
const client = redis.createClient({ 'host': 'redis' });
// Uncomment the 2 lines below when running the service locally
// const client = redis.createClient();
// const RedisServer = require('redis-server');

const server = express();

server.use(morgan('dev'));
server.use(serveStatic('./client/'));

let redisMiddleware = (req, res, next) => {
  let key = "__expIress__" + req.originalUrl || req.url;
  client.get(key, function (err, reply) {
    if (reply) {
      // Needs to be parsed first because its getting a stringified object out of its own database so it can be returned in the proper shape
      res.send(JSON.parse(reply));
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        // client.set(key, JSON.stringify(body));
        // sets the cache to clear after 5 minutes
        client.setex(key, 300, JSON.stringify(body));
        res.sendResponse(body);
      }
      next();
    }
  });
};

server.get('/product', redisMiddleware, (req, res) => {
  const { itemID } = req.query;
  const itemIdNumber = Number.parseInt(itemID, 10);

  if (itemIdNumber === undefined) {
    console.log('404 from here')
    res.status(404).send('itemID invalid');
  } else {
    res.sendFile(`${__dirname}/client/index.html`);
  }
});

server.get('/images/urls/:itemId', (req, res) => {
  console.log('route touched')
  let address = req.params.itemId
  res.redirect(`http://ec2-3-14-7-144.us-east-2.compute.amazonaws.com/images/urls/${address}`)
})

server.listen(3000, () => { console.log('listening on port 3000') });
