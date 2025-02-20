import { Router } from "express";

const planetsController = Router();

// CATALOG
planetsController.get("/", (req, res) => {
    return res.render("planet/catalog");
});

// CREATE
planetsController.get("/create", (req, res) => {
    return res.render("planet/create");
});

// DETAILS
planetsController.get("/:id/details", (req, res) => {
    return res.render("planet/details");
});

// EDIT
planetsController.get("/:id/edit", (req, res) => {
    return res.render("planet/edit");
});

export default planetsController;