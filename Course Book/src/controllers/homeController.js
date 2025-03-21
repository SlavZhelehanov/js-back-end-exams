import { Router } from "express";

import courseService from "../services/courseService.js";
import parseErrorMessage from "../util/parseErrorMessage.js";

const homeController = Router();

homeController.get("/", async (req, res) => {
    try {
        const courses = await courseService.getLastTreeAddedCourses();

        return res.render("home/home", { courses });
    } catch (error) {
        return res.render("home/home", { messages: parseErrorMessage(error) });
    }
});

export default homeController;