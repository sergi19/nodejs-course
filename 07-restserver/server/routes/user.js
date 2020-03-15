const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const app = express();

app.get('/user', (req, res) => {
    res.json('get User LOCAL')
});

app.post('/user', (req, res) => {
    let body = req.body;
    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    user.save((err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        let user = userDB.toObject();
        delete user.password;

        res.json({
            ok: true,
            user
        })
    });
});

app.put('/user/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    User.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        let user = userDB.toObject();
        delete user.password;

        res.json({
            ok: true,
            user
        })
    });
});

app.delete('/user', (req, res) => {
    res.json('delete User')
});


module.exports = app;