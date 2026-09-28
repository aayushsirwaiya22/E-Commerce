const express = require("express");
const adminRoute = express.Router();

// Admin credentials live in .env (ADMIN_USER / ADMIN_PASS).
// Defaults match the legacy hardcoded login so nobody gets locked out.
function creds() {
    return {
        user: process.env.ADMIN_USER || "2210",
        pass: process.env.ADMIN_PASS || "1234",
    };
}

adminRoute.route("/login").post((req, res) => {
    const { user, pass } = creds();
    if (req.body && req.body.user === user && req.body.pass === pass) {
        res.send({ ok: true, user });
        res.end();
    } else {
        res.send({});
        res.end();
    }
});

module.exports = adminRoute;
