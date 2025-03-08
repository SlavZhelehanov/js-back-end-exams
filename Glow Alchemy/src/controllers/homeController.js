import { Router } from "express";

import { parseErrorMessage } from "../util/parseErrorMessage.js";
import cosmeticService from "../services/cosmeticService.js";

const homeController = Router();

// HOME
homeController.get("/", async (req, res) => {
    try {
        const cosmetics = await cosmeticService.getLastTreeAddedCosmetics();
        
        return res.render("home/home", { cosmetics });
    } catch (error) {
        return res.render("home/home", { messages: parseErrorMessage(error) });
    }
});

export default homeController;