import { Router } from "express";


const cosmeticController = Router();


// CATALOG
cosmeticController.get("/", (req, res) => {
    return res.render("cosmetics/catalog");
});

// CREATE
cosmeticController.get("/create", (req, res) => {
    return res.render("cosmetics/create");
});

// DETAILS
cosmeticController.get("/:id/details", (req, res) => {
    return res.render("cosmetics/details");
});

// EDIT
cosmeticController.get("/:id/edit", (req, res) => {
    return res.render("cosmetics/edit");
});

// SEARCH

export default cosmeticController;