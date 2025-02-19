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

export default planetsController;