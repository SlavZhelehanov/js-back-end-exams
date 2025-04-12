import { Router } from "express";

const homeController = Router();

homeController.get("/", async (req, res) => {
    return res.render("home/home");
});

homeController.get("/about", (req, res) => { return res.render("home/about"); });

export default homeController;