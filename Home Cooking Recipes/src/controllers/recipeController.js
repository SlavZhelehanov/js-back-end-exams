import { Router } from "express";

const recipeController = Router();

// CATALOG
recipeController.get("/", async (req, res) => {
    return res.render("recipe/catalog", { pageTitle: "Recipe Catalog - " });
});

export default recipeController;