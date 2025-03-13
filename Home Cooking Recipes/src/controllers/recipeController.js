import { Router } from "express";

import recipeService from "../services/recipeService.js";
import parseErrorMessage from "../util/parseErrorMessage.js";
import { isUser } from "../middlewares/authMiddleware.js";

const recipeController = Router();

// CATALOG
recipeController.get("/", async (req, res) => {
    try {
        const recipes = await recipeService.getAllRecipes();

        return res.render("recipe/catalog", { pageTitle: "Recipe Catalog - ", recipes });
    } catch (error) {
        return res.render("recipe/catalog", { pageTitle: "Recipe Catalog - ", messages: parseErrorMessage(error) });
    }
});

// CREATE
recipeController.get("/create", isUser, (req, res) => {
    return res.render("recipe/create", { pageTitle: "Create Recipe - " });
});
recipeController.post("/create", isUser, async (req, res) => {
    const { title, ingredients, instructions, description, image } = req.body;

    try {
        await recipeService.createRecipe({ title, ingredients, instructions, description, image, owner: req.user.id });
        return res.redirect("/recipes");
    } catch (error) {
        return res.render("recipe/create", { pageTitle: "Create Recipe - ", messages: parseErrorMessage(error), title, ingredients, instructions, description, image });
    }
});

// DETAILS
recipeController.get("/:id/details", async (req, res) => {
    return res.render("recipe/details", { pageTitle: `{Spaghetti Carbonara} - ` });
});

// EDIT
recipeController.get("/:id/edit", async (req, res) => {
    return res.render("recipe/edit", { pageTitle: "Edit Recipe - " });
});

// SEARCH
recipeController.get("/search", async (req, res) => {
    return res.render("recipe/search", { pageTitle: "Search Recipes - " });
});

export default recipeController;