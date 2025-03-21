import { Router } from "express";

import { isUser } from "../middlewares/authMiddleware.js";

const courseController = Router();

// CREATE
courseController.get("/create", isUser, (req, res) => {
    return res.render("course/create");
});

// CATALOG
courseController.get("/", async (req, res) => {
    return res.render("course/catalog");
});

// DETAILS
courseController.get("/:id/details", async (req, res) => {
    return res.render("course/details");
});

export default courseController;