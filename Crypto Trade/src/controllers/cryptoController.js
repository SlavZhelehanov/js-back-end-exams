import { Router } from "express";

// import { parseErrorMessage } from "../util/parseErrorMessage.js";
import { isUser } from "../middlewares/authMiddleware.js";
// import cryptoService from "../services/cryptoService.js";
// import { getTypeOfCrypto } from "../util/getTypeOfCrypto.js";
// import { validateQuery } from "../util/validateUrls.js";
// import { isValidId } from "../middlewares/utlParamsMiddleware.js";

const cryptoController = Router();

// CATALOG
cryptoController.get("/", async (req, res) => {
    return res.render("crypto/catalog");
});


// CREATE
cryptoController.get("/create", isUser, (req, res) => {
    return res.render("crypto/create");
});

// DETAILS
cryptoController.get("/:id/details", async (req, res) => {
    return res.render("crypto/details");
});

// EDIT
cryptoController.get("/:id/edit", isUser, async (req, res) => {
    return res.render("crypto/edit");
});

// SEARCH
cryptoController.get("/search", async (req, res) => {
    return res.render("crypto/search");
});

export default cryptoController;