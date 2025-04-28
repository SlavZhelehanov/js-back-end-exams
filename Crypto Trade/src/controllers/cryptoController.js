import { Router } from "express";

import { parseErrorMessage } from "../util/parseErrorMessage.js";
import { isUser } from "../middlewares/authMiddleware.js";
import cryptoService from "../services/cryptoService.js";
import { getTypeOfCrypto } from "../util/getTypeOfCrypto.js";
// import { validateQuery } from "../util/validateUrls.js";
// import { isValidId } from "../middlewares/utlParamsMiddleware.js";

const cryptoController = Router();

// CATALOG
cryptoController.get("/", async (req, res) => {
    try {
        const cryptos = await cryptoService.getAllCryptos();

        return res.render("crypto/catalog", { cryptos });
    } catch (error) {
        return res.render("crypto/catalog", { messages: parseErrorMessage(error) });
    }
});

// CREATE
cryptoController.get("/create", isUser, (req, res) => {
    const types = getTypeOfCrypto();
    return res.render("crypto/create", { types });
});
cryptoController.post("/create", isUser, async (req, res) => {
    const { name, payment, price, image, description } = req.body;

    try {
        await cryptoService.createCrypto({ name, payment, price, image, description, owner: req.user.id });
        return res.redirect("/cryptos");
    } catch (error) {
        const types = getTypeOfCrypto(payment);
        return res.render("crypto/create", { messages: parseErrorMessage(error), types, name, price, image, description });
    }
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