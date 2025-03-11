import { Router } from "express";

import { isUser } from "../middlewares/authMiddleware.js";

const deviceController = Router();

// CREATE
deviceController.get("/create", isUser, (req, res) => {
    return res.render("device/create");
});

// CATALOG
deviceController.get("/", (req, res) => {
    return res.render("device/catalog");
});

// DETAILS
deviceController.get("/:id/details", (req, res) => {
    return res.render("device/details");
});

// EDIT
deviceController.get("/:id/edit", isUser, (req, res) => {
    return res.render("device/edit");
});

// PROFILE
deviceController.get("/profile", isUser, (req, res) => {
    return res.render("device/profile");
});

export default deviceController;