import { Router } from "express";

import parseErrorMessage from "../util/parseErrorMessage.js";
import deviceService from "../services/deviceService.js";

const homeController = Router();

homeController.get("/", async (req, res) => {
    try {
        const devices = await deviceService.getLastTreeAddedDevices();

        return res.render("home/home", { devices });
    } catch (error) {
        return res.render("home/home", { messages: parseErrorMessage(error) });
    }
});

homeController.get("/about", (req, res) => { return res.render("home/about"); });

export default homeController;