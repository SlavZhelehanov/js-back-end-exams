import { Router } from "express";

const planetsController = Router();

// CATALOG
planetsController.get("/", (req, res) => {
    return res.render("planet/catalog");
});

export default planetsController;