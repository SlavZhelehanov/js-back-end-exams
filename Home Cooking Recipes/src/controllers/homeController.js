import { Router } from "express";

import recipeService from "../services/recipeService.js";
import parseErrorMessage from "../util/parseErrorMessage.js";

const homeController = Router();

homeController.get("/", async (req, res) => {
    try {
        const recipes = await recipeService.getLastTreeAddedRecipes();

        return res.render("home/home", { recipes });
    } catch (error) {
        return res.render("home/home", { messages: parseErrorMessage(error) });
    }
});

export default homeController;