import { Router } from "express";

import parseErrorMessage from "../util/parseErrorMessage.js";
import animalService from "../services/animalService.js";

const homeController = Router();

homeController.get("/", async (req, res) => {
    try {
        const animals = await animalService.getAllAnimals({}, "image name need").sort({ createdAt: -1 }).limit(3);

        return res.render("home/home", { animals });
    } catch (error) {
        return res.render("home/home", { messages: parseErrorMessage(error) });
    }
});

export default homeController;