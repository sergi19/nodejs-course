const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./config/config');

//MIDLEWARS
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
//parse application/json
app.use(bodyParser.json());

app.get('/user', (req, res) => {
    res.json('get User')
});

app.post('/user', (req, res) => {
    let body = req.body;
    if (!body.name) {
        res.status(400).json({
            ok: false,
            message: 'The name field is required'
        })
    } else {
        res.json({
            person: body
        })
    }
});

app.put('/user/:id', (req, res) => {
    let id = req.params.id;
    res.json({
        id
    })
});

app.delete('/user', (req, res) => {
    res.json('delete User')
});

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});