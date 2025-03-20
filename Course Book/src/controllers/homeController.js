import { Router } from "express";

const homeController = Router();

homeController.get("/", async (req, res) => {
    return res.render("home/home");
});

export default homeController;