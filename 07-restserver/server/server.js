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

mongoose.connect(process.env.URLDB, 
    { useNewUrlParser: true, useCreateIndex: true },
    (err, res) => {
    if (err) throw err;

    console.log('BASE DE DATOS ONLINE!!');
})

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});