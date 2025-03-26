import { Router } from "express";

const creatureController = Router();

// CATALOG
creatureController.get("/", async (req, res) => {
    return res.render("creature/catalog");
});


export default creatureController;