import { Router } from "express";

const volcanoController = Router();

// CATALOG
volcanoController.get("/", async (req, res) => {
    return res.render("volcano/catalog");
});

export default volcanoController;