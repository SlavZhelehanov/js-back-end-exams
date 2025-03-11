import { Router } from "express";

import { isUser } from "../middlewares/authMiddleware.js";
import deviceService from "../services/deviceService.js";
import parseErrorMessage from "../util/parseErrorMessage.js";
import { isValidId } from "../middlewares/verifyIsValidObjectId.js";

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
deviceController.get("/:id/details", isValidId, async (req, res) => {
    try {
        const device = await deviceService.getOneDevice({ _id: req.params.id });

        if (!device) return res.redirect("/404");

        const isOwner = device.owner.equals(req.user?.id);
        const isPreferred = req.user && !isOwner && device.preferredList.some(id => id.equals(req.user.id));

        return res.render("device/details", { device, isOwner, isPreferred });
    } catch (error) {
        return res.render("device/details", { messages: parseErrorMessage(error) });
    }
});

// EDIT
deviceController.get("/:id/edit", isUser, isValidId, async (req, res) => {
    try {
        const device = await deviceService.getOneDevice({ _id: req.params.id, owner: req.user?.id });

        if (!device) return res.redirect("/404");
        return res.render("device/edit", { device });
    } catch (error) {
        return res.render("device/edit", { messages: parseErrorMessage(error) });
    }
});
deviceController.post("/:id/edit", isUser, isValidId, async (req, res) => {
    const formData = req.body;

    try {
        const device = await deviceService.getOneDevice({ _id: req.params.id, owner: req.user?.id });

        if (!device) return res.redirect("/404");

        await deviceService.updateOneDevice(req.params.id, req.user.id, device, formData);

        return res.redirect(`/devices/${req.params.id}/details`);
    } catch (error) {
        return res.render("device/edit", { device: formData, messages: parseErrorMessage(error) });
    }
});

// PROFILE
deviceController.get("/profile", isUser, (req, res) => {
    return res.render("device/profile");
});

export default deviceController;