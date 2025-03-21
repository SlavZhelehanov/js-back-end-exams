import { Router } from "express";

import { isUser } from "../middlewares/authMiddleware.js";
import courseService from "../services/courseService.js";
import parseErrorMessage from "../util/parseErrorMessage.js";

const courseController = Router();

// CREATE
courseController.get("/create", isUser, (req, res) => {
    return res.render("course/create");
});
courseController.post("/create", isUser, async (req, res) => {
    const { title, type, certificate, image, description, price } = req.body;

    try {
        await courseService.createCourse({ title, type, certificate, image, description, price, owner: req.user.id });
        return res.redirect("/courses");
    } catch (error) {
        return res.render("course/create", { messages: parseErrorMessage(error), title, type, certificate, image, description, price });
    }
});

// CATALOG
courseController.get("/", async (req, res) => {
    return res.render("course/catalog");
});

// DETAILS
courseController.get("/:id/details", async (req, res) => {
    return res.render("course/details");
});

// EDIT
courseController.get("/:id/edit", isUser, async (req, res) => {
    return res.render("course/edit");
});

// PROFILE
courseController.get("/profile", isUser, async (req, res) => {
    return res.render("course/profile");
});

export default courseController;