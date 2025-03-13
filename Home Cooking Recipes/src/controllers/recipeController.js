import { Router } from "express";

const recipeController = Router();

// CATALOG
recipeController.get("/", async (req, res) => {
    return res.render("recipe/catalog", { pageTitle: "Recipe Catalog - " });
});

// CREATE
recipeController.get("/create", async (req, res) => {
    return res.render("recipe/create", { pageTitle: "Create Recipe - " });
});

export default recipeController;