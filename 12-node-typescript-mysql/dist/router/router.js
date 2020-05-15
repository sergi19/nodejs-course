"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const router = express_1.Router();
router.get('/heros', (req, res) => {
    const query = `
        SELECT *
        FROM heros`;
    mysql_1.default.executeQuery(query, (err, heros) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err
            });
        }
        res.json({
            ok: true,
            heros
        });
    });
});
router.get('/hero/:id', (req, res) => {
    const id = req.params.id;
    const escapeId = mysql_1.default.instance.connection.escape(id);
    const query = `
        SELECT *
        FROM heros h
        WHERE h.id = ${escapeId}`;
    mysql_1.default.executeQuery(query, (err, heros) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err
            });
        }
        res.json({
            ok: true,
            hero: heros[0]
        });
    });
});
exports.default = router;
