import { isValidObjectId } from "mongoose";

export const isValidId = (req, res, next) => {
    if (isValidObjectId(req.params.id)) return next();
    return res.redirect("/404");
};