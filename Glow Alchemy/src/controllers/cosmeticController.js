import { Router } from "express";


const cosmeticController = Router();

cosmeticController.get("/", (req, res) => {
    return res.render("cosmetics/catalog");
});

export default cosmeticController;