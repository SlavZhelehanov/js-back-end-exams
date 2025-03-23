import { Router } from "express";

const electronicController = Router();

// CATALOG
electronicController.get("/", async (req, res) => {
    return res.render("electronic/catalog");
});

export default electronicController;