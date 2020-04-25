const express = require('express');
const app = express();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

const jwtSing = (userDB) => {
    return jwt.sign(
        {user: userDB}, 
        process.env.TOKEN_SECRET, 
        {expiresIn: process.env.TOKEN_EXPIRATION_DATE}
    );
}

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
                    message: 'Wrong user or password'
                }
            });
        }

        if (!bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Wrong user or password'
                }
            });
        }

        res.json({
            ok: true,
            user: userDB,
            token: jwtSing(userDB)
        });
    });
});

//Google Configurations
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();

    return {
        name: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
}

app.post('/google', async(req, res) => {

    let token = req.body.idToken;
    let googleUser = await verify(token)
        .catch(err => {
            return res.status(403).json({
                ok: false,
                err
            })
        });
    
    User.findOne({email: googleUser.email}, (err, userDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (userDB) {
            if (!userDB.google) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'You must use the application credentials'
                    }
                })
            }

            return res.status(200).json({
                ok: true,
                user: userDB,
                token: jwtSing(userDB)
            });

        } else {
            //If the user does not exist in data base
            let user = new User();
            user.name = googleUser.name;
            user.email = googleUser.email;
            user.img = googleUser.img;
            user.google = true;
            user.password = ':)';

            user.save((err, userDB) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }
    
                return res.status(200).json({
                    ok: true,
                    user: userDB,
                    token: jwtSing(userDB)
                });
            });

        }

    });
});

module.exports = app;