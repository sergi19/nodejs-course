const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const User = require('../models/user');
const Product = require('../models/product');
const fs = require('fs');
const path = require('path');

app.use(fileUpload());

app.put('/upload/:type/:id', (req, res) => {
    let type = req.params.type;
    let id = req.params.id;

    //Get file name and extension
    let fileInfo = getFileInfo(req, id);

    //Validate types
    let validType = validateTypes(type);
    if (!validType.valid) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'The allowed types are: ' + validType.validTypes.join(', '),
                type
            }
        });
    }

    //Validate allowed extensions
    let validExtensions = validateAllowedExtensions(fileInfo.extension);
    if (!validExtensions.valid) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'The allowed extensions are: ' + validExtensions.allowedExtensions.join(', '),
                type
            }
        });
    }

    if (!req.files) {
        return res.status(500).json({
            ok: false,
            err: {
                message: 'No file selected'
            }
        });
    }

    fileInfo.file.mv(`uploads/${type}/${fileInfo.fileName}`, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        type === 'users' ? 
            saveUserImage(id, res, fileInfo.fileName, type) :
            saveProductImage(id, res, fileInfo.fileName, type);
    });
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

function validateAllowedExtensions(extension) {
    let allowedExtensions = ['png', 'jpg', 'gif', 'jpeg'];
    if (allowedExtensions.indexOf(extension) < 0) {
        return {
            valid: false,
            allowedExtensions
        };
    }

    return {
        valid: true,
        allowedExtensions
    };
}

function getFileInfo(req, id) {
    let file = req.files.file;
    let extension = file.name.split('.')[1];
    return {
        file,
        fileName: `${id}-${new Date().getMilliseconds()}.${extension}`,
        extension
    };
}

function deleteImage(img, type) {
    let imgPath = path.resolve(__dirname, `../../uploads/${type}/${img}`);
    if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
    }
}

function saveUserImage(id, res, fileName, type) {
    User.findById(id, (err, user) => {
        if (err || !user) {
            deleteImage(fileName, type);
            return res.status(err ? 500 : 400).json({
                ok: false,
                err: {
                    message: err ? err.message : 'The user was not found'
                }
            });
        }

        deleteImage(user.img, type);
        user.img = fileName;
        user.save((err, savedUser) => {
            if (err || !savedUser) {
                return res.status(err ? 500 : 400).json({
                    ok: false,
                    err: {
                        message: err.message
                    }
                });
            }

            res.json({
                ok: true,
                savedUser,
                img: savedUser.img
            });
        });
    });
}

function saveProductImage(id, res, fileName, type) {
    Product.findById(id, (err, product) => {
        if (err || !product) {
            deleteImage(fileName, type);
            return res.status(err ? 500 : 400).json({
                ok: false,
                err: {
                    message: err ? err.message : 'The product was not found'
                }
            });
        }

        deleteImage(product.img, type);
        product.img = fileName;
        product.save((err, savedProduct) => {
            if (err || !savedProduct) {
                return res.status(err ? 500 : 400).json({
                    ok: false,
                    err: {
                        message: err.message
                    }
                });
            }

            res.json({
                ok: true,
                savedProduct,
                img: savedProduct.img
            });
        });
    });
}

module.exports = app;
