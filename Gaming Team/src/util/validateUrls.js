import { isValidObjectId } from "mongoose";

export const isValidId = id => { return isValidObjectId(id); };

export const validateQuery = urlQuery => { return urlQuery["nameOfTheDisaster"] && urlQuery["typeOfDisaster"]; }