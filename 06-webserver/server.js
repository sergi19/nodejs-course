var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

/*app.get('/', (req, res) => {
    let out = {
        name: 'Sergio',
        age: 32,
        surname: null,
        url: req.url
    }
    res.send(out);
});

app.get('/data', (req, res) => {
    res.send('Hello World!');
});*/

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});