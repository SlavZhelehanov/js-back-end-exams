import { Router } from "express";

const recipeController = Router();

// CATALOG
recipeController.get("/", async (req, res) => {
    return res.render("recipe/catalog", { pageTitle: "Recipe Catalog - " });
});

// CREATE
recipeController.get("/create", (req, res) => {
    return res.render("recipe/create", { pageTitle: "Create Recipe - " });
});

// DETAILS
recipeController.get("/:id/details", async (req, res) => {
    return res.render("recipe/details", { pageTitle: `{Spaghetti Carbonara} - ` });
});

// EDIT
recipeController.get("/:id/edit", async (req, res) => {
    return res.render("recipe/edit", { pageTitle: "Edit Recipe - " });
});

export default recipeController;