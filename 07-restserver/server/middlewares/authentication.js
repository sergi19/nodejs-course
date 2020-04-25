const jwt = require('jsonwebtoken');

// =============
// Token Verification
// =============
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

// =============
// Token Verification
// =============
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

module.exports = {
    tokenVerification,
    roleAdminVerification
}