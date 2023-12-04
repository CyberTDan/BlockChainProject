const express = require('express');
const app = express();
const browserify = require('browserify-middleware');
const { mintNFT } = require('./scripts/contract.js')

const url = require('url');
const querystring = require('querystring');

app.use('/js', browserify(__dirname + '/scripts/contract.js'));
app.get('/buy', function(req, res) {
    const parsedUrl = url.parse(req.url);
    const queryParams = querystring.parse(parsedUrl.query);
  
    const tg_alias = queryParams.tg_alias;
    var result = mintNFT(tg_alias);
    res.send(result);
});

app.use(express.static(__dirname));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
