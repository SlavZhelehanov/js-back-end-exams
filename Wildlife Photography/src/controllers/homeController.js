import { Router } from "express";

import parseErrorMessage from "../util/parseErrorMessage.js";

const homeController = Router();

homeController.get("/", (req, res) => {
    return res.render("home/home");
});

export default homeController;