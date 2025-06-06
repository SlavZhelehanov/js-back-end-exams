import { Router } from "express";

import { parseErrorMessage } from "../util/parseErrorMessage.js";
import { isUser } from "../middlewares/authMiddleware.js";
import cryptoService from "../services/cryptoService.js";
import { getTypeOfCrypto } from "../util/getTypeOfCrypto.js";
import { validateQuery } from "../util/validateUrls.js";
import { isValidId } from "../middlewares/utlParamsMiddleware.js";

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
cryptoController.get("/:id/details", isValidId, async (req, res) => {
    try {
        const crypto = await cryptoService.getOneCrypto({ _id: req.params.id }).lean();

        if (!crypto) return res.redirect("/404");

        const isOwner = crypto.owner.equals(req.user?.id);
        const isBuyer = req.user && !isOwner && crypto.cryptoBuyers.some(id => id.equals(req.user.id));
        return res.render("crypto/details", { ...crypto, isOwner, isBuyer });
    } catch (error) {
        return res.render("crypto/details", { messages: parseErrorMessage(error) });
    }
});

// BUY
cryptoController.get("/:id/buy", isUser, isValidId, async (req, res) => {
    try {
        const crypto = await cryptoService.getOneCrypto({ _id: req.params.id });

        if (!crypto || !req.user || crypto.owner.equals(req.user.id) || crypto.cryptoBuyers.some(id => id.equals(req.user.id))) return res.redirect("/404");

        await cryptoService.buyCrypto(req.params.id, req.user.id);

        return res.redirect(`/cryptos/${req.params.id}/details`);
    } catch (error) {
        return res.render("crypto/details", { messages: parseErrorMessage(error) });
    }
});

// DELETE
cryptoController.get("/:id/delete", isUser, isValidId, async (req, res) => {
    try {
        const query = await cryptoService.deleteOneCrypto(req.params.id, req.user.id);

        if (!query) return res.redirect("/404");

        return res.redirect("/cryptos");
    } catch (error) {
        return res.render("crypto/details", { messages: parseErrorMessage(error) });
    }
});

// EDIT
cryptoController.get("/:id/edit", isValidId, isUser, async (req, res) => {
    try {
        const crypto = await cryptoService.getOneCrypto({ _id: req.params.id, owner: req.user?.id }).lean();

        if (!crypto) return res.redirect("/404");

        const types = getTypeOfCrypto(crypto.payment);

        return res.render("crypto/edit", { ...crypto, types });
    } catch (error) {
        return res.render("crypto/edit", { messages: parseErrorMessage(error) });
    }
});
cryptoController.post("/:id/edit", isUser, isValidId, async (req, res) => {
    const formData = req.body;

    try {
        const crypto = await cryptoService.getOneCrypto({ _id: req.params.id, owner: req.user?.id }).lean();

        if (!crypto) return res.redirect("/404");

        await cryptoService.updateOneCrypto(req.params.id, req.user.id, crypto, formData);

        return res.redirect(`/cryptos/${req.params.id}/details`);
    } catch (error) {
        const types = getTypeOfCrypto(formData.payment);
        return res.render("crypto/edit", { ...formData, types, messages: parseErrorMessage(error) });
    }
});

// SEARCH
cryptoController.get("/search", async (req, res) => {
    const search = validateQuery(req.query) ? req.query : null;
    const types = getTypeOfCrypto(req.query?.payment);

    try {
        const cryptos = await cryptoService.getAllCryptos(search);

        return res.render("crypto/search", { types, cryptos, name: search?.name });
    } catch (error) {
        return res.render("crypto/search", { messages: parseErrorMessage(error), search, types });
    }
});

export default cryptoController;