import { Router } from "express";

import { isUser } from "../middlewares/authMiddleware.js";

const deviceController = Router();

// CREATE
deviceController.get("/create", isUser, (req, res) => {
    return res.render("device/create");
});

export default deviceController;