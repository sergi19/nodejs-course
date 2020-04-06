const express = require('express');
const app = express();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.post('/login', (req, res) => {

    let body = req.body;

    User.findOne({email: body.email}, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Wrong (user) or password'
                }
            });
        }

        if (!bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Wrong user or (password)'
                }
            });
        }

        let token = jwt.sign(
            {user: userDB}, 
            process.env.TOKEN_SECRET, 
            {expiresIn: process.env.TOKEN_EXPIRATION_DATE}
        );

        res.json({
            ok: true,
            user: userDB,
            token: token
        });
    });
});

module.exports = app;