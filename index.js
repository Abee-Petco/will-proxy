require('newrelic');
const express = require('express');
const serveStatic = require('serve-static');
const morgan = require('morgan');

const server = express();

server.use(morgan('dev'));
server.use(serveStatic('./client/'));

server.get('/product', (req, res) => {
  console.log('test')
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
  res.redirect(`http://ec2-3-15-180-154.us-east-2.compute.amazonaws.com/images/urls/${address}`)
})

server.listen(3000, () => { console.log('listening on port 3000') });
