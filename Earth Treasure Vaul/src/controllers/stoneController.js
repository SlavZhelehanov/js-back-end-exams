import { Router } from "express";

import { isUser } from "../middlewares/authMiddleware.js";

const stoneController = Router();

// CREATE
stoneController.get("/create", isUser, (req, res) => {
    return res.render("stone/create");
});

export default stoneController;