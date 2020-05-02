const express = require('express');
const fs = require('fs');
const path = require('path');
let { tokenImageVerification } = require('../middlewares/authentication');

const app = express();

app.get('/getImage/:type/:img', tokenImageVerification, (req, res) => {
    let type = req.params.type;
    let types = validateTypes(type);
    if (!types.valid) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'The allowed types are ' + types.validTypes.join(', '),
                type
            }
        });
    }
    let img = req.params.img;
    let imgPath = path.resolve(__dirname, `../../uploads/${type}/${img}`);

    if (!fs.existsSync(imgPath)) {
        let noImagePath = path.resolve(__dirname, '../assets/no-image-found.jpg');
        return res.sendFile(noImagePath);
    }

    res.sendFile(imgPath);
});

function validateTypes(type) {
    let validTypes = ['users', 'products'];
    if (validTypes.indexOf(type) < 0) {
        return {
            valid: false,
            validTypes
        };
    }

    return {
        valid: true,
        validTypes
    };
}

module.exports = app;