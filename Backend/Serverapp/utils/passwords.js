const bcrypt = require("bcryptjs");

const BCRYPT_RE = /^\$2[aby]\$\d+\$/;

function hashPassword(plain) {
    return bcrypt.hashSync(String(plain), 10);
}

// Returns { ok } and, for legacy plaintext entries, { ok:true, legacy:true }
// so callers can transparently upgrade the stored hash on successful login.
function verifyPassword(plain, stored) {
    if (plain == null || stored == null) return { ok: false };
    if (BCRYPT_RE.test(stored)) {
        try {
            return { ok: bcrypt.compareSync(String(plain), stored) };
        } catch (e) {
            return { ok: false };
        }
    }
    if (String(plain) === String(stored)) return { ok: true, legacy: true };
    return { ok: false };
}

module.exports = { hashPassword, verifyPassword };
