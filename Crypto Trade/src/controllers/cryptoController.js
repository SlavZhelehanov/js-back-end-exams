import { Router } from "express";

// import { parseErrorMessage } from "../util/parseErrorMessage.js";
// import { isUser } from "../middlewares/authMiddleware.js";
// import cryptoService from "../services/cryptoService.js";
// import { getTypeOfCrypto } from "../util/getTypeOfCrypto.js";
// import { validateQuery } from "../util/validateUrls.js";
// import { isValidId } from "../middlewares/utlParamsMiddleware.js";

const cryptoController = Router();

// CATALOG
cryptoController.get("/", async (req, res) => {
    return res.render("crypto/catalog");
});

export default cryptoController;