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

// EDIT

// SEARCH

export default cosmeticController;