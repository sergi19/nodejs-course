const express = require('express');
const { tokenVerification, roleAdminVerification } = require('../middlewares/authentication');
const app = express();
const Product = require('../models/product');

app.get('/products', [tokenVerification, roleAdminVerification], (req, res) => {
    let from = Number(req.query.from) || 0;
    let to = Number(req.query.to) || 5;

    Product.find({})
    .skip(from)
    .limit(to)
    .populate('user', 'name email')
    .populate('category', 'description')
    .exec((err, products) => {
        if (err) {
            res.status(500).json({
                ok: false,
                err: {
                    message: err.message
                }
            });
        }

        res.json({
            ok: true,
            products
        });
    })
});

app.get('/product/:id', [tokenVerification, roleAdminVerification], (req, res) => {
    const id = req.params.id;
    Product.findById(id, (err, product) => {
        if (err || !product) {
            res.status(err ? 500 : 400).json({
                ok: false,
                err: {
                    message: err ? err.message : 'The product was not found'
                }
            });
        }

        res.json({
            ok: true,
            product
        })
    })
});

app.get('/product/search/:anyName', [tokenVerification, roleAdminVerification], (req, res) => {
    const anyName = req.params.anyName;
    //i siginifica insensible a las mayusculas o minusculas
    const regexp = new RegExp(anyName, 'i');
    Product.find({name: regexp})
    .populate('user', 'name email')
    .populate('category', 'description')
    .exec((err, products) => {
        if (err) {
            res.status(500).json({
                ok: false,
                err: {
                    message: err.message
                }
            });
        }

        res.json({
            ok: true,
            products
        });
    })
});

app.post('/product', [tokenVerification, roleAdminVerification], (req, res) => {
    let body = req.body;
    let product = new Product({
        name: body.name,
        price: body.price,
        description: body.description,
        available: body.available,
        category: body.category,
        user: req.user._id
    });

    product.save((err, product) => {
        if (err || !product) {
            return res.status(err ? 500 : 400).json({
                ok: false,
                err: {
                    message: err
                }
            })
        }

        res.json({
            ok: true,
            product
        })
    });
});

app.put('/product/:id', [tokenVerification, roleAdminVerification], (req, res) => {
    const id = req.params.id;
    const body = req.body;
    Product.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, product) => {
        if (err || !product) {
            return res.status(err ? 500 : 400).json({
                ok: false,
                err: {
                    message: err ? err.message : 'The product was not found'
                }
            })
        }

        res.json({
            ok: true,
            product
        })
    })
});

app.delete('/product/:id', [tokenVerification, roleAdminVerification], (req, res) => {
    const id = req.params.id;
    Product.findByIdAndRemove(id, (err, product) => {
        if (err || !product) {
            return res.status(err ? 500 : 400).json({
                ok: false,
                err: {
                    message: err ? err.message : 'The product was not found'
                }
            })
        }

        res.json({
            ok: true,
            message: 'Product was deleted successfully',
            product
        })
    })
});

module.exports = app;