const express = require('express');
const { tokenVerification, roleAdminVerification } = require('../middlewares/authentication');
const app = express();
const Category = require('../models/category');

app.get('/category', [tokenVerification, roleAdminVerification], (req, res) => {
    Category.find({})
    .sort('description')
    .populate('user', 'name email')
    .exec((err, categories) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: err.message
                }
            });
        }

        res.json({
            ok: true,
            categories
        })
    });
});

app.get('/category/:id', [tokenVerification, roleAdminVerification], (req, res) => {
    let id = req.params.id;
    Category.findById(id, (err, category) => {
        if (err || !category) {
            return res.status(err ? 500 : 400).json({
                ok: false,
                err: {
                    message: err ? err.message : 'The category was not found'
                }
            });
        }

        res.json({
            ok: true,
            category
        })
    });
});

app.post('/category', [tokenVerification, roleAdminVerification], (req, res) => {
    let body = req.body;
    let category = new Category({
        description: body.description,
        user: req.user._id
    });

    category.save((err, category) => {
        if (err || !category) {
            return res.status(err ? 500 : 400).json({
                ok: false,
                err: {
                    message: err
                }
            })
        }

        res.json({
            ok: true,
            category
        })
    });
});

app.put('/category/:id', [tokenVerification, roleAdminVerification], (req, res) => {
    let id = req.params.id;
    let categoryUpdated = {
        description: req.body.description
    }
    Category.findByIdAndUpdate(id, categoryUpdated, {new: true, runValidators: true}, (err, category) => {
        if (err || !category) {
            return res.status(err ? 500 : 400).json({
                ok: false,
                err: {
                    message: err ? err : 'The category was not found'
                }
            });
        }

        res.json({
            ok: true,
            category
        })
    })
});

app.delete('/category/:id', [tokenVerification, roleAdminVerification], (req, res) => {
    let id = req.params.id;
    Category.findByIdAndRemove(id, (err, category) => {
        if (err || !category) {
            return res.status(err ? 500 : 400).json({
                ok: false,
                err: {
                    message: err ? err : 'The category was not found'
                }
            });
        }

        res.json({
            ok: true,
            message: 'Category was deleted successfully',
            category
        });
    });
});

module.exports = app;