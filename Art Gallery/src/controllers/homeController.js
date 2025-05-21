import { Router } from "express";

import parseErrorMessage from "../util/parseErrorMessage.js";
import publicationService from "../services/publicationService.js";

const homeController = Router();

homeController.get("/", async (req, res) => {
    try {
        const publications = await publicationService.getAllPublications();

        return res.render("home/home", { publications });
    } catch (error) {
        return res.render("home/home", { messages: parseErrorMessage(error) });
    }
});

export default homeController;