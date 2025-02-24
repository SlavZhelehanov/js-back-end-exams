import jwt from "../lib/jsonwebtoken.js";

import { COOKIE_NAME, SUPER_SECRET } from "../util/envConstants.js";

export const auth = async (req, res, next) => {
    const token = req.cookies[COOKIE_NAME];

    if (!token) return next();

    try {
        const user = await jwt.verify(token, SUPER_SECRET);

        req.user = user;
        res.locals.user = user; // For handlebars
    } catch (error) {
        delete req.user;
        delete res.locals.user;
        res.clearCookie(COOKIE_NAME);
    }
    return next();
}