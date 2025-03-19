import { Router } from "express";

import stoneService from "../services/stoneService.js";
import { parseErrorMessage } from "../util/parseErrorMessage.js";

const homeController = Router();

// HOME
homeController.get("/", async (req, res) => {
    try {
        const stones = await stoneService.getLastTreeAddedStones();

        return res.render("home/home", { stones });
    } catch (error) {
        return res.render("home/home", { messages: parseErrorMessage(error) });
    }
});

export default homeController;