import { Router } from "express";

// import { parseErrorMessage } from "../util/parseErrorMessage.js";
import { isUser } from "../middlewares/authMiddleware.js";
// import gameService from "../services/gameService.js";
// import { isValidId } from "../middlewares/utlParamsMiddleware.js";

const gameController = Router();

// CATALOG
gameController.get("/", async (req, res) => {
    return res.render("game/catalog");
});

// CREATE
gameController.get("/create", isUser, (req, res) => {
    return res.render("game/create");
});

export default gameController;