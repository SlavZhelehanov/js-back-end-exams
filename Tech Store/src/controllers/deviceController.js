import { Router } from "express";

import { isUser } from "../middlewares/authMiddleware.js";
import deviceService from "../services/deviceService.js";
import parseErrorMessage from "../util/parseErrorMessage.js";

const deviceController = Router();

// CREATE
deviceController.get("/create", isUser, (req, res) => {
    return res.render("device/create");
});
deviceController.post("/create", isUser, async (req, res) => {
    const { brand, model, hdd, screenSize, ram, os, cpu, gpu, price, color, weight, image } = req.body;

    try {
        await deviceService.createDevice({ brand, model, hdd, screenSize, ram, os, cpu, gpu, price, color, weight, image, owner: req.user.id });
        return res.redirect("/devices");
    } catch (error) {
        return res.render("device/create", { messages: parseErrorMessage(error), device: { brand, model, hdd, screenSize, ram, os, cpu, gpu, price, color, weight, image } });
    }
});

// CATALOG
deviceController.get("/", async (req, res) => {
    try {
        const devices = await deviceService.getAllDevices();

        return res.render("device/catalog", { devices });
    } catch (error) {
        return res.render("device/catalog", { messages: parseErrorMessage(error) });
    }
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