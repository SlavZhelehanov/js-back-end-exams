import { Router } from "express";

import { parseErrorMessage } from "../util/parseErrorMessage.js";
import adService from "../services/adService.js";

const homeController = Router();

// HOME
homeController.get("/", async (req, res) => {
    try {
        const ads = await adService.getAllAds("home");

        return res.render("home/home", { ads });
    } catch (error) {
        return res.render("home/home", { messages: parseErrorMessage(error) });
    }
});

export default homeController;