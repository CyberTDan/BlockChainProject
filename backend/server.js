// imports
const express = require('express');
const app = express();
const browserify = require('browserify-middleware');
const { mintNFT } = require('./scripts/contract.js')

const url = require('url');
const querystring = require('querystring');

// function that takes tg alias and calls nft contract
app.get('/buy', async function(req, res) {
    const parsedUrl = url.parse(req.url);
    const queryParams = querystring.parse(parsedUrl.query);
  
    const tg_alias = queryParams.tg_alias;
    var result = await mintNFT(tg_alias);
    res.send(result);
});

app.use(express.static(__dirname));

// index page
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

// Starting the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
