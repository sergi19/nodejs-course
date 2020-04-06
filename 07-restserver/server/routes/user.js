const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const { tokenVerification, roleAdminVerification } = require('../middlewares/autentication');
const app = express();

app.get('/users', [tokenVerification, roleAdminVerification], (req, res) => {

    let from = Number(req.query.from) || 0;
    let reqLimit = Number(req.query.limit) || 5;
    //En el primer param., se envian las condiciones en consultas mongo como objeto 
    //ejemplo: { google: true } devolveria solo los usuarios con el campo google en true
    //En el segundo param., se le dice a la consulta que campos devolver
    User.find({status: true}, 'name age email role img status google')
        .skip(from)
        .limit(reqLimit)
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            User.count({status: true}, (err, count) => {
                res.json({
                    ok: true,
                    users,
                    count
                });
            })

        });
});

app.post('/user', [tokenVerification, roleAdminVerification], (req, res) => {
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

app.put('/user/:id', [tokenVerification, roleAdminVerification], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'age', 'email', 'img', 'role', 'state', 'google']);

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

app.delete('/user/:id', [tokenVerification, roleAdminVerification], (req, res) => {
    let id = req.params.id;

    User.findByIdAndRemove(id, (err, user) => {
        if(err || !user) {
            return res.status(400).json({
                ok: false,
                err: err ? err : `User not found`
            });
        }

        res.json({
            ok: true,
            user
        });
    });
});

app.delete('/updateStatus/:id', [tokenVerification, roleAdminVerification], (req, res) => {
    let id = req.params.id;
    let newState = {
        status: false
    };

    User.findByIdAndUpdate(id, newState, { new: true }, (err, user) => {
        if(err || !user) {
            return res.status(400).json({
                ok: false,
                err: err ? err : `User not found`
            });
        }

        res.json({
            ok: true,
            user
        });
    });
});


module.exports = app;