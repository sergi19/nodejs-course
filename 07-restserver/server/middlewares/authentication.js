const jwt = require('jsonwebtoken');

// ==================
// Token Verification
// ==================
let tokenVerification = (req, res, next) => {
    let token = req.get('Authorization');
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }

        req.user = decoded.user;
        next();
    });
};

// ======================
// Admin Rol Verification
// ======================
let roleAdminVerification = (req, res, next) => {
    let user = req.user;
    if (user.role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            ok: false,
            err: {
                message: `You don't have permissions for this action`
            }
        });
    }

    next();
}

// ====================================
// Token Verification for images in URL
// ====================================
let tokenImageVerification = (req, res, next) => {
    let token = req.query.token;
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: 'Invalid token'
            });
        }

        req.user = decoded.user;
        next();
    });
}

module.exports = {
    tokenVerification,
    roleAdminVerification,
    tokenImageVerification
}