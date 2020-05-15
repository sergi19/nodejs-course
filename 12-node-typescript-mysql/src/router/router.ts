import { Router, Request, Response } from "express";
import MySQL from '../mysql/mysql';

const router = Router();

router.get('/heros', (req: Request, res: Response) => {
    const query = `
        SELECT *
        FROM heros`;

    MySQL.executeQuery(query, (err: any, heros: Object[]) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err
            })
        }

        res.json({
            ok: true,
            heros
        });
    });
});

router.get('/hero/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const escapeId = MySQL.instance.connection.escape(id);
    const query = `
        SELECT *
        FROM heros h
        WHERE h.id = ${escapeId}`;

    MySQL.executeQuery(query, (err: any, heros: Object[]) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err
            })
        }

        res.json({
            ok: true,
            hero: heros[0]
        });
    });
});

export default router;