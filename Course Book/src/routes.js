import { Router } from "express";

import homeController from "./controllers/homeController.js";
import authController from "./controllers/authController.js";
import courseController from "./controllers/courseController.js";

const routes = Router();

routes.use("/", homeController);

routes.use("/auth", authController);

routes.use("/courses", courseController);

routes.all("*", (req, res) => { return res.render("404"); });

export default routes;