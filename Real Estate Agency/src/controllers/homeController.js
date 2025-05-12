import { Router } from "express";

import housingService from "../services/housingService.js";
import { parseErrorMessage } from "../util/parseErrorMessage.js";

const homeController = Router();

// HOME
homeController.get("/", async (req, res) => {
    try {
        const housings = await housingService.getAllHousings().sort({ createdAt: -1 }).limit(3);

        return res.render("home/home", { housings });
    } catch (error) {
        return res.render("home/home", { messages: parseErrorMessage(error) });
    }
});

export default homeController;