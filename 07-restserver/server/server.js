const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');
require('./config/config');

//MIDLEWARS
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
//parse application/json
app.use(bodyParser.json());

app.use(require('./routes/user'));

mongoose.connect('mongodb://localhost:27017/coffee', (err, res) => {
    if (err) throw err;

    console.log('BASE DE DATOS ONLINE!!');
})

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});